import {
  MetaEdEnvironment,
  Namespace,
  ValidationFailure,
  PluginEnvironment,
  TopLevelEntity,
  SemVer,
  versionSatisfies,
} from 'metaed-core';
import { duplicateNameFinder } from './DuplicateNameFinder';

const targetTechnologyVersion: SemVer = '3.x';

function isTargetTechnologyVersion(metaEd: MetaEdEnvironment): boolean {
  return versionSatisfies(
    (metaEd.plugin.get('edfiOdsApi') as PluginEnvironment).targetTechnologyVersion,
    targetTechnologyVersion,
  );
}

function failureCollector(
  failures: ValidationFailure[],
  entityWithDuplicateName: TopLevelEntity,
  dependencyNamespace: Namespace,
) {
  failures.push({
    validatorName: 'V3LimitedDuplicateNamesInDependencyNamespaces',
    category: 'warning',
    message: `${entityWithDuplicateName.typeHumanizedName} named ${
      entityWithDuplicateName.metaEdName
    } already exists in project ${
      dependencyNamespace.projectName
    }. The XSD specification for this is currently undefined. MetaEd XSD generation and ODS/API bulk data loading will be disabled.`,
    sourceMap: entityWithDuplicateName.sourceMap.metaEdName,
    fileMap: null,
  });
}

export function validate(metaEd: MetaEdEnvironment): ValidationFailure[] {
  const failures: ValidationFailure[] = [];
  if (!isTargetTechnologyVersion(metaEd)) return failures;
  duplicateNameFinder(metaEd, failures, failureCollector);
  return failures;
}
