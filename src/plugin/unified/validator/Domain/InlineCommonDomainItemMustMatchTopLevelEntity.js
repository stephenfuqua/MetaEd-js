// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import type { DomainItem } from '../../../../core/model/DomainItem';

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
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domain.forEach(domain => {
    domain.domainItems.forEach(domainItem => {
      if (domainItem.referencedType === 'inlineCommon') {
        const inlineCommon = repository.entity.common.get(domainItem.metaEdName);
        if (inlineCommon == null || !inlineCommon.inlineInOds) {
          failures.push(getFailure(domainItem, 'CommonDomainItemMustMatchTopLevelEntity',
            `Inline Common Domain Item property '${domainItem.metaEdName}' does not match any declared Inline Common.`));
        }
      }
    });
  });

  return failures;
}
