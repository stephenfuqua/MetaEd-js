/**
 *
 */
export type ModelType =
  | 'unknown'
  | 'association'
  | 'associationExtension'
  | 'associationSubclass'
  | 'choice'
  | 'common'
  | 'commonExtension'
  | 'decimalType'
  | 'descriptor'
  | 'domain'
  | 'domainItem'
  | 'domainEntity'
  | 'domainEntityExtension'
  | 'domainEntitySubclass'
  | 'enumeration'
  | 'enumerationItem'
  | 'integerType'
  | 'interchange'
  | 'interchangeExtension'
  | 'interchangeItem'
  | 'inlineCommon'
  | 'mapTypeEnumeration'
  | 'schoolYearEnumeration'
  | 'sharedDecimal'
  | 'sharedInteger'
  | 'sharedString'
  | 'stringType'
  | 'subdomain';

/**
 *
 */
export const allEntityModelTypes: ModelType[] = [
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

/**
 *
 */
export const allEntityModelTypesNoSimpleTypes: ModelType[] = [
  'unknown',
  'association',
  'associationExtension',
  'associationSubclass',
  'choice',
  'common',
  'commonExtension',
  'descriptor',
  'domain',
  'domainEntity',
  'domainEntityExtension',
  'domainEntitySubclass',
  'enumeration',
  'interchange',
  'interchangeExtension',
  'mapTypeEnumeration',
  'schoolYearEnumeration',
  'sharedDecimal',
  'sharedInteger',
  'sharedString',
  'subdomain',
];

/**
 *
 */
export const allTopLevelEntityModelTypes: ModelType[] = [
  'unknown',
  'association',
  'associationExtension',
  'associationSubclass',
  'choice',
  'common',
  'commonExtension',
  'descriptor',
  'domainEntity',
  'domainEntityExtension',
  'domainEntitySubclass',
  'enumeration',
  'schoolYearEnumeration',
];

/**
 *
 */
export const topLevelCoreEntityModelTypes: ModelType[] = [
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

/**
 *
 */
export const asModelType = (x: string): ModelType => x as ModelType;
