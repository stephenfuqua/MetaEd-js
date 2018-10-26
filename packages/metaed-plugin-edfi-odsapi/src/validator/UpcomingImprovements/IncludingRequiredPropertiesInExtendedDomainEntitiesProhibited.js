// @flow

// 2.1.X.2 - METAED-701
import type { MetaEdEnvironment, ValidationFailure, DomainEntityExtension, SemVer, PluginEnvironment } from 'metaed-core';
import { getAllEntitiesOfType, versionSatisfies } from 'metaed-core';

const targetTechnologyVersion: SemVer = '<3.1';

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
      domainEntityExtension.properties.forEach(property => {
        if (property.isRequired) {
          failures.push({
            validatorName: 'IncludingRequiredPropertiesInExtendedDomainEntitiesProhibited',
            category: 'warning',
            message: `${domainEntityExtension.typeHumanizedName} ${
              domainEntityExtension.metaEdName
            } is an extension with required property ${
              property.metaEdName
            }.  The ODS/API does not currently support this pattern.`,
            sourceMap: property.sourceMap.metaEdName,
            fileMap: null,
          });
        }
      });
    },
  );

  return failures;
}
