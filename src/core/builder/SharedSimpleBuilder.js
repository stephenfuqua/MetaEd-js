// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { SharedSimple } from '../model/SharedSimple';
import type { Repository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';

import { NoSharedSimple } from '../model/SharedSimple';
import { namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, isErrorText, squareBracketRemoval } from './BuilderUtility';

export default class SharedSimpleBuilder extends MetaEdGrammarListener {
  repository: Repository;
  namespaceInfo: NamespaceInfo;
  currentSharedSimple: SharedSimple;

  constructor(repository: Repository) {
    super();
    this.repository = repository;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentSharedSimple = NoSharedSimple;
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

  enteringSharedSimple(simpleFactory: () => SharedSimple) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentSharedSimple = Object.assign(simpleFactory(), { namespaceInfo: this.namespaceInfo });
  }

  exitingSharedSimple() {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (this.currentSharedSimple.metaEdName) {
      // $FlowIgnore - allowing currentSharedSimple.type to specify the repository Map property
      this.repository[this.currentSharedSimple.type].set(this.currentSharedSimple.metaEdName, this.currentSharedSimple);
    }
    this.currentSharedSimple = NoSharedSimple;
  }

  enteringName(name: string) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    this.currentSharedSimple.metaEdName = name;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    this.currentSharedSimple.documentation = extractDocumentation(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;
    if (this.currentSharedSimple !== NoSharedSimple) {
      this.currentSharedSimple.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }
}
