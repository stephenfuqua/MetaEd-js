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
  ValidationFailure } from 'metaed-core';
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
  result.push(...entity.domainEntitySubclass.values());
  result.push(...entity.sharedDecimal.values());
  result.push(...entity.sharedInteger.values());
  result.push(...entity.sharedString.values());
  return result;
}

function generateValidationErrorsForDuplicates(metaEdEntity: Array<MostEntities>): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  groupByMetaEdName(metaEdEntity).forEach((entities, metaEdName) => {
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

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  failures.push(...generateValidationErrorsForDuplicates(entitiesNeedingDuplicateChecking(metaEd.entity)));

  return failures;
}
