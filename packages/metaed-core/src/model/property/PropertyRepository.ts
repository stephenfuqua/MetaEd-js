import { AssociationProperty } from './AssociationProperty';
import { BooleanProperty } from './BooleanProperty';
import { ChoiceProperty } from './ChoiceProperty';
import { CommonProperty } from './CommonProperty';
import { CurrencyProperty } from './CurrencyProperty';
import { DateProperty } from './DateProperty';
import { DatetimeProperty } from './DatetimeProperty';
import { DecimalProperty } from './DecimalProperty';
import { DescriptorProperty } from './DescriptorProperty';
import { DomainEntityProperty } from './DomainEntityProperty';
import { DurationProperty } from './DurationProperty';
import { EnumerationProperty } from './EnumerationProperty';
import { InlineCommonProperty } from './InlineCommonProperty';
import { IntegerProperty } from './IntegerProperty';
import { PercentProperty } from './PercentProperty';
import { SchoolYearEnumerationProperty } from './SchoolYearEnumerationProperty';
import { SharedDecimalProperty } from './SharedDecimalProperty';
import { SharedIntegerProperty } from './SharedIntegerProperty';
import { SharedShortProperty } from './SharedShortProperty';
import { SharedStringProperty } from './SharedStringProperty';
import { ShortProperty } from './ShortProperty';
import { StringProperty } from './StringProperty';
import { TimeProperty } from './TimeProperty';
import { YearProperty } from './YearProperty';
import { PropertyType } from './PropertyType';
import { EntityProperty } from './EntityProperty';
import { allPropertyTypes } from './PropertyType';
import { Namespace } from '../Namespace';

/**
 *
 */
export class PropertyIndex {
  association: Array<AssociationProperty>;

  boolean: Array<BooleanProperty>;

  choice: Array<ChoiceProperty>;

  common: Array<CommonProperty>;

  currency: Array<CurrencyProperty>;

  date: Array<DatetimeProperty>;

  datetime: Array<DateProperty>;

  decimal: Array<DecimalProperty>;

  descriptor: Array<DescriptorProperty>;

  domainEntity: Array<DomainEntityProperty>;

  duration: Array<DurationProperty>;

  enumeration: Array<EnumerationProperty>;

  inlineCommon: Array<InlineCommonProperty>;

  integer: Array<IntegerProperty>;

  percent: Array<PercentProperty>;

  schoolYearEnumeration: Array<SchoolYearEnumerationProperty>;

  sharedDecimal: Array<SharedDecimalProperty>;

  sharedInteger: Array<SharedIntegerProperty>;

  sharedShort: Array<SharedShortProperty>;

  sharedString: Array<SharedStringProperty>;

  short: Array<ShortProperty>;

  string: Array<StringProperty>;

  time: Array<TimeProperty>;

  year: Array<YearProperty>;
}

/**
 *
 */
export function newPropertyIndex(): PropertyIndex {
  return Object.assign(new PropertyIndex(), {
    association: [],
    boolean: [],
    choice: [],
    common: [],
    currency: [],
    date: [],
    datetime: [],
    decimal: [],
    descriptor: [],
    domainEntity: [],
    duration: [],
    enumeration: [],
    inlineCommon: [],
    integer: [],
    percent: [],
    schoolYearEnumeration: [],
    sharedDecimal: [],
    sharedInteger: [],
    sharedShort: [],
    sharedString: [],
    short: [],
    string: [],
    time: [],
    year: [],
  });
}

/**
 *
 */
export function getPropertiesOfType(
  propertyIndex: PropertyIndex,
  ...propertyTypes: Array<PropertyType>
): Array<EntityProperty> {
  const result: Array<EntityProperty> = [];
  propertyTypes.forEach(propertyType => result.push(...propertyIndex[propertyType]));
  return result;
}

/**
 *
 */
export function getPropertiesOfTypeForNamespaces(
  propertyIndex: PropertyIndex,
  namespaces: Array<Namespace>,
  ...propertyTypes: Array<PropertyType>
): Array<EntityProperty> {
  const result: Array<EntityProperty> = [];

  propertyTypes.forEach(propertyType => {
    const propertiesInNamespaces = propertyIndex[propertyType].filter((property: EntityProperty) =>
      namespaces.includes(property.namespace),
    );
    result.push(...propertiesInNamespaces);
  });
  return result;
}

/**
 *
 */
export function getAllProperties(propertyIndex: PropertyIndex): Array<EntityProperty> {
  return getPropertiesOfType(propertyIndex, ...allPropertyTypes);
}

/**
 *
 */
export function getAllPropertiesForNamespaces(
  propertyIndex: PropertyIndex,
  namespaces: Array<Namespace>,
): Array<EntityProperty> {
  return getPropertiesOfTypeForNamespaces(propertyIndex, namespaces, ...allPropertyTypes);
}

/**
 *
 */
export function addProperty(propertyIndex: PropertyIndex, property: EntityProperty) {
  propertyIndex[property.type].push(property);
}
