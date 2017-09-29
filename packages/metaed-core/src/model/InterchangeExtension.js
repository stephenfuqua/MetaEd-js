// @flow
import { Interchange, InterchangeSourceMap } from './Interchange';
import type { ModelBase } from './ModelBase';
import { newNamespaceInfo } from './NamespaceInfo';

export class InterchangeExtension extends Interchange {}

export function newInterchangeExtension(): InterchangeExtension {
  return Object.assign(new InterchangeExtension(), {
    type: 'interchangeExtension',
    typeHumanizedName: 'Interchange Extension',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),

    elements: [],
    identityTemplates: [],
    extendedDocumentation: '',
    useCaseDocumentation: '',
    baseEntityName: '',
    baseEntity: null,

    sourceMap: new InterchangeSourceMap(),
    data: {},
  });
}

export const asInterchangeExtension = (x: ModelBase): InterchangeExtension => ((x: any): InterchangeExtension);
