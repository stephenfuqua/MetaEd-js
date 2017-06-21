// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import type { SharedSimple } from '../model/SharedSimple';
import type { EntityRepository } from '../model/Repository';
import type { NamespaceInfo } from '../model/NamespaceInfo';

import { NoSharedSimple } from '../model/SharedSimple';
import { namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, isErrorText, squareBracketRemoval } from './BuilderUtility';
import type { ValidationFailure } from '../validator/ValidationFailure';

export default class SharedSimpleBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  namespaceInfo: NamespaceInfo;
  currentSharedSimple: SharedSimple;
  validationFailures: Array<ValidationFailure>;

  constructor(entityRepository: EntityRepository, validationFailures: Array<ValidationFailure>) {
    super();
    this.entityRepository = entityRepository;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentSharedSimple = NoSharedSimple;
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

  enteringSharedSimple(simpleFactory: () => SharedSimple) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentSharedSimple = Object.assign(simpleFactory(), { namespaceInfo: this.namespaceInfo });
  }

  exitingSharedSimple() {
    if (this.currentSharedSimple === NoSharedSimple) return;

    if (this.currentSharedSimple.metaEdName) {
      // $FlowIgnore - allowing currentSharedSimple.type to specify the entityRepository Map property
      const currentSharedSimpleRepository = this.entityRepository[this.currentSharedSimple.type];
      if (currentSharedSimpleRepository.has(this.currentSharedSimple.metaEdName)) {
        this.validationFailures.push({
          validatorName: 'SharedSimpleBuilder',
          category: 'error',
          message: `${this.currentSharedSimple.typeGroupHumanizedName} named ${this.currentSharedSimple.metaEdName} is a duplicate declaration of that name.`,
          // $FlowIgnore - sourceMap property not on SharedSimple
          sourceMap: this.currentSharedSimple.sourceMap.type,
          fileMap: null,
        });
        const duplicateEntity: SharedSimple = currentSharedSimpleRepository.get(this.currentSharedSimple.metaEdName);
        this.validationFailures.push({
          validatorName: 'SharedSimpleBuilder',
          category: 'error',
          message: `${duplicateEntity.typeGroupHumanizedName} named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
          // $FlowIgnore - sourceMap property not on SharedSimple
          sourceMap: duplicateEntity.sourceMap.type,
          fileMap: null,
        });
      } else {
        currentSharedSimpleRepository.set(this.currentSharedSimple.metaEdName, this.currentSharedSimple);
      }
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
    if (context.exception || context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;
    if (this.currentSharedSimple !== NoSharedSimple) {
      this.currentSharedSimple.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }
}
