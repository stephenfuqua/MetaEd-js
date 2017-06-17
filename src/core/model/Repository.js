// @flow
import type { Association } from './Association';
import type { AssociationExtension } from './AssociationExtension';
import type { AssociationSubclass } from './AssociationSubclass';
import type { Choice } from './Choice';
import type { Common } from './Common';
import type { CommonExtension } from './CommonExtension';
import type { Descriptor } from './Descriptor';
import type { DomainEntity } from './DomainEntity';
import type { DomainEntityExtension } from './DomainEntityExtension';
import type { DomainEntitySubclass } from './DomainEntitySubclass';
import type { Enumeration } from './Enumeration';
import type { Interchange } from './Interchange';
import type { MapTypeEnumeration } from './MapTypeEnumeration';
import type { NamespaceInfo } from './NamespaceInfo';
import type { SchoolYearEnumeration } from './SchoolYearEnumeration';
import type { SharedDecimal } from './SharedDecimal';
import type { SharedInteger } from './SharedInteger';
import type { SharedString } from './SharedString';
import type { Domain } from './Domain';
import type { Subdomain } from './Subdomain';
import type { ValidationFailure } from '../validator/ValidationFailure';

export class EntityRepository {
  association: Map<string, Association>;
  associationExtension: Map<string, AssociationExtension>;
  associationSubclass: Map<string, AssociationSubclass>;
  choice: Map<string, Choice>;
  common: Map<string, Common>;
  commonExtension: Map<string, CommonExtension>;
  descriptor: Map<string, Descriptor>;
  domain: Map<string, Domain>;
  domainEntity: Map<string, DomainEntity>;
  domainEntityExtension: Map<string, DomainEntityExtension>;
  domainEntitySubclass: Map<string, DomainEntitySubclass>;
  enumeration: Map<string, Enumeration>;
  interchange: Map<string, Interchange>;
  mapTypeEnumeration: Map<string, MapTypeEnumeration>;
  namespaceInfo: Map<string, NamespaceInfo>;
  schoolYearEnumeration: Map<string, SchoolYearEnumeration>;
  sharedDecimal: Map<string, SharedDecimal>;
  sharedInteger: Map<string, SharedInteger>;
  sharedString: Map<string, SharedString>;
  subdomain: Map<string, Subdomain>;
}

export function entityRepositoryFactory(): EntityRepository {
  return Object.assign(new EntityRepository(), {
    association: new Map(),
    associationExtension: new Map(),
    associationSubclass: new Map(),
    choice: new Map(),
    common: new Map(),
    commonExtension: new Map(),
    descriptor: new Map(),
    domain: new Map(),
    domainEntity: new Map(),
    domainEntityExtension: new Map(),
    domainEntitySubclass: new Map(),
    enumeration: new Map(),
    interchange: new Map(),
    mapTypeEnumeration: new Map(),
    namespaceInfo: new Map(),
    schoolYearEnumeration: new Map(),
    sharedDecimal: new Map(),
    sharedInteger: new Map(),
    sharedString: new Map(),
    subdomain: new Map(),
  });
}

export class Repository {
  builderValidationFailure: Array<ValidationFailure>;
  configuration: any;
  entity: EntityRepository;
}

export function repositoryFactory(): Repository {
  return Object.assign(new Repository(), {
    builderValidationFailure: [],
    configuration: null,
    entity: entityRepositoryFactory(),
  });
}
