// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { DomainEntity } from '../../../../../packages/metaed-core/src/model/DomainEntity';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    const baseEntity: DomainEntity | void = metaEd.entity.domainEntity.get(domainEntitySubclass.baseEntityName);
    if (!domainEntitySubclass.identityProperties.some(x => x.isIdentityRename) || (baseEntity && baseEntity.identityProperties.length <= 1)) return;
    failures.push({
      validatorName: 'DomainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity',
      category: 'error',
      message: `${domainEntitySubclass.typeHumanizedName} ${domainEntitySubclass.metaEdName} based on ${domainEntitySubclass.baseEntityName} is invalid for identity rename because parent entity ${domainEntitySubclass.baseEntityName} has more than one identity property.`,
      sourceMap: domainEntitySubclass.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
