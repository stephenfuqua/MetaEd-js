// @flow

import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { Domain } from '../model/Domain';
import type { Subdomain } from '../model/Subdomain';
import type { DomainItem } from '../model/DomainItem';
import type { EntityRepository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';
import { NoNamespaceInfo, namespaceInfoFactory } from '../model/NamespaceInfo';
import { domainItemFactory, NoDomainItem } from '../model/DomainItem';
import { domainFactory, NoDomain } from '../model/Domain';
import { subdomainFactory } from '../model/Subdomain';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval } from './BuilderUtility';
import type { ValidationFailure } from '../validator/ValidationFailure';

export default class DomainBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  namespaceInfo: NamespaceInfo;
  currentDomain: Domain | Subdomain;
  currentDomainItem: DomainItem;
  validationFailures: Array<ValidationFailure>;

  constructor(entityRepository: EntityRepository, validationFailures: Array<ValidationFailure>) {
    super();
    this.entityRepository = entityRepository;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentDomain = NoDomain;
    this.currentDomainItem = NoDomainItem;
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
    if (this.currentDomain === NoDomain) return;
    this.currentDomain.documentation = extractDocumentation(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;

    if (this.currentDomainItem !== NoDomainItem) {
      this.currentDomainItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else {
      this.currentDomain.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterDomain(context: MetaEdGrammar.DomainContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentDomain = Object.assign(domainFactory(), { namespaceInfo: this.namespaceInfo });
  }

  // eslint-disable-next-line no-unused-vars
  enterSubdomain(context: MetaEdGrammar.SubdomainContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentDomain = Object.assign(subdomainFactory(), { namespaceInfo: this.namespaceInfo });
  }

  exitingEntity() {
    if (this.currentDomain === NoDomain) return;
    // $FlowIgnore - allowing currentDomain.type to specify the entityRepository Map property
    const currentDomainRepository = this.entityRepository[this.currentDomain.type];
    if (currentDomainRepository.has(this.currentDomain.metaEdName)) {
      this.validationFailures.push({
        validatorName: 'DomainBuilder',
        category: 'error',
        message: `${this.currentDomain.typeGroupHumanizedName} named ${this.currentDomain.metaEdName} is a duplicate declaration of that name.`,
        sourceMap: this.currentDomain.sourceMap.type,
        fileMap: null,
      });
      const duplicateEntity: Domain | Subdomain = currentDomainRepository.get(this.currentDomain.metaEdName);
      this.validationFailures.push({
        validatorName: 'DomainBuilder',
        category: 'error',
        message: `${duplicateEntity.typeGroupHumanizedName} named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
        sourceMap: duplicateEntity.sourceMap.type,
        fileMap: null,
      });
    } else {
      currentDomainRepository.set(this.currentDomain.metaEdName, this.currentDomain);
    }

    this.currentDomain = NoDomain;
  }

  // eslint-disable-next-line no-unused-vars
  exitDomain(context: MetaEdGrammar.DomainContext) {
    this.exitingEntity();
  }

  // eslint-disable-next-line no-unused-vars
  exitSubdomain(context: MetaEdGrammar.DomainContext) {
    this.exitingEntity();
  }

  enterDomainName(context: MetaEdGrammar.DomainNameContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.currentDomain.metaEdName = context.ID().getText();
  }

  enterSubdomainName(context: MetaEdGrammar.SubdomainNameContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.currentDomain.metaEdName = context.ID().getText();
  }

  enterParentDomainName(context: MetaEdGrammar.ParentDomainNameContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    ((this.currentDomain: any): Subdomain).parentMetaEdName = context.ID().getText();
  }

  enterSubdomainPosition(context: MetaEdGrammar.SubdomainPositionContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception) return;
    ((this.currentDomain: any): Subdomain).position = Number(context.UNSIGNED_INT().getText());
  }

  enterDomainItem(context: MetaEdGrammar.DomainItemContext) {
    if (context.ID() == null || context.ID().exception) return;
    this.currentDomainItem = Object.assign(domainItemFactory(), { metaEdName: context.ID().getText() });
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainItem(context: MetaEdGrammar.DomainItemContext) {
    if (this.currentDomain === NoDomain || this.currentDomainItem === NoDomainItem) return;
    this.currentDomain.domainItems.push(this.currentDomainItem);
    this.currentDomainItem = NoDomainItem;
  }

  enterFooterDocumentation(context: MetaEdGrammar.FooterDocumentationContext) {
    if (this.currentDomain === NoDomain) return;
    ((this.currentDomain: any): Domain).footerDocumentation = extractDocumentation(context);
  }
}
