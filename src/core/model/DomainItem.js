// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';

export class DomainItemSourceMap extends ModelBaseSourceMap {}

export class DomainItem extends ModelBase {
  sourceMap: DomainItemSourceMap;
}

export function domainItemFactory(): DomainItem {
  return Object.assign(new DomainItem(), {
    type: 'domainItem',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    sourceMap: new DomainItemSourceMap(),
  });
}

export const NoDomainItem: DomainItem = Object.assign(domainItemFactory(), {
  metaEdName: 'NoDomainItem',
});
