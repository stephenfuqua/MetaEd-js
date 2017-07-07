// @flow
import type {
  Association,
  AssociationSubclass,
  Choice,
  Common,
  DecimalType,
  DomainEntity,
  DomainEntitySubclass,
  IntegerType,
  SharedDecimal,
  SharedInteger,
  SharedString,
  StringType,
  MetaEdEnvironment,
  EntityRepository,
  ValidationFailure } from '../../../../../packages/metaed-core/index';
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
