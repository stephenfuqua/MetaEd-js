// @flow
import deepFreeze from 'deep-freeze';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import type { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import type { EntityProperty } from './property/EntityProperty';
import { newNamespace } from './Namespace';

export type StringTypeSourceMap = {
  ...$Exact<ModelBaseSourceMap>,
  documentationInherited: SourceMap,
  minLength: ?SourceMap,
  maxLength: ?SourceMap,
};

export function newStringTypeSourceMap(): StringTypeSourceMap {
  return {
    ...newModelBaseSourceMap(),
    documentationInherited: NoSourceMap,
    minLength: NoSourceMap,
    maxLength: NoSourceMap,
  };
}

// Note these are XSD specific with the advent of SharedString, and creation should be move to XSD enhancers
export type StringType = {
  ...$Exact<ModelBase>,
  generatedSimpleType: boolean,
  documentationInherited: boolean,
  typeHumanizedName: string,
  minLength: string,
  maxLength: string,
  referringSimpleProperties: Array<EntityProperty>,
  sourceMap: StringTypeSourceMap,
};

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

export const asStringType = (x: ModelBase): StringType => ((x: any): StringType);
