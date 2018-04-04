// @flow
import fs from 'fs-extra';
import path from 'path';
import winston from 'winston';
import type { MetaEdProject } from './ProjectTypes';

function findDirectories(directory: string): Array<string> {
  try {
    return fs.readdirSync(directory).reduce((directories, source) => {
      const directoryToTry: string = path.join(directory, source);

      if (fs.lstatSync(directoryToTry).isDirectory()) return directories.concat(directoryToTry);
      return directories;
    }, []);
  } catch (err) {
    winston.error(`ProjectLoader: Attempted to find directories in ${directory} failed due to issue: ${err.message}`);
  }
  return [];
}

function findProjects(directories: string | Array<string>): [Array<string>, Array<MetaEdProject>] {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(directories)) directories = [directories];

  const projects = [[], []];
  directories.forEach(directory => {
    const packageToTry: string = path.join(directory, 'package.json');
    try {
      const directoryExists = fs.pathExistsSync(packageToTry);
      if (!directoryExists) return;

      const json = fs.readJsonSync(packageToTry);
      if (json != null && json.metaEdProject != null) {
        projects[0].push(directory);
        projects[1].push(json.metaEdProject);
      }
    } catch (err) {
      winston.error(`ProjectLoader: Attempted load of ${packageToTry} failed due to issue: ${err.message}`);
    }
  });

  return projects;
}

// Scans the immediate subdirectories for package.json with metaEdProject property
export function scanForProjects(directory: string): [Array<string>, Array<MetaEdProject>] {
  const subdirectories: Array<string> = findDirectories(directory);
  if (!subdirectories) return [[], []];

  const projects: [Array<string>, Array<MetaEdProject>] = findProjects(subdirectories);
  return projects;
}
