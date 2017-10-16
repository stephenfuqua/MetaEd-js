// @flow
import { exec } from 'child_process';
import diff2html from 'diff2html';
import ffs from 'final-fs';
import path from 'path';
import R from 'ramda';
import { newState } from '../../../metaed-core/src/State';
import { loadFiles } from '../../../metaed-core/src/task/FileSystemFilenameLoader';
import loadFileIndex from '../../../metaed-core/src/task/LoadFileIndex';
import { buildParseTree } from '../../../metaed-core/src/task/BuildParseTree';
import { buildMetaEd } from '../../../metaed-core/src/grammar/ParseTreeBuilder';
import { execute as walkBuilders } from '../../../metaed-core/src/task/WalkBuilders';
// This is a cheat until we determine how to access plugin dependencies for testing
import initializeUnifiedPlugin from '../../../metaed-plugin-edfi-unified/src/unified';
import initializeXsdPlugin from '../../src/edfiXsd';
import type { GeneratedOutput } from '../../../metaed-core/src/generator/GeneratedOutput';
import type { GeneratorResult } from '../../../metaed-core/src/generator/GeneratorResult';
import type { State } from '../../../metaed-core/src/State';

jest.unmock('final-fs');

describe('when generating xsd and comparing it to data standard 2.0 authoritative artifacts', () => {
  const artifactPath: string = path.resolve(__dirname, './artifact');
  const projectRootPath: string = path.resolve(__dirname, '../../../../');
  const nodeModulesPath: string = `${projectRootPath}/node_modules`;
  const complexTypeNames: Array<string> = [];
  const simpleTypeNames: Array<string> = [];
  let coreResult: GeneratedOutput;
  let fileNameBase: string;
  let authoritativeXsd: string;
  let generatedXsd: string;

  beforeAll(async () => {
    const state: State = Object.assign(newState(), {
      pluginScanDirectory: `${projectRootPath}/packages`,
      inputDirectories: [
        {
          path: `${nodeModulesPath}/ed-fi-model-2.0`,
          namespace: 'edfi',
          projectExtension: '',
          isExtension: false,
        },
      ],
    });

    const endState = R.pipe(
      loadFiles,
      loadFileIndex,
      buildParseTree(buildMetaEd),
      walkBuilders,
    )(state);

    endState.metaEd.dataStandardVersion = '2.0.0';
    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(endState.metaEd));
    initializeXsdPlugin().enhancer.forEach(enhance => enhance(endState.metaEd));

    endState.metaEd.entity.namespaceInfo.forEach(namespace =>
      namespace.data.edfiXsd.xsd_Schema.sections.forEach(section => {
        complexTypeNames.push(section.sectionAnnotation.documentation, ...section.complexTypes.map(y => y.name));
        simpleTypeNames.push(section.sectionAnnotation.documentation, ...section.simpleTypes.map(y => y.name));
      }));

    const generatorResult: Array<GeneratorResult> = initializeXsdPlugin().generator.map(generate => generate(endState.metaEd));
    coreResult = R.head(R.head(generatorResult).generatedOutput);
    fileNameBase = `${artifactPath}/${coreResult.fileName.replace('.xsd', '')}`;
    generatedXsd = `${fileNameBase}-Generated.xsd`;
    authoritativeXsd = `${fileNameBase}-Authoritative.xsd`;

    await ffs.writeFile(generatedXsd, coreResult.resultString, 'utf-8');
  });

  it('should have no differences', async () => {
    const gitCommand: string = `git diff --shortstat --no-index -- ${authoritativeXsd} ${generatedXsd}`;
    const result: string = await new Promise(resolve => exec(gitCommand, (error, stdout) => resolve(stdout)));
    expect(result).toMatchSnapshot();
  });

  it('should create diff files', async () => {
    const cssFile: string = `${nodeModulesPath}/diff2html/dist/diff2html.min.css`;
    const htmlFile: string = `${fileNameBase}.html`;
    const diffFile: string = `${fileNameBase}.diff`;
    const gitDiffToFile: string = `git diff --no-index -- ${authoritativeXsd} ${generatedXsd} > ${diffFile}`;

    return new Promise(resolve => exec(gitDiffToFile, () => resolve()))
      .then(() => ffs.readFile(diffFile))
      .then(result => diff2html.Diff2Html.getPrettyHtml(result.toString()))
      .then(result => ffs.readFile(cssFile).then(css => {
        const html: string = `<html>\n<style>\n${css}\n</style>\n${result}\n</html>`;
        return ffs.writeFile(htmlFile, html, 'utf-8');
      }));
  });

  it('should have complex types in the correct order', () => {
    expect(complexTypeNames).toMatchSnapshot();
  });

  it('should have simple types in the correct order', () => {
    expect(simpleTypeNames).toMatchSnapshot();
  });
});

jest.resetModules();
