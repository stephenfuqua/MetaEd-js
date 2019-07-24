import { MetaEdEnvironment, ValidationFailure, Domain, DomainItem, Subdomain } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): ValidationFailure[] {
  const failures: ValidationFailure[] = [];
  (getAllEntitiesOfType(metaEd, 'domain', 'subdomain') as (Domain | Subdomain)[]).forEach(domain => {
    domain.domainItems.forEach((item: DomainItem) => {
      if (item.referencedEntityDeprecated) {
        failures.push({
          validatorName: 'DeprecatedDomainItemReferenceWarning',
          category: 'warning',
          message: `${domain.typeHumanizedName} ${domain.metaEdName} references deprecated entity ${item.metaEdName}.`,
          sourceMap: item.sourceMap.metaEdName,
          fileMap: null,
        });
      }
    });
  });
  return failures;
}
