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
      if (domainItem.referencedType === 'inlineCommon') {
        const inlineCommon = metaEd.entity.common.get(domainItem.metaEdName);
        if (inlineCommon == null || !inlineCommon.inlineInOds) {
          failures.push(getFailure(domainItem, 'CommonDomainItemMustMatchTopLevelEntity',
            `Inline Common Domain Item property '${domainItem.metaEdName}' does not match any declared Inline Common.`));
        }
      }
    });
  });

  return failures;
}
