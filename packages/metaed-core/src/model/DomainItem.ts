import deepFreeze from 'deep-freeze';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { newNamespace } from './Namespace';
import { ModelType } from './ModelType';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export interface DomainItemSourceMap extends ModelBaseSourceMap {
  referencedType: SourceMap;
  typeHumanizedName: SourceMap;
}

/**
 *
 */
export function newDomainItemSourceMap(): DomainItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    referencedType: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export interface DomainItem extends ModelBase {
  sourceMap: DomainItemSourceMap;
  referencedType: ModelType;
  typeHumanizedName: string;
}

/**
 *
 */
export function newDomainItem(): DomainItem {
  return {
    type: 'domainItem',
    typeHumanizedName: 'Domain Item',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
    referencedType: 'unknown',
    sourceMap: newDomainItemSourceMap(),
    data: {},
    config: {},
  };
}

/**
 *
 */
export const NoDomainItem: DomainItem = deepFreeze({
  ...newDomainItem(),
  metaEdName: 'NoDomainItem',
});

/**
 *
 */
export const asDomainItem = (x: ModelBase): DomainItem => x as DomainItem;
