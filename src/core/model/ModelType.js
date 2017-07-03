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
