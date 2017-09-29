// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newNamespaceInfo } from './NamespaceInfo';
import type { ModelType } from './ModelType';
import type { SourceMap } from './SourceMap';

export class DomainItemSourceMap extends ModelBaseSourceMap {
  referencedType: ?SourceMap;
}

export class DomainItem extends ModelBase {
  typeHumanizedName: string;
  referencedType: ModelType;
  sourceMap: DomainItemSourceMap;
}

export function newDomainItem(): DomainItem {
  return Object.assign(new DomainItem(), {
    type: 'domainItem',
    typeHumanizedName: 'Domain Item',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),
    referencedType: 'unknown',
    sourceMap: new DomainItemSourceMap(),
    data: {},
  });
}

export const NoDomainItem: DomainItem = Object.assign(newDomainItem(), {
  metaEdName: 'NoDomainItem',
});

export const asDomainItem = (x: ModelBase): DomainItem => ((x: any): DomainItem);
