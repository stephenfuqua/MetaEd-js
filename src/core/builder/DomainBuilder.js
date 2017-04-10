// @flow

import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { Domain } from '../model/Domain';
import type { Subdomain } from '../model/Subdomain';
import type { DomainItem } from '../model/DomainItem';
import type { Repository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';

import { domainItemFactory } from '../model/DomainItem';
import { domainFactory } from '../model/Domain';
import { subdomainFactory } from '../model/Subdomain';
import { namespaceInfoFactory } from '../model/NamespaceInfo';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval } from './BuilderUtility';

export default class DomainBuilder extends MetaEdGrammarListener {
  currentDomain: ?Domain | ?Subdomain;
  currentDomainItem: ?DomainItem;
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
    if (this.currentDomain == null) return;
    // $FlowIgnore - already null guarded
    this.currentDomain.documentation = extractDocumentation(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentDomain == null) return;
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;

    if (this.currentDomainItem != null) {
      // $FlowIgnore - already null guarded
      this.currentDomainItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else {
      // $FlowIgnore - already null guarded
      this.currentDomain.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterDomain(context: MetaEdGrammar.DomainContext) {
    if (this.namespaceInfo == null) return;
    // $FlowIgnore - already null guarded
    this.currentDomain = Object.assign(domainFactory(), { namespaceInfo: this.namespaceInfo });
  }

  // eslint-disable-next-line no-unused-vars
  enterSubdomain(context: MetaEdGrammar.SubdomainContext) {
    if (this.namespaceInfo == null) return;
    // $FlowIgnore - already null guarded
    this.currentDomain = Object.assign(subdomainFactory(), { namespaceInfo: this.namespaceInfo });
  }

  exitingEntity() {
    if (this.currentDomain == null) return;
    // $FlowIgnore - allowing currentDomain.type to specify the repository Map property
    this.repository[this.currentDomain.type].set(this.currentDomain.metaEdName, this.currentDomain);
    this.currentDomain = null;
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
    if (this.currentDomain == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentDomain.metaEdName = context.ID().getText();
  }

  enterSubdomainName(context: MetaEdGrammar.SubdomainNameContext) {
    if (this.currentDomain == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentDomain.metaEdName = context.ID().getText();
  }

  enterParentDomainName(context: MetaEdGrammar.ParentDomainNameContext) {
    if (this.currentDomain == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    ((this.currentDomain: any): Subdomain).parentMetaEdName = context.ID().getText();
  }

  enterSubdomainPosition(context: MetaEdGrammar.SubdomainPositionContext) {
    if (this.currentDomain == null) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception) return;
    ((this.currentDomain: any): Subdomain).position = Number(context.UNSIGNED_INT().getText());
  }

  enterDomainItem(context: MetaEdGrammar.DomainItemContext) {
    if (context.ID() == null || context.ID().exception) return;
    this.currentDomainItem = Object.assign(domainItemFactory(), { metaEdName: context.ID().getText() });
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainItem(context: MetaEdGrammar.DomainItemContext) {
    if (this.currentDomain == null || this.currentDomainItem == null) return;
    this.currentDomain.domainItems.push(this.currentDomainItem);
    this.currentDomainItem = null;
  }

  enterFooterDocumentation(context: MetaEdGrammar.FooterDocumentationContext) {
    if (this.currentDomain == null) return;
    ((this.currentDomain: any): Domain).footerDocumentation = extractDocumentation(context);
  }
}
