// @flow
import R from 'ramda';

import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';
import { EntityProperty, NoEntityProperty } from '../model/property/EntityProperty';
import { defaultMergedProperty, MergedProperty, NoMergedProperty, MergedPropertySourceMap } from '../model/property/MergedProperty';
import { TopLevelEntity, NoTopLevelEntity } from '../model/TopLevelEntity';
import type { EntityRepository } from '../model/Repository';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import { NamespaceInfo, namespaceInfoFactory, NoNamespaceInfo } from '../model/NamespaceInfo';
import { isSharedProperty } from '../model/property/PropertyType';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, isErrorText, squareBracketRemoval } from './BuilderUtility';
import { booleanPropertyFactory } from '../model/property/BooleanProperty';
import { currencyPropertyFactory } from '../model/property/CurrencyProperty';
import { datePropertyFactory } from '../model/property/DateProperty';
import { DecimalProperty, decimalPropertyFactory, DecimalPropertySourceMap } from '../model/property/DecimalProperty';
import { descriptorPropertyFactory } from '../model/property/DescriptorProperty';
import { durationPropertyFactory } from '../model/property/DurationProperty';
import { enumerationPropertyFactory } from '../model/property/EnumerationProperty';
import { CommonProperty, commonPropertyFactory } from '../model/property/CommonProperty';
import type { CommonPropertySourceMap } from '../model/property/CommonProperty';
import { inlineCommonPropertyFactory } from '../model/property/InlineCommonProperty';
import { choicePropertyFactory } from '../model/property/ChoiceProperty';
import { IntegerProperty, integerPropertyFactory, IntegerPropertySourceMap } from '../model/property/IntegerProperty';
import { percentPropertyFactory } from '../model/property/PercentProperty';
import { AssociationProperty, associationPropertyFactory, AssociationPropertySourceMap } from '../model/property/AssociationProperty';
import { DomainEntityProperty, domainEntityPropertyFactory, DomainEntityPropertySourceMap } from '../model/property/DomainEntityProperty';
import { sharedDecimalPropertyFactory } from '../model/property/SharedDecimalProperty';
import { sharedIntegerPropertyFactory } from '../model/property/SharedIntegerProperty';
import { sharedStringPropertyFactory } from '../model/property/SharedStringProperty';
import { StringProperty, stringPropertyFactory, StringPropertySourceMap } from '../model/property/StringProperty';
import { timePropertyFactory } from '../model/property/TimeProperty';
import { yearPropertyFactory } from '../model/property/YearProperty';
import { ReferentialProperty, ReferentialPropertySourceMap } from '../model/property/ReferentialProperty';
import { ShortProperty, shortPropertyFactory, ShortPropertySourceMap } from '../model/property/ShortProperty';
import { sharedShortPropertyFactory } from '../model/property/SharedShortProperty';
import { sourceMapFrom } from '../model/SourceMap';
import type { ValidationFailure } from '../validator/ValidationFailure';
import type { PropertyIndex } from '../model/property/PropertyRepository';

function propertyPathFrom(context: MetaEdGrammar.PropertyPathContext): Array<string> {
  if (R.any(token => token.exception)(context.ID())) return [];
  return R.map(token => token.getText())(context.ID());
}

export default class TopLevelEntityBuilder extends MetaEdGrammarListener {
  entityRepository: EntityRepository;
  namespaceInfo: NamespaceInfo;
  currentTopLevelEntity: TopLevelEntity;
  currentProperty: EntityProperty;
  currentMergedProperty: MergedProperty;
  whenExitingPropertyCommand: Array<() => void>;
  validationFailures: Array<ValidationFailure>;
  currentTopLevelEntityPropertyLookup: Map<string, EntityProperty>;
  propertyRepository: PropertyIndex;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.entityRepository = metaEd.entity;
    this.namespaceInfo = NoNamespaceInfo;
    this.currentTopLevelEntity = NoTopLevelEntity;
    this.currentProperty = NoEntityProperty;
    this.currentMergedProperty = NoMergedProperty;
    this.whenExitingPropertyCommand = [];
    this.validationFailures = validationFailures;
    this.currentTopLevelEntityPropertyLookup = new Map();
    this.propertyRepository = metaEd.propertyIndex;
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

  enteringEntity(entityFactory: () => TopLevelEntity) {
    if (this.namespaceInfo === NoNamespaceInfo) return;
    this.currentTopLevelEntity = Object.assign(entityFactory(), { namespaceInfo: this.namespaceInfo });
    this.currentTopLevelEntityPropertyLookup.clear();
  }

  exitingEntity() {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (this.currentTopLevelEntity.metaEdName) {
      // $FlowIgnore - allowing currentTopLevelEntity.type to specify the entityRepository Map property
      const currentTopLevelEntityRepository = this.entityRepository[this.currentTopLevelEntity.type];
      if (currentTopLevelEntityRepository.has(this.currentTopLevelEntity.metaEdName)) {
        this.validationFailures.push({
          validatorName: 'TopLevelEntityBuilder',
          category: 'error',
          message: `${this.currentTopLevelEntity.typeHumanizedName} named ${this.currentTopLevelEntity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: this.currentTopLevelEntity.sourceMap.type,
          fileMap: null,
        });
        const duplicateEntity: TopLevelEntity = currentTopLevelEntityRepository.get(this.currentTopLevelEntity.metaEdName);
        this.validationFailures.push({
          validatorName: 'TopLevelEntityBuilder',
          category: 'error',
          message: `${duplicateEntity.typeHumanizedName} named ${duplicateEntity.metaEdName} is a duplicate declaration of that name.`,
          sourceMap: duplicateEntity.sourceMap.type,
          fileMap: null,
        });
      } else {
        currentTopLevelEntityRepository.set(this.currentTopLevelEntity.metaEdName, this.currentTopLevelEntity);
      }
    }
    this.currentTopLevelEntity = NoTopLevelEntity;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentTopLevelEntity.documentation = extractDocumentation(context);
    this.currentTopLevelEntity.sourceMap.documentation = sourceMapFrom(context);
  }

  enteringName(name: string) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentTopLevelEntity.metaEdName = name;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.exception ||
      context.METAED_ID() == null ||
      context.METAED_ID().exception != null ||
      isErrorText(context.METAED_ID().getText())) return;

    if (this.currentProperty !== NoEntityProperty) {
      this.currentProperty.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
      this.currentProperty.sourceMap.metaEdId = sourceMapFrom(context);
    } else if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
      this.currentTopLevelEntity.sourceMap.metaEdId = sourceMapFrom(context);
    }
  }

  enterBooleanProperty(context: MetaEdGrammar.BooleanPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = booleanPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterCurrencyProperty(context: MetaEdGrammar.CurrencyPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = currencyPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterDateProperty(context: MetaEdGrammar.DatePropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = datePropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterDecimalProperty(context: MetaEdGrammar.DecimalPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = decimalPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterDescriptorProperty(context: MetaEdGrammar.DescriptorPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = descriptorPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterDurationProperty(context: MetaEdGrammar.DurationPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = durationPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterEnumerationProperty(context: MetaEdGrammar.EnumerationPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = enumerationPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterCommonProperty(context: MetaEdGrammar.CommonPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = commonPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterInlineCommonProperty(context: MetaEdGrammar.InlineCommonPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = inlineCommonPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterChoiceProperty(context: MetaEdGrammar.ChoicePropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = choicePropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterCommonExtensionOverride(context: MetaEdGrammar.CommonExtensionOverrideContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
    ((this.currentProperty: any): CommonProperty).isExtensionOverride = true;
    ((this.currentProperty.sourceMap: any): CommonPropertySourceMap).isExtensionOverride = sourceMapFrom(context);
  }

  enterIntegerProperty(context: MetaEdGrammar.IntegerPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = integerPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterShortProperty(context: MetaEdGrammar.ShortPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = shortPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterPercentProperty(context: MetaEdGrammar.PercentPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = percentPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterAssociationProperty(context: MetaEdGrammar.AssociationPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = associationPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterDomainEntityProperty(context: MetaEdGrammar.DomainEntityPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = domainEntityPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterSharedDecimalProperty(context: MetaEdGrammar.SharedDecimalPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = sharedDecimalPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterSharedIntegerProperty(context: MetaEdGrammar.SharedIntegerPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = sharedIntegerPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterSharedShortProperty(context: MetaEdGrammar.SharedShortPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = sharedShortPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterSharedStringProperty(context: MetaEdGrammar.SharedStringPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = sharedStringPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterStringProperty(context: MetaEdGrammar.StringPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = stringPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterTimeProperty(context: MetaEdGrammar.TimePropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = timePropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  enterYearProperty(context: MetaEdGrammar.YearPropertyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = yearPropertyFactory();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  exitProperty(context: MetaEdGrammar.PropertyContext) {
    this.exitingProperty();
  }

  // side effect - pushes ValidationFailures if there is a name collision
  propertyNameCollision(): boolean {
    const fullPropertyName = `${this.currentProperty.withContext}${this.currentProperty.metaEdName}`;
    if (!this.currentTopLevelEntityPropertyLookup.has(fullPropertyName)) {
      this.currentTopLevelEntityPropertyLookup.set(fullPropertyName, this.currentProperty);
      return false;
    }

    this.validationFailures.push({
      validatorName: 'TopLevelEntityBuilder',
      category: 'error',
      message: `Property named ${this.currentProperty.metaEdName} is a duplicate declaration of that name.`,
      sourceMap: this.currentProperty.sourceMap.type,
      fileMap: null,
    });
    // $FlowIgnore - already ensured key exists in Map above
    const duplicateProperty: EntityProperty = this.currentTopLevelEntityPropertyLookup.get(fullPropertyName);
    this.validationFailures.push({
      validatorName: 'TopLevelEntityBuilder',
      category: 'error',
      message: `Property named ${duplicateProperty.metaEdName} is a duplicate declaration of that name.`,
      sourceMap: duplicateProperty.sourceMap.type,
      fileMap: null,
    });

    return true;
  }

  exitingProperty() {
    if (this.currentProperty === NoEntityProperty) return;

    // Shared simple properties have propertyName as optional. If omitted, name is same as type being referenced
    if (!this.currentProperty.metaEdName && isSharedProperty(this.currentProperty)) {
      this.currentProperty.metaEdName = this.currentProperty.referencedType;
    }

    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      while (this.whenExitingPropertyCommand.length > 0) {
        this.whenExitingPropertyCommand.pop()();
      }

      this.currentProperty.parentEntity = this.currentTopLevelEntity;
      this.currentProperty.sourceMap.parentEntity = this.currentTopLevelEntity.sourceMap.type;

      this.currentProperty.parentEntityName = this.currentTopLevelEntity.metaEdName;
      this.currentProperty.sourceMap.parentEntityName = this.currentTopLevelEntity.sourceMap.metaEdName;

      // isQueryableOnly is XSD-specific and needs to be pulled out to artifact-specific configuration
      if (!this.currentProperty.isQueryableOnly && !this.propertyNameCollision()) {
        this.currentTopLevelEntity.properties.push(this.currentProperty);
        // $FlowIgnore - allowing entityProperty.type to specify the propertyRepository Map property
        this.propertyRepository[this.currentProperty.type].push(this.currentProperty);
      }
    }

    this.currentProperty = NoEntityProperty;
  }

  enterPropertyDocumentation(context: MetaEdGrammar.PropertyDocumentationContext) {
    if (this.currentProperty === NoEntityProperty) return;

    if (!context.exception && context.INHERITED() != null && !context.INHERITED().exception) {
      this.currentProperty.documentationInherited = true;
      this.currentProperty.sourceMap.documentationInherited = sourceMapFrom(context);
    } else {
      this.currentProperty.documentation = extractDocumentation(context);
      this.currentProperty.sourceMap.documentation = sourceMapFrom(context);
    }
  }

  enterWithContextName(context: MetaEdGrammar.WithContextNameContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentProperty.withContext = context.ID().getText();
    this.currentProperty.sourceMap.withContext = sourceMapFrom(context);
  }

  enterShortenToName(context: MetaEdGrammar.ShortenToNameContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentProperty.shortenTo = context.ID().getText();
    this.currentProperty.sourceMap.shortenTo = sourceMapFrom(context);
  }

  enterPropertyName(context: MetaEdGrammar.PropertyNameContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentProperty.metaEdName = context.ID().getText();
    this.currentProperty.sourceMap.metaEdName = sourceMapFrom(context);

    if (this.currentProperty.metaEdName === 'SchoolYear' && this.currentProperty.type === 'enumeration') {
      this.currentProperty.type = 'schoolYearEnumeration';
    }
  }

  enterSharedPropertyType(context: MetaEdGrammar.SharedPropertyTypeContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentProperty.referencedType = context.ID().getText();
    this.currentProperty.sourceMap.referencedType = sourceMapFrom(context);
  }

  enterIsQueryableField(context: MetaEdGrammar.IsQueryableFieldContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || this.currentProperty === NoEntityProperty) return;
    this.whenExitingPropertyCommand.push(
      () => {
        this.currentTopLevelEntity.queryableFields.push(this.currentProperty);
        this.currentTopLevelEntity.sourceMap.queryableFields.push(sourceMapFrom(context));
      },
    );
  }

  enterIsQueryableOnly(context: MetaEdGrammar.IsQueryableOnlyContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isQueryableOnly = true;
    this.currentProperty.sourceMap.isQueryableOnly = sourceMapFrom(context);
    this.whenExitingPropertyCommand.push(
      () => {
        this.currentTopLevelEntity.queryableFields.push(this.currentProperty);
        this.currentTopLevelEntity.sourceMap.queryableFields.push(sourceMapFrom(context));
      },
    );
  }

  enterIdentity(context: MetaEdGrammar.IdentityContext) {
    this.enteringIdentity(context);
  }

  enteringIdentity(context: MetaEdGrammar.FirstDomainEntityContext |
    MetaEdGrammar.SecondDomainEntityContext |
    MetaEdGrammar.IdentityContext |
    MetaEdGrammar.IdentityRenameContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isPartOfIdentity = true;
    this.currentProperty.sourceMap.isPartOfIdentity = sourceMapFrom(context);
    this.whenExitingPropertyCommand.push(
      () => {
        this.currentTopLevelEntity.identityProperties.push(this.currentProperty);
        this.currentTopLevelEntity.sourceMap.identityProperties.push(sourceMapFrom(context));
      },
    );
  }

  enterIdentityRename(context: MetaEdGrammar.IdentityRenameContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isIdentityRename = true;
    this.currentProperty.sourceMap.isIdentityRename = sourceMapFrom(context);
    this.enteringIdentity(context);
  }

  enterBaseKeyName(context: MetaEdGrammar.BaseKeyNameContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.currentProperty.baseKeyName = context.ID().getText();
    this.currentProperty.sourceMap.baseKeyName = sourceMapFrom(context);
  }

  enterRequired(context: MetaEdGrammar.RequiredContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isRequired = true;
    this.currentProperty.sourceMap.isRequired = sourceMapFrom(context);
  }

  enterOptional(context: MetaEdGrammar.OptionalContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isOptional = true;
    this.currentProperty.sourceMap.isOptional = sourceMapFrom(context);
  }

  enterRequiredCollection(context: MetaEdGrammar.RequiredCollectionContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isRequiredCollection = true;
    this.currentProperty.sourceMap.isRequiredCollection = sourceMapFrom(context);
  }

  enterOptionalCollection(context: MetaEdGrammar.OptionalCollectionContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentProperty.isOptionalCollection = true;
    this.currentProperty.sourceMap.isOptionalCollection = sourceMapFrom(context);
  }

  enterMinLength(context: MetaEdGrammar.MinLengthContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentProperty: any): StringProperty).minLength = context.UNSIGNED_INT().getText();
    this.currentProperty.hasRestriction = true;
    ((this.currentProperty.sourceMap: any): StringPropertySourceMap).minLength = sourceMapFrom(context);
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterMaxLength(context: MetaEdGrammar.MaxLengthContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentProperty: any): StringProperty).maxLength = context.UNSIGNED_INT().getText();
    this.currentProperty.hasRestriction = true;
    ((this.currentProperty.sourceMap: any): StringPropertySourceMap).maxLength = sourceMapFrom(context);
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterDecimalPlaces(context: MetaEdGrammar.DecimalPlacesContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentProperty: any): DecimalProperty).decimalPlaces = context.UNSIGNED_INT().getText();
    this.currentProperty.hasRestriction = true;
    ((this.currentProperty.sourceMap: any): DecimalPropertySourceMap).decimalPlaces = sourceMapFrom(context);
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterTotalDigits(context: MetaEdGrammar.TotalDigitsContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentProperty: any): DecimalProperty).totalDigits = context.UNSIGNED_INT().getText();
    this.currentProperty.hasRestriction = true;
    ((this.currentProperty.sourceMap: any): DecimalPropertySourceMap).totalDigits = sourceMapFrom(context);
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterMinValue(context: MetaEdGrammar.MinValueContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.signed_int() == null || context.signed_int().exception || isErrorText(context.signed_int().getText())) return;
    ((this.currentProperty: any): IntegerProperty | ShortProperty).minValue = context.signed_int().getText();
    ((this.currentProperty.sourceMap: any): IntegerPropertySourceMap | ShortPropertySourceMap).minValue = sourceMapFrom(context);
    this.currentProperty.hasRestriction = true;
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterMaxValue(context: MetaEdGrammar.MaxValueContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.signed_int() == null || context.signed_int().exception || isErrorText(context.signed_int().getText())) return;
    ((this.currentProperty: any): IntegerProperty | ShortProperty).maxValue = context.signed_int().getText();
    ((this.currentProperty.sourceMap: any): IntegerPropertySourceMap | ShortPropertySourceMap).maxValue = sourceMapFrom(context);
    this.currentProperty.hasRestriction = true;
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterMinValueDecimal(context: MetaEdGrammar.MinValueDecimalContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.decimalValue() == null || context.decimalValue().exception || isErrorText(context.decimalValue().getText())) return;
    ((this.currentProperty: any): DecimalProperty).minValue = context.decimalValue().getText();
    this.currentProperty.hasRestriction = true;
    ((this.currentProperty.sourceMap: any): DecimalPropertySourceMap).minValue = sourceMapFrom(context);
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterMaxValueDecimal(context: MetaEdGrammar.MaxValueDecimalContext) {
    if (this.currentProperty === NoEntityProperty) return;
    if (context.exception || context.decimalValue() == null || context.decimalValue().exception || isErrorText(context.decimalValue().getText())) return;
    ((this.currentProperty: any): DecimalProperty).maxValue = context.decimalValue().getText();
    this.currentProperty.hasRestriction = true;
    ((this.currentProperty.sourceMap: any): DecimalPropertySourceMap).maxValue = sourceMapFrom(context);
    this.currentProperty.sourceMap.hasRestriction = sourceMapFrom(context);
  }

  enterIsWeakReference(context: MetaEdGrammar.IsWeakReferenceContext) {
    if (this.currentProperty === NoEntityProperty) return;
    ((this.currentProperty: any): DomainEntityProperty | AssociationProperty).isWeak = true;
    ((this.currentProperty.sourceMap: any): DomainEntityPropertySourceMap | AssociationPropertySourceMap).isWeak = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  enterMergePartOfReference(context: MetaEdGrammar.MergePartOfReferenceContext) {
    if (this.currentProperty === NoEntityProperty) return;
    this.currentMergedProperty = defaultMergedProperty();
  }

  enterMergePropertyPath(context: MetaEdGrammar.MergePropertyPathContext) {
    if (this.currentMergedProperty === NoMergedProperty) return;
    if (context.exception || context.propertyPath() == null || context.propertyPath().exception) return;
    this.currentMergedProperty.mergePropertyPath = propertyPathFrom(context.propertyPath());
    ((this.currentMergedProperty.sourceMap: any): MergedPropertySourceMap).mergePropertyPath.push(sourceMapFrom(context));
  }

  enterTargetPropertyPath(context: MetaEdGrammar.TargetPropertyPathContext) {
    if (this.currentMergedProperty === NoMergedProperty) return;
    if (context.exception || context.propertyPath() == null || context.propertyPath().exception) return;
    this.currentMergedProperty.targetPropertyPath = propertyPathFrom(context.propertyPath());
    ((this.currentMergedProperty.sourceMap: any): MergedPropertySourceMap).targetPropertyPath.push(sourceMapFrom(context));
  }

  exitMergePartOfReference(context: MetaEdGrammar.MergePartOfReferenceContext) {
    if (this.currentProperty === NoEntityProperty || this.currentMergedProperty === NoMergedProperty) return;
    ((this.currentProperty: any): ReferentialProperty).mergedProperties.push(this.currentMergedProperty);
    ((this.currentProperty.sourceMap: any): ReferentialPropertySourceMap).mergedProperties.push(sourceMapFrom(context));
    this.currentMergedProperty = NoMergedProperty;
  }
}
