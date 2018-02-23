// @flow
import chalk from 'chalk';
import ffs from 'final-fs';
import path from 'path';
import winston from 'winston';
import type { State } from '../State';
import type { GeneratorResult } from '../generator/GeneratorResult';

winston.cli();

function writeOutputFiles(result: GeneratorResult, outputDirectory: string) {
  result.generatedOutput.forEach(output => {
    if (!ffs.existsSync(`${outputDirectory}/${output.folderName}`))
      ffs.mkdirRecursiveSync(`${outputDirectory}/${output.folderName}`);
    if (output.resultString)
      ffs.writeFileSync(`${outputDirectory}/${output.folderName}/${output.fileName}`, output.resultString, 'utf-8');
    else if (output.resultStream)
      ffs.writeFileSync(`${outputDirectory}/${output.folderName}/${output.fileName}`, output.resultStream);
    else winston.info(`No output stream or string for ${result.generatorName}`);
  });
}

export function execute(state: State): void {
  let outputDirectory: string = '';
  const [defaultRootDirectory] = state.inputDirectories.slice(-1);
  if (state.outputDirectory) {
    outputDirectory = state.outputDirectory;
  } else if (state.metaEdConfiguration.artifactDirectory) {
    outputDirectory = path.resolve(defaultRootDirectory.path, state.metaEdConfiguration.artifactDirectory);
  } else if (state.inputDirectories && state.inputDirectories.length > 0) {
    outputDirectory = path.resolve(defaultRootDirectory.path, './MetaEdOutput');
  }

  if (!ffs.exists(outputDirectory)) {
    winston.error(`WriteOutput: Artifact Directory '${outputDirectory}' does not exist. Not writing files.`);
    return;
  }
  winston.info(chalk.green('  Artifact Directory: ') + outputDirectory);
  ffs.rmdirRecursiveSync(outputDirectory);
  ffs.mkdirRecursiveSync(outputDirectory);
  if (ffs.existsSync(outputDirectory)) {
    state.generatorResults.forEach(result => {
      // if (result is a Promise)
      if (result.then) {
        winston.info('Resolving Promise:');
        // $FlowIgnore - flow was expecting a GeneratorResults not a promise
        result.then(resolvedResult => {
          writeOutputFiles(resolvedResult, outputDirectory);
        });
      } else writeOutputFiles(result, outputDirectory);
    });
  }
}
