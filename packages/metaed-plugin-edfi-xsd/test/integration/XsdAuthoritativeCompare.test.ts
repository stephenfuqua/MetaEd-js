import R from 'ramda';
import path from 'path';
import ffs from 'final-fs';
import { exec } from 'child_process';
import diff2html from 'diff2html';
import {
  GeneratedOutput,
  State,
  buildMetaEd,
  buildParseTree,
  fileMapForFailure,
  loadFileIndex,
  loadFiles,
  loadPlugins,
  initializeNamespaces,
  newMetaEdConfiguration,
  newState,
  runEnhancers,
  runGenerators,
  validateConfiguration,
  walkBuilders,
} from 'metaed-core';

jest.unmock('final-fs');
jest.setTimeout(40000);

describe('when generating xsd and comparing it to data standard 2.0 authoritative artifacts', (): void => {
  const artifactPath: string = path.resolve(__dirname, './artifact');
  const projectRootPath: string = path.resolve(__dirname, '../../../../');
  const nodeModulesPath = `${projectRootPath}/node_modules`;
  const outputDirectory = `${artifactPath}`;
  const complexTypeNames: string[] = [];
  const simpleTypeNames: string[] = [];
  let coreResult: GeneratedOutput;
  let schemaResult: GeneratedOutput;
  let coreFileBaseName: string;
  let schemaFileBaseName: string;
  let authoritativeCoreXsd: string;
  let authoritativeSchemaXsd: string;
  let generatedCoreXsd: string;
  let generatedSchemaXsd: string;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      defaultPluginTechVersion: '2.0.0',
      projectPaths: ['./node_modules/ed-fi-model-2.0/'],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'EdFi',
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
      manifest => manifest.shortName === 'edfiUnified' || manifest.shortName === 'edfiXsd',
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

    state.metaEd.namespace.forEach(namespace =>
      namespace.data.edfiXsd.xsdSchema.sections.forEach(section => {
        complexTypeNames.push(section.sectionAnnotation.documentation, ...section.complexTypes.map(y => y.name));
        simpleTypeNames.push(section.sectionAnnotation.documentation, ...section.simpleTypes.map(y => y.name));
      }),
    );

    coreResult = R.head(
      R.head(state.generatorResults.filter(x => x.generatorName === 'edfiXsd.XsdGenerator')).generatedOutput,
    );
    coreFileBaseName = path.basename(coreResult.fileName, '.xsd');
    generatedCoreXsd = `${outputDirectory}/${coreFileBaseName}.xsd`;
    authoritativeCoreXsd = `${artifactPath}/${coreFileBaseName}-Authoritative.xsd`;

    await ffs.writeFile(generatedCoreXsd, coreResult.resultString, 'utf-8');

    schemaResult = R.head(
      R.head(state.generatorResults.filter(x => x.generatorName === 'edfiXsd.SchemaAnnotationGenerator')).generatedOutput,
    );
    schemaFileBaseName = path.basename(schemaResult.fileName, '.xsd');
    generatedSchemaXsd = `${outputDirectory}/${schemaFileBaseName}.xsd`;
    authoritativeSchemaXsd = `${artifactPath}/${schemaFileBaseName}-Authoritative.xsd`;

    await ffs.writeFile(generatedSchemaXsd, schemaResult.resultString, 'utf-8');
  });

  it('should have core with no differences', async () => {
    expect(generatedCoreXsd).toBeDefined();
    const gitCommand = `git diff --shortstat --no-index -- ${authoritativeCoreXsd} ${generatedCoreXsd}`;
    // @ts-ignore "error" not used
    const result = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    expect(result).toMatchSnapshot();
  });

  it('should have schema annotation with no differences', async () => {
    const gitCommand = `git diff --shortstat --no-index -- ${authoritativeSchemaXsd} ${generatedSchemaXsd}`;
    expect(generatedCoreXsd).toBeDefined();
    // @ts-ignore "error" not used
    const result = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    expect(result).toMatchSnapshot();
  });

  it('should create diff files', async () => {
    expect(generatedCoreXsd).toBeDefined();
    const cssFile = `${nodeModulesPath}/diff2html/dist/diff2html.min.css`;
    const htmlFile = `${outputDirectory}/${coreFileBaseName}.html`;
    const diffFile = `${outputDirectory}/${coreFileBaseName}.diff`;
    const gitDiffToFile = `git diff --no-index -- ${authoritativeCoreXsd} ${generatedCoreXsd} > ${diffFile}`;

    await new Promise(resolve => exec(gitDiffToFile, () => resolve()))
      .then(() => ffs.readFile(diffFile))
      .then(result => diff2html.Diff2Html.getPrettyHtml(result.toString()))
      .then(result =>
        ffs.readFile(cssFile).then(css => {
          const html = `<html>\n<style>\n${css}\n</style>\n${result}\n</html>`;
          return ffs.writeFile(htmlFile, html, 'utf-8');
        }),
      );
  });

  it('should have complex types in the correct order', (): void => {
    expect(generatedCoreXsd).toBeDefined();
    expect(complexTypeNames).toMatchSnapshot();
  });

  it('should have simple types in the correct order', (): void => {
    expect(generatedCoreXsd).toBeDefined();
    expect(simpleTypeNames).toMatchSnapshot();
  });
});
