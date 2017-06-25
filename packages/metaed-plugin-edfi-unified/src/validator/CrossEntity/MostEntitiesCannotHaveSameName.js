// @flow
import type { Association } from '../../../../../packages/metaed-core/src/model/Association';
import type { AssociationSubclass } from '../../../../../packages/metaed-core/src/model/AssociationSubclass';
import type { Choice } from '../../../../../packages/metaed-core/src/model/Choice';
import type { Common } from '../../../../../packages/metaed-core/src/model/Common';
import type { DecimalType } from '../../../../../packages/metaed-core/src/model/DecimalType';
import type { DomainEntity } from '../../../../../packages/metaed-core/src/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import type { IntegerType } from '../../../../../packages/metaed-core/src/model/IntegerType';
import type { SharedDecimal } from '../../../../../packages/metaed-core/src/model/SharedDecimal';
import type { SharedInteger } from '../../../../../packages/metaed-core/src/model/SharedInteger';
import type { SharedString } from '../../../../../packages/metaed-core/src/model/SharedString';
import type { StringType } from '../../../../../packages/metaed-core/src/model/StringType';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EntityRepository } from '../../../../../packages/metaed-core/src/model/EntityRepository';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { groupByMetaEdName } from '../../shared/GroupByMetaEdName';

type MostEntities =
  Association |
  AssociationSubclass |
  Choice |
  Common |
  DecimalType |
  DomainEntity |
  DomainEntitySubclass |
  IntegerType |
  SharedDecimal |
  SharedInteger |
  SharedString |
  StringType;

// Domains, Subdomains, Interchanges, Enumerations and Descriptors don't have standard cross entity naming issues
// and extension entities don't define a new identifier
function entitiesNeedingDuplicateChecking(entity: EntityRepository): Array<MostEntities> {
  const result: Array<MostEntities> = [];
  result.push(...entity.association.values());
  result.push(...entity.associationSubclass.values());
  result.push(...entity.choice.values());
  result.push(...entity.common.values());
  result.push(...entity.domainEntity.values());
  result.push(...entity.decimalType.values());
  result.push(...entity.domainEntitySubclass.values());
  result.push(...entity.integerType.values());
  result.push(...entity.sharedDecimal.values());
  result.push(...entity.sharedInteger.values());
  result.push(...entity.sharedString.values());
  result.push(...entity.stringType.values());
  return result;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  groupByMetaEdName(entitiesNeedingDuplicateChecking(metaEd.entity)).forEach((entities, metaEdName) => {
    if (entities.length > 1) {
      entities.forEach(entity => {
        failures.push({
          validatorName: 'MostEntitiesCannotHaveSameName',
          category: 'error',
          message: `${entity.typeHumanizedName} named ${metaEdName} is a duplicate declaration of that name.`,
          sourceMap: entity.sourceMap.type,
          fileMap: null,
        });
      });
    }
  });

  return failures;
}
