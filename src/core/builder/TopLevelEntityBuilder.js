// @flow
import R from 'ramda';

import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';

import { EntityProperty } from '../model/property/EntityProperty';
import { MergedProperty, defaultMergedProperty } from '../model/property/MergedProperty';
import { TopLevelEntity } from '../model/TopLevelEntity';
import type { EntityRepository } from '../model/Repository';
import { NamespaceInfo, namespaceInfoFactory } from '../model/NamespaceInfo';

import { isSharedProperty } from '../model/property/PropertyType';
import { enteringNamespaceName, enteringNamespaceType } from './NamespaceInfoBuilder';
import { extractDocumentation, squareBracketRemoval } from './BuilderUtility';
import { booleanPropertyFactory } from '../model/property/BooleanProperty';
import { currencyPropertyFactory } from '../model/property/CurrencyProperty';
import { datePropertyFactory } from '../model/property/DateProperty';
import { DecimalProperty, decimalPropertyFactory } from '../model/property/DecimalProperty';
import { descriptorPropertyFactory } from '../model/property/DescriptorProperty';
import { durationPropertyFactory } from '../model/property/DurationProperty';
import { enumerationPropertyFactory } from '../model/property/EnumerationProperty';
import { CommonProperty, commonPropertyFactory } from '../model/property/CommonProperty';
import { inlineCommonPropertyFactory } from '../model/property/InlineCommonProperty';
import { choicePropertyFactory } from '../model/property/ChoiceProperty';
import { IntegerProperty, integerPropertyFactory } from '../model/property/IntegerProperty';
import { percentPropertyFactory } from '../model/property/PercentProperty';
import { AssociationProperty, associationPropertyFactory } from '../model/property/AssociationProperty';
import { DomainEntityProperty, domainEntityPropertyFactory } from '../model/property/DomainEntityProperty';
import { sharedDecimalPropertyFactory } from '../model/property/SharedDecimalProperty';
import { sharedIntegerPropertyFactory } from '../model/property/SharedIntegerProperty';
import { sharedStringPropertyFactory } from '../model/property/SharedStringProperty';
import { StringProperty, stringPropertyFactory } from '../model/property/StringProperty';
import { timePropertyFactory } from '../model/property/TimeProperty';
import { yearPropertyFactory } from '../model/property/YearProperty';
import { ReferentialProperty } from '../model/property/ReferentialProperty';
import { ShortProperty, shortPropertyFactory } from '../model/property/ShortProperty';
import { sharedShortPropertyFactory } from '../model/property/SharedShortProperty';

function propertyPathFrom(context: MetaEdGrammar.PropertyPathContext) {
  if (R.any(token => token.exception)(context.ID())) return [];
  return R.map(token => token.getText())(context.ID());
}

export default class TopLevelEntityBuilder extends MetaEdGrammarListener {
  currentTopLevelEntity: ?TopLevelEntity;
  currentProperty: ?EntityProperty;
  currentMergedProperty: ?MergedProperty;
  whenExitingProperty: Array<() => void>;

  repository: EntityRepository;
  namespaceInfo: ?NamespaceInfo;

  constructor(repository: EntityRepository) {
    super();
    this.repository = repository;
    this.whenExitingProperty = [];
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

  enteringEntity(entityFactory: () => TopLevelEntity) {
    if (this.namespaceInfo == null) return;
    // $FlowIgnore - already null guarded
    this.currentTopLevelEntity = Object.assign(entityFactory(), { namespaceInfo: this.namespaceInfo });
  }

  exitingEntity() {
    if (this.currentTopLevelEntity == null) return;
    // $FlowIgnore - allowing currentTopLevelEntity.type to specify the repository Map property
    this.repository[this.currentTopLevelEntity.type].set(this.currentTopLevelEntity.metaEdName, this.currentTopLevelEntity);
    this.currentTopLevelEntity = null;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentTopLevelEntity == null) return;
    // $FlowIgnore - already null guarded
    this.currentTopLevelEntity.documentation = extractDocumentation(context);
  }

  enteringName(name: string) {
    if (this.currentTopLevelEntity == null) return;
    this.currentTopLevelEntity.metaEdName = name;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;

    if (this.currentProperty != null) {
      // $FlowIgnore - already null guarded
      this.currentProperty.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else if (this.currentTopLevelEntity != null) {
      // $FlowIgnore - already null guarded
      this.currentTopLevelEntity.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterBooleanProperty(context: MetaEdGrammar.BooleanPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = booleanPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterCurrencyProperty(context: MetaEdGrammar.CurrencyPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = currencyPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterDateProperty(context: MetaEdGrammar.DatePropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = datePropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterDecimalProperty(context: MetaEdGrammar.DecimalPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = decimalPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterDescriptorProperty(context: MetaEdGrammar.DescriptorPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = descriptorPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterDurationProperty(context: MetaEdGrammar.DurationPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = durationPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumerationProperty(context: MetaEdGrammar.EnumerationPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = enumerationPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterCommonProperty(context: MetaEdGrammar.CommonPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = commonPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterInlineCommonProperty(context: MetaEdGrammar.InlineCommonPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = inlineCommonPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterChoiceProperty(context: MetaEdGrammar.ChoicePropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = choicePropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterCommonExtensionOverride(context: MetaEdGrammar.CommonExtensionOverrideContext) {
    if (this.currentProperty == null) return;
    ((this.currentProperty: any): CommonProperty).isExtensionOverride = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterIntegerProperty(context: MetaEdGrammar.IntegerPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = integerPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterShortProperty(context: MetaEdGrammar.ShortPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = shortPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterPercentProperty(context: MetaEdGrammar.PercentPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = percentPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterAssociationProperty(context: MetaEdGrammar.AssociationPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = associationPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterDomainEntityProperty(context: MetaEdGrammar.DomainEntityPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = domainEntityPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterSharedDecimalProperty(context: MetaEdGrammar.SharedDecimalPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = sharedDecimalPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterSharedIntegerProperty(context: MetaEdGrammar.SharedIntegerPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = sharedIntegerPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterSharedShortProperty(context: MetaEdGrammar.SharedShortPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = sharedShortPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterSharedStringProperty(context: MetaEdGrammar.SharedStringPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = sharedStringPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterStringProperty(context: MetaEdGrammar.StringPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = stringPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterTimeProperty(context: MetaEdGrammar.TimePropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = timePropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  enterYearProperty(context: MetaEdGrammar.YearPropertyContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = yearPropertyFactory();
  }

  // eslint-disable-next-line no-unused-vars
  exitProperty(context: MetaEdGrammar.PropertyContext) {
    this.exitingProperty();
  }

  exitingProperty() {
    if (this.currentProperty == null) return;

    // Shared simple properties have propertyName as optional. If omitted, name is same as type being referenced
    if (!this.currentProperty.metaEdName && isSharedProperty(this.currentProperty)) {
      this.currentProperty.metaEdName = this.currentProperty.referencedType;
    }

    if (this.currentTopLevelEntity != null) {
      // $FlowIgnore - already null guarded
      if (this.currentProperty.isPartOfIdentity || this.currentProperty.isIdentityRename) {
        // $FlowIgnore - already null guarded
        this.currentTopLevelEntity.identityProperties.push(this.currentProperty);
      }

      // $FlowIgnore - already null guarded
      if (!this.currentProperty.isQueryableOnly) {
        // $FlowIgnore - already null guarded
        this.currentTopLevelEntity.properties.push(this.currentProperty);
      }

      while (this.whenExitingProperty.length > 0) {
        this.whenExitingProperty.pop()();
      }

      // $FlowIgnore - already null guarded
      this.currentProperty.parentEntityName = this.currentTopLevelEntity.metaEdName;
    }

    this.currentProperty = null;
  }

  enterPropertyDocumentation(context: MetaEdGrammar.PropertyDocumentationContext) {
    if (this.currentProperty == null) return;

    if (context.INHERITED() != null && !context.INHERITED().exception) {
      // $FlowIgnore - already null guarded
      this.currentProperty.documentationInherited = true;
    } else {
      // $FlowIgnore - already null guarded
      this.currentProperty.documentation = extractDocumentation(context);
    }
  }

  enterWithContextName(context: MetaEdGrammar.WithContextNameContext) {
    if (this.currentProperty == null) return;
    if (context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentProperty.withContext = context.ID().getText();
  }

  enterShortenToName(context: MetaEdGrammar.ShortenToNameContext) {
    if (this.currentProperty == null) return;
    if (context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentProperty.shortenTo = context.ID().getText();
  }

  enterPropertyName(context: MetaEdGrammar.PropertyNameContext) {
    if (this.currentProperty == null) return;
    if (context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentProperty.metaEdName = context.ID().getText();

    // $FlowIgnore - already null guarded
    if (this.currentProperty.metaEdName === 'SchoolYear' && this.currentProperty.type === 'enumeration') {
      // $FlowIgnore - already null guarded
      this.currentProperty.type = 'school year enumeration';
    }
  }

  enterSharedPropertyType(context: MetaEdGrammar.SharedPropertyTypeContext) {
    if (this.currentProperty == null) return;
    if (context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentProperty.referencedType = context.ID().getText();
  }

  // eslint-disable-next-line no-unused-vars
  enterIsQueryableField(context: MetaEdGrammar.IsQueryableFieldContext) {
    if (this.currentTopLevelEntity == null || this.currentProperty == null) return;
    this.whenExitingProperty.push(
      () => {
        // $FlowIgnore - already null guarded
        this.currentTopLevelEntity.queryableFields.push(this.currentProperty);
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  enterIsQueryableOnly(context: MetaEdGrammar.IsQueryableOnlyContext) {
    if (this.currentTopLevelEntity == null || this.currentProperty == null) return;
    this.currentProperty.isQueryableOnly = true;
    this.whenExitingProperty.push(
      () => {
        // $FlowIgnore - already null guarded
        this.currentTopLevelEntity.queryableFields.push(this.currentProperty);
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  enterIdentity(context: MetaEdGrammar.IdentityContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.isPartOfIdentity = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterIdentityRename(context: MetaEdGrammar.IdentityRenameContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.isIdentityRename = true;
    this.currentProperty.isPartOfIdentity = true;
  }

  enterBaseKeyName(context: MetaEdGrammar.BaseKeyNameContext) {
    if (this.currentProperty == null) return;
    if (context.ID() == null || context.ID().exception) return;
    // $FlowIgnore - already null guarded
    this.currentProperty.baseKeyName = context.ID().getText();
  }

  // eslint-disable-next-line no-unused-vars
  enterRequired(context: MetaEdGrammar.RequiredContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.isRequired = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterOptional(context: MetaEdGrammar.OptionalContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.isOptional = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterRequiredCollection(context: MetaEdGrammar.RequiredCollectionContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.isRequiredCollection = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterOptionalCollection(context: MetaEdGrammar.OptionalCollectionContext) {
    if (this.currentProperty == null) return;
    this.currentProperty.isOptionalCollection = true;
  }

  enterMinLength(context: MetaEdGrammar.MinLengthContext) {
    if (this.currentProperty == null) return;
    if (context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception) return;
    ((this.currentProperty: any): StringProperty).minLength = context.UNSIGNED_INT().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterMaxLength(context: MetaEdGrammar.MaxLengthContext) {
    if (this.currentProperty == null) return;
    if (context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception) return;
    ((this.currentProperty: any): StringProperty).maxLength = context.UNSIGNED_INT().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterDecimalPlaces(context: MetaEdGrammar.DecimalPlacesContext) {
    if (this.currentProperty == null) return;
    if (context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception) return;
    ((this.currentProperty: any): DecimalProperty).decimalPlaces = context.UNSIGNED_INT().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterTotalDigits(context: MetaEdGrammar.TotalDigitsContext) {
    if (this.currentProperty == null) return;
    if (context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception) return;
    ((this.currentProperty: any): DecimalProperty).totalDigits = context.UNSIGNED_INT().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterMinValue(context: MetaEdGrammar.MinValueContext) {
    if (this.currentProperty == null) return;
    if (context.signed_int() == null || context.signed_int().exception) return;
    ((this.currentProperty: any): IntegerProperty | ShortProperty).minValue = context.signed_int().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterMaxValue(context: MetaEdGrammar.MaxValueContext) {
    if (this.currentProperty == null) return;
    if (context.signed_int() == null || context.signed_int().exception) return;
    ((this.currentProperty: any): IntegerProperty | ShortProperty).maxValue = context.signed_int().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterMinValueDecimal(context: MetaEdGrammar.MinValueDecimalContext) {
    if (this.currentProperty == null) return;
    if (context.decimalValue() == null || context.decimalValue().exception) return;
    ((this.currentProperty: any): DecimalProperty).minValue = context.decimalValue().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  enterMaxValueDecimal(context: MetaEdGrammar.MaxValueDecimalContext) {
    if (this.currentProperty == null) return;
    if (context.decimalValue() == null || context.decimalValue().exception) return;
    ((this.currentProperty: any): DecimalProperty).maxValue = context.decimalValue().getText();
    // $FlowIgnore - already null guarded
    this.currentProperty.hasRestriction = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterIsWeakReference(context: MetaEdGrammar.IsWeakReferenceContext) {
    if (this.currentProperty == null) return;
    ((this.currentProperty: any): DomainEntityProperty | AssociationProperty).isWeak = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterMergePartOfReference(context: MetaEdGrammar.MergePartOfReferenceContext) {
    if (this.currentProperty == null) return;
    this.currentMergedProperty = defaultMergedProperty();
  }

  enterMergePropertyPath(context: MetaEdGrammar.MergePropertyPathContext) {
    if (this.currentMergedProperty == null) return;
    if (context.propertyPath() == null || context.propertyPath().exception) return;
    // $FlowIgnore - already null guarded
    this.currentMergedProperty.mergePropertyPath = propertyPathFrom(context.propertyPath());
  }

  enterTargetPropertyPath(context: MetaEdGrammar.TargetPropertyPathContext) {
    if (this.currentMergedProperty == null) return;
    if (context.propertyPath() == null || context.propertyPath().exception) return;
    // $FlowIgnore - already null guarded
    this.currentMergedProperty.targetPropertyPath = propertyPathFrom(context.propertyPath());
  }

  // eslint-disable-next-line no-unused-vars
  exitMergePartOfReference(context: MetaEdGrammar.MergePartOfReferenceContext) {
    if (this.currentProperty == null || this.currentMergedProperty == null) return;
    ((this.currentProperty: any): ReferentialProperty).mergedProperties.push(this.currentMergedProperty);
    this.currentMergedProperty = null;
  }
}
