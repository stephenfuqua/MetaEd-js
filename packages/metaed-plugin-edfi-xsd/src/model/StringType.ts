import { newNamespace, Namespace } from 'metaed-core';
import { SimpleTypeBase } from './SimpleTypeBase';
import { NoSimpleType } from './schema/SimpleType';

export interface StringType extends SimpleTypeBase {
  metaEdName: string;
  namespace: Namespace;
  generatedSimpleType: boolean;
  documentation: string;
  documentationInherited: boolean;
  typeHumanizedName: string;
  minLength: string;
  maxLength: string;
}

export function newStringType(): StringType {
  return {
    xsdMetaEdNameWithExtension: '',
    xsdSimpleType: NoSimpleType,
    metaEdName: '',
    namespace: newNamespace(),
    generatedSimpleType: false,
    documentation: '',
    documentationInherited: false,
    typeHumanizedName: 'String Type',
    minLength: '',
    maxLength: '',
  };
}
