// @flow
import type { Enhancer, Validator, MetaEdPlugin } from '../../../packages/metaed-core/index';

import { validate as associationExtensionExistsOnlyInExtensionNamespace } from './validator/AssociationExtension/AssociationExtensionExistsOnlyInExtensionNamespace';
import { validate as associationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass } from './validator/AssociationExtension/AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass';
import { validate as associationExtensionMustNotRedeclareProperties } from './validator/AssociationExtension/AssociationExtensionMustNotRedeclareProperties';

import { validate as associationPropertyMustMatchAnAssociation } from './validator/AssociationProperty/AssociationPropertyMustMatchAnAssociation';

import { validate as AssociationSubclassIdentifierMustMatchAnAssociation} from './validator/AssociationSubclass/AssociationSubclassIdentifierMustMatchAnAssociation';
import { validate as AssociationSubclassIdentityRenameMustExistNoMoreThanOnce} from './validator/AssociationSubclass/AssociationSubclassIdentityRenameMustExistNoMoreThanOnce';
import { validate as AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass} from './validator/AssociationSubclass/AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass';
import { validate as AssociationSubclassMustNotRedeclareProperties} from './validator/AssociationSubclass/AssociationSubclassMustNotRedeclareProperties';

import { validate as choicePropertyMustMatchAChoice } from './validator/ChoiceProperty/ChoicePropertyMustMatchAChoice';

import { validate as CommonExtensionExistsOnlyInExtensionNamespace} from './validator/CommonExtension/CommonExtensionExistsOnlyInExtensionNamespace';
import { validate as CommonExtensionIdentifierMustMatchACommon} from './validator/CommonExtension/CommonExtensionIdentifierMustMatchACommon';
import { validate as CommonExtensionMustNotRedeclareProperties} from './validator/CommonExtension/CommonExtensionMustNotRedeclareProperties';

import { validate as CommonPropertyMustMatchACommon } from './validator/CommonProperty/CommonPropertyMustMatchACommon';
import { validate as CommonPropertyMustNotContainIdentity} from './validator/CommonProperty/CommonPropertyMustNotContainIdentity';
import { validate as CommonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension} from './validator/CommonProperty/CommonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension';
import { validate as CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality} from './validator/CommonProperty/CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality';

import { validate as mostEntitiesCannotHaveSameName } from './validator/CrossEntity/MostEntitiesCannotHaveSameName';

import { validate as DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits} from './validator/DecimalProperty/DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits';
import { validate as DecimalPropertyMinValueMustNotBeGreaterThanMaxValue} from './validator/DecimalProperty/DecimalPropertyMinValueMustNotBeGreaterThanMaxValue';
import { validate as DecimalPropertyMustNotMatchACommonDecimal} from './validator/DecimalProperty/DecimalPropertyMustNotMatchACommonDecimal';
import { validate as DecimalPropertyMustNotMatchACommonInteger} from './validator/DecimalProperty/DecimalPropertyMustNotMatchACommonInteger';
import { validate as DecimalPropertyMustNotMatchACommonString} from './validator/DecimalProperty/DecimalPropertyMustNotMatchACommonString';

import { validate as DescriptorMapTypeItemsMustBeUnique} from './validator/Descriptor/DescriptorMapTypeItemsMustBeUnique';

import { validate as DescriptorPropertyMustMatchADescriptor} from './validator/DescriptorProperty/DescriptorPropertyMustMatchADescriptor';

import { validate as AssociationDomainItemMustMatchTopLevelEntity} from './validator/Domain/AssociationDomainItemMustMatchTopLevelEntity';
import { validate as CommonDomainItemMustMatchTopLevelEntity} from './validator/Domain/CommonDomainItemMustMatchTopLevelEntity';
import { validate as DescriptorDomainItemMustMatchTopLevelEntity} from './validator/Domain/DescriptorDomainItemMustMatchTopLevelEntity';
import { validate as DomainEntityDomainItemMustMatchTopLevelEntity} from './validator/Domain/DomainEntityDomainItemMustMatchTopLevelEntity';
import { validate as DomainMustNotDuplicateDomainItems} from './validator/Domain/DomainMustNotDuplicateDomainItems';
import { validate as InlineCommonDomainItemMustMatchTopLevelEntity} from './validator/Domain/InlineCommonDomainItemMustMatchTopLevelEntity';

import { validate as domainEntityMustContainAnIdentity } from './validator/DomainEntity/DomainEntityMustContainAnIdentity';
import { validate as domainEntityMustContainNoMoreThanOneUniqueIdColumn } from './validator/DomainEntity/DomainEntityMustContainNoMoreThanOneUniqueIdColumn';

import { validate as domainEntityExtensionExistsOnlyInExtensionNamespace } from './validator/DomainEntityExtension/DomainEntityExtensionExistsOnlyInExtensionNamespace';
import { validate as domainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass } from './validator/DomainEntityExtension/DomainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass';
import { validate as domainEntityExtensionMustNotRedeclareProperties } from './validator/DomainEntityExtension/DomainEntityExtensionMustNotRedeclareProperties';

import { validate as DomainEntityPropertyMustMatchADomainEntity} from './validator/DomainEntityProperty/DomainEntityPropertyMustMatchADomainEntity';

import { validate as DomainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity} from './validator/DomainEntitySubclass/DomainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity';
import { validate as DomainEntitySubclassIdentityRenameMustExistNoMoreThanOnce} from './validator/DomainEntitySubclass/DomainEntitySubclassIdentityRenameMustExistNoMoreThanOnce';
import { validate as DomainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass} from './validator/DomainEntitySubclass/DomainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass';
import { validate as DomainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity} from './validator/DomainEntitySubclass/DomainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity';
import { validate as DomainEntitySubclassMustNotRedeclareProperties} from './validator/DomainEntitySubclass/DomainEntitySubclassMustNotRedeclareProperties';

import { validate as EnumerationItemsMustBeUnique} from './validator/Enumeration/EnumerationItemsMustBeUnique';

import { validate as EnumerationPropertyMustMatchAnEnumeration} from './validator/EnumerationProperty/EnumerationPropertyMustMatchAnEnumeration';

import { validate as IdentityExistsOnlyIfIdentityIsAllowed} from './validator/Identity/IdentityExistsOnlyIfIdentityIsAllowed';

import { validate as IdentityRenameExistsOnlyIfIdentityRenameIsAllowed} from './validator/IdentityRename/IdentityRenameExistsOnlyIfIdentityRenameIsAllowed';

import { validate as InlineCommonExistsOnlyInCoreNamespace} from './validator/InlineCommon/InlineCommonExistsOnlyInCoreNamespace';

import { validate as IntegerPropertyMinValueMustNotBeGreaterThanMaxValue} from './validator/IntegerProperty/IntegerPropertyMinValueMustNotBeGreaterThanMaxValue';
import { validate as IntegerPropertyMustNotMatchACommonDecimal} from './validator/IntegerProperty/IntegerPropertyMustNotMatchACommonDecimal';
import { validate as IntegerPropertyMustNotMatchACommonInteger} from './validator/IntegerProperty/IntegerPropertyMustNotMatchACommonInteger';
import { validate as IntegerPropertyMustNotMatchACommonString} from './validator/IntegerProperty/IntegerPropertyMustNotMatchACommonString';

import { validate as InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass} from './validator/Interchange/InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass';
import { validate as InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass} from './validator/Interchange/InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass';
import { validate as InterchangeMustNotRedeclareIdentityTemplates} from './validator/Interchange/InterchangeMustNotRedeclareIdentityTemplates';
import { validate as InterchangeMustNotRedeclareInterchangeElements} from './validator/Interchange/InterchangeMustNotRedeclareInterchangeElements';

import { validate as InterchangeExtensionIdentifierMustMatchAnInterchange} from './validator/InterchangeExtension/InterchangeExtensionIdentifierMustMatchAnInterchange';
import { validate as InterchangeExtensionMustNotRedeclareBaseInterchangeElements} from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareBaseInterchangeElements';
import { validate as InterchangeExtensionMustNotRedeclareBaseInterchangeIdentityName} from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareBaseInterchangeIdentityName';
import { validate as InterchangeExtensionMustNotRedeclareElements} from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareElements';
import { validate as InterchangeExtensionMustNotRedeclareIdentityName} from './validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareIdentityName';

import { validate as MergePropertyPathMustExist} from './validator/MergePartOfReference/MergePropertyPathMustExist';
import { validate as MergeStatementMustStartMergePathWithPropertyName} from './validator/MergePartOfReference/MergeStatementMustStartMergePathWithPropertyName';
import { validate as TargetPropertyPathMustExist} from './validator/MergePartOfReference/TargetPropertyPathMustExist';

import { validate as MetaEdIdIsRequiredForDomainItems} from './validator/MetaEdId/MetaEdIdIsRequiredForDomainItems';
import { validate as MetaEdIdIsRequiredForEntities} from './validator/MetaEdId/MetaEdIdIsRequiredForEntities';
import { validate as MetaEdIdIsRequiredForEnumerationItems} from './validator/MetaEdId/MetaEdIdIsRequiredForEnumerationItems';
import { validate as MetaEdIdIsRequiredForInterchangeItems} from './validator/MetaEdId/MetaEdIdIsRequiredForInterchangeItems';
import { validate as MetaEdIdIsRequiredForProperties} from './validator/MetaEdId/MetaEdIdIsRequiredForProperties';
import { validate as MustNotDuplicateMetaEdId} from './validator/MetaEdId/MustNotDuplicateMetaEdId';

import { validate as SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits} from './validator/SharedSimple/SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits';
import { validate as SharedDecimalMinValueMustNotBeGreaterThanMaxValue} from './validator/SharedSimple/SharedDecimalMinValueMustNotBeGreaterThanMaxValue';
import { validate as SharedIntegerMinValueMustNotBeGreaterThanMaxValue} from './validator/SharedSimple/SharedIntegerMinValueMustNotBeGreaterThanMaxValue';
import { validate as SharedStringMinLengthMustNotBeGreaterThanMaxLength} from './validator/SharedSimple/SharedStringMinLengthMustNotBeGreaterThanMaxLength';

import { validate as ShortPropertyMinValueMustNotBeGreaterThanMaxValue} from './validator/ShortProperty/ShortPropertyMinValueMustNotBeGreaterThanMaxValue';
import { validate as ShortPropertyMustNotMatchACommonDecimal} from './validator/ShortProperty/ShortPropertyMustNotMatchACommonDecimal';
import { validate as ShortPropertyMustNotMatchACommonInteger} from './validator/ShortProperty/ShortPropertyMustNotMatchACommonInteger';
import { validate as ShortPropertyMustNotMatchACommonString} from './validator/ShortProperty/ShortPropertyMustNotMatchACommonString';

import { validate as StringPropertyMinLengthMustNotBeGreaterThanMaxLength} from './validator/StringProperty/StringPropertyMinLengthMustNotBeGreaterThanMaxLength';
import { validate as StringPropertyMustNotMatchACommonDecimal} from './validator/StringProperty/StringPropertyMustNotMatchACommonDecimal';
import { validate as StringPropertyMustNotMatchACommonInteger} from './validator/StringProperty/StringPropertyMustNotMatchACommonInteger';
import { validate as StringPropertyMustNotMatchACommonString} from './validator/StringProperty/StringPropertyMustNotMatchACommonString';

import { validate as SubdomainMustNotDuplicateDomainItems} from './validator/Subdomain/SubdomainMustNotDuplicateDomainItems';
import { validate as SubdomainParentDomainNameMustMatchADomain} from './validator/Subdomain/SubdomainParentDomainNameMustMatchADomain';

function validatorList(): Array<Validator> {
  return [
    associationExtensionExistsOnlyInExtensionNamespace,
    associationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass,
    associationExtensionMustNotRedeclareProperties,

    associationPropertyMustMatchAnAssociation,

    AssociationSubclassIdentifierMustMatchAnAssociation,
    AssociationSubclassIdentityRenameMustExistNoMoreThanOnce,
    AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass,
    AssociationSubclassMustNotRedeclareProperties,

    choicePropertyMustMatchAChoice,
  
    CommonExtensionExistsOnlyInExtensionNamespace,
    CommonExtensionIdentifierMustMatchACommon,
    CommonExtensionMustNotRedeclareProperties,

    CommonPropertyMustMatchACommon,
    CommonPropertyMustNotContainIdentity,
    CommonPropertyWithExtensionOverrideMustReferenceCommonTypeExtension,
    CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality,

    mostEntitiesCannotHaveSameName,

    DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits,
    DecimalPropertyMinValueMustNotBeGreaterThanMaxValue,
    DecimalPropertyMustNotMatchACommonDecimal,
    DecimalPropertyMustNotMatchACommonInteger,
    DecimalPropertyMustNotMatchACommonString,

    domainEntityMustContainAnIdentity,
    domainEntityMustContainNoMoreThanOneUniqueIdColumn,

    domainEntityExtensionExistsOnlyInExtensionNamespace,
    domainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass,
    domainEntityExtensionMustNotRedeclareProperties,

    DomainEntityPropertyMustMatchADomainEntity,

    DomainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity,
    DomainEntitySubclassIdentityRenameMustExistNoMoreThanOnce,
    DomainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass,
    DomainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity,
    DomainEntitySubclassMustNotRedeclareProperties,

    EnumerationItemsMustBeUnique,

    EnumerationPropertyMustMatchAnEnumeration,

    IdentityExistsOnlyIfIdentityIsAllowed,

    IntegerPropertyMinValueMustNotBeGreaterThanMaxValue,
    IntegerPropertyMustNotMatchACommonDecimal,
    IntegerPropertyMustNotMatchACommonInteger,
    IntegerPropertyMustNotMatchACommonString,

    InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass,
    InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass,
    InterchangeMustNotRedeclareIdentityTemplates,
    InterchangeMustNotRedeclareInterchangeElements,

    InterchangeExtensionIdentifierMustMatchAnInterchange,
    InterchangeExtensionMustNotRedeclareBaseInterchangeElements,
    InterchangeExtensionMustNotRedeclareBaseInterchangeIdentityName,
    InterchangeExtensionMustNotRedeclareElements,
    InterchangeExtensionMustNotRedeclareIdentityName,

    MergePropertyPathMustExist,
    MergeStatementMustStartMergePathWithPropertyName,
    TargetPropertyPathMustExist,

    MetaEdIdIsRequiredForDomainItems,
    MetaEdIdIsRequiredForEntities,
    MetaEdIdIsRequiredForEnumerationItems,
    MetaEdIdIsRequiredForInterchangeItems,
    MetaEdIdIsRequiredForProperties,
    MustNotDuplicateMetaEdId,

    SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits,
    SharedDecimalMinValueMustNotBeGreaterThanMaxValue,
    SharedIntegerMinValueMustNotBeGreaterThanMaxValue,
    SharedStringMinLengthMustNotBeGreaterThanMaxLength,

    ShortPropertyMinValueMustNotBeGreaterThanMaxValue,
    ShortPropertyMustNotMatchACommonDecimal,
    ShortPropertyMustNotMatchACommonInteger,
    ShortPropertyMustNotMatchACommonString,

    StringPropertyMinLengthMustNotBeGreaterThanMaxLength,
    StringPropertyMustNotMatchACommonDecimal,
    StringPropertyMustNotMatchACommonInteger,
    StringPropertyMustNotMatchACommonString,

    SubdomainMustNotDuplicateDomainItems,
    SubdomainParentDomainNameMustMatchADomain,

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
