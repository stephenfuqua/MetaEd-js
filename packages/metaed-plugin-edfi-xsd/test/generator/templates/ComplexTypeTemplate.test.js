// @flow
import R from 'ramda';
import xmlParser from 'xml-js';
import { createComplexType, createAttribute, createElementComplexTypeItem } from '../GeneratorTestBase';
import {
  xsdAttributeAbstract,
  xsdAttributeName,
  xsdAttributeType,
  xsdAttributeBase,
  nextHeadText,
  nextHeadName,
  nextSecondName,
  nextThirdName,
  nextHead,
  nextSecond,
  nextThird,
  nextLength,
  elementsArray,
} from './TemplateTestHelper';
import { templateNamed, registerPartials } from '../../../src/generator/XsdGeneratorBase';

const complexType = nextHead;

describe('when generating complex type', () => {
  const documentation: string = 'Documentation';
  const complexTypeName: string = 'Complex Type Name';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createComplexType(complexTypeName, documentation);
    const rawXsd = templateNamed('complexType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be complex type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:complexType');
  });

  it('should have element complex type name', () => {
    expect(R.view(R.compose(complexType, xsdAttributeName), result)).toBe(complexTypeName);
  });

  it('should not have abstract', () => {
    expect(R.view(R.compose(complexType, xsdAttributeAbstract), result)).not.toBeDefined();
  });

  it('should have annotation only', () => {
    expect(R.view(R.compose(complexType, nextLength), result)).toBe(1);
    expect(R.view(R.compose(complexType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(complexType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
  });

  it('should not have attribute', () => {
    expect(R.view(R.compose(complexType, elementsArray), result).filter(element => element.attribute)).toHaveLength(0);
  });
});

describe('when generating complex type with attribute', () => {
  const documentation: string = 'Documentation';
  const complexTypeName: string = 'Complex Type Name';

  const attributeDocumentation: string = 'Attribute Documentation';
  const attributeName: string = 'Complex Type Attribute Name';
  const attributeType: string = 'ComplexObjectType';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createComplexType(complexTypeName, documentation);
    const attribute = createAttribute(attributeName, attributeType, attributeDocumentation);
    testObject.attributes.push(attribute);
    const rawXsd = templateNamed('complexType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be complex type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:complexType');
  });

  it('should have element complex type name', () => {
    expect(R.view(R.compose(complexType, xsdAttributeName), result)).toBe(complexTypeName);
  });

  it('should not have abstract', () => {
    expect(R.view(R.compose(complexType, xsdAttributeAbstract), result)).not.toBeDefined();
  });

  it('should have annotation and attribute only', () => {
    expect(R.view(R.compose(complexType, nextLength), result)).toBe(2);
    expect(R.view(R.compose(complexType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(complexType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
    expect(R.view(R.compose(complexType, nextSecondName), result)).toBe('xs:attribute');
  });
});

describe('when generating complex type with base type', () => {
  const documentation: string = 'Documentation';
  const complexTypeName: string = 'Complex Type Name';
  const baseType: string = 'BaseType';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createComplexType(complexTypeName, documentation, baseType);
    const rawXsd = templateNamed('complexType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be complex type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:complexType');
  });

  it('should have element complex type name', () => {
    expect(R.view(R.compose(complexType, xsdAttributeName), result)).toBe(complexTypeName);
  });

  it('should not have abstract', () => {
    expect(R.view(R.compose(complexType, xsdAttributeAbstract), result)).not.toBeDefined();
  });

  it('should not have attribute', () => {
    expect(R.view(R.compose(complexType, elementsArray), result).filter(element => element.attribute)).toHaveLength(0);
  });

  it('should have annotation and complex content only', () => {
    expect(R.view(R.compose(complexType, nextLength), result)).toBe(2);
    expect(R.view(R.compose(complexType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(complexType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
    expect(R.view(R.compose(complexType, nextSecondName), result)).toBe('xs:complexContent');
  });

  it('should have complex content with base attribute and no child elements', () => {
    const complexContentElement = R.compose(complexType, nextSecond);
    expect(R.view(R.compose(complexContentElement, nextHeadName), result)).toBe('xs:extension');
    const extensionElement = R.compose(complexContentElement, nextHead);
    expect(R.view(R.compose(extensionElement, xsdAttributeBase), result)).toBe(baseType);
    expect(R.view(R.compose(extensionElement, elementsArray), result)).not.toBeDefined();
  });
});

describe('when generating complex type with item', () => {
  const documentation: string = 'Documentation';
  const complexTypeName: string = 'Complex Type Name';

  const itemDocumentation: string = 'Item Documentation';
  const itemName: string = 'Complex Type Item Name';
  const itemType: string = 'ComplexObjectType';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createComplexType(complexTypeName, documentation);
    const complexTypeItem = createElementComplexTypeItem(itemName, itemDocumentation, itemType);
    testObject.items.push(complexTypeItem);
    const rawXsd = templateNamed('complexType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be complex type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:complexType');
  });

  it('should have element complex type name', () => {
    expect(R.view(R.compose(complexType, xsdAttributeName), result)).toBe(complexTypeName);
  });

  it('should not have abstract', () => {
    expect(R.view(R.compose(complexType, xsdAttributeAbstract), result)).not.toBeDefined();
  });

  it('should have attribute', () => {
    expect(R.view(R.compose(complexType, elementsArray), result).filter(element => element.attribute)).toHaveLength(0);
  });

  it('should have annotation and sequence only', () => {
    expect(R.view(R.compose(complexType, nextLength), result)).toBe(2);
    expect(R.view(R.compose(complexType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(complexType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
    expect(R.view(R.compose(complexType, nextSecondName), result)).toBe('xs:sequence');
  });

  it('should have sequence with complex item', () => {
    const sequenceElement = R.compose(complexType, nextSecond);
    expect(R.view(R.compose(sequenceElement, nextHeadName), result)).toBe('xs:element');
  });
});

describe('when generating complex type with everything', () => {
  const documentation: string = 'Documentation';
  const complexTypeName: string = 'Complex Type Name';
  const baseType: string = 'BaseType';

  const attributeDocumentation: string = 'Attribute Documentation';
  const attributeName: string = 'Complex Type Attribute Name';
  const attributeType: string = 'ComplexObjectType';

  const itemDocumentation: string = 'Item Documentation';
  const itemName: string = 'Complex Type Item Name';
  const itemType: string = 'ComplexObjectType';

  let result;

  beforeAll(() => {
    registerPartials();
    const testObject = createComplexType(complexTypeName, documentation, baseType);
    const attribute = createAttribute(attributeName, attributeType, attributeDocumentation);
    testObject.attributes.push(attribute);
    const complexTypeItem = createElementComplexTypeItem(itemName, itemDocumentation, itemType);
    testObject.items.push(complexTypeItem);
    const rawXsd = templateNamed('complexType')(testObject);
    result = xmlParser.xml2js(rawXsd);
  });

  it('should be complex type only', () => {
    expect(R.view(nextLength, result)).toBe(1);
    expect(R.view(nextHeadName, result)).toBe('xs:complexType');
  });

  it('should have element complex type name', () => {
    expect(R.view(R.compose(complexType, xsdAttributeName), result)).toBe(complexTypeName);
  });

  it('should not have abstract', () => {
    expect(R.view(R.compose(complexType, xsdAttributeAbstract), result)).not.toBeDefined();
  });

  it('should have annotation and attribute and complex content only', () => {
    expect(R.view(R.compose(complexType, nextLength), result)).toBe(3);
    expect(R.view(R.compose(complexType, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(complexType, nextHead, nextHead, nextHeadText), result)).toBe(documentation);
    expect(R.view(R.compose(complexType, nextSecondName), result)).toBe('xs:attribute');
    expect(R.view(R.compose(complexType, nextThirdName), result)).toBe('xs:complexContent');
  });

  it('should have attribute with annotation documentation', () => {
    const attribute = R.compose(complexType, nextSecond);
    expect(R.view(R.compose(attribute, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(attribute, nextHead, nextHead, nextHeadText), result)).toBe(attributeDocumentation);
  });

  it('should have complex content with base attribute and sequence with complex item', () => {
    const complexContentElement = R.compose(complexType, nextThird);
    expect(R.view(R.compose(complexContentElement, nextHeadName), result)).toBe('xs:extension');
    const extensionElement = R.compose(complexContentElement, nextHead);
    expect(R.view(R.compose(extensionElement, xsdAttributeBase), result)).toBe(baseType);
    expect(R.view(R.compose(extensionElement, nextHeadName), result)).toBe('xs:sequence');
    expect(R.view(R.compose(extensionElement, nextHead, nextHeadName), result)).toBe('xs:element');
    const complexTypeItem = R.compose(extensionElement, nextHead, nextHead);
    expect(R.view(R.compose(complexTypeItem, xsdAttributeName), result)).toBe(itemName);
    expect(R.view(R.compose(complexTypeItem, xsdAttributeType), result)).toBe(itemType);
    expect(R.view(R.compose(complexTypeItem, nextHeadName), result)).toBe('xs:annotation');
    expect(R.view(R.compose(complexTypeItem, nextHead, nextHead, nextHeadText), result)).toBe(itemDocumentation);
  });
});
