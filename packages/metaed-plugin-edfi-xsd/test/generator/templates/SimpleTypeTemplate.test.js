// @flow
import R from 'ramda';
import xmlParser from 'xml-js';
import {
  createDecimalSimpleType,
  createIntegerSimpleType,
  createStringSimpleType,
  createEnumerationSimpleType,
  createEnumerationToken,
} from '../GeneratorTestBase';
import {
  elementsArray,
  xsdAttributeName,
  xsdAttributeBase,
  xsdAttributeValue,
  nextHeadText,
  nextHeadName,
  nextSecondName,
  nextThirdName,
  nextFourthName,
  nextHead,
  nextSecond,
  nextThird,
  nextFourth,
  nextLength,
} from './TemplateTestHelper';
import { templateNamed, registerPartials } from '../../../src/generator/XsdGeneratorBase';

const simpleType = nextHead;

describe('when generating integer simple type', () => {
  const documentation: string = 'Documentation';
  const simpleTypeName: string = 'Simple Type Name';
  const baseType: string = 'xs:int';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createIntegerSimpleType(simpleTypeName, baseType, documentation);
    const rawXsd = templateNamed('simpleType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be simple type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:simpleType');
  });

  it('should have annotation and restriction', () => {
    expect(R.view(R.compose(simpleType, nextLength), result)).toBe(2);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have simple type name', () => {
    expect(R.view(R.compose(simpleType, xsdAttributeName), result)).toBe(simpleTypeName);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have base', () => {
    expect(R.view(R.compose(simpleType, nextSecondName), result)).toBe('xs:restriction');
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, xsdAttributeBase), result)).toBe(baseType);
  });

  it('should not have further restrictions', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, elementsArray), result)).not.toBeDefined();
  });
});

describe('when generating string simple type with min and max length', () => {
  const documentation: string = 'Documentation';
  const simpleTypeName: string = 'Simple Type Name';
  const baseType: string = 'xs:string';
  const minLength: string = '0';
  const maxLength: string = '100';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createStringSimpleType(simpleTypeName, baseType, documentation, minLength, maxLength);
    const rawXsd = templateNamed('simpleType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be simple type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:simpleType');
  });

  it('should have annotation and restriction', () => {
    expect(R.view(R.compose(simpleType, nextLength), result)).toBe(2);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have simple type name', () => {
    expect(R.view(R.compose(simpleType, xsdAttributeName), result)).toBe(simpleTypeName);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have base', () => {
    expect(R.view(R.compose(simpleType, nextSecondName), result)).toBe('xs:restriction');
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, xsdAttributeBase), result)).toBe(baseType);
  });

  it('should have two restrictions', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextLength), result)).toBe(2);
  });

  it('should have min length', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextHeadName), result)).toBe('xs:minLength');
    expect(R.view(R.compose(restrictionElement, nextHead, xsdAttributeValue), result)).toBe(minLength);
  });

  it('should have max length', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextSecondName), result)).toBe('xs:maxLength');
    expect(R.view(R.compose(restrictionElement, nextSecond, xsdAttributeValue), result)).toBe(maxLength);
  });
});

describe('when generating decimal simple type with min and max value', () => {
  const documentation: string = 'Documentation';
  const simpleTypeName: string = 'Simple Type Name';
  const baseType: string = 'xs:string';
  const minValue: string = '0';
  const maxValue: string = '100';
  const totalDigits: string = '5';
  const decimalPlaces: string = '2';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createDecimalSimpleType(
      simpleTypeName,
      baseType,
      documentation,
      minValue,
      maxValue,
      totalDigits,
      decimalPlaces,
    );
    const rawXsd = templateNamed('simpleType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be simple type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:simpleType');
  });

  it('should have annotation and restriction', () => {
    expect(R.view(R.compose(simpleType, nextLength), result)).toBe(2);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have simple type name', () => {
    expect(R.view(R.compose(simpleType, xsdAttributeName), result)).toBe(simpleTypeName);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have base', () => {
    expect(R.view(R.compose(simpleType, nextSecondName), result)).toBe('xs:restriction');
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, xsdAttributeBase), result)).toBe(baseType);
  });

  it('should have four restrictions', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextLength), result)).toBe(4);
  });

  it('should have min value', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextHeadName), result)).toBe('xs:minInclusive');
    expect(R.view(R.compose(restrictionElement, nextHead, xsdAttributeValue), result)).toBe(minValue);
  });

  it('should have max value', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextSecondName), result)).toBe('xs:maxInclusive');
    expect(R.view(R.compose(restrictionElement, nextSecond, xsdAttributeValue), result)).toBe(maxValue);
  });

  it('should have total digits', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextThirdName), result)).toBe('xs:totalDigits');
    expect(R.view(R.compose(restrictionElement, nextThird, xsdAttributeValue), result)).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextFourthName), result)).toBe('xs:fractionDigits');
    expect(R.view(R.compose(restrictionElement, nextFourth, xsdAttributeValue), result)).toBe(decimalPlaces);
  });
});

describe('when generating enumeration simple type with token', () => {
  const documentation: string = 'Documentation';
  const simpleTypeName: string = 'Simple Type Name';
  const baseType: string = 'xs:token';
  const tokenValue: string = 'Token Value';
  const tokenDocumentation: string = 'Token Documentation';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createEnumerationSimpleType(simpleTypeName, baseType, documentation);
    const enumerationToken = createEnumerationToken(tokenValue, tokenDocumentation);
    testObject.enumerationTokens.push(enumerationToken);
    const rawXsd = templateNamed('simpleType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be simple type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:simpleType');
  });

  it('should have annotation and restriction', () => {
    expect(R.view(R.compose(simpleType, nextLength), result)).toBe(2);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have simple type name', () => {
    expect(R.view(R.compose(simpleType, xsdAttributeName), result)).toBe(simpleTypeName);
  });

  it('should have annotation', () => {
    expect(R.view(R.compose(simpleType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(simpleType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should have base', () => {
    expect(R.view(R.compose(simpleType, nextSecondName), result)).toBe('xs:restriction');
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, xsdAttributeBase), result)).toBe(baseType);
  });

  it('should have one restriction', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextLength), result)).toBe(1);
  });

  it('should have enumeration', () => {
    const restrictionElement = R.compose(simpleType, nextSecond);
    expect(R.view(R.compose(restrictionElement, nextHeadName), result)).toBe('xs:enumeration');
    expect(R.view(R.compose(restrictionElement, nextHead, xsdAttributeValue), result)).toBe(tokenValue);
  });

  it('should have enumeration documentation', () => {
    const enumerationElement = R.compose(simpleType, nextSecond, nextHead);
    expect(R.view(R.compose(enumerationElement, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(enumerationElement, nextHead, nextHead, nextHeadText), result)).toBe(tokenDocumentation);
  });
});
