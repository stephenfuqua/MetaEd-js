// @flow
import { String as sugar } from 'sugar';
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../grammar/gen/MetaEdGrammarListener';
import type { EntityRepository } from '../model/EntityRepository';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { Namespace } from '../model/Namespace';
import { NoNamespace, newNamespace } from '../model/Namespace';
import { sourceMapFrom } from '../model/SourceMap';
import { isErrorText } from './BuilderUtility';
import type { ValidationFailure } from '../validator/ValidationFailure';

export function namespaceNameFrom(context: MetaEdGrammar.NamespaceNameContext): string {
  if (
    context.exception ||
    context.NAMESPACE_ID() == null ||
    context.NAMESPACE_ID().exception != null ||
    context.NAMESPACE_ID().getText() == null ||
    isErrorText(context.NAMESPACE_ID().getText())
  )
    return '';

  return context.NAMESPACE_ID().getText();
}

function enteringNamespaceName(context: MetaEdGrammar.NamespaceNameContext, namespace: Namespace): Namespace {
  if (namespace === NoNamespace || isErrorText(context.NAMESPACE_ID().getText())) return newNamespace();

  if (
    context.exception ||
    context.NAMESPACE_ID() == null ||
    context.NAMESPACE_ID().exception != null ||
    context.NAMESPACE_ID().getText() == null
  )
    return namespace;

  Object.assign(namespace, { namespaceName: context.NAMESPACE_ID().getText() });

  // This is a good guess -- capitalize the namespace -- given that projectName is not in the language yet,
  // but the AddProjectNameToNamespace task sets the correct value after the builders run
  namespace.projectName = sugar.capitalize(namespace.namespaceName);

  Object.assign(namespace.sourceMap, { namespaceName: sourceMapFrom(context) });
  return namespace;
}

function enteringNamespaceType(context: MetaEdGrammar.NamespaceTypeContext, namespace: Namespace): Namespace {
  if (namespace === NoNamespace) return namespace;
  if (context.exception) return namespace;
  if (context.CORE() != null) {
    Object.assign(namespace, { projectExtension: '', projectName: 'Ed-Fi', isExtension: false });
    return namespace;
  }
  if (context.ID() == null || context.ID().exception != null || isErrorText(context.ID().getText())) return namespace;

  Object.assign(namespace, {
    projectExtension: context.ID().getText(),
    isExtension: true,
  });
  Object.assign(namespace.sourceMap, { projectExtension: sourceMapFrom(context), isExtension: sourceMapFrom(context) });
  return namespace;
}

export class NamespaceBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  currentNamespace: Namespace;
  validationFailures: Array<ValidationFailure>;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.entityRepository = metaEd.entity;
    this.currentNamespace = NoNamespace;
    this.validationFailures = validationFailures;
  }

  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (context.exception) return;
    if (this.currentNamespace !== NoNamespace) return;
    this.currentNamespace = newNamespace();
    this.currentNamespace.sourceMap.type = sourceMapFrom(context);
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    if (this.currentNamespace === NoNamespace) return;
    this.currentNamespace = enteringNamespaceName(context, this.currentNamespace);
  }

  enterNamespaceType(context: MetaEdGrammar.NamespaceTypeContext) {
    if (this.currentNamespace === NoNamespace) return;
    this.currentNamespace = enteringNamespaceType(context, this.currentNamespace);
    // we don't wait for exitNamespace to finish building Namespaces
    this.entityRepository.namespace.set(this.currentNamespace.namespaceName, this.currentNamespace);
    this.currentNamespace = NoNamespace;
  }
}
