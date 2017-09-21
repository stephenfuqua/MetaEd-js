// @flow

export type ModelType =
  'unknown' |
  'abstractEntity' |
  'association' |
  'associationExtension' |
  'associationSubclass' |
  'choice' |
  'common' |
  'commonExtension' |
  'decimalType' |
  'descriptor' |
  'domain' |
  'domainItem' |
  'domainEntity' |
  'domainEntityExtension' |
  'domainEntitySubclass' |
  'enumeration' |
  'enumerationItem' |
  'integerType' |
  'interchange' |
  'interchangeExtension' |
  'interchangeItem' |
  'inlineCommon' |
  'mapTypeEnumeration' |
  'namespaceInfo' |
  'schoolYearEnumeration' |
  'sharedDecimal' |
  'sharedInteger' |
  'sharedShort' |
  'sharedString' |
  'stringType' |
  'subdomain';

export const allEntityModelTypes: Array<ModelType> = [
  'unknown',
  'association',
  'associationExtension',
  'associationSubclass',
  'choice',
  'common',
  'commonExtension',
  'decimalType',
  'descriptor',
  'domain',
  'domainEntity',
  'domainEntityExtension',
  'domainEntitySubclass',
  'enumeration',
  'integerType',
  'interchange',
  'interchangeExtension',
  'mapTypeEnumeration',
  'schoolYearEnumeration',
  'sharedDecimal',
  'sharedInteger',
  'sharedString',
  'stringType',
  'subdomain',
];

export const topLevelEntityModelTypes: Array<ModelType> = [
  'association',
  'associationSubclass',
  'choice',
  'common',
  'descriptor',
  'domainEntity',
  'domainEntitySubclass',
  'enumeration',
  'mapTypeEnumeration',
  'schoolYearEnumeration',
];

export const asModelType = (x: string): ModelType => ((x: any): ModelType);
