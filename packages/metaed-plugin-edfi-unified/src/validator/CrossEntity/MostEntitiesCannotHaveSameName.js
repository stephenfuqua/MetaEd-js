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
  ValidationFailure,
  Namespace,
} from 'metaed-core';
import { groupByMetaEdName } from '../../shared/GroupByMetaEdName';

type MostEntities =
  | Association
  | AssociationSubclass
  | Choice
  | Common
  | DecimalType
  | DomainEntity
  | DomainEntitySubclass
  | IntegerType
  | SharedDecimal
  | SharedInteger
  | SharedString
  | StringType;

// Domains, Subdomains, Interchanges, Enumerations and Descriptors don't have standard cross entity naming issues
// and extension entities don't define a new identifier
function entitiesNeedingDuplicateChecking(...namespaces: Array<Namespace>): Array<MostEntities> {
  const result: Array<MostEntities> = [];

  const entityRepositories: Array<EntityRepository> = namespaces.map((n: Namespace) => n.entity);
  entityRepositories.forEach((entityRepository: EntityRepository) => {
    result.push(...entityRepository.association.values());
    result.push(...entityRepository.associationSubclass.values());
    result.push(...entityRepository.choice.values());
    result.push(...entityRepository.common.values());
    result.push(...entityRepository.domainEntity.values());
    result.push(...entityRepository.domainEntitySubclass.values());
    result.push(...entityRepository.sharedDecimal.values());
    result.push(...entityRepository.sharedInteger.values());
    result.push(...entityRepository.sharedString.values());
  });
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

  metaEd.namespace.forEach((namespace: Namespace) => {
    failures.push(
      ...generateValidationErrorsForDuplicates(entitiesNeedingDuplicateChecking(namespace, ...namespace.dependencies)),
    );
  });

  return failures;
}
