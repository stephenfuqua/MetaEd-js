// @flow
import R from 'ramda';
import path from 'path';
import ffs from 'final-fs';
import { exec } from 'child_process';
import type { GeneratedOutput, State, GeneratorResult } from 'metaed-core';
import {
  buildMetaEd,
  buildParseTree,
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

describe('when generating change event scripts and comparing to ODS/API 3.1 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact/enable-tracking');
  const authoritativeFilename: string = 'EnableChangeTracking-v3.1-Authoritative.sql';
  const generatedFilename: string = 'EnableChangeTracking-v3.1.sql';

  let generatedOutput: GeneratedOutput;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      pluginConfig: {
        edfiUnified: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiOds: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiOdsApi: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiOdsChangeEvent: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiXsd: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiHandbook: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiInterchangeBrief: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiXmlDictionary: {
          targetTechnologyVersion: '3.1.0',
        },
      },
      projectPaths: ['./node_modules/ed-fi-model-3.0/'],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'edfi',
          projectExtension: '',
          projectVersion: '3.0.0',
        },
      ],
    };

    const state: State = {
      ...newState(),
      metaEdConfiguration,
    };
    state.metaEd.dataStandardVersion = '3.0.0';

    validateConfiguration(state);
    loadPlugins(state);
    state.pluginManifest = state.pluginManifest.filter(
      manifest =>
        manifest.shortName === 'edfiUnified' ||
        manifest.shortName === 'edfiOds' ||
        manifest.shortName === 'edfiOdsChangeEvent',
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

    generatedOutput = R.head(
      R.head(state.generatorResults.filter(x => x.generatorName === 'edfiOdsChangeEvent.EnableChangeTrackingGenerator'))
        .generatedOutput,
    );

    await ffs.writeFile(path.resolve(artifactPath, generatedFilename), generatedOutput.resultString, 'utf-8');
  });

  it('should have no differences', async () => {
    const authoritative: string = path.resolve(artifactPath, authoritativeFilename);
    const generated: string = path.resolve(artifactPath, generatedFilename);
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritative} ${generated}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });
});

describe('when generating change event scripts with simple extensions and comparing to ODS/API 3.1 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact/enable-tracking');
  const sampleExtensionPath: string = path.resolve(__dirname, './student-transcript-extension-project');
  const authoritativeCoreFilename: string = 'EnableChangeTracking-v3.1-Authoritative.sql';
  const authoritativeExtensionFilename: string = 'sample-EnableChangeTracking-v3.1-Authoritative.sql';
  const generatedCoreFilename: string = 'EnableChangeTracking-v3.1.sql';
  const generatedExtensionFilename: string = 'sample-EnableChangeTracking-v3.1.sql';

  let generatedCoreOutput: GeneratedOutput;
  let generatedExtensionOutput: GeneratedOutput;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      pluginConfig: {
        edfiUnified: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiOds: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiOdsApi: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiOdsChangeEvent: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiXsd: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiHandbook: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiInterchangeBrief: {
          targetTechnologyVersion: '3.1.0',
        },
        edfiXmlDictionary: {
          targetTechnologyVersion: '3.1.0',
        },
      },
      projectPaths: ['./node_modules/ed-fi-model-3.0/', sampleExtensionPath],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'edfi',
          projectExtension: '',
          projectVersion: '3.0.0',
        },
        {
          projectName: 'Sample',
          namespaceName: 'sample',
          projectExtension: 'Sample',
          projectVersion: '3.0.0',
        },
      ],
    };

    const state: State = {
      ...newState(),
      metaEdConfiguration,
    };
    state.metaEd.dataStandardVersion = '3.0.0';

    validateConfiguration(state);
    loadPlugins(state);
    state.pluginManifest = state.pluginManifest.filter(
      manifest =>
        manifest.shortName === 'edfiUnified' ||
        manifest.shortName === 'edfiOds' ||
        manifest.shortName === 'edfiOdsChangeEvent',
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
      state.generatorResults.filter(x => x.generatorName === 'edfiOdsChangeEvent.EnableChangeTrackingGenerator'),
    );

    [generatedCoreOutput, generatedExtensionOutput] = generatorResult.generatedOutput;

    await ffs.writeFile(path.resolve(artifactPath, generatedCoreFilename), generatedCoreOutput.resultString, 'utf-8');
    await ffs.writeFile(
      path.resolve(artifactPath, generatedExtensionFilename),
      generatedExtensionOutput.resultString,
      'utf-8',
    );
  });

  it('should have no core file differences', async () => {
    const authoritativeCore: string = path.resolve(artifactPath, authoritativeCoreFilename);
    const generatedCore: string = path.resolve(artifactPath, generatedCoreFilename);
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeCore} ${generatedCore}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });

  it('should have no extension file differences', async () => {
    const authoritativeExtension: string = path.resolve(artifactPath, authoritativeExtensionFilename);
    const generatedExtension: string = path.resolve(artifactPath, generatedExtensionFilename);
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritativeExtension} ${generatedExtension}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });
});

describe('when generating change event scripts and comparing to ODS/API 2.4 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact/enable-tracking');
  const authoritativeFilename: string = 'EnableChangeTracking-v2.4-Authoritative.sql';
  const generatedFilename: string = 'EnableChangeTracking-v2.4.sql';

  let generatedOutput: GeneratedOutput;

  beforeAll(async () => {
    const metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: './MetaEdOutput/',
      pluginConfig: {
        edfiUnified: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiOds: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiOdsApi: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiOdsChangeEvent: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiXsd: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiHandbook: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiInterchangeBrief: {
          targetTechnologyVersion: '2.4.0',
        },
        edfiXmlDictionary: {
          targetTechnologyVersion: '2.4.0',
        },
      },
      projectPaths: ['./node_modules/ed-fi-model-2.0/'],
      projects: [
        {
          projectName: 'Ed-Fi',
          namespaceName: 'edfi',
          projectExtension: '',
          projectVersion: '2.0.1',
        },
      ],
    };

    const state: State = {
      ...newState(),
      metaEdConfiguration,
    };
    state.metaEd.dataStandardVersion = '2.0.1';

    validateConfiguration(state);
    loadPlugins(state);
    state.pluginManifest = state.pluginManifest.filter(
      manifest =>
        manifest.shortName === 'edfiUnified' ||
        manifest.shortName === 'edfiOds' ||
        manifest.shortName === 'edfiOdsChangeEvent',
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

    generatedOutput = R.head(
      R.head(state.generatorResults.filter(x => x.generatorName === 'edfiOdsChangeEvent.EnableChangeTrackingGenerator'))
        .generatedOutput,
    );

    await ffs.writeFile(path.resolve(artifactPath, generatedFilename), generatedOutput.resultString, 'utf-8');
  });

  it('should have no differences', async () => {
    const authoritative: string = path.resolve(artifactPath, authoritativeFilename);
    const generated: string = path.resolve(artifactPath, generatedFilename);
    const gitCommand: string = `git diff --shortstat --no-index --ignore-space-at-eol -- ${authoritative} ${generated}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    // two different ways to show no difference, depending on platform line endings
    const expectOneOf: Array<string> = ['', ' 1 file changed, 0 insertions(+), 0 deletions(-)\n'];
    expect(expectOneOf).toContain(result);
  });
});
