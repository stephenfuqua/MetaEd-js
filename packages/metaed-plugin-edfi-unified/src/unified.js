// @flow
import type { Enhancer, Validator, MetaEdPlugin } from '../../../packages/metaed-core/index';

import { validate as abstractEntityMustContainAnIdentity } from './validator/AbstractEntity/AbstractEntityMustContainAnIdentity';

import { validate as associationExtensionExistsOnlyInExtensionNamespace } from './validator/AssociationExtension/AssociationExtensionExistsOnlyInExtensionNamespace';
import { validate as associationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass } from './validator/AssociationExtension/AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass';
import { validate as associationExtensionMustNotRedeclareProperties } from './validator/AssociationExtension/AssociationExtensionMustNotRedeclareProperties';

import { validate as associationPropertyMustMatchAnAssociation } from './validator/AssociationProperty/AssociationPropertyMustMatchAnAssociation';

import { validate as associationSubclassIdentifierMustMatchAnAssociation } from './validator/AssociationSubclass/AssociationSubclassIdentifierMustMatchAnAssociation';
import { validate as associationSubclassIdentityRenameMustExistNoMoreThanOnce } from './validator/AssociationSubclass/AssociationSubclassIdentityRenameMustExistNoMoreThanOnce';
import { validate as associationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass } from './validator/AssociationSubclass/AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass';
import { validate as associationSubclassMustNotRedeclareProperties } from './validator/AssociationSubclass/AssociationSubclassMustNotRedeclareProperties';

import { validate as choicePropertyMustMatchAChoice } from './validator/ChoiceProperty/ChoicePropertyMustMatchAChoice';

import { validate as commonExtensionExistsOnlyInExtensionNamespace } from './validator/CommonExtension/CommonExtensionExistsOnlyInExtensionNamespace';
import { validate as commonExtensionIdentifierMustMatchACommon } from './validator/CommonExtension/CommonExtensionIdentifierMustMatchACommon';
import { validate as commonExtensionMustNotRedeclareProperties } from './validator/CommonExtension/CommonExtensionMustNotRedeclareProperties';

import { validate as commonPropertyMustMatchACommon } from './validator/CommonProperty/CommonPropertyMustMatchACommon';
import { validate as commonPropertyMustNotContainIdentity } from './validator/CommonProperty/CommonPropertyMustNotContainIdentity';
import { validate as commonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension } from './validator/CommonProperty/CommonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension';
import { validate as commonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality } from './validator/CommonProperty/CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality';

import { validate as mostEntitiesCannotHaveSameName } from './validator/CrossEntity/MostEntitiesCannotHaveSameName';

import { validate as decimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits } from './validator/DecimalProperty/DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits';
import { validate as decimalPropertyMinValueMustNotBeGreaterThanMaxValue } from './validator/DecimalProperty/DecimalPropertyMinValueMustNotBeGreaterThanMaxValue';
import { validate as decimalPropertyMustNotMatchACommonDecimal } from './validator/DecimalProperty/DecimalPropertyMustNotMatchACommonDecimal';
import { validate as decimalPropertyMustNotMatchACommonInteger } from './validator/DecimalProperty/DecimalPropertyMustNotMatchACommonInteger';
import { validate as decimalPropertyMustNotMatchACommonString } from './validator/DecimalProperty/DecimalPropertyMustNotMatchACommonString';

import { validate as descriptorMapTypeItemsMustBeUnique } from './validator/Descriptor/DescriptorMapTypeItemsMustBeUnique';

import { validate as descriptorPropertyMustMatchADescriptor } from './validator/DescriptorProperty/DescriptorPropertyMustMatchADescriptor';

import { validate as associationDomainItemMustMatchTopLevelEntity } from './validator/Domain/AssociationDomainItemMustMatchTopLevelEntity';
import { validate as commonDomainItemMustMatchTopLevelEntity } from './validator/Domain/CommonDomainItemMustMatchTopLevelEntity';
import { validate as descriptorDomainItemMustMatchTopLevelEntity } from './validator/Domain/DescriptorDomainItemMustMatchTopLevelEntity';
import { validate as domainEntityDomainItemMustMatchTopLevelEntity } from './validator/Domain/DomainEntityDomainItemMustMatchTopLevelEntity';
import { validate as domainMustNotDuplicateDomainItems } from './validator/Domain/DomainMustNotDuplicateDomainItems';
import { validate as inlineCommonDomainItemMustMatchTopLevelEntity } from './validator/Domain/InlineCommonDomainItemMustMatchTopLevelEntity';

import { validate as domainEntityMustContainAnIdentity } from './validator/DomainEntity/DomainEntityMustContainAnIdentity';
import { validate as domainEntityMustContainNoMoreThanOneUniqueIdColumn } from './validator/DomainEntity/DomainEntityMustContainNoMoreThanOneUniqueIdColumn';

import { validate as domainEntityExtensionExistsOnlyInExtensionNamespace } from './validator/DomainEntityExtension/DomainEntityExtensionExistsOnlyInExtensionNamespace';
import { validate as domainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass } from './validator/DomainEntityExtension/DomainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass';
import { validate as domainEntityExtensionMustNotRedeclareProperties } from './validator/DomainEntityExtension/DomainEntityExtensionMustNotRedeclareProperties';

import { validate as domainEntityPropertyMustMatchADomainEntity } from './validator/DomainEntityProperty/DomainEntityPropertyMustMatchADomainEntity';

import { validate as domainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity } from './validator/DomainEntitySubclass/DomainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity';
import { validate as domainEntitySubclassIdentityRenameMustExistNoMoreThanOnce } from './validator/DomainEntitySubclass/DomainEntitySubclassIdentityRenameMustExistNoMoreThanOnce';
import { validate as domainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass } from './validator/DomainEntitySubclass/DomainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass';
import { validate as domainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity } from './validator/DomainEntitySubclass/DomainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity';
import { validate as domainEntitySubclassMustNotRedeclareProperties } from './validator/DomainEntitySubclass/DomainEntitySubclassMustNotRedeclareProperties';

import { validate as enumerationItemsMustBeUnique } from './validator/Enumeration/EnumerationItemsMustBeUnique';

import { validate as enumerationPropertyMustMatchAnEnumeration } from './validator/EnumerationProperty/EnumerationPropertyMustMatchAnEnumeration';

import { validate as identityExistsOnlyIfIdentityIsAllowed } from './validator/Identity/IdentityExistsOnlyIfIdentityIsAllowed';

import { validate as identityRenameExistsOnlyIfIdentityRenameIsAllowed } from './validator/IdentityRename/IdentityRenameExistsOnlyIfIdentityRenameIsAllowed';

import { validate as inlineCommonExistsOnlyInCoreNamespace } from './validator/InlineCommon/InlineCommonExistsOnlyInCoreNamespace';

import { validate as integerPropertyMinValueMustNotBeGreaterThanMaxValue } from './validator/IntegerProperty/IntegerPropertyMinValueMustNotBeGreaterThanMaxValue';
import { validate as integerPropertyMustNotMatchACommonDecimal } from './validator/IntegerProperty/IntegerPropertyMustNotMatchACommonDecimal';
import { validate as integerPropertyMustNotMatchACommonInteger } from './validator/IntegerProperty/IntegerPropertyMustNotMatchACommonInteger';
import { validate as integerPropertyMustNotMatchACommonString } from './validator/IntegerProperty/IntegerPropertyMustNotMatchACommonString';

import { validate as interchangeElementMustMatchADomainEntityOrAssociationOrSubclass } from './validator/Interchange/InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass';
import { validate as interchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass } from './validator/Interchange/InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass';
import { validate as interchangeMustNotRedeclareIdentityTemplates } from './validator/Interchange/InterchangeMustNotRedeclareIdentityTemplates';
import { validate as interchangeMustNotRedeclareInterchangeElements } from './validator/Interchange/InterchangeMustNotRedeclareInterchangeElements';

import { validate as interchangeExtensionIdentifierMustMatchAnInterchange } from './validator/InterchangeExtension/InterchangeExtensionIdentifierMustMatchAnInterchange';
import { validate as interchangeExtensionMustNotRedeclareBaseInterchangeElements } from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareBaseInterchangeElements';
import { validate as interchangeExtensionMustNotRedeclareBaseInterchangeIdentityName } from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareBaseInterchangeIdentityName';
import { validate as interchangeExtensionMustNotRedeclareElements } from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareElements';
import { validate as interchangeExtensionMustNotRedeclareIdentityName } from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareIdentityName';

import { validate as mergePropertyAndTargetPropertyMustMatch } from './validator/MergePartOfReference/MergePropertyAndTargetPropertyMustMatch';
import { validate as mergePropertyPathMustExist } from './validator/MergePartOfReference/MergePropertyPathMustExist';
import { validate as mergeStatementMustStartMergePathWithPropertyName } from './validator/MergePartOfReference/MergeStatementMustStartMergePathWithPropertyName';
import { validate as targetPropertyPathMustExist } from './validator/MergePartOfReference/TargetPropertyPathMustExist';

import { validate as metaEdIdIsRequiredForDomainItems } from './validator/MetaEdId/MetaEdIdIsRequiredForDomainItems';
import { validate as metaEdIdIsRequiredForEntities } from './validator/MetaEdId/MetaEdIdIsRequiredForEntities';
import { validate as metaEdIdIsRequiredForEnumerationItems } from './validator/MetaEdId/MetaEdIdIsRequiredForEnumerationItems';
import { validate as metaEdIdIsRequiredForInterchangeItems } from './validator/MetaEdId/MetaEdIdIsRequiredForInterchangeItems';
import { validate as metaEdIdIsRequiredForProperties } from './validator/MetaEdId/MetaEdIdIsRequiredForProperties';
import { validate as mustNotDuplicateMetaEdId } from './validator/MetaEdId/MustNotDuplicateMetaEdId';

import { validate as sharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits } from './validator/SharedSimple/SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits';
import { validate as sharedDecimalMinValueMustNotBeGreaterThanMaxValue } from './validator/SharedSimple/SharedDecimalMinValueMustNotBeGreaterThanMaxValue';
import { validate as sharedIntegerMinValueMustNotBeGreaterThanMaxValue } from './validator/SharedSimple/SharedIntegerMinValueMustNotBeGreaterThanMaxValue';
import { validate as sharedStringMinLengthMustNotBeGreaterThanMaxLength } from './validator/SharedSimple/SharedStringMinLengthMustNotBeGreaterThanMaxLength';

import { validate as shortPropertyMinValueMustNotBeGreaterThanMaxValue } from './validator/ShortProperty/ShortPropertyMinValueMustNotBeGreaterThanMaxValue';
import { validate as shortPropertyMustNotMatchACommonDecimal } from './validator/ShortProperty/ShortPropertyMustNotMatchACommonDecimal';
import { validate as shortPropertyMustNotMatchACommonInteger } from './validator/ShortProperty/ShortPropertyMustNotMatchACommonInteger';
import { validate as shortPropertyMustNotMatchACommonString } from './validator/ShortProperty/ShortPropertyMustNotMatchACommonString';

import { validate as stringPropertyMinLengthMustNotBeGreaterThanMaxLength } from './validator/StringProperty/StringPropertyMinLengthMustNotBeGreaterThanMaxLength';
import { validate as stringPropertyMustNotMatchACommonDecimal } from './validator/StringProperty/StringPropertyMustNotMatchACommonDecimal';
import { validate as stringPropertyMustNotMatchACommonInteger } from './validator/StringProperty/StringPropertyMustNotMatchACommonInteger';
import { validate as stringPropertyMustNotMatchACommonString } from './validator/StringProperty/StringPropertyMustNotMatchACommonString';

import { validate as subdomainMustNotDuplicateDomainItems } from './validator/Subdomain/SubdomainMustNotDuplicateDomainItems';
import { validate as subdomainParentDomainNameMustMatchADomain } from './validator/Subdomain/SubdomainParentDomainNameMustMatchADomain';

function validatorList(): Array<Validator> {
  return [
    abstractEntityMustContainAnIdentity,

    associationExtensionExistsOnlyInExtensionNamespace,
    associationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass,
    associationExtensionMustNotRedeclareProperties,

    associationPropertyMustMatchAnAssociation,

    associationSubclassIdentifierMustMatchAnAssociation,
    associationSubclassIdentityRenameMustExistNoMoreThanOnce,
    associationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass,
    associationSubclassMustNotRedeclareProperties,

    choicePropertyMustMatchAChoice,

    commonExtensionExistsOnlyInExtensionNamespace,
    commonExtensionIdentifierMustMatchACommon,
    commonExtensionMustNotRedeclareProperties,

    commonPropertyMustMatchACommon,
    commonPropertyMustNotContainIdentity,
    commonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension,
    commonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality,

    mostEntitiesCannotHaveSameName,

    decimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits,
    decimalPropertyMinValueMustNotBeGreaterThanMaxValue,
    decimalPropertyMustNotMatchACommonDecimal,
    decimalPropertyMustNotMatchACommonInteger,
    decimalPropertyMustNotMatchACommonString,

    descriptorMapTypeItemsMustBeUnique,

    descriptorPropertyMustMatchADescriptor,

    associationDomainItemMustMatchTopLevelEntity,
    commonDomainItemMustMatchTopLevelEntity,
    descriptorDomainItemMustMatchTopLevelEntity,
    domainEntityDomainItemMustMatchTopLevelEntity,
    domainMustNotDuplicateDomainItems,
    inlineCommonDomainItemMustMatchTopLevelEntity,

    domainEntityMustContainAnIdentity,
    domainEntityMustContainNoMoreThanOneUniqueIdColumn,

    domainEntityExtensionExistsOnlyInExtensionNamespace,
    domainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass,
    domainEntityExtensionMustNotRedeclareProperties,

    domainEntityPropertyMustMatchADomainEntity,

    domainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity,
    domainEntitySubclassIdentityRenameMustExistNoMoreThanOnce,
    domainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass,
    domainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity,
    domainEntitySubclassMustNotRedeclareProperties,

    enumerationItemsMustBeUnique,

    enumerationPropertyMustMatchAnEnumeration,

    identityExistsOnlyIfIdentityIsAllowed,

    identityRenameExistsOnlyIfIdentityRenameIsAllowed,

    inlineCommonExistsOnlyInCoreNamespace,

    integerPropertyMinValueMustNotBeGreaterThanMaxValue,
    integerPropertyMustNotMatchACommonDecimal,
    integerPropertyMustNotMatchACommonInteger,
    integerPropertyMustNotMatchACommonString,

    interchangeElementMustMatchADomainEntityOrAssociationOrSubclass,
    interchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass,
    interchangeMustNotRedeclareIdentityTemplates,
    interchangeMustNotRedeclareInterchangeElements,

    interchangeExtensionIdentifierMustMatchAnInterchange,
    interchangeExtensionMustNotRedeclareBaseInterchangeElements,
    interchangeExtensionMustNotRedeclareBaseInterchangeIdentityName,
    interchangeExtensionMustNotRedeclareElements,
    interchangeExtensionMustNotRedeclareIdentityName,

    mergePropertyAndTargetPropertyMustMatch,
    mergePropertyPathMustExist,
    mergeStatementMustStartMergePathWithPropertyName,
    targetPropertyPathMustExist,

    metaEdIdIsRequiredForDomainItems,
    metaEdIdIsRequiredForEntities,
    metaEdIdIsRequiredForEnumerationItems,
    metaEdIdIsRequiredForInterchangeItems,
    metaEdIdIsRequiredForProperties,
    mustNotDuplicateMetaEdId,

    sharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits,
    sharedDecimalMinValueMustNotBeGreaterThanMaxValue,
    sharedIntegerMinValueMustNotBeGreaterThanMaxValue,
    sharedStringMinLengthMustNotBeGreaterThanMaxLength,

    shortPropertyMinValueMustNotBeGreaterThanMaxValue,
    shortPropertyMustNotMatchACommonDecimal,
    shortPropertyMustNotMatchACommonInteger,
    shortPropertyMustNotMatchACommonString,

    stringPropertyMinLengthMustNotBeGreaterThanMaxLength,
    stringPropertyMustNotMatchACommonDecimal,
    stringPropertyMustNotMatchACommonInteger,
    stringPropertyMustNotMatchACommonString,

    subdomainMustNotDuplicateDomainItems,
    subdomainParentDomainNameMustMatchADomain,
  ];
}

function enhancerList(): Array<Enhancer> {
  return [];  // TODO: list them
}

export default function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: enhancerList(),
  };
}
