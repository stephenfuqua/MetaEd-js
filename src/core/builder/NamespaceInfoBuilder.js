// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';
import type { EntityRepository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';
import { namespaceInfoFactory } from '../model/NamespaceInfo';
import { isErrorText } from './BuilderUtility';

export function enteringNamespaceName(context: MetaEdGrammar.NamespaceNameContext, namespaceInfo: ?NamespaceInfo): NamespaceInfo {
  if (namespaceInfo == null || isErrorText(context.NAMESPACE_ID().getText())) return namespaceInfoFactory();

  if (context.exception != null ||
    context.NAMESPACE_ID() == null ||
    context.NAMESPACE_ID().exception != null ||
    context.NAMESPACE_ID().getText() == null) return namespaceInfo;

  return Object.assign(namespaceInfo, { namespace: context.NAMESPACE_ID().getText() });
}

export function enteringNamespaceType(context: MetaEdGrammar.NamespaceTypeContext, namespaceInfo: ?NamespaceInfo): ?NamespaceInfo {
  if (namespaceInfo == null) return namespaceInfo;

  if (context.CORE() != null) return namespaceInfo;
  if (context.ID() == null || context.ID().exception != null || isErrorText(context.ID().getText())) return namespaceInfo;

  return Object.assign(namespaceInfo, { projectExtension: context.ID().getText(), isExtension: true });
}

export default class NamespaceInfoBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  namespaceInfo: ?NamespaceInfo;

  constructor(entityRepository: EntityRepository) {
    super();
    this.entityRepository = entityRepository;
  }

  // eslint-disable-next-line no-unused-vars
  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.namespaceInfo != null) return;
    this.namespaceInfo = namespaceInfoFactory();
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    this.namespaceInfo = enteringNamespaceName(context, this.namespaceInfo);
  }

  enterNamespaceType(context: MetaEdGrammar.NamespaceTypeContext) {
    this.namespaceInfo = enteringNamespaceType(context, this.namespaceInfo);
  }

  // eslint-disable-next-line no-unused-vars
  exitNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.namespaceInfo == null) return;
    this.entityRepository.namespaceInfo.set(this.namespaceInfo.namespace, this.namespaceInfo);
    this.namespaceInfo = null;
  }
}
