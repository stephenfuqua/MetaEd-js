// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { ModelType } from './ModelType';
import type { SourceMap } from './SourceMap';

export class DomainItemSourceMap extends ModelBaseSourceMap {
  referencedType: ?SourceMap;
}

export class DomainItem extends ModelBase {
  referencedType: ModelType;
  sourceMap: DomainItemSourceMap;
}

export function domainItemFactory(): DomainItem {
  return Object.assign(new DomainItem(), {
    type: 'domainItem',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    referencedType: 'unknown',
    sourceMap: new DomainItemSourceMap(),
  });
}

export const NoDomainItem: DomainItem = Object.assign(domainItemFactory(), {
  metaEdName: 'NoDomainItem',
});

export const asDomainItem = (x: ModelBase): DomainItem => ((x: any): DomainItem);
