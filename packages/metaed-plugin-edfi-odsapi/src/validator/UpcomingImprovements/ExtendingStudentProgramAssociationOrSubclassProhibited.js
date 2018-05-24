// @flow

// 2.2.X.1 - METAED-701 - ODS-827
import { versionSatisfies, V2Only, getAllEntitiesOfType } from 'metaed-core';
import type {
  MetaEdEnvironment,
  ValidationFailure,
  TopLevelEntity,
  PluginEnvironment,
  SemVer,
  AssociationExtension,
} from 'metaed-core';

function isStudentProgramAssociationOrSubclass(topLevelEntity: TopLevelEntity): boolean {
  if (topLevelEntity.metaEdName === 'StudentProgramAssociation') return true;
  if (topLevelEntity.type !== 'associationSubclass') return false;
  if (topLevelEntity.baseEntity) return isStudentProgramAssociationOrSubclass(topLevelEntity.baseEntity);
  return false;
}

const validatorName: string = 'ExtendingStudentProgramAssociationOrSubclassProhibited';
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

  ((getAllEntitiesOfType(metaEd, 'associationExtension'): any): Array<AssociationExtension>).forEach(
    (associationExtension: AssociationExtension) => {
      if (!associationExtension.baseEntity) return;
      if (isStudentProgramAssociationOrSubclass(associationExtension.baseEntity)) {
        failures.push({
          validatorName,
          category: 'warning',
          message: `[ODS-827] ${associationExtension.typeHumanizedName} ${
            associationExtension.metaEdName
          } is an extension of StudentProgramAssociation or its subclass.  The ODS/API does not currently support this pattern and will fail to build.`,
          sourceMap: associationExtension.sourceMap.type,
          fileMap: null,
        });
      }
    },
  );

  return failures;
}
