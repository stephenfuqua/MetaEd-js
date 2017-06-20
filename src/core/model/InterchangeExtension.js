// @flow
import { Interchange, InterchangeSourceMap } from './Interchange';
import { namespaceInfoFactory } from './NamespaceInfo';

export class InterchangeExtension extends Interchange {}

export function interchangeExtensionFactory(): InterchangeExtension {
  return Object.assign(new InterchangeExtension(), {
    type: 'interchangeExtension',
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
