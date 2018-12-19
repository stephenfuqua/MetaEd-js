import { Association } from '../src/model/Association';
import { AssociationExtension } from '../src/model/AssociationExtension';
import { AssociationSubclass } from '../src/model/AssociationSubclass';
import { Choice } from '../src/model/Choice';
import { Common } from '../src/model/Common';
import { CommonExtension } from '../src/model/CommonExtension';
import { DecimalType } from '../src/model/DecimalType';
import { Descriptor } from '../src/model/Descriptor';
import { DomainEntity } from '../src/model/DomainEntity';
import { DomainEntityExtension } from '../src/model/DomainEntityExtension';
import { DomainEntitySubclass } from '../src/model/DomainEntitySubclass';
import { Enumeration } from '../src/model/Enumeration';
import { IntegerType } from '../src/model/IntegerType';
import { Interchange } from '../src/model/Interchange';
import { InterchangeExtension } from '../src/model/InterchangeExtension';
import { MapTypeEnumeration } from '../src/model/MapTypeEnumeration';
import { SchoolYearEnumeration } from '../src/model/SchoolYearEnumeration';
import { SharedDecimal } from '../src/model/SharedDecimal';
import { SharedInteger } from '../src/model/SharedInteger';
import { SharedString } from '../src/model/SharedString';
import { StringType } from '../src/model/StringType';
import { Domain } from '../src/model/Domain';
import { Subdomain } from '../src/model/Subdomain';
import { EntityRepository } from '../src/model/EntityRepository';
import { getEntity } from '../src/model/EntityRepository';

export function getUnknown(repository: EntityRepository, metaEdId: string): any {
  return getEntity(repository, metaEdId, 'unknown') as Association;
}

export function getAssociation(repository: EntityRepository, metaEdId: string): Association {
  return getEntity(repository, metaEdId, 'association') as Association;
}

export function getAssociationExtension(repository: EntityRepository, metaEdId: string): AssociationExtension {
  return getEntity(repository, metaEdId, 'associationExtension') as AssociationExtension;
}

export function getAssociationSubclass(repository: EntityRepository, metaEdId: string): AssociationSubclass {
  return getEntity(repository, metaEdId, 'associationSubclass') as AssociationSubclass;
}

export function getChoice(repository: EntityRepository, metaEdId: string): Choice {
  return getEntity(repository, metaEdId, 'choice') as Choice;
}

export function getCommon(repository: EntityRepository, metaEdId: string): Common {
  return getEntity(repository, metaEdId, 'common') as Common;
}

export function getCommonExtension(repository: EntityRepository, metaEdId: string): CommonExtension {
  return getEntity(repository, metaEdId, 'commonExtension') as CommonExtension;
}

export function getDecimalType(repository: EntityRepository, metaEdId: string): DecimalType {
  return getEntity(repository, metaEdId, 'decimalType') as DecimalType;
}

export function getDescriptor(repository: EntityRepository, metaEdId: string): Descriptor {
  return getEntity(repository, metaEdId, 'descriptor') as Descriptor;
}

export function getDomainEntity(repository: EntityRepository, metaEdId: string): DomainEntity {
  return getEntity(repository, metaEdId, 'domainEntity') as DomainEntity;
}

export function getDomainEntityExtension(repository: EntityRepository, metaEdId: string): DomainEntityExtension {
  return getEntity(repository, metaEdId, 'domainEntityExtension') as DomainEntityExtension;
}

export function getDomainEntitySubclass(repository: EntityRepository, metaEdId: string): DomainEntitySubclass {
  return getEntity(repository, metaEdId, 'domainEntitySubclass') as DomainEntitySubclass;
}

export function getEnumeration(repository: EntityRepository, metaEdId: string): Enumeration {
  return getEntity(repository, metaEdId, 'enumeration') as Enumeration;
}

export function getIntegerType(repository: EntityRepository, metaEdId: string): IntegerType {
  return getEntity(repository, metaEdId, 'integerType') as IntegerType;
}

export function getInterchange(repository: EntityRepository, metaEdId: string): Interchange {
  return getEntity(repository, metaEdId, 'interchange') as Interchange;
}

export function getInterchangeExtension(repository: EntityRepository, metaEdId: string): InterchangeExtension {
  return getEntity(repository, metaEdId, 'interchangeExtension') as InterchangeExtension;
}

export function getMapTypeEnumeration(repository: EntityRepository, metaEdId: string): MapTypeEnumeration {
  return getEntity(repository, metaEdId, 'mapTypeEnumeration') as MapTypeEnumeration;
}

export function getSchoolYearEnumeration(repository: EntityRepository, metaEdId: string): SchoolYearEnumeration {
  return getEntity(repository, metaEdId, 'schoolYearEnumeration') as SchoolYearEnumeration;
}

export function getSharedDecimal(repository: EntityRepository, metaEdId: string): SharedDecimal {
  return getEntity(repository, metaEdId, 'sharedDecimal') as SharedDecimal;
}

export function getSharedInteger(repository: EntityRepository, metaEdId: string): SharedInteger {
  return getEntity(repository, metaEdId, 'sharedInteger') as SharedInteger;
}

export function getSharedString(repository: EntityRepository, metaEdId: string): SharedString {
  return getEntity(repository, metaEdId, 'sharedString') as SharedString;
}

export function getStringType(repository: EntityRepository, metaEdId: string): StringType {
  return getEntity(repository, metaEdId, 'stringType') as StringType;
}

export function getDomain(repository: EntityRepository, metaEdId: string): Domain {
  return getEntity(repository, metaEdId, 'domain') as Domain;
}

export function getSubdomain(repository: EntityRepository, metaEdId: string): Subdomain {
  return getEntity(repository, metaEdId, 'subdomain') as Subdomain;
}
