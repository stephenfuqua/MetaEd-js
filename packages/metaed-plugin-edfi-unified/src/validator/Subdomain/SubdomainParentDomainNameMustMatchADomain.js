// @flow
import type { Subdomain, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import type { SubdomainSourceMap } from '../../../../../packages/metaed-core/src/model/Subdomain';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.subdomain.forEach((subdomain: Subdomain) => {
    if (!metaEd.entity.domain.has(subdomain.parentMetaEdName)) {
      failures.push({
        validatorName: 'SubdomainParentDomainNameMustMatchADomain',
        category: 'error',
        message: `Subdomain parent domain name '${subdomain.parentMetaEdName}' does not match any declared Domain.`,
        sourceMap: ((subdomain.sourceMap: any): SubdomainSourceMap).parentMetaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
