// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { Interchange } from '../model/Interchange';
import type { InterchangeItem } from '../model/InterchangeItem';
import type { EntityRepository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';

import { interchangeFactory, NoInterchange } from '../model/Interchange';
import { interchangeItemFactory, NoInterchangeItem } from '../model/InterchangeItem';
import { interchangeExtensionFactory } from '../model/InterchangeExtension';
import { namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval, isErrorText } from './BuilderUtility';
import type { ValidationFailure } from '../validator/ValidationFailure';

export default class InterchangeBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  namespaceInfo: NamespaceInfo;
  currentInterchange: Interchange;
  currentInterchangeItem: InterchangeItem;
  validationFailures: Array<ValidationFailure>;

  constructor(entityRepository: EntityRepository, validationFailures: Array<ValidationFailure>) {
    super();
    this.entityRepository = entityRepository;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentInterchange = NoInterchange;
    this.currentInterchangeItem = NoInterchangeItem;
    this.validationFailures = validationFailures;
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
    if (context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;

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
    this.currentInterchange = Object.assign(interchangeExtensionFactory(), {
      namespaceInfo: this.namespaceInfo,
    });
  }

  exitingInterchange() {
    if (this.currentInterchange === NoInterchange) return;
    if (this.currentInterchange.metaEdName) {
      const extensionMessageString = this.currentInterchange.type === 'interchangeExtension' ? 'Extension ' : '';
      // $FlowIgnore - allow currentInterchange.type to specify the entityRepository Map property
      if (this.entityRepository[this.currentInterchange.type].has(this.currentInterchange.metaEdName)) {
        this.validationFailures.push({
          validatorName: 'InterchangeBuilder',
          category: 'error',
          message: `Interchange ${extensionMessageString}named ${this.currentInterchange.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: this.currentInterchange.sourceMap.type,
          fileMap: null,
        });
        // $FlowIgnore - we ensure the key is in the map above, and allow currentInterchange.type to specify the entityRepository Map property
        const duplicateEntity: Interchange = this.entityRepository[this.currentInterchange.type].get(this.currentInterchange.metaEdName);
        this.validationFailures.push({
          validatorName: 'InterchangeBuilder',
          category: 'error',
          message: `Interchange ${extensionMessageString}named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: duplicateEntity.sourceMap.type,
          fileMap: null,
        });
      } else {
        // $FlowIgnore - allow currentInterchange.type to specify the entityRepository Map property
        this.entityRepository[this.currentInterchange.type].set(this.currentInterchange.metaEdName, this.currentInterchange);
      }
    }
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
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentInterchange.metaEdName = context.ID().getText();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentInterchange.metaEdName = context.ID().getText();
    this.currentInterchange.baseEntityName = context.ID().getText();
  }

  enterInterchangeElement(context: MetaEdGrammar.InterchangeElementContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentInterchangeItem = Object.assign(interchangeItemFactory(), { metaEdName: context.ID().getText() });
  }

  enterInterchangeIdentity(context: MetaEdGrammar.InterchangeIdentityContext) {
    if (this.currentInterchange === NoInterchange) return;
    if (context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
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
