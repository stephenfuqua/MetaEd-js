// @flow
import { exec } from 'child_process';
import ffs from 'final-fs';
import {
  buildMetaEd,
  buildParseTree,
  fileMapForFailure,
  initializeNamespaces,
  loadFileIndex,
  loadFiles,
  loadPlugins,
  newMetaEdConfiguration,
  newState,
  runEnhancers,
  runGenerators,
  validateConfiguration,
  walkBuilders,
} from 'metaed-core';
import path from 'path';
import xlsx from 'xlsx';
import type { State, SemVer } from 'metaed-core';

jest.unmock('final-fs');
jest.setTimeout(40000);

describe.each([['2.0.0', 'ed-fi-model-2.0'], ['2.2.0', 'ed-fi-model-2.2'], ['3.0.0', 'ed-fi-model-3.0']])(
  'when generating mapping edu and comparing it to data standard %s authoritative artifacts',
  (dataStandardVersion: SemVer, npmPackageName: string) => {
    const artifactPath: string = path.resolve(__dirname, './artifact');
    const baseName: string = `edfi-data-standard-${dataStandardVersion}`;
    const authoritativeSuffix: string = 'authoritative';
    const generatedSuffix: string = 'generated';
    const xlsxSuffix: string = 'xlsx';
    const csvSuffix: string = 'csv';
    let authoritativeCoreMappingEdu: string;
    let generatedMappingEdu: string;

    beforeAll(async () => {
      const metaEdConfiguration = {
        ...newMetaEdConfiguration(),
        artifactDirectory: './MetaEdOutput/',
        defaultPluginTechVersion: dataStandardVersion,
        projectPaths: [`./node_modules/${npmPackageName}/`],
        projects: [
          {
            projectName: 'Ed-Fi',
            namespaceName: 'edfi',
            projectExtension: '',
            projectVersion: dataStandardVersion,
          },
        ],
      };
      const state: State = {
        ...newState(),
        metaEdConfiguration,
      };
      state.metaEd.dataStandardVersion = dataStandardVersion;
      validateConfiguration(state);
      loadPlugins(state);
      state.pluginManifest = state.pluginManifest.filter(
        manifest => ['edfiUnified', 'edfiXsd', 'edfiMappingedu'].includes(manifest.shortName),
        7,
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

      const coreResult = state.generatorResults.filter(x => x.generatorName === 'edfiMappingedu.MappingEduGenerator')[0]
        .generatedOutput[0];

      authoritativeCoreMappingEdu = `${artifactPath}/${baseName}-${authoritativeSuffix}.${xlsxSuffix}`;
      generatedMappingEdu = `${artifactPath}/${baseName}-${generatedSuffix}.${xlsxSuffix}`;

      ffs.writeFileSync(generatedMappingEdu, coreResult.resultStream, 'utf-8');
    });

    it('should have authoritative spreadsheet', () => {
      expect(ffs.existsSync(authoritativeCoreMappingEdu)).toBe(true);
    });

    it('should have generated spreadsheet', () => {
      expect(ffs.existsSync(generatedMappingEdu)).toBe(true);
    });

    it('should have authoritative csv', () => {
      const authoritativeWorkbook = xlsx.readFile(authoritativeCoreMappingEdu);
      Object.values(authoritativeWorkbook.Sheets).forEach((sheet, i) => {
        const fileName: string = `${artifactPath}/${baseName}-${
          authoritativeWorkbook.SheetNames[i]
        }-${authoritativeSuffix}.${csvSuffix}`;

        ffs.writeFileSync(fileName, xlsx.utils.sheet_to_csv(sheet), 'utf-8');
        expect(ffs.existsSync(fileName)).toBe(true);
      });
    });

    it('should have generated csv', () => {
      const generatedWorkbook = xlsx.readFile(generatedMappingEdu);
      Object.values(generatedWorkbook.Sheets).forEach((sheet, i) => {
        const fileName: string = `${artifactPath}/${baseName}-${
          generatedWorkbook.SheetNames[i]
        }-${generatedSuffix}.${csvSuffix}`;

        ffs.writeFileSync(fileName, xlsx.utils.sheet_to_csv(sheet), 'utf-8');
        expect(ffs.existsSync(fileName)).toBe(true);
      });
    });

    // NOTE: Can't dynamically populate table argument with sheet names from workbook 😥
    it.each([
      'ElementGroupDefinitions',
      'EntityDefinitions',
      'ElementDefinitions',
      'EnumerationDefinitions',
      'EnumerationItems',
    ])(`generated %s should have no differences with authoritative`, async (sheetName: string) => {
      const authoritativeCSV: string = `${artifactPath}/${baseName}-${sheetName}-${authoritativeSuffix}.${csvSuffix}`;
      const generatedCSV: string = `${artifactPath}/${baseName}-${sheetName}-${generatedSuffix}.${csvSuffix}`;
      expect(ffs.existsSync(authoritativeCSV)).toBe(true);
      expect(ffs.existsSync(generatedCSV)).toBe(true);

      const gitCommand: string = `git diff --shortstat --no-index -- ${authoritativeCSV} ${generatedCSV}`;
      const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
      expect(result).toMatchSnapshot();
    });
  },
);
