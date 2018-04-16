// @flow
import R from 'ramda';
import fs from 'fs-extra';
import path from 'path';
import winston from 'winston';
import klawSync from 'klaw-sync';
import type { MetaEdProjectPathPairs } from './ProjectTypes';

function findDirectories(directory: string): Array<string> {
  try {
    return klawSync(directory, { nofile: true }).map(x => x.path);
  } catch (err) {
    winston.error(`ProjectLoader: Attempted to find directories in ${directory} failed due to issue: ${err.message}`);
  }
  return [];
}

function findProjects(directories: string | Array<string>): Array<MetaEdProjectPathPairs> {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(directories)) directories = [directories];

  const projects: Array<MetaEdProjectPathPairs> = [];
  directories.forEach((directory: string) => {
    const packageToTry: string = path.join(directory, 'package.json');

    try {
      if (!fs.pathExistsSync(packageToTry)) return;

      const json = fs.readJsonSync(packageToTry);
      if (json == null || json.metaEdProject == null) return;

      projects.push({ path: directory, project: json.metaEdProject });
    } catch (err) {
      winston.error(`ProjectLoader: Attempted load of ${packageToTry} failed due to issue: ${err.message}`);
    }
  });

  return projects;
}

// Scans the immediate directory then subdirectories for package.json with metaEdProject property
export function scanForProjects(directories: string | Array<string>): Array<MetaEdProjectPathPairs> {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(directories)) directories = [directories];

  const projects: Array<MetaEdProjectPathPairs> = [];
  directories.forEach((directory: string) => {
    projects.push(...findProjects(directory));

    if (projects.length === 0) {
      const subdirectories: Array<string> = findDirectories(directory);
      if (subdirectories) projects.push(...findProjects(subdirectories));
    }
  });

  // core first, then extensions in alphabetical order
  const sortedProjects = R.sortWith([
    R.descend(R.pathEq(['project', 'namespace'], 'edfi')),
    R.ascend(R.path(['project', 'namespace'])),
  ])(projects);

  // only projects with unique namespace values
  return R.uniqBy(R.path(['project', 'namespace']))(sortedProjects);
}
