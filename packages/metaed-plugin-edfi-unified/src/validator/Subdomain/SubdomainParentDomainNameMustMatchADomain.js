// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { Subdomain, SubdomainSourceMap } from '../../../../../packages/metaed-core/src/model/Subdomain';

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
