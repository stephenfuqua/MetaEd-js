import { DecimalType } from '../model/DecimalType';
import { MetaEdEnvironment } from '../MetaEdEnvironment';
import { Namespace } from '../model/Namespace';
import { ValidationFailure } from '../validator/ValidationFailure';
import { newDecimalType, NoDecimalType } from '../model/DecimalType';
import { namespaceNameFrom } from './NamespaceBuilder';
import { extractDocumentation, squareBracketRemoval, isErrorText } from './BuilderUtility';
import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../grammar/gen/MetaEdGrammarListener';
import { sourceMapFrom } from '../model/SourceMap';
import { NoNamespace } from '../model/Namespace';

// Note DecimalType is XSD specific with the advent of SharedDecimal, and creation should be move to XSD enhancers
export class DecimalTypeBuilder extends MetaEdGrammarListener {
  currentDecimalType: DecimalType;

  metaEd: MetaEdEnvironment;

  currentNamespace: Namespace;

  validationFailures: Array<ValidationFailure>;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.metaEd = metaEd;
    this.validationFailures = validationFailures;
    this.currentNamespace = NoNamespace;
    this.currentDecimalType = NoDecimalType;
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    const namespace: Namespace | undefined = this.metaEd.namespace.get(namespaceNameFrom(context));
    this.currentNamespace = namespace == null ? NoNamespace : namespace;
  }

  enterSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.enteringDecimalType(context);
  }

  enterDecimalProperty(context: MetaEdGrammar.DecimalPropertyContext) {
    this.enteringDecimalType(context, true);
  }

  enteringDecimalType(
    context: MetaEdGrammar.SharedDecimalContext | MetaEdGrammar.DecimalPropertyContext,
    generatedSimpleType: boolean = false,
  ) {
    this.currentDecimalType = { ...newDecimalType(), namespace: this.currentNamespace, generatedSimpleType };
    this.currentDecimalType.sourceMap.type = sourceMapFrom(context);
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
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentDecimalType.metaEdName = context.ID().getText();
    this.currentDecimalType.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterPropertyName(context: MetaEdGrammar.PropertyNameContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (context.exception || context.localPropertyName() == null) return;
    const localPropertyNameContext = context.localPropertyName();
    if (
      localPropertyNameContext.exception ||
      localPropertyNameContext.ID() == null ||
      localPropertyNameContext.ID().exception ||
      isErrorText(localPropertyNameContext.ID().getText())
    )
      return;
    this.currentDecimalType.metaEdName = localPropertyNameContext.ID().getText();
    this.currentDecimalType.sourceMap.metaEdName = sourceMapFrom(localPropertyNameContext);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (
      context.exception ||
      context.METAED_ID() == null ||
      context.METAED_ID().exception ||
      isErrorText(context.METAED_ID().getText())
    )
      return;

    this.currentDecimalType.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    this.currentDecimalType.sourceMap.metaEdId = sourceMapFrom(context);
  }

  enterTotalDigits(context: MetaEdGrammar.TotalDigitsContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (
      context.exception ||
      context.UNSIGNED_INT() == null ||
      context.UNSIGNED_INT().exception ||
      isErrorText(context.UNSIGNED_INT().getText())
    )
      return;
    this.currentDecimalType.totalDigits = context.UNSIGNED_INT().getText();
    this.currentDecimalType.sourceMap.totalDigits = sourceMapFrom(context);
  }

  enterDecimalPlaces(context: MetaEdGrammar.DecimalPlacesContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (
      context.exception ||
      context.UNSIGNED_INT() == null ||
      context.UNSIGNED_INT().exception ||
      isErrorText(context.UNSIGNED_INT().getText())
    )
      return;
    this.currentDecimalType.decimalPlaces = context.UNSIGNED_INT().getText();
    this.currentDecimalType.sourceMap.decimalPlaces = sourceMapFrom(context);
  }

  enterMinValueDecimal(context: MetaEdGrammar.MinValueDecimalContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (
      context.exception ||
      context.decimalValue() == null ||
      context.decimalValue().exception ||
      isErrorText(context.decimalValue().getText())
    )
      return;
    this.currentDecimalType.minValue = context.decimalValue().getText();
    this.currentDecimalType.sourceMap.minValue = sourceMapFrom(context);
  }

  enterMaxValueDecimal(context: MetaEdGrammar.MaxValueDecimalContext) {
    if (this.currentDecimalType === NoDecimalType) return;
    if (
      context.exception ||
      context.decimalValue() == null ||
      context.decimalValue().exception ||
      isErrorText(context.decimalValue().getText())
    )
      return;
    this.currentDecimalType.maxValue = context.decimalValue().getText();
    this.currentDecimalType.sourceMap.maxValue = sourceMapFrom(context);
  }

  // @ts-ignore
  exitDecimalProperty(context: MetaEdGrammar.DecimalPropertyContext) {
    this.exitingDecimalType();
  }

  // @ts-ignore
  exitSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.exitingDecimalType();
  }

  exitingDecimalType() {
    if (this.currentDecimalType === NoDecimalType) return;

    const { projectExtension } = this.currentNamespace;
    const repositoryId = projectExtension
      ? `${projectExtension}-${this.currentDecimalType.metaEdName}`
      : this.currentDecimalType.metaEdName;
    // $FlowIgnore - allowing currentDecimalType.type to specify the entityRepository Map property
    this.currentNamespace.entity[this.currentDecimalType.type].set(repositoryId, this.currentDecimalType);

    this.currentDecimalType = NoDecimalType;
  }
}
