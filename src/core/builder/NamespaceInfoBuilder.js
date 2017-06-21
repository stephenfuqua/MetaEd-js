// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';
import type { EntityRepository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';
import { NoNamespaceInfo, namespaceInfoFactory } from '../model/NamespaceInfo';
import { sourceMapFrom } from '../model/SourceMap';
import { isErrorText } from './BuilderUtility';
import type { ValidationFailure } from '../validator/ValidationFailure';

export function enteringNamespaceName(context: MetaEdGrammar.NamespaceNameContext, namespaceInfo: NamespaceInfo): NamespaceInfo {
  if (namespaceInfo === NoNamespaceInfo || isErrorText(context.NAMESPACE_ID().getText())) return namespaceInfoFactory();

  if (context.exception ||
    context.NAMESPACE_ID() == null ||
    context.NAMESPACE_ID().exception != null ||
    context.NAMESPACE_ID().getText() == null) return namespaceInfo;

  Object.assign(namespaceInfo, { namespace: context.NAMESPACE_ID().getText() });
  Object.assign(namespaceInfo.sourceMap, { namespace: sourceMapFrom(context) });
  return namespaceInfo;
}

export function enteringNamespaceType(context: MetaEdGrammar.NamespaceTypeContext, namespaceInfo: NamespaceInfo): NamespaceInfo {
  if (namespaceInfo === NoNamespaceInfo) return namespaceInfo;
  if (context.exception) return namespaceInfo;
  if (context.CORE() != null) return namespaceInfo;
  if (context.ID() == null || context.ID().exception != null || isErrorText(context.ID().getText())) return namespaceInfo;

  Object.assign(namespaceInfo, { projectExtension: context.ID().getText(), isExtension: true });
  Object.assign(namespaceInfo.sourceMap, { projectExtension: sourceMapFrom(context), isExtension: sourceMapFrom(context) });
  return namespaceInfo;
}

export default class NamespaceInfoBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  currentNamespaceInfo: NamespaceInfo;
  validationFailures: Array<ValidationFailure>;

  constructor(entityRepository: EntityRepository, validationFailures: Array<ValidationFailure>) {
    super();
    this.entityRepository = entityRepository;
    this.currentNamespaceInfo = NoNamespaceInfo;
    this.validationFailures = validationFailures;
  }

  // eslint-disable-next-line no-unused-vars
  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (context.exception) return;
    if (this.currentNamespaceInfo !== NoNamespaceInfo) return;
    this.currentNamespaceInfo = namespaceInfoFactory();
    this.currentNamespaceInfo.sourceMap.type = sourceMapFrom(context);
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    if (this.currentNamespaceInfo === NoNamespaceInfo) return;
    this.currentNamespaceInfo = enteringNamespaceName(context, this.currentNamespaceInfo);
  }

  enterNamespaceType(context: MetaEdGrammar.NamespaceTypeContext) {
    if (this.currentNamespaceInfo === NoNamespaceInfo) return;
    this.currentNamespaceInfo = enteringNamespaceType(context, this.currentNamespaceInfo);
  }

  // eslint-disable-next-line no-unused-vars
  exitNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.currentNamespaceInfo === NoNamespaceInfo) return;
    this.entityRepository.namespaceInfo.push(this.currentNamespaceInfo);
    this.currentNamespaceInfo = NoNamespaceInfo;
  }
}
