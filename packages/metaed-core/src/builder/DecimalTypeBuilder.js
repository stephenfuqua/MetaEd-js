// @flow
import type { DecimalType } from '../model/DecimalType';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { NamespaceInfo } from '../model/NamespaceInfo';
import type { ValidationFailure } from '../validator/ValidationFailure';
import { decimalTypeFactory, NoDecimalType } from '../model/DecimalType';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval, isErrorText } from './BuilderUtility';
import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../grammar/gen/MetaEdGrammarListener';
import { namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { sourceMapFrom } from '../model/SourceMap';

// Note DecimalType is XSD specific with the advent of SharedDecimal, and creation should be move to XSD enhancers
export default class DecimalTypeBuilder extends MetaEdGrammarListener {
  currentDecimalType: DecimalType;
  metaEd: MetaEdEnvironment;
  namespaceInfo: NamespaceInfo;
  validationFailures: Array<ValidationFailure>;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.metaEd = metaEd;
    this.validationFailures = validationFailures;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentDecimalType = NoDecimalType;
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

  enterSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.enteringDecimalType(context);
  }

  enterDecimalProperty(context: MetaEdGrammar.DecimalPropertyContext) {
    this.enteringDecimalType(context, true);
  }

  enteringDecimalType(context: MetaEdGrammar.SharedDecimalContext | MetaEdGrammar.DecimalPropertyContext, generatedSimpleType: boolean = false) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentDecimalType = Object.assign(decimalTypeFactory(), {
      namespaceInfo: this.namespaceInfo,
      generatedSimpleType,
    });
    this.currentDecimalType.sourceMap.type = sourceMapFrom(context);
    this.currentDecimalType.sourceMap.namespaceInfo = this.namespaceInfo.sourceMap.type;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentDecimalType === NoDecimalType || this.currentDecimalType.generatedSimpleType) return;
    this.currentDecimalType.documentation = extractDocumentation(context);
    this.currentDecimalType.sourceMap.documentation = sourceMapFrom(context);
  }

  enterPropertyDocumentation(context: MetaEdGrammar.PropertyDocumentationContext) {
    if (this.currentDecimalType === NoDecimalType) return;

    if (!context.exception && context.INHERITED() !== null && !context.INHERITED().exception) {
      this.currentDecimalType.documentationInherited = true;
      this.currentDecimalType.sourceMap.documentationInherited = sourceMapFrom(context);
    } else {
      this.currentDecimalType.documentation = extractDocumentation(context);
      this.currentDecimalType.sourceMap.documentation = sourceMapFrom(context);
    }
  }

  enterSharedDecimalName(context: MetaEdGrammar.SharedDecimalNameContext) {
    this.enteringDecimalTypeName(context);
  }

  enterPropertyName(context: MetaEdGrammar.PropertyNameContext) {
    this.enteringDecimalTypeName(context);
  }

  enteringDecimalTypeName(context: MetaEdGrammar.withContextNameContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentDecimalType.metaEdName = context.ID().getText();
    this.currentDecimalType.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.METAED_ID() == null || context.METAED_ID().exception || isErrorText(context.METAED_ID().getText())) return;

    this.currentDecimalType.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    this.currentDecimalType.sourceMap.metaEdId = sourceMapFrom(context);
  }

  enterTotalDigits(context: MetaEdGrammar.TotalDigitsContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    this.currentDecimalType.totalDigits = context.UNSIGNED_INT().getText();
    this.currentDecimalType.sourceMap.totalDigits = sourceMapFrom(context);
  }

  enterDecimalPlaces(context: MetaEdGrammar.DecimalPlacesContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    this.currentDecimalType.decimalPlaces = context.UNSIGNED_INT().getText();
    this.currentDecimalType.sourceMap.decimalPlaces = sourceMapFrom(context);
  }

  enterMinValueDecimal(context: MetaEdGrammar.MinValueDecimalContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.decimalValue() == null || context.decimalValue().exception || isErrorText(context.decimalValue().getText())) return;
    this.currentDecimalType.minValue = context.decimalValue().getText();
    this.currentDecimalType.sourceMap.minValue = sourceMapFrom(context);
  }

  enterMaxValueDecimal(context: MetaEdGrammar.MaxValueDecimalContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.decimalValue() == null || context.decimalValue().exception || isErrorText(context.decimalValue().getText())) return;
    this.currentDecimalType.maxValue = context.decimalValue().getText();
    this.currentDecimalType.sourceMap.maxValue = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  exitDecimalProperty(context: MetaEdGrammar.DecimalPropertyContext) {
    this.exitingDecimalType();
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.exitingDecimalType();
  }

  exitingDecimalType() {
    if (this.currentDecimalType === NoDecimalType) return;

    if (this.currentDecimalType.metaEdName) {
      // Another example of why DecimalType belongs in XSD specific, repository key partitions by namespace
      const projectExtension = this.currentDecimalType.namespaceInfo.projectExtension;
      const repositoryId = projectExtension ? `${projectExtension}-${this.currentDecimalType.metaEdName}` : this.currentDecimalType.metaEdName;

      // $FlowIgnore - allowing currentDecimalType.type to specify the entityRepository Map property
      const currentDecimalTypeRepository = this.metaEd.entity[this.currentDecimalType.type];
      if (currentDecimalTypeRepository.has(repositoryId)) {
        this.validationFailures.push({
          validatorName: 'DecimalTypeBuilder',
          category: 'error',
          message: `${this.currentDecimalType.typeHumanizedName} named ${this.currentDecimalType.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: this.currentDecimalType.sourceMap.type,
          fileMap: null,
        });
        const duplicateEntity: DecimalType = currentDecimalTypeRepository.get(repositoryId);
        this.validationFailures.push({
          validatorName: 'DecimalTypeBuilder',
          category: 'error',
          message: `${duplicateEntity.typeHumanizedName} named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: duplicateEntity.sourceMap.type,
          fileMap: null,
        });
      } else {
        currentDecimalTypeRepository.set(repositoryId, this.currentDecimalType);
      }
    }
    this.currentDecimalType = NoDecimalType;
  }
}
