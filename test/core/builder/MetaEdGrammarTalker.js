// @flow
import R from 'ramda';
import { MetaEdGrammar } from '../../../src/grammar/gen/MetaEdGrammar';
import type { MetaEdGrammarListener } from '../../../src/grammar/gen/MetaEdGrammarListener';

type MethodName = string;
type TestContext = any;

type ListenerMethodCall = {
  listenerMethod: MethodName,
  grammarContext: MetaEdGrammar.ParserRuleContext
};

const emptyContext = () => ({});

const appendToContext = R.curry(
  (functionName: string, result: string, originalContext: any): TestContext => Object.assign({}, originalContext, { [functionName]: () => result }),
);

const newContext = appendToContext(R.__, R.__, emptyContext());

const appendTextContext = R.curry(
  (tokenName: string, textToReturn: string, originalContext: any): TestContext => Object.assign({}, originalContext, { [tokenName]: () => ({ getText: () => textToReturn }) }),
);

const textContext = appendTextContext(R.__, R.__, emptyContext());

const idTextContext: TestContext = textContext('ID', R.__);

const joinDocumentationLines = (lines: Array<string>): string => `"${lines.map(s => s.trim()).join('\r\n')}"`;

export default class MetaEdGrammarTalker {
  listenerMethodCalls: ListenerMethodCall[];

  constructor() {
    this.listenerMethodCalls = [];
  }

  withStartNamespace(identifier: string, projectExtension: ?string = null): MetaEdGrammarTalker {
    this.addMethodCall('enterNamespace', emptyContext());

    const namespaceNameContext = textContext('NAMESPACE_ID', identifier);
    this.addMethodCall('enterNamespaceName', namespaceNameContext);
    this.addMethodCall('exitNamespaceName', namespaceNameContext);

    if (projectExtension != null) {
      const namespaceTypeContext = appendToContext('CORE', null, idTextContext(projectExtension));
      this.addMethodCall('enterNamespaceType', namespaceTypeContext);
      this.addMethodCall('exitNamespaceType', namespaceTypeContext);
    }

    return this;
  }

  withEndNamespace() {
    this.addMethodCall('exitNamespace', emptyContext());
    return this;
  }

  withStartAssociation(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterAssociation', emptyContext());

    const associationNameContext = idTextContext(identifier);

    this.addMethodCall('enterAssociationName', associationNameContext);
    this.addMethodCall('exitAssociationName', associationNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndAssociation() {
    this.addMethodCall('exitAssociation', emptyContext());
    return this;
  }

  withStartAssociationExtension(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterAssociationExtension', emptyContext());

    const extendeeNameContext = idTextContext(identifier);

    this.addMethodCall('enterExtendeeName', extendeeNameContext);
    this.addMethodCall('exitExtendeeName', extendeeNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndAssociationExtension() {
    this.addMethodCall('exitAssociationExtension', emptyContext());
    return this;
  }

  withStartAssociationSubclass(identifier: string, baseEntityName: string, metaEdId: ?string = null) {
    this.addMethodCall('enterAssociationSubclass', emptyContext());

    const entityNameContext = idTextContext(identifier);

    this.addMethodCall('enterAssociationName', entityNameContext);
    this.addMethodCall('exitAssociationName', entityNameContext);
    this.withMetaEdId(metaEdId);

    const baseNameContext = idTextContext(baseEntityName);

    this.addMethodCall('enterBaseName', baseNameContext);
    this.addMethodCall('exitBaseName', baseNameContext);

    return this;
  }

  withEndAssociationSubclass() {
    this.addMethodCall('exitAssociationSubclass', emptyContext());
    return this;
  }

  withStartCommon(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterCommon', emptyContext());

    const commonNameContext = idTextContext(identifier);

    this.addMethodCall('enterCommonName', commonNameContext);
    this.addMethodCall('exitCommonName', commonNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndCommon() {
    this.addMethodCall('exitCommon', emptyContext());
    return this;
  }

  withStartChoice(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterChoice', emptyContext());

    const choiceNameContext = idTextContext(identifier);

    this.addMethodCall('enterChoiceName', choiceNameContext);
    this.addMethodCall('exitChoiceName', choiceNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndChoice() {
    this.addMethodCall('exitChoice', emptyContext());
    return this;
  }

  withStartCommonExtension(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterCommonExtension', emptyContext());

    const extendeeNameContext = idTextContext(identifier);

    this.addMethodCall('enterExtendeeName', extendeeNameContext);
    this.addMethodCall('exitExtendeeName', extendeeNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndCommonExtension() {
    this.addMethodCall('exitCommonExtension', emptyContext());
    return this;
  }

  withDecimalType(identifier: string, documentation: string,
    totalDigits: string, decimalPlaces: string,
    maxValue: ?string = null, minValue: ?string = null,
    metaEdId: ?string = null) {
    this.addMethodCall('enterDecimalType', emptyContext());

    const decimalTypeNameContext = idTextContext(identifier);

    this.addMethodCall('enterDecimalTypeName', decimalTypeNameContext);
    this.addMethodCall('exitDecimalTypeName', decimalTypeNameContext);
    this.withMetaEdId(metaEdId);

    this.withDocumentation(documentation);
    this.addDecimalDigitsAndPlaces(totalDigits, decimalPlaces);
    this.addMaxMinValueDecimal(maxValue, minValue);

    this.addMethodCall('exitDecimalType', emptyContext());

    return this;
  }

  withSharedDecimal(identifier: string, documentation: string,
    totalDigits: string, decimalPlaces: string,
    maxValue: ?string = null, minValue: ?string = null,
    metaEdId: ?string = null) {
    this.addMethodCall('enterSharedDecimal', emptyContext());

    const sharedDecimalNameContext = idTextContext(identifier);

    this.addMethodCall('enterSharedDecimalName', sharedDecimalNameContext);
    this.addMethodCall('exitSharedDecimalName', sharedDecimalNameContext);
    this.withMetaEdId(metaEdId);

    this.withDocumentation(documentation);
    this.addDecimalDigitsAndPlaces(totalDigits, decimalPlaces);
    this.addMaxMinValueDecimal(maxValue, minValue);

    this.addMethodCall('exitSharedDecimal', emptyContext());

    return this;
  }

  withSharedInteger(identifier: string, documentation: string,
    maxValue: ?string = null, minValue: ?string = null,
    metaEdId: ?string = null) {
    this.addMethodCall('enterSharedInteger', emptyContext());

    const sharedIntegerNameContext = idTextContext(identifier);

    this.addMethodCall('enterSharedIntegerName', sharedIntegerNameContext);
    this.addMethodCall('exitSharedIntegerName', sharedIntegerNameContext);
    this.withMetaEdId(metaEdId);

    this.withDocumentation(documentation);
    this.addMaxMinValue(maxValue, minValue);

    this.addMethodCall('exitSharedInteger', emptyContext());

    return this;
  }

  withSharedShort(identifier: string, documentation: string,
    maxValue: ?string = null, minValue: ?string = null,
    metaEdId: ?string = null) {
    this.addMethodCall('enterSharedShort', emptyContext());

    const sharedShortNameContext = idTextContext(identifier);

    this.addMethodCall('enterSharedShortName', sharedShortNameContext);
    this.addMethodCall('exitSharedShortName', sharedShortNameContext);
    this.withMetaEdId(metaEdId);

    this.withDocumentation(documentation);
    this.addMaxMinValue(maxValue, minValue);

    this.addMethodCall('exitSharedShort', emptyContext());

    return this;
  }

  withSharedString(identifier: string, documentation: string,
    maxLength: string, minLength: ?string = null,
    metaEdId: ?string = null) {
    this.addMethodCall('enterSharedString', emptyContext());

    const sharedStringNameContext = idTextContext(identifier);

    this.addMethodCall('enterSharedStringName', sharedStringNameContext);
    this.addMethodCall('exitSharedStringName', sharedStringNameContext);
    this.withMetaEdId(metaEdId);

    this.withDocumentation(documentation);
    this.addMaxMinLength(maxLength, minLength);

    this.addMethodCall('exitSharedString', emptyContext());

    return this;
  }

  withStartInterchange(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterInterchange', emptyContext());

    const interchangeNameContext = idTextContext(identifier);

    this.addMethodCall('enterInterchangeName', interchangeNameContext);
    this.addMethodCall('exitInterchangeName', interchangeNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndInterchange() {
    this.addMethodCall('exitInterchange', emptyContext());
    return this;
  }

  withStartInterchangeExtension(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterInterchangeExtension', emptyContext());

    const extendeeNameContext = idTextContext(identifier);

    this.addMethodCall('enterExtendeeName', extendeeNameContext);
    this.addMethodCall('exitExtendeeName', extendeeNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndInterchangeExtension() {
    this.addMethodCall('exitInterchangeExtension', emptyContext());
    return this;
  }

  withInterchangeElement(identifier: string, metaEdId: ?string = null) {
    const interchangeElementContext = idTextContext(identifier);

    this.addMethodCall('enterInterchangeElement', interchangeElementContext);
    this.withMetaEdId(metaEdId);
    this.addMethodCall('exitInterchangeElement', interchangeElementContext);

    return this;
  }

  withInterchangeIdentity(identifier: string, metaEdId: ?string = null) {
    const interchangeIdentityContext = idTextContext(identifier);

    this.addMethodCall('enterInterchangeIdentity', interchangeIdentityContext);
    this.withMetaEdId(metaEdId);
    this.addMethodCall('exitInterchangeIdentity', interchangeIdentityContext);

    return this;
  }

  withStartDomain(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterDomain', emptyContext());

    const domainNameContext = idTextContext(identifier);

    this.addMethodCall('enterDomainName', domainNameContext);
    this.addMethodCall('exitDomainName', domainNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndDomain() {
    this.addMethodCall('exitDomain', emptyContext());
    return this;
  }

  withStartSubdomain(identifier: string, parentDomainName: string, metaEdId: ?string = null) {
    this.addMethodCall('enterSubdomain', emptyContext());

    const subdomainNameContext = idTextContext(identifier);

    this.addMethodCall('enterSubdomainName', subdomainNameContext);
    this.addMethodCall('exitSubdomainName', subdomainNameContext);

    const parentDomainNameContext = idTextContext(parentDomainName);

    this.addMethodCall('enterParentDomainName', parentDomainNameContext);
    this.addMethodCall('exitParentDomainName', parentDomainNameContext);

    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndSubdomain() {
    this.addMethodCall('exitSubdomain', emptyContext());
    return this;
  }

  withDomainItem(identifier: string, metaEdId: ?string = null) {
    const domainItemContext = idTextContext(identifier);

    this.addMethodCall('enterDomainItem', domainItemContext);
    this.withMetaEdId(metaEdId);
    this.addMethodCall('exitDomainItem', domainItemContext);

    return this;
  }

  withSubdomainPosition(position: number) {
    const subdomainPositionContext = textContext('UNSIGNED_INT', position.toString());

    this.addMethodCall('enterSubdomainPosition', subdomainPositionContext);
    this.addMethodCall('exitSubdomainPosition', subdomainPositionContext);

    return this;
  }

  withStartDomainEntity(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterDomainEntity', emptyContext());

    const entityNameContext = idTextContext(identifier);

    this.addMethodCall('enterEntityName', entityNameContext);
    this.addMethodCall('exitEntityName', entityNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndDomainEntity() {
    this.addMethodCall('exitDomainEntity', emptyContext());
    return this;
  }

  withStartDomainEntityExtension(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterDomainEntityExtension', emptyContext());

    const extendeeNameContext = idTextContext(identifier);

    this.addMethodCall('enterExtendeeName', extendeeNameContext);
    this.addMethodCall('exitExtendeeName', extendeeNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndDomainEntityExtension() {
    this.addMethodCall('exitDomainEntityExtension', emptyContext());
    return this;
  }

  withStartDomainEntitySubclass(identifier: string, baseEntityName: string, metaEdId: ?string = null) {
    this.addMethodCall('enterDomainEntitySubclass', emptyContext());

    const entityNameContext = idTextContext(identifier);

    this.addMethodCall('enterEntityName', entityNameContext);
    this.addMethodCall('exitEntityName', entityNameContext);
    this.withMetaEdId(metaEdId);

    const baseNameContext = idTextContext(baseEntityName);

    this.addMethodCall('enterBaseName', baseNameContext);
    this.addMethodCall('exitBaseName', baseNameContext);

    return this;
  }

  withEndDomainEntitySubclass() {
    this.addMethodCall('exitDomainEntitySubclass', emptyContext());
    return this;
  }

  withStartInlineCommon(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterInlineCommon', emptyContext());

    const inlineCommonNameContext = idTextContext(identifier);

    this.addMethodCall('enterInlineCommonName', inlineCommonNameContext);
    this.addMethodCall('exitInlineCommonName', inlineCommonNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndInlineCommon() {
    this.addMethodCall('exitInlineCommon', emptyContext());
    return this;
  }

  withDocumentation(...documentationLines: Array<string>) {
    const documentation = joinDocumentationLines(documentationLines);
    const documentationContext = appendToContext('INHERITED', null, textContext('TEXT', documentation));

    this.addMethodCall('enterDocumentation', documentationContext);
    this.addMethodCall('exitDocumentation', documentationContext);

    return this;
  }

  withPropertyDocumentation(...documentationLines: Array<string>) {
    let documentationContext;

    if (documentationLines.join() === 'inherited') {
      documentationContext = appendToContext('INHERITED', true, textContext('TEXT', null));
    } else {
      documentationContext = appendToContext('INHERITED', null, textContext('TEXT', joinDocumentationLines(documentationLines)));
    }

    this.addMethodCall('enterPropertyDocumentation', documentationContext);
    this.addMethodCall('exitPropertyDocumentation', documentationContext);

    return this;
  }

  withMapTypeDocumentation(...documentationLines: Array<string>) {
    const documentation = joinDocumentationLines(documentationLines);
    const documentationContext = textContext('TEXT', documentation);

    this.addMethodCall('enterMapTypeDocumentation', documentationContext);
    this.addMethodCall('exitMapTypeDocumentation', documentationContext);

    return this;
  }

  withEnumerationItemDocumentation(...documentationLines: Array<string>) {
    const documentation = joinDocumentationLines(documentationLines);
    const documentationContext = textContext('TEXT', documentation);

    this.addMethodCall('enterEnumerationItemDocumentation', documentationContext);
    this.addMethodCall('exitEnumerationItemDocumentation', documentationContext);

    return this;
  }

  withExtendedDocumentation(...documentationLines: Array<string>) {
    const documentation = joinDocumentationLines(documentationLines);
    const documentationContext = textContext('TEXT', documentation);

    this.addMethodCall('enterExtendedDocumentation', documentationContext);
    this.addMethodCall('exitExtendedDocumentation', documentationContext);

    return this;
  }

  withUseCaseDocumentation(...documentationLines: Array<string>) {
    const documentation = joinDocumentationLines(documentationLines);
    const documentationContext = textContext('TEXT', documentation);

    this.addMethodCall('enterUseCaseDocumentation', documentationContext);
    this.addMethodCall('exitUseCaseDocumentation', documentationContext);

    return this;
  }

  withFooterDocumentation(...documentationLines: Array<string>) {
    const documentation = joinDocumentationLines(documentationLines);
    const documentationContext = textContext('TEXT', documentation);

    this.addMethodCall('enterFooterDocumentation', documentationContext);
    this.addMethodCall('exitFooterDocumentation', documentationContext);

    return this;
  }

  withStartFirstDomainEntity(entityName: string, metaEdId: ?string = null) {
    const firstDomainEntityContext = newContext('propertyName', idTextContext(entityName));

    this.addMethodCall('enterFirstDomainEntity', firstDomainEntityContext);
    this.withPropertyName(entityName);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndFirstDomainEntity() {
    this.addMethodCall('exitFirstDomainEntity', emptyContext());
    return this;
  }

  withStartSecondDomainEntity(entityName: string, metaEdId: ?string = null) {
    const secondDomainEntityContext = newContext('propertyName', idTextContext(entityName));

    this.addMethodCall('enterSecondDomainEntity', secondDomainEntityContext);
    this.withPropertyName(entityName);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndSecondDomainEntity() {
    this.addMethodCall('exitSecondDomainEntity', emptyContext());
    return this;
  }

  withEnumerationItem(shortDescription: string, documentation: ?string = null, metaEdId: ?string = null) {
    this.addMethodCall('enterEnumerationItem', emptyContext());

    const shortDescriptionContext = textContext('TEXT', `"${shortDescription}"`);

    this.addMethodCall('enterShortDescription', shortDescriptionContext);
    this.addMethodCall('exitShortDescription', shortDescriptionContext);
    this.withMetaEdId(metaEdId);

    if (documentation != null) {
      this.withEnumerationItemDocumentation(documentation);
    }

    this.addMethodCall('exitEnumerationItem', emptyContext());
    return this;
  }

  withStartEnumeration(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterEnumeration', emptyContext());

    const enumerationNameContext = idTextContext(identifier);

    this.addMethodCall('enterEnumerationName', enumerationNameContext);
    this.addMethodCall('exitEnumerationName', enumerationNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndEnumeration() {
    this.addMethodCall('exitEnumeration', emptyContext());
    return this;
  }

  withStartDescriptor(identifier: string, metaEdId: ?string = null) {
    this.addMethodCall('enterDescriptor', emptyContext());

    const descriptorNameContext = idTextContext(identifier);

    this.addMethodCall('enterDescriptorName', descriptorNameContext);
    this.addMethodCall('exitDescriptorName', descriptorNameContext);
    this.withMetaEdId(metaEdId);

    return this;
  }

  withEndDescriptor() {
    this.addMethodCall('exitDescriptor', emptyContext());
    return this;
  }

  withStartWithMapType(isRequired: boolean = true) {
    this.addMethodCall('enterWithMapType', emptyContext());

    if (isRequired) {
      this.addMethodCall('enterRequiredMapType', emptyContext());
      this.addMethodCall('exitRequiredMapType', emptyContext());
    } else {
      this.addMethodCall('enterOptionalMapType', emptyContext());
      this.addMethodCall('exitOptionalMapType', emptyContext());
    }

    return this;
  }

  withEndWithMapType() {
    this.addMethodCall('exitWithMapType', emptyContext());
    return this;
  }

  withBooleanProperty(identifier: string, documentation: string, isRequired: boolean, isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Boolean');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Boolean');
    return this;
  }

  withCurrencyProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Currency');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Currency');
    return this;
  }

  withDateProperty(identifier: string, documentation: string, isRequired: boolean, isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Date');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Date');
    return this;
  }

  withDecimalProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, totalDigits: string, decimalPlaces: string,
    maxValue: ?string = null, minValue: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Decimal');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);

    this.addDecimalDigitsAndPlaces(totalDigits, decimalPlaces);
    this.addMaxMinValueDecimal(maxValue, minValue);

    this.addPropertyExit('Decimal');
    return this;
  }

  withDescriptorProperty(descriptorName: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Descriptor');
    this.addPropertyNameAndComponents(descriptorName, metaEdId, documentation, isRequired, isCollection, context);
    this.addPropertyExit('Descriptor');
    return this;
  }

  withDurationProperty(identifier: string, documentation: string, isRequired: boolean, isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Duration');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Duration');
    return this;
  }

  withEnumerationProperty(enumerationName: string, documentation: string, isRequired: boolean, isCollection: boolean, context: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Enumeration');
    this.addPropertyNameAndComponents(enumerationName, metaEdId, documentation, isRequired, isCollection, context);
    this.addPropertyExit('Enumeration');
    return this;
  }

  withCommonProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Common');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addPropertyExit('Common');
    return this;
  }

  withInlineCommonProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('InlineCommon');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addPropertyExit('InlineCommon');
    return this;
  }

  withChoiceProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Choice');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addPropertyExit('Choice');
    return this;
  }

  withCommonPropertyWithExtensionOverride(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Common');
    this.addMethodCall('enterCommonExtensionOverride', emptyContext());
    this.addMethodCall('exitCommonExtensionOverride', emptyContext());
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addPropertyExit('Common');
    return this;
  }

  withStartCommonProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Common');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    return this;
  }

  withEndCommonProperty() {
    this.addPropertyExit('Common');
    return this;
  }

  withStartChoiceProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Choice');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    return this;
  }

  withEndChoiceProperty() {
    this.addPropertyExit('Choice');
    return this;
  }

  withStartInlineCommonProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Common');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    return this;
  }

  withEndInlineCommonProperty() {
    this.addPropertyExit('Common');
    return this;
  }

  withDomainEntityProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, isWeak: ?boolean = null, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('DomainEntity');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addIsWeakReference(isWeak);
    this.addPropertyExit('DomainEntity');
    return this;
  }

  withAssociationProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, isWeak: ?boolean = null, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Association');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addIsWeakReference(isWeak);
    this.addPropertyExit('Association');
    return this;
  }

  withStartAssociationProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, isWeak: ?boolean = null, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Association');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addIsWeakReference(isWeak);
    return this;
  }

  withStartDomainEntityProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, isWeak: ?boolean = null, context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('DomainEntity');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection, context, shortenTo);
    this.addIsWeakReference(isWeak);
    return this;
  }

  withMergeReference(mergePropertyPath: string, targetPropertyPath: string) {
    this.addMergeWith(mergePropertyPath, targetPropertyPath);
    return this;
  }

  withEndDomainEntityProperty() {
    this.addPropertyExit('DomainEntity');
    return this;
  }

  withEndAssociationProperty() {
    this.addPropertyExit('Association');
    return this;
  }

  withSharedProperty(identifier: ?string, sharedPropertyType: string, documentation: string, isRequired: boolean,
    isCollection: boolean, context: ?string, shortenTo: ?string, metaEdId: ?string = null) {
    const sharedPropertyTypeContext = idTextContext(sharedPropertyType);

    this.addMethodCall('enterSharedPropertyType', sharedPropertyTypeContext);
    this.addMethodCall('exitSharedPropertyType', sharedPropertyTypeContext);

    if (identifier != null) this.withPropertyName(identifier);
    this.withMetaEdId(metaEdId);
    this.addPropertyComponents(documentation, isRequired, isCollection, context, shortenTo);
  }

  withSharedDecimalProperty(identifier: ?string, sharedPropertyType: string, documentation: string, isRequired: boolean, isCollection: boolean,
    context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('SharedDecimal');
    this.withSharedProperty(identifier, sharedPropertyType, documentation, isRequired, isCollection, context, shortenTo, metaEdId);
    this.addPropertyExit('SharedDecimal');
    return this;
  }

  withSharedIntegerProperty(identifier: ?string, sharedPropertyType: string, documentation: string, isRequired: boolean, isCollection: boolean,
    context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('SharedInteger');
    this.withSharedProperty(identifier, sharedPropertyType, documentation, isRequired, isCollection, context, shortenTo, metaEdId);
    this.addPropertyExit('SharedInteger');
    return this;
  }

  withSharedShortProperty(identifier: ?string, sharedPropertyType: string, documentation: string, isRequired: boolean, isCollection: boolean,
    context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('SharedShort');
    this.withSharedProperty(identifier, sharedPropertyType, documentation, isRequired, isCollection, context, shortenTo, metaEdId);
    this.addPropertyExit('SharedShort');
    return this;
  }

  withSharedStringProperty(identifier: ?string, sharedPropertyType: string, documentation: string, isRequired: boolean, isCollection: boolean,
    context: ?string = null, shortenTo: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('SharedString');
    this.withSharedProperty(identifier, sharedPropertyType, documentation, isRequired, isCollection, context, shortenTo, metaEdId);
    this.addPropertyExit('SharedString');
    return this;
  }

  withQueryableOnlyDomainEntityProperty(identifier: string, documentation: string, metaEdId: ?string = null) {
    this.addPropertyEnter('DomainEntity');

    this.withPropertyName(identifier);
    this.withMetaEdId(metaEdId);

    this.addMethodCall('enterPropertyComponents', emptyContext());

    this.withPropertyDocumentation(documentation);

    this.addMethodCall('enterPropertyAnnotation', emptyContext());

    this.addMethodCall('enterIsQueryableOnly', emptyContext());
    this.addMethodCall('exitIsQueryableOnly', emptyContext());

    this.addMethodCall('exitPropertyAnnotation', emptyContext());
    this.addMethodCall('exitPropertyComponents', emptyContext());

    this.addPropertyExit('DomainEntity');
    return this;
  }

  withDomainEntityIdentity(identifier: string, documentation: string,
    context: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('DomainEntity');
    this.addPropertyIdentityComponents(identifier, metaEdId, documentation, context);
    this.addPropertyExit('DomainEntity');
    return this;
  }

  withIntegerProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, maxValue: ?string = null, minValue: ?string = null,
    metaEdId: ?string = null) {
    this.addPropertyEnter('Integer');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);

    this.addMaxMinValue(maxValue, minValue);

    this.addPropertyExit('Integer');
    return this;
  }

  withIntegerIdentity(identifier: string, documentation: string, metaEdId: ?string = null) {
    this.addPropertyEnter('Integer');
    this.addPropertyIdentityComponents(identifier, metaEdId, documentation);
    this.addPropertyExit('Integer');
    return this;
  }

  withIntegerIdentityRename(identifier: string, documentation: string, baseKeyName: string, metaEdId: ?string = null) {
    this.addPropertyEnter('Integer');
    this.addPropertyIdentityRenameComponents(identifier, metaEdId, documentation, baseKeyName);
    this.addPropertyExit('Integer');
    return this;
  }

  withPercentProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Percent');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Percent');
    return this;
  }

  withShortProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, maxValue: ?string = null, minValue: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('Short');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);

    this.addMaxMinValue(maxValue, minValue);

    this.addPropertyExit('Short');
    return this;
  }

  withStringProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, isQueryableField: boolean, maxLength: string, minLength: ?string = null, metaEdId: ?string = null) {
    this.addPropertyEnter('String');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addIsQueryableField(isQueryableField);

    this.addMaxMinLength(maxLength, minLength);

    this.addPropertyExit('String');
    return this;
  }

  withTimeProperty(identifier: string, documentation: string, isRequired: boolean, isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Time');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Time');
    return this;
  }

  withYearProperty(identifier: string, documentation: string, isRequired: boolean,
    isCollection: boolean, metaEdId: ?string = null) {
    this.addPropertyEnter('Year');
    this.addPropertyNameAndComponents(identifier, metaEdId, documentation, isRequired, isCollection);
    this.addPropertyExit('Year');
    return this;
  }

  addMaxMinValue(maxValue: ?string, minValue: ?string) {
    if (maxValue != null) {
      const maxValueContext = textContext('signed_int', maxValue);
      this.addMethodCall('enterMaxValue', maxValueContext);
      this.addMethodCall('exitMaxValue', maxValueContext);
    }

    if (minValue != null) {
      const minValueContext = textContext('signed_int', minValue);
      this.addMethodCall('enterMinValue', minValueContext);
      this.addMethodCall('exitMinValue', minValueContext);
    }
  }

  addMaxMinValueDecimal(maxValue: ?string, minValue: ?string) {
    if (maxValue != null) {
      const maxValueContext = textContext('decimalValue', maxValue);
      this.addMethodCall('enterMaxValueDecimal', maxValueContext);
      this.addMethodCall('exitMaxValueDecimal', maxValueContext);
    }

    if (minValue != null) {
      const minValueContext = textContext('decimalValue', minValue);
      this.addMethodCall('enterMinValueDecimal', minValueContext);
      this.addMethodCall('exitMinValueDecimal', minValueContext);
    }
  }

  addDecimalDigitsAndPlaces(totalDigits: string, decimalPlaces: string) {
    const totalDigitsContext = textContext('UNSIGNED_INT', totalDigits);

    this.addMethodCall('enterTotalDigits', totalDigitsContext);
    this.addMethodCall('exitTotalDigits', totalDigitsContext);

    const decimalPlacesContext = textContext('UNSIGNED_INT', decimalPlaces);
    this.addMethodCall('enterDecimalPlaces', decimalPlacesContext);
    this.addMethodCall('exitDecimalPlaces', decimalPlacesContext);
  }

  addMaxMinLength(maxLength: ?string, minLength: ?string) {
    if (maxLength != null) {
      const maxLengthContext = textContext('UNSIGNED_INT', maxLength);
      this.addMethodCall('enterMaxLength', maxLengthContext);
      this.addMethodCall('exitMaxLength', maxLengthContext);
    }

    if (minLength != null) {
      const minLengthContext = textContext('UNSIGNED_INT', minLength);
      this.addMethodCall('enterMinLength', minLengthContext);
      this.addMethodCall('exitMinLength', minLengthContext);
    }
  }

  addPropertyEnter(propertyType: string) {
    this.addMethodCall('enterProperty', emptyContext());
    this.addMethodCall(`enter${propertyType}Property`, emptyContext());
  }

  addPropertyExit(propertyType: string) {
    this.addMethodCall(`exit${propertyType}Property`, emptyContext());
    this.addMethodCall('exitProperty', emptyContext());
  }

  addIsQueryableField(isQueryableField: boolean) {
    if (isQueryableField) {
      this.addMethodCall('enterIsQueryableField', emptyContext());
    }
  }

  addPropertyNameAndComponents(identifier: string, metaEdId: ?string, documentation: string, isRequired: boolean, isCollection: boolean, withContext: ?string = null, shortenTo: ?string = null) {
    this.withPropertyName(identifier);
    this.withMetaEdId(metaEdId);
    this.addPropertyComponents(documentation, isRequired, isCollection, withContext, shortenTo);
  }

  addPropertyComponents(documentation: string, isRequired: boolean, isCollection: boolean, withContext: ?string, shortenTo: ?string) {
    this.addMethodCall('enterPropertyComponents', emptyContext());

    this.withPropertyDocumentation(documentation);

    this.addMethodCall('enterPropertyAnnotation', emptyContext());

    if (isRequired && isCollection) {
      this.addMethodCall('enterCollection', emptyContext());
      this.addMethodCall('enterRequiredCollection', emptyContext());
      this.addMethodCall('exitRequiredCollection', emptyContext());
      this.addMethodCall('exitCollection', emptyContext());
    } else if (isRequired && !isCollection) {
      this.addMethodCall('enterRequired', emptyContext());
      this.addMethodCall('exitRequired', emptyContext());
    } else if (!isRequired && isCollection) {
      this.addMethodCall('enterCollection', emptyContext());
      this.addMethodCall('enterOptionalCollection', emptyContext());
      this.addMethodCall('exitOptionalCollection', emptyContext());
      this.addMethodCall('exitCollection', emptyContext());
    } else if (!isRequired && !isCollection) {
      this.addMethodCall('enterOptional', emptyContext());
      this.addMethodCall('exitOptional', emptyContext());
    }

    this.addMethodCall('exitPropertyAnnotation', emptyContext());

    this.addWithContext(withContext, shortenTo);

    this.addMethodCall('exitPropertyComponents', emptyContext());
  }

  addPropertyIdentityComponents(identifier: string, metaEdId: ?string, documentation: string, withContext: ?string = null) {
    this.withPropertyName(identifier);
    this.withMetaEdId(metaEdId);

    this.addMethodCall('enterPropertyComponents', emptyContext());

    this.withPropertyDocumentation(documentation);

    this.addMethodCall('enterPropertyAnnotation', emptyContext());
    this.addMethodCall('enterIdentity', emptyContext());
    this.addMethodCall('exitIdentity', emptyContext());
    this.addMethodCall('exitPropertyAnnotation', emptyContext());

    this.addWithContext(withContext);

    this.addMethodCall('exitPropertyComponents', emptyContext());
  }

  addPropertyIdentityRenameComponents(identifier: string, metaEdId: ?string, documentation: string, baseKeyName: string, withContext: ?string = null) {
    const baseKeyNameContext = idTextContext(baseKeyName);

    this.withPropertyName(identifier);
    this.withMetaEdId(metaEdId);

    this.addMethodCall('enterPropertyComponents', emptyContext());

    this.withPropertyDocumentation(documentation);

    this.addMethodCall('enterPropertyAnnotation', emptyContext());
    this.addMethodCall('enterIdentityRename', emptyContext());

    this.addMethodCall('enterBaseKeyName', baseKeyNameContext);
    this.addMethodCall('exitBaseKeyName', baseKeyNameContext);

    this.addMethodCall('exitIdentityRename', emptyContext());
    this.addMethodCall('exitPropertyAnnotation', emptyContext());

    this.addWithContext(withContext);

    this.addMethodCall('exitPropertyComponents', emptyContext());
  }

  addWithContext(withContext: ?string, shortenTo: ?string = null) {
    if (withContext != null) {
      this.addMethodCall('enterWithContext', emptyContext());

      const withContextNameContext = idTextContext(withContext);
      this.addMethodCall('enterWithContextName', withContextNameContext);
      this.addMethodCall('exitWithContextName', withContextNameContext);

      if (shortenTo != null) {
        const shortenToNameContext = idTextContext(shortenTo);
        this.addMethodCall('enterShortenToName', shortenToNameContext);
        this.addMethodCall('exitShortenToName', shortenToNameContext);
      }

      this.addMethodCall('exitWithContext', emptyContext());
    }
  }

  addIsWeakReference(isWeak: ?boolean) {
    if (!isWeak) return;
    this.addMethodCall('enterIsWeakReference', emptyContext());
    this.addMethodCall('exitIsWeakReference', emptyContext());
  }

  addMergeWith(mergePropertyPath: string, targetPropertyPath: string) {
    const mergeIdArray = mergePropertyPath.split('.').map(x => ({ getText: () => x }));
    const mergePropertyPathPartsContext = { ID: () => mergeIdArray };
    const mergePropertyPathContext = newContext('propertyPath', mergePropertyPathPartsContext);

    const targetIdArray = targetPropertyPath.split('.').map(x => ({ getText: () => x }));
    const targetPropertyPathPartsContext = { ID: () => targetIdArray };
    const targetPropertyPathContext = newContext('propertyPath', targetPropertyPathPartsContext);

    this.addMethodCall('enterMergePartOfReference', emptyContext());
    this.addMethodCall('enterMergePropertyPath', mergePropertyPathContext);
    this.addMethodCall('enterPropertyPath', mergePropertyPathPartsContext);
    this.addMethodCall('exitPropertyPath', mergePropertyPathPartsContext);
    this.addMethodCall('exitMergePropertyPath', mergePropertyPathContext);
    this.addMethodCall('enterTargetPropertyPath', targetPropertyPathContext);
    this.addMethodCall('enterPropertyPath', targetPropertyPathPartsContext);
    this.addMethodCall('exitPropertyPath', targetPropertyPathPartsContext);
    this.addMethodCall('exitTargetPropertyPath', targetPropertyPathContext);
    this.addMethodCall('exitMergePartOfReference', emptyContext());
  }

  withPropertyName(identifier: string) {
    const propertyNameContext = idTextContext(identifier);

    this.addMethodCall('enterPropertyName', propertyNameContext);
    this.addMethodCall('exitPropertyName', propertyNameContext);
  }

  withMetaEdId(metaEdId: ?string) {
    if (!metaEdId) return;
    const metaEdIdContext = textContext('METAED_ID', `[${metaEdId}]`);

    this.addMethodCall('enterMetaEdId', metaEdIdContext);
    this.addMethodCall('exitMetaEdId', metaEdIdContext);
  }

  talkTo(listener: MetaEdGrammarListener) {
    this.listenerMethodCalls.forEach(x => listener[x.listenerMethod](x.grammarContext));
  }

  addMethodCall(listenerMethod: string, grammarContext: MetaEdGrammar.ParserRuleContext) {
    this.listenerMethodCalls.push({ listenerMethod, grammarContext });
  }
}
