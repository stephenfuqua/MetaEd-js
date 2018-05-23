// @flow

import { getEntityForNamespaces } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure, DomainEntityExtension, TopLevelEntity } from 'metaed-core';

// METAED-805
const validatorName: string = 'AbstractEntityMustNotBeExtended';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach(namespace => {
    namespace.entity.domainEntityExtension.forEach((extensionEntity: DomainEntityExtension) => {
      const baseEntity: ?TopLevelEntity = ((getEntityForNamespaces(
        extensionEntity.metaEdName,
        [namespace, ...namespace.dependencies],
        'domainEntity',
      ): any): ?TopLevelEntity);

      if (baseEntity == null || !baseEntity.isAbstract) return;

      failures.push({
        validatorName,
        category: 'error',
        message: `${baseEntity.typeHumanizedName} ${
          baseEntity.metaEdName
        } additions is not valid.  Abstract entities cannot be extended.`,
        sourceMap: extensionEntity.sourceMap.type,
        fileMap: null,
      });
    });
  });

  return failures;
}
