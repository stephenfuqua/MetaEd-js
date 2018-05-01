// @flow
import R from 'ramda';
import fs from 'fs-extra';
import path from 'path';
import winston from 'winston';
import * as Chalk from 'chalk';
import klawSync from 'klaw-sync';
import type { MetaEdProjectPathPairs } from './ProjectTypes';

winston.cli();
const chalk = new Chalk.constructor({ level: 3 });

function findDirectories(directory: string): Array<string> {
  try {
    return klawSync(directory, { nofile: true }).map(x => x.path);
  } catch (err) {
    winston.error(`ProjectLoader: Attempted to find directories in ${directory} failed due to issue: ${err.message}`);
  }
  return [];
}

async function findProjects(directories: string | Array<string>): Promise<Array<MetaEdProjectPathPairs>> {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(directories)) directories = [directories];

  const projects: Array<MetaEdProjectPathPairs> = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const directory of directories) {
    const packageToTry: string = path.join(directory, 'package.json');

    try {
      if (await fs.pathExists(packageToTry)) {
        const json = await fs.readJson(packageToTry);

        if (json != null && json.metaEdProject != null) {
          projects.push({ path: directory, project: json.metaEdProject });
        }
      }
    } catch (err) {
      winston.error(`ProjectLoader: Attempted load of ${packageToTry} failed due to issue: ${err.message}`);
    }
  }

  return projects;
}

export function overrideNamespace(projects: Array<MetaEdProjectPathPairs>, namespaceOverrides: Array<string>) {
  if (namespaceOverrides == null) return projects;
  if (namespaceOverrides.length > projects.length) return projects;

  namespaceOverrides.forEach((namespace: string, index: number) => {
    if (projects[index].project.namespaceName === namespace) return;

    winston.info(`Overriding namespace: ${projects[index].project.namespaceName} ${chalk.red('->')} ${namespace}`);
    projects[index].project.namespaceName = namespace;
  });
  return projects;
}

// Scans the immediate directory then subdirectories for package.json with metaEdProject property
export async function scanForProjects(
  directories: string | Array<string>,
  namespaceOverrides: Array<string>,
): Promise<Array<MetaEdProjectPathPairs>> {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(directories)) directories = [directories];

  const projects: Array<MetaEdProjectPathPairs> = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const directory of directories) {
    projects.push(...(await findProjects(directory)));

    if (projects.length === 0) {
      const subdirectories: Array<string> = findDirectories(directory);

      if (subdirectories) projects.push(...(await findProjects(subdirectories)));
    }
  }

  const namespaceOverrideProjects: Array<MetaEdProjectPathPairs> = overrideNamespace(projects, namespaceOverrides);

  // core first, then extensions in alphabetical order
  const sortedProjects = R.sortWith([
    R.descend(R.pathEq(['project', 'namespace'], 'edfi')),
    R.ascend(R.path(['project', 'namespace'])),
  ])(namespaceOverrideProjects);

  // only projects with unique namespace values
  return R.uniqBy(R.path(['project', 'namespace']))(sortedProjects);
}
