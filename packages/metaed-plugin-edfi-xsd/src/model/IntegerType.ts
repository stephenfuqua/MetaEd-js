import { newNamespace, Namespace } from 'metaed-core';
import { SimpleTypeBase } from './SimpleTypeBase';
import { NoSimpleType } from './schema/SimpleType';

export interface IntegerType extends SimpleTypeBase {
  metaEdName: string;
  namespace: Namespace;
  generatedSimpleType: boolean;
  documentation: string;
  documentationInherited: boolean;
  typeHumanizedName: string;
  isShort: boolean;
  minValue: string;
  maxValue: string;
}

export function newIntegerType(): IntegerType {
  return {
    xsdMetaEdNameWithExtension: '',
    xsdSimpleType: NoSimpleType,
    metaEdName: '',
    namespace: newNamespace(),
    generatedSimpleType: false,
    documentation: '',
    documentationInherited: false,
    typeHumanizedName: 'Integer Type',
    isShort: false,
    minValue: '',
    maxValue: '',
  };
}

export function newShortType(): IntegerType {
  return {
    ...newIntegerType(),
    isShort: true,
  };
}
