import deepFreeze from 'deep-freeze';
import { InterchangeItem } from './InterchangeItem';
import { SourceMap, NoSourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap, newModelBaseSourceMap, newModelBase } from './ModelBase';

export interface InterchangeSourceMap extends ModelBaseSourceMap {
  elements: SourceMap[];
  identityTemplates: SourceMap[];
  extendedDocumentation: SourceMap;
  useCaseDocumentation: SourceMap;
  baseEntityName: SourceMap;
  baseEntityNamespaceName: SourceMap;
  baseEntity: SourceMap;
}

/**
 *
 */
export function newInterchangeSourceMap(): InterchangeSourceMap {
  return {
    ...newModelBaseSourceMap(),
    elements: [],
    identityTemplates: [],
    extendedDocumentation: NoSourceMap,
    useCaseDocumentation: NoSourceMap,
    baseEntityName: NoSourceMap,
    baseEntityNamespaceName: NoSourceMap,
    baseEntity: NoSourceMap,
  };
}

export interface Interchange extends ModelBase {
  typeHumanizedName: string;
  elements: InterchangeItem[];
  identityTemplates: InterchangeItem[];
  extendedDocumentation: string;
  useCaseDocumentation: string;
  baseEntityName: string;
  baseEntityNamespaceName: string;
  baseEntity: Interchange | null;
  sourceMap: InterchangeSourceMap;
}

/**
 *
 */
export function newInterchange(): Interchange {
  return {
    ...newModelBase(),
    type: 'interchange',
    typeHumanizedName: 'Interchange',
    elements: [],
    identityTemplates: [],
    extendedDocumentation: '',
    useCaseDocumentation: '',
    baseEntityName: '',
    baseEntityNamespaceName: '',
    baseEntity: null,
    sourceMap: newInterchangeSourceMap(),
  };
}

/**
 *
 */
export const NoInterchange: Interchange = deepFreeze({
  ...newInterchange(),
  metaEdName: 'NoInterchange',
});

/**
 *
 */
export const asInterchange = (x: ModelBase): Interchange => x as Interchange;
