// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntityExtension.forEach(entity => {
    if (!metaEd.entity.domainEntity.has(entity.metaEdName) && !metaEd.entity.domainEntitySubclass.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'DomainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass',
        category: 'error',
        message: `Domain Entity additions '${entity.metaEdName}' does not match any declared Domain Entity or Domain Entity Subclass.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}

