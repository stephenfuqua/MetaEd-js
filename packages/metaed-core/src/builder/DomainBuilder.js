// @flow

import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../grammar/gen/MetaEdGrammarListener';

import type { Domain, DomainSourceMap } from '../model/Domain';
import type { Subdomain, SubdomainSourceMap } from '../model/Subdomain';
import type { DomainItem, DomainItemSourceMap } from '../model/DomainItem';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { NamespaceInfo } from '../model/NamespaceInfo';
import { NoNamespaceInfo, newNamespaceInfo } from '../model/NamespaceInfo';
import { newDomainItem, NoDomainItem } from '../model/DomainItem';
import { newDomain, NoDomain } from '../model/Domain';
import { newSubdomain } from '../model/Subdomain';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval, isErrorText } from './BuilderUtility';
import type { ValidationFailure } from '../validator/ValidationFailure';
import { sourceMapFrom } from '../model/SourceMap';

export class DomainBuilder extends MetaEdGrammarListener {
  metaEd: MetaEdEnvironment;
  namespaceInfo: NamespaceInfo;
  currentDomain: Domain | Subdomain;
  currentDomainItem: DomainItem;
  validationFailures: Array<ValidationFailure>;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.metaEd = metaEd;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentDomain = NoDomain;
    this.currentDomainItem = NoDomainItem;
    this.validationFailures = validationFailures;
  }

  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.namespaceInfo !== NoNamespaceInfo) return;
    this.namespaceInfo = newNamespaceInfo();
    this.namespaceInfo.sourceMap.type = sourceMapFrom(context);
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
    this.currentDomain.sourceMap.documentation = sourceMapFrom(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;

    if (this.currentDomainItem !== NoDomainItem) {
      this.currentDomainItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
      this.currentDomainItem.sourceMap.metaEdId = sourceMapFrom(context);
    } else {
      this.currentDomain.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
      this.currentDomain.sourceMap.metaEdId = sourceMapFrom(context);
    }
  }

  enterDomain(context: MetaEdGrammar.DomainContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentDomain = Object.assign(newDomain(), { namespaceInfo: this.namespaceInfo });
    this.currentDomain.sourceMap.type = sourceMapFrom(context);
    this.currentDomain.sourceMap.namespaceInfo = this.namespaceInfo.sourceMap.type;
  }

  enterSubdomain(context: MetaEdGrammar.SubdomainContext) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentDomain = Object.assign(newSubdomain(), { namespaceInfo: this.namespaceInfo });
    this.currentDomain.sourceMap.type = sourceMapFrom(context);
    this.currentDomain.sourceMap.namespaceInfo = this.namespaceInfo.sourceMap.type;
  }

  exitingEntity() {
    if (this.currentDomain === NoDomain) return;
    // $FlowIgnore
    const currentDomainRepository = this.metaEd.entity[this.currentDomain.type];
    if (this.currentDomain.metaEdName) {
      if (currentDomainRepository.has(this.currentDomain.metaEdName)) {
        this.validationFailures.push({
          validatorName: 'DomainBuilder',
          category: 'error',
          message: `${this.currentDomain.typeHumanizedName} named ${this.currentDomain.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: this.currentDomain.sourceMap.type,
          fileMap: null,
        });
        const duplicateEntity: Domain | Subdomain = currentDomainRepository.get(this.currentDomain.metaEdName);
        this.validationFailures.push({
          validatorName: 'DomainBuilder',
          category: 'error',
          message: `${duplicateEntity.typeHumanizedName} named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: duplicateEntity.sourceMap.type,
          fileMap: null,
        });
      } else {
        currentDomainRepository.set(this.currentDomain.metaEdName, this.currentDomain);
      }
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
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentDomain.metaEdName = context.ID().getText();
    this.currentDomain.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterSubdomainName(context: MetaEdGrammar.SubdomainNameContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentDomain.metaEdName = context.ID().getText();
    this.currentDomain.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterParentDomainName(context: MetaEdGrammar.ParentDomainNameContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    ((this.currentDomain: any): Subdomain).parentMetaEdName = context.ID().getText();
    ((this.currentDomain.sourceMap: any): SubdomainSourceMap).parent = sourceMapFrom(context);
    ((this.currentDomain.sourceMap: any): SubdomainSourceMap).parentMetaEdName = sourceMapFrom(context);
  }

  enterSubdomainPosition(context: MetaEdGrammar.SubdomainPositionContext) {
    if (this.currentDomain === NoDomain) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentDomain: any): Subdomain).position = Number(context.UNSIGNED_INT().getText());
    ((this.currentDomain.sourceMap: any): SubdomainSourceMap).position = sourceMapFrom(context);
  }

  enterDomainItem(context: MetaEdGrammar.DomainItemContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentDomainItem = Object.assign(newDomainItem(), { metaEdName: context.ID().getText() });
    ((this.currentDomainItem.sourceMap: any): DomainItemSourceMap).metaEdName = sourceMapFrom(context);
    ((this.currentDomainItem.sourceMap: any): DomainItemSourceMap).referencedType = sourceMapFrom(context);

    // mutually exclusive in language
    if (context.ASSOCIATION_KEYWORD()) this.currentDomainItem.referencedType = 'association';
    if (context.COMMON_KEYWORD()) this.currentDomainItem.referencedType = 'common';
    if (context.DOMAIN_ENTITY_KEYWORD()) this.currentDomainItem.referencedType = 'domainEntity';
    if (context.DESCRIPTOR_KEYWORD()) this.currentDomainItem.referencedType = 'descriptor';
    if (context.INLINE_COMMON_KEYWORD()) this.currentDomainItem.referencedType = 'inlineCommon';
  }

  exitDomainItem(context: MetaEdGrammar.DomainItemContext) {
    if (this.currentDomain === NoDomain || this.currentDomainItem === NoDomainItem) return;
    ((this.currentDomain.sourceMap: any): DomainSourceMap).domainItems.push(sourceMapFrom(context));
    this.currentDomain.domainItems.push(this.currentDomainItem);
    this.currentDomainItem = NoDomainItem;
  }

  enterFooterDocumentation(context: MetaEdGrammar.FooterDocumentationContext) {
    if (this.currentDomain === NoDomain) return;
    ((this.currentDomain: any): Domain).footerDocumentation = extractDocumentation(context);
    ((this.currentDomain.sourceMap: any): DomainSourceMap).footerDocumentation = sourceMapFrom(context);
  }
}
