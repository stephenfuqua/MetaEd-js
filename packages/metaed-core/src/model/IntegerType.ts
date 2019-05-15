import deepFreeze from 'deep-freeze';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { EntityProperty } from './property/EntityProperty';
import { newNamespace } from './Namespace';

export interface IntegerTypeSourceMap extends ModelBaseSourceMap {
  generatedSimpleType: SourceMap;
  documentationInherited: SourceMap;
  isShort: SourceMap;
  minValue: SourceMap;
  maxValue: SourceMap;
}

export function newIntegerTypeSourceMap(): IntegerTypeSourceMap {
  return {
    ...newModelBaseSourceMap(),
    generatedSimpleType: NoSourceMap,
    documentationInherited: NoSourceMap,
    isShort: NoSourceMap,
    minValue: NoSourceMap,
    maxValue: NoSourceMap,
  };
}

// Note these are XSD specific with the advent of SharedInteger, and creation should be move to XSD enhancers
export interface IntegerType extends ModelBase {
  generatedSimpleType: boolean;
  documentationInherited: boolean;
  typeHumanizedName: string;
  isShort: boolean;
  minValue: string;
  maxValue: string;
  referringSimpleProperties: EntityProperty[];
  sourceMap: IntegerTypeSourceMap;
}

export function newIntegerType(): IntegerType {
  return {
    type: 'integerType',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
    generatedSimpleType: false,
    documentationInherited: false,
    typeHumanizedName: 'Integer Type',
    isShort: false,
    minValue: '',
    maxValue: '',
    referringSimpleProperties: [],
    sourceMap: newIntegerTypeSourceMap(),
    data: {},
    config: {},
  };
}

export function newShortType(): IntegerType {
  return {
    ...newIntegerType(),
    isShort: true,
  };
}

export const NoIntegerType: IntegerType = deepFreeze({
  ...newIntegerType(),
  metaEdName: 'NoIntegerType',
});

export const asIntegerType = (x: ModelBase): IntegerType => x as IntegerType;
