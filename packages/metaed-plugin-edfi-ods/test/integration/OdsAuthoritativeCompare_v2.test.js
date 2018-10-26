// @flow
import R from 'ramda';
import path from 'path';
import ffs from 'final-fs';
import { exec } from 'child_process';
import diff2html from 'diff2html';
import type { GeneratedOutput, State, Namespace, GeneratorResult } from 'metaed-core';
import {
  buildMetaEd,
  buildParseTree,
  fileMapForFailure,
  loadFileIndex,
  loadFiles,
  loadPlugins,
  initializeNamespaces,
  newMetaEdConfiguration,
  newState,
  orderByProp,
  runEnhancers,
  runGenerators,
  validateConfiguration,
  walkBuilders,
} from 'metaed-core';
import type { Table } from '../../src/model/database/Table';
import { tableEntities, rowEntities } from '../../src/enhancer/EnhancerHelper';
import { orderRows } from '../../src/enhancer/AddSchemaContainerEnhancer';

jest.unmock('final-fs');
jest.setTimeout(40000);

describe('when generating ods and comparing it to data standard 2.0 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact/v2/');
  const projectRootPath: string = path.resolve(__dirname, '../../../../');
  const nodeModulesPath: string = `${projectRootPath}/node_modules`;
  const outputDirectory: string = `${artifactPath}`;
  let coreResult: GeneratedOutput;
  let coreFileBaseName: string;
  let authoritativeCoreOdsFilename: string;
  let generatedCoreOdsFilename: string;
  let tableOrder: Array<string>;
  let fkOrder: Array<string>;
  let rowOrder: Array<string>;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      defaultPluginTechVersion: '2.0.0',
      projectPaths: ['./node_modules/ed-fi-model-2.0/'],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'edfi',
          projectExtension: '',
          projectVersion: '2.0.0',
        },
      ],
    };

    const state: State = {
      ...newState(),
      metaEdConfiguration,
    };
    state.metaEd.dataStandardVersion = '2.0.0';
    validateConfiguration(state);
    loadPlugins(state);
    state.pluginManifest = state.pluginManifest.filter(
      manifest => manifest.shortName === 'edfiUnified' || manifest.shortName === 'edfiOds',
    );
    loadFiles(state);
    loadFileIndex(state);
    buildParseTree(buildMetaEd, state);
    await walkBuilders(state);
    initializeNamespaces(state);
    // eslint-disable-next-line no-restricted-syntax
    for (const pluginManifest of state.pluginManifest) {
      await runEnhancers(pluginManifest, state);
      await runGenerators(pluginManifest, state);
    }

    fileMapForFailure(state);

    const coreNamespace: ?Namespace = state.metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();

    const tables: Array<Table> = orderByProp('name')([...tableEntities(state.metaEd, coreNamespace).values()]);
    tableOrder = tables.map(table => table.name);
    fkOrder = tables.reduce((acc: Array<string>, table: Table) => acc.concat([...table.foreignKeys.map(fk => fk.name)]), []);

    rowOrder = orderRows([...rowEntities(state.metaEd, coreNamespace).values()]).map(
      x => x.name + (x.type === 'enumerationRow' ? x.description : ''),
    );

    coreResult = R.head(
      R.head(state.generatorResults.filter(x => x.generatorName === 'edfiOds.OdsGenerator')).generatedOutput,
    );
    coreFileBaseName = path.basename(coreResult.fileName, '.sql');
    generatedCoreOdsFilename = `${outputDirectory}/${coreFileBaseName}.sql`;
    authoritativeCoreOdsFilename = `${artifactPath}/${coreFileBaseName}-Authoritative.sql`;

    expect(coreResult).toBeDefined();
    await ffs.writeFile(generatedCoreOdsFilename, coreResult.resultString, 'utf-8');
  });

  it('should have correct table order', () => {
    expect(tableOrder).toBeDefined();
    expect(tableOrder).toMatchSnapshot();
  });

  it('should have correct foreign key order', () => {
    expect(fkOrder).toBeDefined();
    expect(fkOrder).toMatchSnapshot();
  });

  it('should have correct row order', () => {
    expect(rowOrder).toBeDefined();
    expect(rowOrder).toMatchSnapshot();
  });

  it('should have core with no differences', async () => {
    expect(coreResult).toBeDefined();
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeCoreOdsFilename} ${generatedCoreOdsFilename}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });

  it('should create diff files', async () => {
    expect(coreResult).toBeDefined();
    const cssFile: string = `${nodeModulesPath}/diff2html/dist/diff2html.min.css`;
    const htmlFile: string = `${outputDirectory}/${coreFileBaseName}.html`;
    const diffFile: string = `${outputDirectory}/${coreFileBaseName}.diff`;
    const gitDiffToFile: string = `git diff --no-index -- ${authoritativeCoreOdsFilename} ${generatedCoreOdsFilename} > ${diffFile}`;

    await new Promise(resolve => exec(gitDiffToFile, () => resolve()))
      .then(() => ffs.readFile(diffFile))
      .then(result => diff2html.Diff2Html.getPrettyHtml(result.toString()))
      .then(result =>
        ffs.readFile(cssFile).then(css => {
          const html: string = `<html>\n<style>\n${css}\n</style>\n${result}\n</html>`;
          return ffs.writeFile(htmlFile, html, 'utf-8');
        }),
      );
  });
});

describe('when generating ods with simple extensions and comparing it to data standard 2.0 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact/v2/');
  const sampleExtensionPath: string = path.resolve(__dirname, './simple-extension-project');

  let generatedCoreOdsFilename: string;
  let authoritativeCoreOdsFilename: string;
  let generatedExtensionOdsFilename: string;
  let authoritativeExtensionOdsFilename: string;

  let generatedCoreOutput: GeneratedOutput;
  let generatedExtensionOutput: GeneratedOutput;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      defaultPluginTechVersion: '2.0.0',
      projectPaths: ['./node_modules/ed-fi-model-2.0/', sampleExtensionPath],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'edfi',
          projectExtension: '',
          projectVersion: '2.0.0',
        },
        {
          projectName: 'Extension',
          namespaceName: 'extension',
          projectExtension: 'Extension',
          projectVersion: '2.0.0',
        },
      ],
    };

    const state: State = {
      ...newState(),
      metaEdConfiguration,
    };
    state.metaEd.dataStandardVersion = '2.0.0';

    validateConfiguration(state);
    loadPlugins(state);
    state.pluginManifest = state.pluginManifest.filter(
      manifest => manifest.shortName === 'edfiUnified' || manifest.shortName === 'edfiOds',
    );
    loadFiles(state);
    loadFileIndex(state);
    buildParseTree(buildMetaEd, state);
    await walkBuilders(state);
    initializeNamespaces(state);
    // eslint-disable-next-line no-restricted-syntax
    for (const pluginManifest of state.pluginManifest) {
      await runEnhancers(pluginManifest, state);
      await runGenerators(pluginManifest, state);
    }

    const generatorResult: GeneratorResult = R.head(
      state.generatorResults.filter(x => x.generatorName === 'edfiOds.OdsGenerator'),
    );
    [generatedCoreOutput, generatedExtensionOutput] = generatorResult.generatedOutput;

    const coreFileBaseName: string = path.basename(generatedCoreOutput.fileName, '.sql');
    generatedCoreOdsFilename = `${artifactPath}/${coreFileBaseName}.sql`;
    authoritativeCoreOdsFilename = `${artifactPath}/${coreFileBaseName}-Authoritative.sql`;

    const extensionFileBaseName: string = path.basename(generatedExtensionOutput.fileName, '.sql');
    generatedExtensionOdsFilename = `${artifactPath}/Simple-${extensionFileBaseName}.sql`;
    authoritativeExtensionOdsFilename = `${artifactPath}/Simple-${extensionFileBaseName}-Authoritative.sql`;

    await ffs.writeFile(generatedCoreOdsFilename, generatedCoreOutput.resultString, 'utf-8');
    await ffs.writeFile(generatedExtensionOdsFilename, generatedExtensionOutput.resultString, 'utf-8');
  });

  it('should have core with no differences', async () => {
    expect(generatedCoreOutput).toBeDefined();
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeCoreOdsFilename} ${generatedCoreOdsFilename}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });

  it('should have extension with no differences', async () => {
    expect(generatedExtensionOutput).toBeDefined();
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeExtensionOdsFilename} ${generatedExtensionOdsFilename}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });
});

describe('when generating ods with student transcript extensions and comparing it to data standard 2.0 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact/v2/');
  const sampleExtensionPath: string = path.resolve(__dirname, './student-transcript-extension-project');

  let generatedCoreOdsFilename: string;
  let authoritativeCoreOdsFilename: string;
  let generatedExtensionOdsFilename: string;
  let authoritativeExtensionOdsFilename: string;

  let generatedCoreOutput: GeneratedOutput;
  let generatedExtensionOutput: GeneratedOutput;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      defaultPluginTechVersion: '2.0.0',
      projectPaths: ['./node_modules/ed-fi-model-2.0/', sampleExtensionPath],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'edfi',
          projectExtension: '',
          projectVersion: '2.0.0',
        },
        {
          projectName: 'Extension',
          namespaceName: 'extension',
          projectExtension: 'Extension',
          projectVersion: '2.0.0',
        },
      ],
    };

    const state: State = {
      ...newState(),
      metaEdConfiguration,
    };
    state.metaEd.dataStandardVersion = '2.0.0';

    validateConfiguration(state);
    loadPlugins(state);
    state.pluginManifest = state.pluginManifest.filter(
      manifest => manifest.shortName === 'edfiUnified' || manifest.shortName === 'edfiOds',
    );
    loadFiles(state);
    loadFileIndex(state);
    buildParseTree(buildMetaEd, state);
    await walkBuilders(state);
    initializeNamespaces(state);
    // eslint-disable-next-line no-restricted-syntax
    for (const pluginManifest of state.pluginManifest) {
      await runEnhancers(pluginManifest, state);
      await runGenerators(pluginManifest, state);
    }

    const generatorResult: GeneratorResult = R.head(
      state.generatorResults.filter(x => x.generatorName === 'edfiOds.OdsGenerator'),
    );
    [generatedCoreOutput, generatedExtensionOutput] = generatorResult.generatedOutput;

    const coreFileBaseName: string = path.basename(generatedCoreOutput.fileName, '.sql');
    generatedCoreOdsFilename = `${artifactPath}/${coreFileBaseName}.sql`;
    authoritativeCoreOdsFilename = `${artifactPath}/${coreFileBaseName}-Authoritative.sql`;

    const extensionFileBaseName: string = path.basename(generatedExtensionOutput.fileName, '.sql');
    generatedExtensionOdsFilename = `${artifactPath}/Transcript-${extensionFileBaseName}.sql`;
    authoritativeExtensionOdsFilename = `${artifactPath}/Transcript-${extensionFileBaseName}-Authoritative.sql`;

    await ffs.writeFile(generatedCoreOdsFilename, generatedCoreOutput.resultString, 'utf-8');
    await ffs.writeFile(generatedExtensionOdsFilename, generatedExtensionOutput.resultString, 'utf-8');
  });

  it('should have core with no differences', async () => {
    expect(generatedCoreOutput).toBeDefined();
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeCoreOdsFilename} ${generatedCoreOdsFilename}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });

  it('should have extension with no differences', async () => {
    expect(generatedExtensionOutput).toBeDefined();
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeExtensionOdsFilename} ${generatedExtensionOdsFilename}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });
});
