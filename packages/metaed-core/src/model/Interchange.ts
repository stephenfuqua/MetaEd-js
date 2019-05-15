import deepFreeze from 'deep-freeze';
import { InterchangeItem } from './InterchangeItem';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { newNamespace } from './Namespace';

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
    baseEntityNamespaceName: '',
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
