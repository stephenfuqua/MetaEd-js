// @flow
import type { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domainEntitySubclass.forEach(entity => {
      if (getEntityForNamespaces(entity.baseEntityName, [namespace, ...namespace.dependencies], 'domainEntity') == null) {
        failures.push({
          validatorName: 'DomainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity',
          category: 'error',
          message: `${entity.typeHumanizedName} ${entity.metaEdName} based on ${
            entity.baseEntityName
          } does not match any declared Domain or Abstract Entity.`,
          sourceMap: entity.sourceMap.baseEntityName,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
