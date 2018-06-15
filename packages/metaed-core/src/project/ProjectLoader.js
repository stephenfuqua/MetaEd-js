// @flow
import R from 'ramda';
import fs from 'fs-extra';
import path from 'path';
import winston from 'winston';
import * as Chalk from 'chalk';
import klawSync from 'klaw-sync';
import type { MetaEdProjectPathPairs } from './ProjectTypes';
import { deriveNamespaceFromProjectName } from './ProjectTypes';

winston.configure({ transports: [new winston.transports.Console()], format: winston.format.cli() });
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
  projects.forEach((p: MetaEdProjectPathPairs) => {
    p.project.namespaceName = deriveNamespaceFromProjectName(p.project.projectName) || '';
  });

  return projects;
}

export function overrideProjectNameAndNamespace(
  projects: Array<MetaEdProjectPathPairs>,
  projectNameOverrides: Array<string>,
) {
  if (projectNameOverrides == null) return projects;
  if (projectNameOverrides.length > projects.length) return projects;

  projectNameOverrides.forEach((projectName: string, index: number) => {
    if (projects[index].project.projectName === projectName) return;

    const namespaceName = deriveNamespaceFromProjectName(projectName) || '';
    winston.info(`Overriding projectName: ${projects[index].project.projectName} ${chalk.red('->')} ${projectName}`);
    winston.info(`Overriding namespaceName: ${projects[index].project.namespaceName} ${chalk.red('->')} ${namespaceName}`);

    projects[index].project.projectName = projectName;
    projects[index].project.namespaceName = namespaceName;
  });
  return projects;
}

// Scans the immediate directory then subdirectories for package.json with metaEdProject property
export async function scanForProjects(
  directories: string | Array<string>,
  projectNameOverrides: Array<string>,
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

  const projectNameOverrideProjects: Array<MetaEdProjectPathPairs> = overrideProjectNameAndNamespace(
    projects,
    projectNameOverrides,
  );

  // core first, then extensions in alphabetical order
  const sortedProjects = R.sortWith([
    R.descend(R.pathEq(['project', 'projectName'], 'Ed-Fi')),
    R.ascend(R.path(['project', 'projectName'])),
  ])(projectNameOverrideProjects);

  // only projects with unique namespace values
  return R.uniqBy(R.path(['project', 'projectName']))(sortedProjects);
}
