import deepFreeze from 'deep-freeze';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { EntityProperty } from './property/EntityProperty';
import { newNamespace } from './Namespace';

export interface StringTypeSourceMap extends ModelBaseSourceMap {
  documentationInherited: SourceMap;
  minLength: SourceMap;
  maxLength: SourceMap;
}

export function newStringTypeSourceMap(): StringTypeSourceMap {
  return {
    ...newModelBaseSourceMap(),
    documentationInherited: NoSourceMap,
    minLength: NoSourceMap,
    maxLength: NoSourceMap,
  };
}

// Note these are XSD specific with the advent of SharedString, and creation should be move to XSD enhancers
export interface StringType extends ModelBase {
  generatedSimpleType: boolean;
  documentationInherited: boolean;
  typeHumanizedName: string;
  minLength: string;
  maxLength: string;
  referringSimpleProperties: EntityProperty[];
  sourceMap: StringTypeSourceMap;
}

export function newStringType(): StringType {
  return {
    type: 'stringType',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
    generatedSimpleType: false,
    documentationInherited: false,
    typeHumanizedName: 'String Type',
    minLength: '',
    maxLength: '',
    referringSimpleProperties: [],
    sourceMap: newStringTypeSourceMap(),
    data: {},
    config: {},
  };
}

export const NoStringType: StringType = deepFreeze(
  Object.assign(newStringType(), {
    metaEdName: 'NoStringType',
  }),
);

export const asStringType = (x: ModelBase): StringType => x as StringType;
