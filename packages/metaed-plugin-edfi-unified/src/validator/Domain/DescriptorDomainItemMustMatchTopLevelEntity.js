// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { DomainItem } from '../../../../../packages/metaed-core/src/model/DomainItem';

function getFailure(domainItem: DomainItem, name: string, failureMessage: string): ValidationFailure {
  return {
    validatorName: name,
    category: 'error',
    message: failureMessage,
    sourceMap: domainItem.sourceMap.type,
    fileMap: null,
  };
}

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domain.forEach(domain => {
    domain.domainItems.forEach(domainItem => {
      if (domainItem.referencedType === 'descriptor') {
        if (!metaEd.entity.descriptor.has(domainItem.metaEdName)) {
          failures.push(getFailure(domainItem, 'DescriptorDomainItemMustMatchTopLevelEntity',
            `Descriptor Domain Item property '${domainItem.metaEdName}' does not match any declared Descriptor.`));
        }
      }
    });
  });

  return failures;
}
