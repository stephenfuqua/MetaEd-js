// @flow
import type { Association } from '../../../../core/model/Association';
import type { AssociationSubclass } from '../../../../core/model/AssociationSubclass';
import type { Choice } from '../../../../core/model/Choice';
import type { Common } from '../../../../core/model/Common';
import type { DecimalType } from '../../../../core/model/DecimalType';
import type { DomainEntity } from '../../../../core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../core/model/DomainEntitySubclass';
import type { IntegerType } from '../../../../core/model/IntegerType';
import type { SharedDecimal } from '../../../../core/model/SharedDecimal';
import type { SharedInteger } from '../../../../core/model/SharedInteger';
import type { SharedString } from '../../../../core/model/SharedString';
import type { StringType } from '../../../../core/model/StringType';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { EntityRepository } from '../../../../core/model/EntityRepository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
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
