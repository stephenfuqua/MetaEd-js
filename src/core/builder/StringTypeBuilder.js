// @flow
import type { StringType } from '../model/StringType';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { NamespaceInfo } from '../model/NamespaceInfo';
import type { ValidationFailure } from '../validator/ValidationFailure';
import { stringTypeFactory, NoStringType } from '../model/StringType';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval, isErrorText } from './BuilderUtility';
import { IContextWithIdentifier } from '../../grammar/IContextWithIdentifier';
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';
import { namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { sourceMapFrom } from '../model/SourceMap';

export default class StringTypeBuilder extends MetaEdGrammarListener {
  currentStringType: StringType;
  metaEd: MetaEdEnvironment;
  namespaceInfo: NamespaceInfo;
  validationFailures: Array<ValidationFailure>;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.metaEd = metaEd;
    this.validationFailures = validationFailures;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentStringType = NoStringType;
  }

  enterNamespace(context: MetaEdGrammar.NamespaceContext) {
    if (this.namespaceInfo !== NoNamespaceInfo) return;
    this.namespaceInfo = namespaceInfoFactory();
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

  enterSharedString(context: MetaEdGrammar.SharedStringContext) {
    this.enteringStringType(context);
  }

  enterStringProperty(context: MetaEdGrammar.StringPropertyContext) {
    this.enteringStringType(context, true);
  }

  enteringStringType(context: IContextWithIdentifier, generatedSimpleType: boolean = false) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentStringType = Object.assign(stringTypeFactory(), {
      namespaceInfo: this.namespaceInfo,
      generatedSimpleType,
    });
    this.currentStringType.sourceMap.type = sourceMapFrom(context);
    this.currentStringType.sourceMap.namespaceInfo = this.namespaceInfo.sourceMap.type;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentStringType === NoStringType || this.currentStringType.generatedSimpleType) return;
    this.currentStringType.documentation = extractDocumentation(context);
    this.currentStringType.sourceMap.documentation = sourceMapFrom(context);
  }

  enterPropertyDocumentation(context: MetaEdGrammar.PropertyDocumentationContext) {
    if (this.currentStringType === NoStringType) return;

    if (!context.exception && context.INHERITED() !== null && !context.INHERITED().exception) {
      this.currentStringType.documentationInherited = true;
      this.currentStringType.sourceMap.documentationInherited = sourceMapFrom(context);
    } else {
      this.currentStringType.documentation = extractDocumentation(context);
      this.currentStringType.sourceMap.documentation = sourceMapFrom(context);
    }
  }

  enterSharedStringName(context: MetaEdGrammar.SharedStringNameContext) {
    this.enteringStringTypeName(context);
  }

  enterPropertyName(context: MetaEdGrammar.PropertyNameContext) {
    this.enteringStringTypeName(context);
  }

  enteringStringTypeName(context: MetaEdGrammar.withContextNameContext) {
    if (this.currentStringType === NoStringType) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentStringType.metaEdName = context.ID().getText();
    this.currentStringType.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentStringType === NoStringType) return;
    if (context.exception || context.METAED_ID() == null || context.METAED_ID().exception || isErrorText(context.METAED_ID().getText())) return;

    this.currentStringType.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    this.currentStringType.sourceMap.metaEdId = sourceMapFrom(context);
  }

  enterMinLength(context: MetaEdGrammar.MinLengthContext) {
    if (this.currentStringType === NoStringType) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    this.currentStringType.minLength = context.UNSIGNED_INT().getText();
    this.currentStringType.sourceMap.minLength = sourceMapFrom(context);
  }

  enterMaxLength(context: MetaEdGrammar.MaxLengthContext) {
    if (this.currentStringType === NoStringType) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    this.currentStringType.maxLength = context.UNSIGNED_INT().getText();
    this.currentStringType.sourceMap.maxLength = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  exitStringProperty(context: MetaEdGrammar.StringPropertyContext) {
    this.exitingStringType();
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedString(context: MetaEdGrammar.SharedStringContext) {
    this.exitingStringType();
  }

  exitingStringType() {
    if (this.currentStringType === NoStringType) return;

    if (this.currentStringType.metaEdName) {
      // $FlowIgnore - allowing currentStringType.type to specify the entityRepository Map property
      const currentStringTypeRepository = this.metaEd.entity[this.currentStringType.type];
      if (currentStringTypeRepository.has(this.currentStringType.metaEdName)) {
        this.validationFailures.push({
          validatorName: 'StringTypeBuilder',
          category: 'error',
          message: `${this.currentStringType.typeHumanizedName} named ${this.currentStringType.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: this.currentStringType.sourceMap.type,
          fileMap: null,
        });
        const duplicateEntity: StringType = currentStringTypeRepository.get(this.currentStringType.metaEdName);
        this.validationFailures.push({
          validatorName: 'StringTypeBuilder',
          category: 'error',
          message: `${duplicateEntity.typeHumanizedName} named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: duplicateEntity.sourceMap.type,
          fileMap: null,
        });
      } else {
        currentStringTypeRepository.set(this.currentStringType.metaEdName, this.currentStringType);
      }
    }
    this.currentStringType = NoStringType;
  }
}
