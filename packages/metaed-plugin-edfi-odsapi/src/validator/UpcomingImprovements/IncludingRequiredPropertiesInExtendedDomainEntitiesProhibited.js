// @flow

// 2.1.X.2 - METAED-701
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntityExtension.forEach(domainEntityExtension => {
    domainEntityExtension.properties.forEach(property => {
      if (property.isRequired) {
        failures.push({
          validatorName: 'IncludingRequiredPropertiesInExtendedDomainEntitiesProhibited',
          category: 'warning',
          message: `${domainEntityExtension.typeHumanizedName} ${domainEntityExtension.metaEdName} is an extension with required property ${property.metaEdName}.  The ODS/API does not currently support this pattern.`,
          sourceMap: property.sourceMap.metaEdName,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
