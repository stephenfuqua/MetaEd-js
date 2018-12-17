// @flow
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { Association } from './Association';
import type { AssociationExtension } from './AssociationExtension';
import type { AssociationSubclass } from './AssociationSubclass';
import type { Choice } from './Choice';
import type { Common } from './Common';
import type { CommonExtension } from './CommonExtension';
import type { DecimalType } from './DecimalType';
import type { Descriptor } from './Descriptor';
import type { DomainEntity } from './DomainEntity';
import type { DomainEntityExtension } from './DomainEntityExtension';
import type { DomainEntitySubclass } from './DomainEntitySubclass';
import type { Enumeration } from './Enumeration';
import type { IntegerType } from './IntegerType';
import type { Interchange } from './Interchange';
import type { InterchangeExtension } from './InterchangeExtension';
import type { MapTypeEnumeration } from './MapTypeEnumeration';
import type { Namespace } from './Namespace';
import type { SchoolYearEnumeration } from './SchoolYearEnumeration';
import type { SharedDecimal } from './SharedDecimal';
import type { SharedInteger } from './SharedInteger';
import type { SharedString } from './SharedString';
import type { StringType } from './StringType';
import type { Domain } from './Domain';
import type { Subdomain } from './Subdomain';
import type { ModelType } from './ModelType';
import type { ModelBase } from './ModelBase';
import type { TopLevelEntity } from './TopLevelEntity';
import { asTopLevelEntity } from './TopLevelEntity';
import {
  allEntityModelTypes,
  allTopLevelEntityModelTypes,
  topLevelCoreEntityModelTypes,
  allEntityModelTypesNoSimpleTypes,
} from './ModelType';

/**
 *
 */
export type EntityRepository = {
  unknown: Map<string, any>,
  association: Map<string, Association>,
  associationExtension: Map<string, AssociationExtension>,
  associationSubclass: Map<string, AssociationSubclass>,
  choice: Map<string, Choice>,
  common: Map<string, Common>,
  commonExtension: Map<string, CommonExtension>,
  decimalType: Map<string, DecimalType>,
  descriptor: Map<string, Descriptor>,
  domain: Map<string, Domain>,
  domainEntity: Map<string, DomainEntity>,
  domainEntityExtension: Map<string, DomainEntityExtension>,
  domainEntitySubclass: Map<string, DomainEntitySubclass>,
  enumeration: Map<string, Enumeration>,
  integerType: Map<string, IntegerType>,
  interchange: Map<string, Interchange>,
  interchangeExtension: Map<string, InterchangeExtension>,
  mapTypeEnumeration: Map<string, MapTypeEnumeration>,
  schoolYearEnumeration: Map<string, SchoolYearEnumeration>,
  sharedDecimal: Map<string, SharedDecimal>,
  sharedInteger: Map<string, SharedInteger>,
  sharedString: Map<string, SharedString>,
  stringType: Map<string, StringType>,
  subdomain: Map<string, Subdomain>,
};

/**
 *
 */
export function newEntityRepository(): EntityRepository {
  return {
    unknown: new Map(),
    association: new Map(),
    associationExtension: new Map(),
    associationSubclass: new Map(),
    choice: new Map(),
    common: new Map(),
    commonExtension: new Map(),
    decimalType: new Map(),
    descriptor: new Map(),
    domain: new Map(),
    domainEntity: new Map(),
    domainEntityExtension: new Map(),
    domainEntitySubclass: new Map(),
    enumeration: new Map(),
    integerType: new Map(),
    interchange: new Map(),
    interchangeExtension: new Map(),
    mapTypeEnumeration: new Map(),
    schoolYearEnumeration: new Map(),
    sharedDecimal: new Map(),
    sharedInteger: new Map(),
    sharedString: new Map(),
    stringType: new Map(),
    subdomain: new Map(),
  };
}

/**
 *
 */
export function getAllEntities(repository: EntityRepository): Array<ModelBase> {
  const result = [];
  // $FlowIgnore - using model type repository lookup
  allEntityModelTypes.forEach(modelType => result.push(...repository[modelType].values()));
  return result;
}

/**
 *
 */
export function getAllEntitiesForNamespaces(namespaces: Array<Namespace>): Array<ModelBase> {
  const result: Array<ModelBase> = [];
  namespaces.forEach((namespace: Namespace) => {
    result.push(...getAllEntities(namespace.entity));
  });
  return result;
}

/**
 *
 */
export function getAllTopLevelEntities(repository: EntityRepository): Array<TopLevelEntity> {
  const result: Array<TopLevelEntity> = [];
  // $FlowIgnore - using model type repository lookup
  allTopLevelEntityModelTypes.forEach(modelType => result.push(...repository[modelType].values()));
  return result;
}

/**
 *
 */
export function getAllTopLevelEntitiesForNamespaces(namespaces: Array<Namespace>): Array<TopLevelEntity> {
  const result: Array<TopLevelEntity> = [];
  namespaces.forEach((namespace: Namespace) => {
    // $FlowIgnore - using model type repository lookup
    result.push(...getAllTopLevelEntities(namespace.entity));
  });
  return result;
}

/**
 *
 */
export function getAllEntitiesNoSimpleTypes(repository: EntityRepository): Array<ModelBase> {
  const result = [];
  // $FlowIgnore - using model type repository lookup
  allEntityModelTypesNoSimpleTypes.forEach(modelType => result.push(...repository[modelType].values()));
  return result;
}

/**
 *
 */
export function getAllEntitiesNoSimpleTypesForNamespaces(namespaces: Array<Namespace>): Array<ModelBase> {
  const result: Array<ModelBase> = [];
  namespaces.forEach((namespace: Namespace) => {
    result.push(...getAllEntitiesNoSimpleTypes(namespace.entity));
  });
  return result;
}

/**
 *
 */
export function getEntitiesOfType(repository: EntityRepository, ...modelTypes: Array<ModelType>): Array<ModelBase> {
  const result = [];
  // $FlowIgnore - using model type repository lookup
  modelTypes.forEach(modelType => result.push(...repository[modelType].values()));
  return ((result: any): Array<ModelBase>);
}

/**
 *
 */
export function getEntitiesOfTypeForNamespaces(
  namespaces: Array<Namespace>,
  ...modelTypes: Array<ModelType>
): Array<ModelBase> {
  const result: Array<ModelBase> = [];
  namespaces.forEach((namespace: Namespace) => {
    result.push(...getEntitiesOfType(namespace.entity, ...modelTypes));
  });
  return result;
}

/**
 *
 */
export function getAllEntitiesOfType(metaEd: MetaEdEnvironment, ...modelTypes: Array<ModelType>): Array<ModelBase> {
  return getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), ...modelTypes);
}

/**
 *
 */
export function getEntity(repository: EntityRepository, entityName: string, ...modelTypes: Array<ModelType>): ?ModelBase {
  let result: ?ModelBase = null;
  modelTypes.forEach(modelType => {
    // $FlowIgnore - using model type repository lookup
    if (!result) result = repository[modelType].get(entityName);
  });
  return result;
}

/**
 *
 */
export function getEntityForNamespaces(
  entityName: string,
  namespaces: Array<Namespace>,
  ...modelTypes: Array<ModelType>
): ?ModelBase {
  // eslint-disable-next-line no-restricted-syntax
  for (const namespace of namespaces) {
    // eslint-disable-next-line no-restricted-syntax
    for (const modelType of modelTypes) {
      // $FlowIgnore - indexing with type
      if (namespace.entity[modelType].has(entityName)) {
        // $FlowIgnore - indexing with type
        return namespace.entity[modelType].get(entityName);
      }
    }
  }

  return null;
}

/**
 *
 */
export function addEntity(repository: EntityRepository, entity: ModelBase) {
  // $FlowIgnore - indexing with type
  repository[entity.type].set(entity.metaEdName, entity);
}

/**
 *
 */
export function addEntityForNamespace(entity: ModelBase) {
  addEntity(entity.namespace.entity, entity);
}

/**
 *
 */
export function getTopLevelCoreEntity(repository: EntityRepository, entityName: string): ?TopLevelEntity {
  let result: ?TopLevelEntity = null;
  topLevelCoreEntityModelTypes.forEach(modelType => {
    // $FlowIgnore - using model type repository lookup
    if (!result) result = asTopLevelEntity(repository[modelType].get(entityName));
  });
  return result;
}

/**
 *
 */
export function getTopLevelCoreEntityForNamespaces(namespaces: Array<Namespace>, entityName: string): ?TopLevelEntity {
  const result: ?ModelBase = getEntityForNamespaces(entityName, namespaces, ...topLevelCoreEntityModelTypes);
  if (result == null) return null;
  return asTopLevelEntity(result);
}
