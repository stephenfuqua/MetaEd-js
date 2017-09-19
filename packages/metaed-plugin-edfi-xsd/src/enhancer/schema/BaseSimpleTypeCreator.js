// @flow
import { newStringSimpleType } from '../../model/schema/StringSimpleType';
import { newDecimalSimpleType } from '../../model/schema/DecimalSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';

const codeValueName: string = 'CodeValue';
const codeValueDocumentation: string = 'A code or abbreviation for an element.';

export const createCodeValueSimpleType = () => Object.assign(newStringSimpleType(), {
  name: codeValueName,
  annotation: Object.assign(newAnnotation(), {
    documentation: codeValueDocumentation,
    typeGroup: 'Simple',
  }),
  baseType: 'xs:string',
  minLength: '1',
  maxLength: '50',
});

export const timeIntervalEdfiId: string = '110';
const timeIntervalName: string = 'TimeInterval';
const timeIntervalDocumentation: string = 'A period of time with fixed, well-defined limits.';

export const CreateTimeIntervalSimpleType = () => Object.assign(newStringSimpleType(), {
  name: timeIntervalName,
  annotation: Object.assign(newAnnotation(), {
    documentation: timeIntervalDocumentation,
    typeGroup: 'Simple',
  }),
  baseType: 'xs:duration',
});

export const percentEdfiId: string = '80';
const percentName: string = 'Percent';
const percentDocumentation: string = 'A proportion in relation to the whole (as measured in parts per one hundred).';

export const createPercentSimpleType = () => Object.assign(newDecimalSimpleType(), {
  name: percentName,
  annotation: Object.assign(newAnnotation(), {
    documentation: percentDocumentation,
    typeGroup: 'Simple',
  }),
  baseType: 'xs:decimal',
  minValue: '0',
  maxValue: '1',
  decimalPlaces: '4',
  totalDigits: '5',
});

export const currencyEdfiId: string = '36';
const currencyName: string = 'Currency';
const currencyDocumentation: string = 'U.S. currency in dollars and cents.';

export const createCurrencySimpleType = () => Object.assign(newDecimalSimpleType(), {
  name: currencyName,
  annotation: Object.assign(newAnnotation(), {
    documentation: currencyDocumentation,
    typeGroup: 'Simple',
  }),
  baseType: 'xs:decimal',
});
