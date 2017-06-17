// @flow
import { InterchangeItem } from './InterchangeItem';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';

export class InterchangeSourceMap extends ModelBaseSourceMap {
  elements: ?Array<SourceMap>;
  identityTemplates: ?Array<SourceMap>;
  isExtension: ?SourceMap;
  extendedDocumentation: ?SourceMap;
  useCaseDocumentation: ?SourceMap;
}

export class Interchange extends ModelBase {
  elements: Array<InterchangeItem>;
  identityTemplates: Array<InterchangeItem>;
  isExtension: boolean;
  extendedDocumentation: string;
  useCaseDocumentation: string;
  baseEntityName: string;
  baseEntity: ?Interchange;
  sourceMap: InterchangeSourceMap;
}

export function interchangeFactory(): Interchange {
  return Object.assign(new Interchange(), {
    type: 'interchange',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),

    elements: [],
    identityTemplates: [],
    isExtension: false,
    extendedDocumentation: '',
    useCaseDocumentation: '',
    baseEntityName: '',
    baseEntity: null,

    sourceMap: new InterchangeSourceMap(),
  });
}

export const NoInterchange: Interchange = Object.assign(interchangeFactory(), {
  metaEdName: 'NoInterchange',
});
