// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { Interchange } from '../model/Interchange';
import type { InterchangeItem } from '../model/InterchangeItem';
import type { Repository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';

import { interchangeFactory, NoInterchange } from '../model/Interchange';
import { interchangeItemFactory, NoInterchangeItem } from '../model/InterchangeItem';
import { namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval } from './BuilderUtility';

export default class InterchangeBuilder extends MetaEdGrammarListener {
  repository: Repository;
  namespaceInfo: NamespaceInfo;
  currentInterchange: Interchange;
  currentInterchangeItem: InterchangeItem;

  constructor(repository: Repository) {
    super();
    this.repository = repository;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentInterchange = NoInterchange;
    this.currentInterchangeItem = NoInterchangeItem;
  }

  // eslint-disable-next-line no-unused-vars
  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.namespaceInfo !== NoNamespaceInfo) return;
    this.namespaceInfo = namespaceInfoFactory();
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.namespaceInfo = enteringNamespaceName(context, this.namespaceInfo);
  }

  enterNamespaceType(context: MetaEdGrammar.NamespaceTypeContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.namespaceInfo = enteringNamespaceType(context, this.namespaceInfo);
  }

  // eslint-disable-next-line no-unused-vars
  exitNamespace(context: MetaEdGrammar.NamespaceContext) {
    this.namespaceInfo = NoNamespaceInfo;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentInterchange === NoInterchange) return;
    this.currentInterchange.documentation = extractDocumentation(context);
  }

  enterExtendedDocumentation(context: MetaEdGrammar.ExtendedDocumentationContext) {
    if (this.currentInterchange === NoInterchange) return;
    this.currentInterchange.extendedDocumentation = extractDocumentation(context);
  }

  enterUseCaseDocumentation(context: MetaEdGrammar.UseCaseDocumentationContext) {
    if (this.currentInterchange === NoInterchange) return;
    this.currentInterchange.useCaseDocumentation = extractDocumentation(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;

    if (this.currentInterchangeItem !== NoInterchangeItem) {
      this.currentInterchangeItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else {
      this.currentInterchange.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterInterchange(context: MetaEdGrammar.InterchangeContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentInterchange = Object.assign(interchangeFactory(), {
      namespaceInfo: this.namespaceInfo,
    });
  }

  // eslint-disable-next-line no-unused-vars
  enterInterchangeExtension(context: MetaEdGrammar.InterchangeExtensionContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentInterchange = Object.assign(interchangeFactory(), {
      namespaceInfo: this.namespaceInfo,
      isExtension: true,
    });
  }

  exitingInterchange() {
    if (this.currentInterchange === NoInterchange) return;
    // $FlowIgnore - allowing currentTopLevelEntity.type to specify the repository Map property
    this.repository[this.currentInterchange.type].set(this.currentInterchange.metaEdName, this.currentInterchange);
    this.currentInterchange = NoInterchange;
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
    if (this.currentInterchange === NoInterchange) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.currentInterchange.metaEdName = context.ID().getText();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.currentInterchange.metaEdName = context.ID().getText();
    this.currentInterchange.baseEntityName = context.ID().getText();
  }

  enterInterchangeElement(context: MetaEdGrammar.InterchangeElementContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.ID() == null || context.ID().exception) return;
    this.currentInterchangeItem = Object.assign(interchangeItemFactory(), { metaEdName: context.ID().getText() });
  }

  enterInterchangeIdentity(context: MetaEdGrammar.InterchangeIdentityContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.ID() == null || context.ID().exception) return;
    this.currentInterchangeItem = Object.assign(interchangeItemFactory(), { metaEdName: context.ID().getText() });
  }

  // eslint-disable-next-line no-unused-vars
  exitInterchangeElement(context: MetaEdGrammar.InterchangeElementContext) {
    if (this.currentInterchange === NoInterchange || this.currentInterchangeItem === NoInterchangeItem) return;
    this.currentInterchange.elements.push(this.currentInterchangeItem);
    this.currentInterchangeItem = NoInterchangeItem;
  }

  // eslint-disable-next-line no-unused-vars
  exitInterchangeIdentity(context: MetaEdGrammar.InterchangeIdentityContext) {
    if (this.currentInterchange === NoInterchange || this.currentInterchangeItem === NoInterchangeItem) return;
    this.currentInterchange.identityTemplates.push(this.currentInterchangeItem);
    this.currentInterchangeItem = NoInterchangeItem;
  }
}
