// @flow
import { InterchangeItem } from './InterchangeItem';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';

export class InterchangeSourceMap extends ModelBaseSourceMap {
  elements: Array<SourceMap>;
  identityTemplates: Array<SourceMap>;
  extendedDocumentation: ?SourceMap;
  useCaseDocumentation: ?SourceMap;

  constructor() {
    super();
    this.elements = [];
    this.identityTemplates = [];
  }
}

export class Interchange extends ModelBase {
  elements: Array<InterchangeItem>;
  identityTemplates: Array<InterchangeItem>;
  extendedDocumentation: string;
  useCaseDocumentation: string;
  baseEntityName: string;
  baseEntity: ?Interchange;
  sourceMap: ModelBaseSourceMap | InterchangeSourceMap;
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

export const asInterchange = (x: ModelBase): Interchange => ((x: any): Interchange);
