// @flow
import type { ModelType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { excludedModelTypes } from '../ValidatorShared/ExcludedModelTypes';

const validTypes: ModelType[] = [
  'domainEntitySubclass',
  'associationSubclass',
];

const ignoredTypes: ModelType[] = [
  'integerType',
  'stringType',
  'decimalType',
];

const validTypeNames: string = [
  'Domain Entity Subclass',
  'Association Subclass',
].join(' and ');

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  const invalidTypes: ModelType[] = excludedModelTypes(Object.keys(metaEd.entity), [...validTypes, ...ignoredTypes]);
  if (invalidTypes.length === 0) return [];

  invalidTypes.forEach(invalidType => {
    // $FlowIgnore - allowing entityType to specify the entityRepository Map property
    metaEd.entity[invalidType].forEach(entity => {
      if (!entity.identityProperties || entity.identityProperties.length === 0) return;
      entity.identityProperties.forEach(property => {
        if (!property.isIdentityRename) return;
        failures.push({
          validatorName: 'IdentityRenameExistsOnlyIfIdentityRenameIsAllowed',
          category: 'error',
          message: `'renames identity property' is invalid for property ${property.metaEdName} on ${entity.typeHumanizedName} ${entity.metaEdName}. 'renames identity property' is only valid for properties on ${validTypeNames}.`,
          sourceMap: property.sourceMap.isPartOfIdentity,
          fileMap: null,
        });
      });
    });
  });
  return failures;
}
