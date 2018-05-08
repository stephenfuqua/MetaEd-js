// @flow
import type { ModelType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';

const invalidTypes: Array<ModelType> = [
  'association',
  'associationExtension',
  'choice',
  'common',
  'commonExtension',
  'descriptor',
  'domainEntity',
  'domainEntityExtension',
];

const validTypeNames: string = ['Domain Entity Subclass', 'Association Subclass'].join(' and ');

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    invalidTypes.forEach((invalidType: ModelType) => {
      // $FlowIgnore - allowing entityType to specify the entityRepository Map property
      namespace.entity[invalidType].forEach(entity => {
        if (!entity.identityProperties || entity.identityProperties.length === 0) return;
        entity.identityProperties.forEach(property => {
          if (!property.isIdentityRename) return;
          failures.push({
            validatorName: 'IdentityRenameExistsOnlyIfIdentityRenameIsAllowed',
            category: 'error',
            message: `'renames identity property' is invalid for property ${property.metaEdName} on ${
              entity.typeHumanizedName
            } ${entity.metaEdName}. 'renames identity property' is only valid for properties on ${validTypeNames}.`,
            sourceMap: property.sourceMap.isPartOfIdentity,
            fileMap: null,
          });
        });
      });
    });
  });
  return failures;
}
