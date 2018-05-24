// @flow
import fs from 'fs-extra';
import touch from 'touch';
import path from 'path';
import winston from 'winston';
import * as Chalk from 'chalk';
import { String as sugar } from 'sugar';
import R from 'ramda';
import { isDataStandard, findDataStandardVersions, versionSatisfies, V2Only, V3OrGreater } from 'metaed-core';
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
  namespaceName: string,
  projectName: string,
  ...$Exact<ArtifactPaths>,
};

type OdsApiPaths = {
  root: string,
  implementation: string,
  application: string,
  standard: string,
  extension: string,
  supportingArtifacts: string,
};

const odsApiPaths: OdsApiPaths = {
  root: 'Ed-Fi-ODS/',
  implementation: 'Ed-Fi-ODS-Implementation/',
  application: 'Application/',
  standard: 'EdFi.Ods.Standard',
  extension: 'EdFi.Ods.Extensions.',
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
const coreTarget = (namespaceName: string): DeployTargets => ({
  namespaceName,
  projectName: namespaceName,
  apiMetadata: path.join(odsApiPaths.root, 'Standard/Metadata/'),
  databaseData: path.join(odsApiPaths.root, 'Database/Data/EdFi/'),
  databaseStructure: path.join(odsApiPaths.root, 'Database/Structure/EdFi/'),
  interchange: path.join(odsApiPaths.root, 'Standard/Schemas/'),
  xsd: path.join(odsApiPaths.root, 'Standard/Schemas/'),
});

const extensionTarget = (namespaceName: string, projectName: string): DeployTargets => ({
  namespaceName,
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
const coreTargetV2 = (namespaceName: string): DeployTargets => ({
  namespaceName,
  projectName: namespaceName,
  apiMetadata: path.join(odsApiPaths.root, 'Standard/Metadata/'),
  databaseData: path.join(odsApiPaths.root, 'Database/Data/EdFi/'),
  databaseStructure: path.join(odsApiPaths.root, 'Database/Structure/EdFi/'),
  interchange: path.join(odsApiPaths.root, 'Standard/Schemas/'),
  xsd: path.join(odsApiPaths.root, 'Standard/Schemas/'),
});

const extensionTargetV2 = (namespaceName: string): DeployTargets => ({
  namespaceName,
  projectName: sugar.capitalize(namespaceName),
  apiMetadata: path.join(odsApiPaths.implementation, 'Extensions/Metadata/'),
  databaseData: path.join(odsApiPaths.implementation, 'Database/Data/EdFi/'),
  databaseStructure: path.join(odsApiPaths.implementation, 'Database/Structure/EdFi/'),
  interchange: path.join(odsApiPaths.implementation, 'Extensions/Schemas/'),
  xsd: path.join(odsApiPaths.implementation, 'Extensions/Schemas/'),
});

export function dataStandardVersionFor(projects: Array<MetaEdProject>): SemVer {
  const dataStandardVersions: Array<SemVer> = findDataStandardVersions(projects);
  const errorMessage: Array<string> = [];

  if (dataStandardVersions.length === 0) {
    errorMessage.push('No data standard project found.  Aborting.');
  } else if (dataStandardVersions.length > 1) {
    errorMessage.push('Multiple data standard projects found.  Aborting.');
  } else {
    return dataStandardVersions[0];
  }
  if (errorMessage.length > 0) {
    errorMessage.forEach(err => winston.error(err));
    process.exit(1);
  }
  return '0.0.0';
}

export function deployTargetsFor(metaEdConfiguration: MetaEdConfiguration, deployCore: boolean): Array<DeployTargets> {
  const projects: Array<MetaEdProject> = metaEdConfiguration.projects;
  const dataStandardVersion: SemVer = dataStandardVersionFor(projects);

  const targets: Array<DeployTargets> = [];

  if (versionSatisfies(dataStandardVersion, V3OrGreater)) {
    projects.forEach((project: MetaEdProject) => {
      if (isDataStandard(project)) {
        if (deployCore) targets.push(coreTarget(project.projectName));
      } else {
        targets.push(extensionTarget(project.namespaceName, project.projectName));
      }
    });
  }

  if (versionSatisfies(dataStandardVersion, V2Only)) {
    projects.forEach((project: MetaEdProject) => {
      if (isDataStandard(project)) {
        if (deployCore) targets.push(coreTargetV2(project.namespaceName));
      } else {
        targets.push(extensionTargetV2(project.namespaceName));
      }
    });
  }

  // core first, then extensions in alphabetical order
  return R.sortWith([R.descend(isDataStandard), R.ascend(R.prop('namespaceName'))])(targets);
}

async function projectExists(metaEdConfiguration: MetaEdConfiguration, target: DeployTargets): Promise<boolean> {
  const projectName: string = target.projectName;
  if (target.namespaceName === 'edfi') return true;
  if (versionSatisfies(dataStandardVersionFor(metaEdConfiguration.projects), V2Only)) return true;

  const targetPath: string = path.resolve(
    metaEdConfiguration.deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
  );
  if (await fs.pathExists(targetPath)) return true;

  winston.error(`deploy: Extension project not found at path: ${chalk.red(targetPath)}`);
  return false;
}

async function removeSupportingArtifacts(metaEdConfiguration: MetaEdConfiguration, target: DeployTargets): Promise<boolean> {
  const projectName: string = target.projectName;
  if (target.namespaceName === 'edfi') return true;

  const targetPath: string = path.resolve(
    metaEdConfiguration.deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.supportingArtifacts,
  );

  try {
    if (!await fs.pathExists(targetPath)) return true;

    await fs.remove(targetPath);
    winston.info(`deploy: ${chalk.gray(`Remove ${projectName} artifacts`)} ${chalk.red('x')} ${targetPath}`);
    return true;
  } catch (err) {
    winston.error(`deploy: Attempted removal of ${chalk.red(targetPath)} failed due to issue: ${err.message}`);
    return false;
  }
}

async function refreshProjectFile(metaEdConfiguration: MetaEdConfiguration, target: DeployTargets): Promise<boolean> {
  const projectName: string = target.projectName;
  if (target.namespaceName === 'edfi') return true;

  const csproj: string = '.csproj';
  const targetPath: string = path.resolve(
    metaEdConfiguration.deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.extension + projectName,
    odsApiPaths.extension + projectName + csproj,
  );

  try {
    if (!await fs.pathExists(targetPath)) return true;

    await touch(targetPath, { nocreate: true });
    winston.info(
      `deploy: ${chalk.gray(`Refresh ${odsApiPaths.extension + projectName + csproj}`)} ${chalk.cyan('*')} ${targetPath}`,
    );
    return true;
  } catch (err) {
    winston.error(`deploy: Attempted modification of ${chalk.red(targetPath)} failed due to issue: ${err.message}`);
    return false;
  }
}

function coreApiModelDeployPathFor(metaEdConfiguration: MetaEdConfiguration): string {
  return path.resolve(
    metaEdConfiguration.deployDirectory,
    odsApiPaths.implementation,
    odsApiPaths.application,
    odsApiPaths.standard,
    odsApiPaths.supportingArtifacts,
    'Metadata',
    'ApiModel.json',
  );
}

async function deployArtifactSources(metaEdConfiguration: MetaEdConfiguration, target: DeployTargets) {
  const source: ArtifactPaths = sources();
  const artifactDirectory: string = metaEdConfiguration.artifactDirectory;
  const deployDirectory: string = metaEdConfiguration.deployDirectory;

  // eslint-disable-next-line no-restricted-syntax
  for (const artifactName of Object.keys(source)) {
    const artifactSource: string = path.resolve(artifactDirectory, target.namespaceName, source[artifactName]);
    const deployTarget: string = path.resolve(deployDirectory, target[artifactName]);

    if (artifactSource !== '' && deployTarget !== '') {
      try {
        if (await fs.pathExists(artifactSource)) {
          // eslint-disable-next-line no-restricted-syntax
          for (const file of await fs.readdir(artifactSource)) {
            const artifactPath = path.resolve(artifactSource, file);
            let deployPath: string = path.resolve(deployTarget, file);

            // FIXME: METAED-821 - Core ApiModel is currently deploying to a different location than the other metadata artifacts
            if (file.toLowerCase() === 'apimodel.json' && target.namespaceName === 'edfi') {
              deployPath = coreApiModelDeployPathFor(metaEdConfiguration);
            }

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

export async function executeDeploy(metaEdConfiguration: MetaEdConfiguration, deployCore: boolean): Promise<boolean> {
  if (metaEdConfiguration.deployDirectory === '') return true;

  const targets: Array<DeployTargets> = deployTargetsFor(metaEdConfiguration, deployCore);
  if (targets.length === 0) return true;

  let result: boolean = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const target of targets) {
    if (!await projectExists(metaEdConfiguration, target)) return false;
    if (!await removeSupportingArtifacts(metaEdConfiguration, target)) return false;
    result = await deployArtifactSources(metaEdConfiguration, target);
    await refreshProjectFile(metaEdConfiguration, target);
  }
  return result;
}
