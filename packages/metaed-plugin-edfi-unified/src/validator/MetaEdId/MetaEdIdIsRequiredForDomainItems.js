// @flow
import type { Domain, Subdomain, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { getEntitiesOfType } from '../../../../../packages/metaed-core/index';
import { asDomainBase } from '../../../../metaed-core/src/model/Domain';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getEntitiesOfType(metaEd.entity, 'domain', 'subdomain').forEach(entity => {
    const domain: Domain | Subdomain = asDomainBase(entity);
    if (domain.domainItems.length === 0) return;
    domain.domainItems.forEach(domainItem => {
      if (domainItem.metaEdId) return;
      failures.push({
        validatorName: 'MetaEdIdIsRequiredForDomainItems',
        category: 'warning',
        message: `${domainItem.typeHumanizedName} ${domainItem.metaEdName} is missing a MetaEdId value.`,
        sourceMap: domainItem.sourceMap.referencedType,
        fileMap: null,
      });
    });
  });
  return failures;
}
