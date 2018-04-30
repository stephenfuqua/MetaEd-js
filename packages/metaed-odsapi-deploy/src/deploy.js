// @flow
import fs from 'fs-extra';
import touch from 'touch';
import path from 'path';
import winston from 'winston';
import * as Chalk from 'chalk';
import { String as sugar } from 'sugar';
import R from 'ramda';
import { isDataStandard, versionSatisfies, V2Only, V3OrGreater } from 'metaed-core';
import type { MetaEdProject, SemVer, MetaEdConfiguration } from 'metaed-core';

winston.cli();
const chalk = new Chalk.constructor({ level: 3 });

type ArtifactPaths = {
  apiMetadata: string,
  databaseData: string,
  databaseStructure: string,
  interchange: string,
  xsd: string,
};

export type DeployTargets = {
  namespace: string,
  projectName: string,
  ...$Exact<ArtifactPaths>,
};

type OdsApiPaths = {
  root: string,
  implementation: string,
  application: string,
  extension: string,
  supportingArtifacts: string,
};

const odsApiPaths: OdsApiPaths = {
  root: 'Ed-Fi-ODS/',
  implementation: 'Ed-Fi-ODS-Implementation/',
  application: 'Application/',
  extension: 'EdFi.Ods.Standard.Extensions.',
  supportingArtifacts: 'SupportingArtifacts/',
};

// Artifact source directories
const sources = (): ArtifactPaths => ({
  apiMetadata: 'ApiMetadata/',
  databaseData: 'Database/SQLServer/ODS/Data/',
  databaseStructure: 'Database/SQLServer/ODS/Structure/',
  interchange: 'Interchange/',
  xsd: 'XSD/',
});

// >=3.0 target directories
const coreTarget = (namespace: string): DeployTargets => ({
  namespace,
  projectName: namespace,
  apiMetadata: path.join(odsApiPaths.root, 'Standard/Metadata/'),
  databaseData: path.join(odsApiPaths.root, 'Database/Data/EdFi/'),
  databaseStructure: path.join(odsApiPaths.root, 'Database/Structure/EdFi/'),
  interchange: path.join(odsApiPaths.root, 'Standard/Schemas/'),
  xsd: path.join(odsApiPaths.root, 'Standard/Schemas/'),
});

const extensionTarget = (namespace: string, projectName: string): DeployTargets => ({
  namespace,
  projectName,
  apiMetadata: path.join(
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
    'Metadata/',
  ),
  databaseData: path.join(
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
    'Database/Data/EdFi/',
  ),
  databaseStructure: path.join(
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
    'Database/Structure/EdFi/',
  ),
  interchange: path.join(
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
    'Schemas/',
  ),
  xsd: path.join(
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
    'Schemas/',
  ),
});

// 2.x target directories
const coreTargetV2 = (namespace: string): DeployTargets => ({
  namespace,
  projectName: namespace,
  apiMetadata: path.join(odsApiPaths.root, 'Standard/Metadata/'),
  databaseData: path.join(odsApiPaths.root, 'Database/Data/EdFi/'),
  databaseStructure: path.join(odsApiPaths.root, 'Database/Structure/EdFi/'),
  interchange: path.join(odsApiPaths.root, 'Standard/Schemas/'),
  xsd: path.join(odsApiPaths.root, 'Standard/Schemas/'),
});

const extensionTargetV2 = (namespace: string): DeployTargets => ({
  namespace,
  projectName: sugar.capitalize(namespace),
  apiMetadata: path.join(odsApiPaths.implementation, 'Extensions/Metadata/'),
  databaseData: path.join(odsApiPaths.implementation, 'Database/Data/EdFi/'),
  databaseStructure: path.join(odsApiPaths.implementation, 'Database/Structure/EdFi/'),
  interchange: path.join(odsApiPaths.implementation, 'Extensions/Schemas/'),
  xsd: path.join(odsApiPaths.implementation, 'Extensions/Schemas/'),
});

export function getDeployTargetsFor(dataStandardVersion: SemVer, projects: Array<MetaEdProject>): Array<DeployTargets> {
  const targets: Array<DeployTargets> = [];

  if (versionSatisfies(dataStandardVersion, V3OrGreater)) {
    projects.forEach((project: MetaEdProject) => {
      if (isDataStandard(project)) {
        targets.push(coreTarget(project.namespace));
        // FIXME: MetaEdProject.projectName is not currently being read from package.json
      } else if (project.namespace === 'gb') {
        targets.push(extensionTarget(project.namespace, 'GrandBend'));
      } else {
        targets.push(extensionTarget(project.namespace, sugar.capitalize(project.namespace)));
      }
    });
  }

  if (versionSatisfies(dataStandardVersion, V2Only)) {
    projects.forEach((project: MetaEdProject) => {
      if (isDataStandard(project)) {
        targets.push(coreTargetV2(project.namespace));
      } else {
        targets.push(extensionTargetV2(project.namespace));
      }
    });
  }

  // core first, then extensions in alphabetical order
  return R.sortWith([R.descend(isDataStandard), R.ascend(R.prop('namespace'))])(targets);
}

async function projectExists(deployDirectory: string, projectName: string, dataStandardVersion: SemVer): Promise<boolean> {
  if (deployDirectory === '') return true;
  if (projectName === 'edfi') return true;
  if (versionSatisfies(dataStandardVersion, V2Only)) return true;

  const target: string = path.resolve(
    deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
  );
  if (await fs.pathExists(target)) return true;

  winston.error(`deploy: Extension project not found at path: ${chalk.red(target)}`);
  return false;
}

async function removeSupportingArtifacts(deployDirectory: string, projectName: string): Promise<boolean> {
  if (deployDirectory === '') return true;
  if (projectName === 'edfi') return true;

  const target: string = path.resolve(
    deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
  );

  try {
    if (!await fs.pathExists(target)) return true;

    await fs.remove(target);
    winston.info(`deploy: ${chalk.gray(`Remove ${projectName} artifacts`)} ${chalk.red('x')} ${target}`);
    return true;
  } catch (err) {
    winston.error(`deploy: Attempted removal of ${chalk.red(target)} failed due to issue: ${err.message}`);
    return false;
  }
}

async function refreshProjectFile(deployDirectory: string, projectName: string): Promise<boolean> {
  if (deployDirectory === '') return true;
  if (projectName === 'edfi') return true;

  const csproj: string = '.csproj';
  const target: string = path.resolve(
    deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.extension + projectName + csproj,
  );

  try {
    if (!await fs.pathExists(target)) return true;

    await touch(target, { nocreate: true });
    winston.info(
      `deploy: ${chalk.gray(`Refresh ${odsApiPaths.extension + projectName + csproj}`)} ${chalk.cyan('*')} ${target}`,
    );
    return true;
  } catch (err) {
    winston.error(`deploy: Attempted modification of ${chalk.red(target)} failed due to issue: ${err.message}`);
    return false;
  }
}

async function deployArtifactSources(
  artifactDirectory: string,
  deployDirectory: string,
  source: ArtifactPaths,
  target: DeployTargets,
) {
  // eslint-disable-next-line no-restricted-syntax
  for (const artifactName of Object.keys(source)) {
    const artifactSource: string = path.resolve(artifactDirectory, target.namespace, source[artifactName]);
    const deployTarget: string = path.resolve(deployDirectory, target[artifactName]);

    if (artifactSource !== '' && deployTarget !== '') {
      try {
        if (await fs.pathExists(artifactSource)) {
          // eslint-disable-next-line no-restricted-syntax
          for (const file of await fs.readdir(artifactSource)) {
            const artifactPath = path.resolve(artifactSource, file);
            const deployPath = path.resolve(deployTarget, file);
            await fs.copy(artifactPath, deployPath);
            winston.info(
              `deploy: ${chalk.gray(`Copy ${path.relative(artifactDirectory, artifactPath)}`)} ${chalk.green(
                '->',
              )} ${deployPath}`,
            );
          }
        }
      } catch (err) {
        winston.error(`deploy: Attempted deploy of ${artifactSource} failed due to issue: ${err.message}`);
        return false;
      }
    }
  }
  return true;
}

export async function executeDeploy(
  metaEdConfiguration: MetaEdConfiguration,
  dataStandardVersion: SemVer,
  deployCore: boolean,
): Promise<boolean> {
  let projects: Array<MetaEdProject> = metaEdConfiguration.projects;
  if (!deployCore) projects = projects.filter(project => !isDataStandard(project));

  const source: ArtifactPaths = sources();
  const artifactDirectory: string = metaEdConfiguration.artifactDirectory;
  const deployDirectory: string = metaEdConfiguration.deployDirectory;

  const targets: Array<DeployTargets> = getDeployTargetsFor(dataStandardVersion, projects);
  if (targets.length === 0) return true;

  let result: boolean = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const target of targets) {
    if (!await projectExists(deployDirectory, target.projectName, dataStandardVersion)) return false;
    if (!await removeSupportingArtifacts(deployDirectory, target.projectName)) return false;
    result = await deployArtifactSources(artifactDirectory, deployDirectory, source, target);
    await refreshProjectFile(deployDirectory, target.projectName);
  }
  return result;
}
