import { newNamespace, Namespace } from 'metaed-core';
import { SimpleTypeBase } from './SimpleTypeBase';
import { NoSimpleType } from './schema/SimpleType';

export interface DecimalType extends SimpleTypeBase {
  metaEdName: string;
  namespace: Namespace;
  generatedSimpleType: boolean;
  documentation: string;
  documentationInherited: boolean;
  typeHumanizedName: string;
  totalDigits: string;
  decimalPlaces: string;
  minValue: string;
  maxValue: string;
}

export function newDecimalType(): DecimalType {
  return {
    xsdMetaEdNameWithExtension: '',
    xsdSimpleType: NoSimpleType,
    metaEdName: '',
    namespace: newNamespace(),
    generatedSimpleType: false,
    documentation: '',
    documentationInherited: false,
    typeHumanizedName: 'Decimal Type',
    totalDigits: '',
    decimalPlaces: '',
    minValue: '',
    maxValue: '',
  };
}
