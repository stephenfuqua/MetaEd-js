import deepFreeze from 'deep-freeze';
import { ModelBase, ModelBaseSourceMap, newModelBaseSourceMap, newModelBase } from './ModelBase';
import { ModelType } from './ModelType';
import { SourceMap, NoSourceMap } from './SourceMap';

export interface DomainItemSourceMap extends ModelBaseSourceMap {
  referencedType: SourceMap;
  referencedNamespaceName: SourceMap;
  typeHumanizedName: SourceMap;
}

/**
 *
 */
export function newDomainItemSourceMap(): DomainItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    referencedType: NoSourceMap,
    referencedNamespaceName: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export interface DomainItem extends ModelBase {
  sourceMap: DomainItemSourceMap;
  referencedType: ModelType;
  referencedNamespaceName: string;
  typeHumanizedName: string;
}

/**
 *
 */
export function newDomainItem(): DomainItem {
  return {
    ...newModelBase(),
    type: 'domainItem',
    typeHumanizedName: 'Domain Item',
    referencedType: 'unknown',
    referencedNamespaceName: '',
    sourceMap: newDomainItemSourceMap(),
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
