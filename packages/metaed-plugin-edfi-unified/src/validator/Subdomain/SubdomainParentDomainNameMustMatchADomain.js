// @flow
import type { Subdomain, SubdomainSourceMap, MetaEdEnvironment, ValidationFailure } from 'metaed-core';

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
