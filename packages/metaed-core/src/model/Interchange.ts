import deepFreeze from 'deep-freeze';
import { InterchangeItem } from './InterchangeItem';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { newNamespace } from './Namespace';

export interface InterchangeSourceMap extends ModelBaseSourceMap {
  elements: Array<SourceMap>;
  identityTemplates: Array<SourceMap>;
  extendedDocumentation: SourceMap;
  useCaseDocumentation: SourceMap;
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
  };
}

export interface Interchange extends ModelBase {
  typeHumanizedName: string;
  elements: Array<InterchangeItem>;
  identityTemplates: Array<InterchangeItem>;
  extendedDocumentation: string;
  useCaseDocumentation: string;
  baseEntityName: string;
  baseEntity: Interchange | null;
  sourceMap: ModelBaseSourceMap | InterchangeSourceMap;
}

/**
 *
 */
export function newInterchange(): Interchange {
  return {
    type: 'interchange',
    typeHumanizedName: 'Interchange',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),

    elements: [],
    identityTemplates: [],
    extendedDocumentation: '',
    useCaseDocumentation: '',
    baseEntityName: '',
    baseEntity: null,

    sourceMap: newInterchangeSourceMap(),
    data: {},
    config: {},
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
