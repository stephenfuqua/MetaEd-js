// @flow
import type { AssociationProperty } from './AssociationProperty';
import type { BooleanProperty } from './BooleanProperty';
import type { ChoiceProperty } from './ChoiceProperty';
import type { CommonProperty } from './CommonProperty';
import type { CurrencyProperty } from './CurrencyProperty';
import type { DateProperty } from './DateProperty';
import type { DecimalProperty } from './DecimalProperty';
import type { DescriptorProperty } from './DescriptorProperty';
import type { DomainEntityProperty } from './DomainEntityProperty';
import type { DurationProperty } from './DurationProperty';
import type { EnumerationProperty } from './EnumerationProperty';
import type { InlineCommonProperty } from './InlineCommonProperty';
import type { IntegerProperty } from './IntegerProperty';
import type { PercentProperty } from './PercentProperty';
import type { SchoolYearEnumerationProperty } from './SchoolYearEnumerationProperty';
import type { SharedDecimalProperty } from './SharedDecimalProperty';
import type { SharedIntegerProperty } from './SharedIntegerProperty';
import type { SharedShortProperty } from './SharedShortProperty';
import type { SharedStringProperty } from './SharedStringProperty';
import type { ShortProperty } from './ShortProperty';
import type { StringProperty } from './StringProperty';
import type { TimeProperty } from './TimeProperty';
import type { YearProperty } from './YearProperty';

export class PropertyIndex {
  association: Array<AssociationProperty>;
  boolean: Array<BooleanProperty>;
  choice: Array<ChoiceProperty>;
  common: Array<CommonProperty>;
  currency: Array<CurrencyProperty>;
  date: Array<DateProperty>;
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


export function propertyIndexFactory(): PropertyIndex {
  return Object.assign(new PropertyIndex(), {
    association: [],
    boolean: [],
    choice: [],
    common: [],
    currency: [],
    date: [],
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
