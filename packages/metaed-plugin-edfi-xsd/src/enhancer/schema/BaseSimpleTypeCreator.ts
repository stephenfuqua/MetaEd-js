import { newStringSimpleType } from '../../model/schema/StringSimpleType';
import { newDecimalSimpleType } from '../../model/schema/DecimalSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';
import { baseTypeDescriptorReference, typeGroupSimple } from './AddComplexTypesBaseEnhancer';

const codeValueName = 'CodeValue';
const codeValueDocumentation = 'A code or abbreviation for an element.';

export const createCodeValueSimpleType = () =>
  Object.assign(newStringSimpleType(), {
    name: codeValueName,
    annotation: Object.assign(newAnnotation(), {
      documentation: codeValueDocumentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: 'xs:string',
    minLength: '1',
    maxLength: '50',
  });

export const timeIntervalEdfiId = '110';
const timeIntervalName = 'TimeInterval';
const timeIntervalDocumentation = 'A period of time with fixed, well-defined limits.';

export const createTimeIntervalSimpleType = () =>
  Object.assign(newStringSimpleType(), {
    name: timeIntervalName,
    annotation: Object.assign(newAnnotation(), {
      documentation: timeIntervalDocumentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: 'xs:duration',
  });

export const percentEdfiId = '80';
const percentName = 'Percent';
const percentDocumentation = 'A proportion in relation to the whole (as measured in parts per one hundred).';

export const createPercentSimpleType = () =>
  Object.assign(newDecimalSimpleType(), {
    name: percentName,
    annotation: Object.assign(newAnnotation(), {
      documentation: percentDocumentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: 'xs:decimal',
    minValue: '0',
    maxValue: '1',
    decimalPlaces: '4',
    totalDigits: '5',
  });

export const currencyEdfiId = '36';
const currencyName = 'Currency';
const currencyDocumentation = 'U.S. currency in dollars and cents.';

export const createCurrencySimpleType = () =>
  Object.assign(newDecimalSimpleType(), {
    name: currencyName,
    annotation: Object.assign(newAnnotation(), {
      documentation: currencyDocumentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: 'xs:decimal',
  });

const descriptorReferenceName: string = baseTypeDescriptorReference;
const descriptorReferenceDocumentation = 'Provides references for descriptors represented by the full URI format.';

export const createDescriptorReferenceSimpleType = () =>
  Object.assign(newStringSimpleType(), {
    name: descriptorReferenceName,
    annotation: Object.assign(newAnnotation(), {
      documentation: descriptorReferenceDocumentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: 'xs:string',
    minLength: '1',
    maxLength: '255',
  });
