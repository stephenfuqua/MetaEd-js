// @flow

import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { Interchange } from '../model/Interchange';
import type { InterchangeItem } from '../model/InterchangeItem';
import type { Repository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';

import { interchangeFactory } from '../model/Interchange';
import { interchangeItemFactory } from '../model/InterchangeItem';
import { namespaceInfoFactory } from '../model/NamespaceInfo';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval } from './BuilderUtility';

export default class InterchangeBuilder extends MetaEdGrammarListener {
  currentInterchange: ?Interchange;
  currentInterchangeItem: ?InterchangeItem;
  repository: Repository;
  namespaceInfo: ?NamespaceInfo;

  constructor(repository: Repository) {
    super();
    this.repository = repository;
  }

  // eslint-disable-next-line no-unused-vars
  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.namespaceInfo != null) return;
    this.namespaceInfo = namespaceInfoFactory();
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    if (this.namespaceInfo == null) return;
    this.namespaceInfo = enteringNamespaceName(context, this.namespaceInfo);
  }

  enterNamespaceType(context: MetaEdGrammar.NamespaceTypeContext) {
    if (this.namespaceInfo == null) return;
    this.namespaceInfo = enteringNamespaceType(context, this.namespaceInfo);
  }

  // eslint-disable-next-line no-unused-vars
  exitNamespace(context: MetaEdGrammar.NamespaceContext) {
    this.namespaceInfo = null;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentInterchange == null) return;
    // $FlowIgnore - already null guarded
    this.currentInterchange.documentation = extractDocumentation(context);
  }

  enterExtendedDocumentation(context: MetaEdGrammar.ExtendedDocumentationContext) {
    if (this.currentInterchange == null) return;
    // $FlowIgnore - already null guarded
    this.currentInterchange.extendedDocumentation = extractDocumentation(context);
  }

  enterUseCaseDocumentation(context: MetaEdGrammar.UseCaseDocumentationContext) {
    if (this.currentInterchange == null) return;
    // $FlowIgnore - already null guarded
    this.currentInterchange.useCaseDocumentation = extractDocumentation(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentInterchange == null) return;
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;

    if (this.currentInterchangeItem != null) {
      // $FlowIgnore - already null guarded
      this.currentInterchangeItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else {
      // $FlowIgnore - already null guarded
      this.currentInterchange.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterInterchange(context: MetaEdGrammar.InterchangeContext) {
    if (this.namespaceInfo == null) return;
    this.currentInterchange = Object.assign(interchangeFactory(), {
      // $FlowIgnore - already null guarded
      namespaceInfo: this.namespaceInfo,
    });
  }

  // eslint-disable-next-line no-unused-vars
  enterInterchangeExtension(context: MetaEdGrammar.InterchangeExtensionContext) {
    if (this.namespaceInfo == null) return;
    this.currentInterchange = Object.assign(interchangeFactory(), {
      // $FlowIgnore - already null guarded
      namespaceInfo: this.namespaceInfo,
      isExtension: true,
    });
  }

  exitingInterchange() {
    if (this.currentInterchange == null) return;
    // $FlowIgnore - allowing currentTopLevelEntity.type to specify the repository Map property
    this.repository[this.currentInterchange.type].set(this.currentInterchange.metaEdName, this.currentInterchange);
    this.currentInterchange = null;
  }

  // eslint-disable-next-line no-unused-vars
  exitInterchange(context: MetaEdGrammar.InterchangeContext) {
    this.exitingInterchange();
  }

  // eslint-disable-next-line no-unused-vars
  exitInterchangeExtension(context: MetaEdGrammar.InterchangeExtensionContext) {
    this.exitingInterchange();
  }

  enterInterchangeName(context: MetaEdGrammar.InterchangeNameContext) {
    if (this.currentInterchange == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentInterchange.metaEdName = context.ID().getText();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentInterchange == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentInterchange.metaEdName = context.ID().getText();
    // $FlowIgnore - already null guarded
    this.currentInterchange.baseEntityName = context.ID().getText();
  }

  enterInterchangeElement(context: MetaEdGrammar.InterchangeElementContext) {
    if (this.currentInterchange == null) return;
    if (context.ID() == null || context.ID().exception) return;
    this.currentInterchangeItem = Object.assign(interchangeItemFactory(), { metaEdName: context.ID().getText() });
  }

  enterInterchangeIdentity(context: MetaEdGrammar.InterchangeIdentityContext) {
    if (this.currentInterchange == null) return;
    if (context.ID() == null || context.ID().exception) return;
    this.currentInterchangeItem = Object.assign(interchangeItemFactory(), { metaEdName: context.ID().getText() });
  }

  // eslint-disable-next-line no-unused-vars
  exitInterchangeElement(context: MetaEdGrammar.InterchangeElementContext) {
    if (this.currentInterchange == null || this.currentInterchangeItem == null) return;
    this.currentInterchange.elements.push(this.currentInterchangeItem);
    this.currentInterchangeItem = null;
  }

  // eslint-disable-next-line no-unused-vars
  exitInterchangeIdentity(context: MetaEdGrammar.InterchangeIdentityContext) {
    if (this.currentInterchange == null || this.currentInterchangeItem == null) return;
    this.currentInterchange.identityTemplates.push(this.currentInterchangeItem);
    this.currentInterchangeItem = null;
  }
}
