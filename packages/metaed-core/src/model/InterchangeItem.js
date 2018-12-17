// @flow
import deepFreeze from 'deep-freeze';
import type { ModelType } from './ModelType';
import type { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { newNamespace } from './Namespace';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { NoTopLevelEntity } from './TopLevelEntity';
import type { TopLevelEntity } from './TopLevelEntity';

export type InterchangeItemSourceMap = {
  ...$Exact<ModelBaseSourceMap>,
  referencedType: SourceMap,
  referencedEntity: SourceMap,
  typeHumanizedName: SourceMap,
};

/**
 *
 */
export function newInterchangeItemSourceMap(): InterchangeItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    referencedType: NoSourceMap,
    referencedEntity: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export type InterchangeItem = {
  sourceMap: InterchangeItemSourceMap,
  ...$Exact<ModelBase>,
  referencedType: Array<ModelType>,
  referencedEntity: TopLevelEntity,
  typeHumanizedName: string,
};

/**
 *
 */
export function newInterchangeItem(): InterchangeItem {
  return {
    type: 'interchangeItem',
    typeHumanizedName: 'Interchange Item',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
    referencedType: [],
    referencedEntity: NoTopLevelEntity,
    sourceMap: newInterchangeItemSourceMap(),
    data: {},
    config: {},
  };
}

/**
 *
 */
export const NoInterchangeItem: InterchangeItem = deepFreeze({
  ...newInterchangeItem(),
  metaEdName: 'NoInterchangeItem',
});

/**
 *
 */
export const asInterchangeItem = (x: ModelBase): InterchangeItem => ((x: any): InterchangeItem);
