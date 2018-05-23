// @flow

// 2.2.X.2 - METAED-701
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  ((getAllEntitiesOfType(metaEd, 'associationExtension'): any): Array<AssociationExtension>).forEach(
    (associationExtension: AssociationExtension) => {
      associationExtension.properties.forEach(property => {
        if (property.isRequired) {
          failures.push({
            validatorName: 'IncludingRequiredPropertiesInExtendedAssociationsProhibited',
            category: 'warning',
            message: `${associationExtension.typeHumanizedName} ${
              associationExtension.metaEdName
            } is an extension with required property ${
              property.metaEdName
            }.  The ODS/API does not currently support this pattern.`,
            sourceMap: property.sourceMap.type,
            fileMap: null,
          });
        }
      });
    },
  );

  return failures;
}
