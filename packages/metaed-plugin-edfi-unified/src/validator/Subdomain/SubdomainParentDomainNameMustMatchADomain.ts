import { Subdomain, SubdomainSourceMap, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.subdomain.forEach((subdomain: Subdomain) => {
      if (getEntityForNamespaces(subdomain.parentMetaEdName, [namespace, ...namespace.dependencies], 'domain') == null) {
        failures.push({
          validatorName: 'SubdomainParentDomainNameMustMatchADomain',
          category: 'error',
          message: `Subdomain parent domain name '${subdomain.parentMetaEdName}' does not match any declared Domain.`,
          sourceMap: (subdomain.sourceMap as SubdomainSourceMap).parentMetaEdName,
          fileMap: null,
        });
      }
    });
  });
  return failures;
}
