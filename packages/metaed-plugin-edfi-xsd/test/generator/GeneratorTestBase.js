// @flow
import type { Annotation } from '../../src/model/schema/Annotation';
import type { Attribute } from '../../src/model/schema/Attribute';
import type { IntegerSimpleType } from '../../src/model/schema/IntegerSimpleType';
import type { DecimalSimpleType } from '../../src/model/schema/DecimalSimpleType';
import type { StringSimpleType } from '../../src/model/schema/StringSimpleType';
import type { EnumerationSimpleType } from '../../src/model/schema/EnumerationSimpleType';
import type { EnumerationToken } from '../../src/model/schema/EnumerationToken';
import type { Element } from '../../src/model/schema/Element';
import type { ElementGroup } from '../../src/model/schema/ElementGroup';
import type { ComplexType } from '../../src/model/schema/ComplexType';
import type { SchemaSection } from '../../src/model/schema/SchemaSection';
import type { SchemaContainer } from '../../src/model/schema/SchemaContainer';

import { newAnnotation } from '../../src/model/schema/Annotation';
import { newAttribute } from '../../src/model/schema/Attribute';
import { newIntegerSimpleType } from '../../src/model/schema/IntegerSimpleType';
import { newDecimalSimpleType } from '../../src/model/schema/DecimalSimpleType';
import { newStringSimpleType } from '../../src/model/schema/StringSimpleType';
import { newEnumerationSimpleType } from '../../src/model/schema/EnumerationSimpleType';
import { newEnumerationToken } from '../../src/model/schema/EnumerationToken';
import { newElement } from '../../src/model/schema/Element';
import { newElementGroup } from '../../src/model/schema/ElementGroup';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newSchemaSection } from '../../src/model/schema/SchemaSection';
import { newSchemaContainer } from '../../src/model/schema/SchemaContainer';

export const xs: string = 'http://www.w3.org/2001/XMLSchema';
export const ann: string = 'http://ed-fi.org/annotation';

export function createAnnotation(documentation: string, typeGroup: string = '', descriptorName: string = ''): Annotation {
  return Object.assign(newAnnotation(), {
    documentation,
    typeGroup,
    descriptorName,
  });
}

export function createAttribute(name: string, type: string, documentation: string, isRequired: boolean = false): Attribute {
  return Object.assign(newAttribute(), {
    name,
    type,
    annotation: createAnnotation(documentation),
    isRequired,
  });
}

export function createIntegerSimpleType(name: string, baseType: string, documentation: string, minValue: string = '', maxValue: string = ''): IntegerSimpleType {
  return Object.assign(newIntegerSimpleType(), {
    name,
    baseType,
    annotation: createAnnotation(documentation),
    maxValue,
    minValue,
  });
}

export function createDecimalSimpleType(name: string, baseType: string, documentation: string, minValue: string = '',
  maxValue: string = '', totalDigits: string = '', decimalPlaces: string = ''): DecimalSimpleType {
  return Object.assign(newDecimalSimpleType(), {
    name,
    baseType,
    annotation: createAnnotation(documentation),
    maxValue,
    minValue,
    totalDigits,
    decimalPlaces,
  });
}

export function createStringSimpleType(name: string, baseType: string, documentation: string, minLength: string = '',
  maxLength: string = ''): StringSimpleType {
  return Object.assign(newStringSimpleType(), {
    name,
    baseType,
    annotation: createAnnotation(documentation),
    maxLength,
    minLength,
  });
}

export function createEnumerationSimpleType(name: string, baseType: string, documentation: string): EnumerationSimpleType {
  return Object.assign(newEnumerationSimpleType(), {
    name,
    baseType,
    annotation: createAnnotation(documentation),
  });
}

export function createEnumerationToken(value: string, documentation: string): EnumerationToken {
  return Object.assign(newEnumerationToken(), {
    value,
    annotation: createAnnotation(documentation),
  });
}

export function createElementComplexTypeItem(name: string, documentation: string, type: string, minOccurs: string = '', maxOccurs: string = '', maxOccursIsUnbounded: boolean = false): Element {
  return Object.assign(newElement(), {
    name,
    type,
    annotation: createAnnotation(documentation),
    minOccurs,
    maxOccurs,
    maxOccursIsUnbounded,
  });
}

export function createElementGroupComplexTypeItem(isChoice: boolean = false, minOccurs: string = '', maxOccurs: string = '', maxOccursIsUnbounded: boolean = false): ElementGroup {
  return Object.assign(newElementGroup(), {
    isChoice,
    minOccurs,
    maxOccurs,
    maxOccursIsUnbounded,
  });
}

export function createComplexType(name: string, documentation: string, baseType: string = '', isAbstract: boolean = false): ComplexType {
  return Object.assign(newComplexType(), {
    name,
    baseType,
    annotation: createAnnotation(documentation),
    isAbstract,
  });
}

export function createSchemaSection(documentation: string): SchemaSection {
  return Object.assign(newSchemaSection(), {
    sectionAnnotation: createAnnotation(documentation),
  });
}

export function createSchema(schemaVersion: string, documentation: string, isExtension: boolean = false): SchemaContainer {
  return Object.assign(newSchemaContainer(), {
    schemaVersion,
    schemaAnnotation: createAnnotation(documentation),
    isExtension,
  });
}
