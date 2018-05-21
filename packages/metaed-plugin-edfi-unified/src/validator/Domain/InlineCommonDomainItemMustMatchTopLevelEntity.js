// @flow
import type { DomainItem, MetaEdEnvironment, ValidationFailure, Namespace, Common } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

function getFailure(domainItem: DomainItem, name: string, failureMessage: string): ValidationFailure {
  return {
    validatorName: name,
    category: 'error',
    message: failureMessage,
    sourceMap: domainItem.sourceMap.type,
    fileMap: null,
  };
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domain.forEach(domain => {
      domain.domainItems.forEach(domainItem => {
        if (domainItem.referencedType !== 'inlineCommon') return;
        const inlineCommon: ?Common = ((getEntityForNamespaces(
          domainItem.metaEdName,
          [namespace, ...namespace.dependencies],
          'common',
        ): any): ?Common);

        if (inlineCommon == null || !inlineCommon.inlineInOds) {
          failures.push(
            getFailure(
              domainItem,
              'InlineCommonDomainItemMustMatchTopLevelEntity',
              `Inline Common Domain Item property '${domainItem.metaEdName}' does not match any declared Inline Common.`,
            ),
          );
        }
      });
    });
  });

  return failures;
}
