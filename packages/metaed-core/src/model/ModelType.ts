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
  | 'commonSubclass'
  | 'descriptor'
  | 'domain'
  | 'domainItem'
  | 'domainEntity'
  | 'domainEntityExtension'
  | 'domainEntitySubclass'
  | 'enumeration'
  | 'enumerationItem'
  | 'interchange'
  | 'interchangeExtension'
  | 'interchangeItem'
  | 'inlineCommon'
  | 'mapTypeEnumeration'
  | 'schoolYearEnumeration'
  | 'sharedDecimal'
  | 'sharedInteger'
  | 'sharedString'
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
  'commonSubclass',
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
export const allEntityModelTypesNoSimpleTypes: ModelType[] = [
  'unknown',
  'association',
  'associationExtension',
  'associationSubclass',
  'choice',
  'common',
  'commonExtension',
  'commonSubclass',
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
  'commonSubclass',
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
  'commonSubclass',
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
