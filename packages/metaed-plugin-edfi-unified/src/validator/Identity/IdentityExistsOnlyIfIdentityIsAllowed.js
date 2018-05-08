// @flow
import type { ModelType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';

const invalidTypes: Array<ModelType> = [
  'associationExtension',
  'associationSubclass',
  'choice',
  'commonExtension',
  'descriptor',
  'domainEntityExtension',
  'domainEntitySubclass',
];

const validTypeNames: string = ['Abstract Entity', 'Association', 'Common', 'Domain Entity', 'Inline Common'].join(', ');

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    invalidTypes.forEach((invalidType: ModelType) => {
      // $FlowIgnore - allowing entityType to specify the entityRepository Map property
      namespace.entity[invalidType].forEach(entity => {
        if (!entity.identityProperties || entity.identityProperties.length === 0) return;
        entity.identityProperties.forEach(property => {
          if (property.isIdentityRename) return;
          failures.push({
            validatorName: 'IdentityExistsOnlyIfIdentityIsAllowed',
            category: 'error',
            message: `'is part of identity' is invalid for property ${property.metaEdName} on ${entity.typeHumanizedName} ${
              entity.metaEdName
            }. 'is part of identity' is only valid for properties on ${validTypeNames}.`,
            sourceMap: property.sourceMap.isPartOfIdentity,
            fileMap: null,
          });
        });
      });
    });
  });
  return failures;
}
