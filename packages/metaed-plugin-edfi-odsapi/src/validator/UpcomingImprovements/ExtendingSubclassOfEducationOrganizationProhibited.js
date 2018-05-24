// @flow

// 2.1.X.1 - METAED-701 - ODS-827
import { versionSatisfies, V2Only, getAllEntitiesOfType } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure, TopLevelEntity, PluginEnvironment, SemVer, DomainEntityExtension } from 'metaed-core';

function isEducationOrganizationSubclass(topLevelEntity: TopLevelEntity): boolean {
  if (topLevelEntity.type !== 'domainEntitySubclass') return false;
  if (topLevelEntity.baseEntityName === 'EducationOrganization') return true;
  if (topLevelEntity.baseEntity) return isEducationOrganizationSubclass(topLevelEntity.baseEntity);
  return false;
}

const validatorName: string = 'ExtendingSubclassOfEducationOrganizationProhibited';
const targetTechnologyVersion: SemVer = V2Only;

function isTargetTechnologyVersion(metaEd: MetaEdEnvironment): boolean {
  return versionSatisfies(
    ((metaEd.plugin.get('edfiOdsApi'): any): PluginEnvironment).targetTechnologyVersion,
    targetTechnologyVersion,
  );
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  if (!isTargetTechnologyVersion(metaEd)) return failures;

  ((getAllEntitiesOfType(metaEd, 'domainEntityExtension'): any): Array<DomainEntityExtension>).forEach(
    (domainEntityExtension: DomainEntityExtension) => {
      if (!domainEntityExtension.baseEntity) return;
      if (isEducationOrganizationSubclass(domainEntityExtension.baseEntity)) {
        failures.push({
        validatorName,
          category: 'warning',
          message: `[ODS-827] ${domainEntityExtension.typeHumanizedName} ${
            domainEntityExtension.metaEdName
          } is an extension of an EducationOrganization subclass.  The ODS/API does not currently support this pattern and will fail to build.`,
          sourceMap: domainEntityExtension.sourceMap.type,
          fileMap: null,
        });
      }
    },
  );

  return failures;
}
