// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

// Functions
export {
  formatVersionWithSuppressPrereleaseVersion,
  prependIndefiniteArticle,
  orderByProp,
  orderByPath,
  versionSatisfies,
  targetTechnologyVersionFor,
  V3OrGreater,
  V5OrGreater,
  V7OrGreater,
} from './Utility';
export { executePipeline } from './pipeline/Pipeline';
export { createMetaEdFile } from './file/MetaEdFile';
export { setupPlugins } from './plugin/PluginSetup';
export { loadFiles } from './file/FileSystemFilenameLoader';
export { initializeNamespaces } from './pipeline/InitializeNamespaces';
export { newState } from './State';
export { newPipelineOptions } from './pipeline/PipelineOptions';
export { loadFileIndex } from './file/LoadFileIndex';
export { buildParseTree } from './grammar/BuildParseTree';
export { buildMetaEd } from './grammar/ParseTreeBuilder';
export { execute as walkBuilders } from './builder/WalkBuilders';
export { execute as runValidators } from './validator/RunValidators';
export { execute as runEnhancers } from './enhancer/RunEnhancers';
export { execute as runGenerators } from './generator/RunGenerators';
export { fileMapForValidationFailure } from './pipeline/FileMapForValidationFailure';
export {
  getAllEntities,
  getAllTopLevelEntities,
  getEntitiesOfType,
  getAllEntitiesNoSimpleTypes,
  addEntityForNamespace,
  getEntityFromNamespaceChain,
  getEntityFromNamespace,
  getAllEntitiesForNamespaces,
  findFirstEntity,
  getAllTopLevelEntitiesForNamespaces,
  getAllEntitiesNoSimpleTypesForNamespaces,
  getEntitiesOfTypeForNamespaces,
  getAllEntitiesOfType,
} from './model/EntityRepository';
export {
  addProperty,
  getAllProperties,
  getAllPropertiesForNamespaces,
  getPropertiesOfType,
  newPropertyIndex,
} from './model/property/PropertyRepository';
export {
  isReferentialProperty,
  isSharedProperty,
  allPropertyTypes,
  scalarPropertyTypes,
} from './model/property/PropertyType';
export {
  allEntityModelTypes,
  allEntityModelTypesNoSimpleTypes,
  allTopLevelEntityModelTypes,
  topLevelCoreEntityModelTypes,
} from './model/ModelType';

// Builders
export { AssociationBuilder } from './builder/AssociationBuilder';
export { AssociationExtensionBuilder } from './builder/AssociationExtensionBuilder';
export { AssociationSubclassBuilder } from './builder/AssociationSubclassBuilder';
export { ChoiceBuilder } from './builder/ChoiceBuilder';
export { CommonBuilder } from './builder/CommonBuilder';
export { CommonSubclassBuilder } from './builder/CommonSubclassBuilder';
export { CommonExtensionBuilder } from './builder/CommonExtensionBuilder';
export { DecimalTypeBuilder } from './builder/DecimalTypeBuilder';
export { DescriptorBuilder } from './builder/DescriptorBuilder';
export { DomainBuilder } from './builder/DomainBuilder';
export { DomainEntityBuilder } from './builder/DomainEntityBuilder';
export { DomainEntityExtensionBuilder } from './builder/DomainEntityExtensionBuilder';
export { DomainEntitySubclassBuilder } from './builder/DomainEntitySubclassBuilder';
export { EnumerationBuilder } from './builder/EnumerationBuilder';
export { IntegerTypeBuilder } from './builder/IntegerTypeBuilder';
export { InterchangeBuilder } from './builder/InterchangeBuilder';
export { NamespaceBuilder } from './builder/NamespaceBuilder';
export { SharedDecimalBuilder } from './builder/SharedDecimalBuilder';
export { SharedIntegerBuilder } from './builder/SharedIntegerBuilder';
export { SharedStringBuilder } from './builder/SharedStringBuilder';
export { StringTypeBuilder } from './builder/StringTypeBuilder';

// Pipeline Types
export { State } from './State';
export { InputDirectory } from './file/InputDirectory';
export { FileSet, MetaEdFile } from './file/MetaEdFile';
export { FileIndex } from './file/FileIndex';
export { PipelineOptions } from './pipeline/PipelineOptions';
export { Validator } from './validator/Validator';
export { ValidationFailure } from './validator/ValidationFailure';
export { Enhancer } from './enhancer/Enhancer';
export { EnhancerResult } from './enhancer/EnhancerResult';
export { Generator } from './generator/Generator';
export { GeneratorResult } from './generator/GeneratorResult';
export { GeneratedOutput } from './generator/GeneratedOutput';
export { MetaEdEnvironment, SemVer } from './MetaEdEnvironment';
export { PluginEnvironment } from './plugin/PluginEnvironment';
export { MetaEdConfiguration } from './MetaEdConfiguration';
export { MetaEdPlugin } from './plugin/MetaEdPlugin';
export { MetaEdProject, MetaEdProjectPathPairs } from './project/ProjectTypes';
export { PipelineFailure } from './pipeline/PipelineFailure';

// Properties
export { AssociationProperty, AssociationPropertySourceMap } from './model/property/AssociationProperty';
export { BooleanProperty, BooleanPropertySourceMap } from './model/property/BooleanProperty';
export { ChoiceProperty, ChoicePropertySourceMap } from './model/property/ChoiceProperty';
export { CommonProperty, CommonPropertySourceMap } from './model/property/CommonProperty';
export { CurrencyProperty, CurrencyPropertySourceMap } from './model/property/CurrencyProperty';
export { DateProperty, DatePropertySourceMap } from './model/property/DateProperty';
export { DatetimeProperty, DatetimePropertySourceMap } from './model/property/DatetimeProperty';
export { DecimalProperty, DecimalPropertySourceMap } from './model/property/DecimalProperty';
export { DescriptorProperty, DescriptorPropertySourceMap } from './model/property/DescriptorProperty';
export { DomainEntityProperty, DomainEntityPropertySourceMap } from './model/property/DomainEntityProperty';
export { DurationProperty, DurationPropertySourceMap } from './model/property/DurationProperty';
export { EntityProperty, EntityPropertySourceMap, HasReferencedEntity } from './model/property/EntityProperty';
export { EnumerationProperty, EnumerationPropertySourceMap } from './model/property/EnumerationProperty';
export { InlineCommonProperty, InlineCommonPropertySourceMap } from './model/property/InlineCommonProperty';
export { IntegerProperty, IntegerPropertySourceMap } from './model/property/IntegerProperty';
export { MergeDirective, MergeDirectiveSourceMap } from './model/property/MergeDirective';
export { MergeDirectiveInfo } from './model/property/MergeDirectiveInfo';
export { PercentProperty, PercentPropertySourceMap } from './model/property/PercentProperty';
export { PropertyIndex } from './model/property/PropertyRepository';
export { PropertyType } from './model/property/PropertyType';
export { ReferentialProperty, ReferentialPropertySourceMap } from './model/property/ReferentialProperty';
export {
  SchoolYearEnumerationProperty,
  SchoolYearEnumerationPropertySourceMap,
} from './model/property/SchoolYearEnumerationProperty';
export { SharedDecimalProperty } from './model/property/SharedDecimalProperty';
export { SharedIntegerProperty } from './model/property/SharedIntegerProperty';
export { SharedShortProperty } from './model/property/SharedShortProperty';
export { SharedStringProperty } from './model/property/SharedStringProperty';
export { ShortProperty, ShortPropertySourceMap } from './model/property/ShortProperty';
export { SimpleProperty, SimplePropertySourceMap } from './model/property/SimpleProperty';
export { SharedSimple, SharedSimpleSourceMap } from './model/SharedSimple';
export { StringProperty, StringPropertySourceMap } from './model/property/StringProperty';
export { TimeProperty, TimePropertySourceMap } from './model/property/TimeProperty';
export { YearProperty, YearPropertySourceMap } from './model/property/YearProperty';

// Entities
export { Association, AssociationSourceMap } from './model/Association';
export { AssociationExtension, AssociationExtensionSourceMap } from './model/AssociationExtension';
export { AssociationSubclass, AssociationSubclassSourceMap } from './model/AssociationSubclass';
export { Choice, ChoiceSourceMap } from './model/Choice';
export { Common, CommonSourceMap } from './model/Common';
export { CommonSubclass, CommonSubclassSourceMap } from './model/CommonSubclass';
export { CommonExtension, CommonExtensionSourceMap } from './model/CommonExtension';
export { DecimalType, DecimalTypeSourceMap } from './model/DecimalType';
export { Descriptor, DescriptorSourceMap } from './model/Descriptor';
export { Domain, DomainSourceMap } from './model/Domain';
export { DomainEntity, DomainEntitySourceMap } from './model/DomainEntity';
export { DomainEntityExtension, DomainEntityExtensionSourceMap } from './model/DomainEntityExtension';
export { DomainEntitySubclass, DomainEntitySubclassSourceMap } from './model/DomainEntitySubclass';
export { DomainItem, DomainItemSourceMap } from './model/DomainItem';
export { EntityRepository } from './model/EntityRepository';
export { Enumeration, EnumerationSourceMap } from './model/Enumeration';
export { EnumerationItem, EnumerationItemSourceMap } from './model/EnumerationItem';
export { IntegerType, IntegerTypeSourceMap } from './model/IntegerType';
export { Interchange, InterchangeSourceMap } from './model/Interchange';
export { InterchangeExtension } from './model/InterchangeExtension';
export { InterchangeItem, InterchangeItemSourceMap } from './model/InterchangeItem';
export { MapTypeEnumeration } from './model/MapTypeEnumeration';
export { ModelBase, ModelBaseSourceMap } from './model/ModelBase';
export { ModelType } from './model/ModelType';
export { Namespace } from './model/Namespace';
export { NamespaceRepository } from './model/NamespaceRepository';
export { SchoolYearEnumeration } from './model/SchoolYearEnumeration';
export { SharedDecimal, SharedDecimalSourceMap } from './model/SharedDecimal';
export { SharedInteger, SharedIntegerSourceMap } from './model/SharedInteger';
export { SharedString, SharedStringSourceMap } from './model/SharedString';
export { SourceMap } from './model/SourceMap';
export { StringType, StringTypeSourceMap } from './model/StringType';
export { Subdomain, SubdomainSourceMap } from './model/Subdomain';
export { TopLevelEntity, TopLevelEntitySourceMap } from './model/TopLevelEntity';

// Null Objects
export { NoMapTypeEnumeration } from './model/MapTypeEnumeration';
export { NoTopLevelEntity } from './model/TopLevelEntity';
export { NoSharedSimple } from './model/SharedSimple';
export { NoNamespace } from './model/Namespace';
export { NoInterchangeItem } from './model/InterchangeItem';
export { NoEntityProperty } from './model/property/EntityProperty';
export { defaultPluginTechVersion } from './MetaEdConfiguration';

// Factories
export { newMetaEdEnvironment } from './MetaEdEnvironment';
export { newPluginEnvironment } from './plugin/PluginEnvironment';
export { newMetaEdConfiguration, newPluginTargetTechnologyVersion } from './MetaEdConfiguration';
export { newMetaEdProject, deriveNamespaceFromProjectName } from './project/ProjectTypes';

export { newAssociationProperty } from './model/property/AssociationProperty';
export { newBooleanProperty } from './model/property/BooleanProperty';
export { newChoiceProperty } from './model/property/ChoiceProperty';
export { newCommonProperty } from './model/property/CommonProperty';
export { newCurrencyProperty } from './model/property/CurrencyProperty';
export { newDateProperty } from './model/property/DateProperty';
export { newDatetimeProperty } from './model/property/DatetimeProperty';
export { newDecimalProperty } from './model/property/DecimalProperty';
export { newDescriptorProperty } from './model/property/DescriptorProperty';
export { newDomainEntityProperty } from './model/property/DomainEntityProperty';
export { newDurationProperty } from './model/property/DurationProperty';
export { newEntityProperty } from './model/property/EntityProperty';
export { newEnumerationProperty } from './model/property/EnumerationProperty';
export { newInlineCommonProperty } from './model/property/InlineCommonProperty';
export { newIntegerProperty } from './model/property/IntegerProperty';
export { newMergeDirective } from './model/property/MergeDirective';
export { newPercentProperty } from './model/property/PercentProperty';
export { newReferentialProperty } from './model/property/ReferentialProperty';
export { newSchoolYearEnumerationProperty } from './model/property/SchoolYearEnumerationProperty';
export { newSharedDecimalProperty } from './model/property/SharedDecimalProperty';
export { newSharedIntegerProperty } from './model/property/SharedIntegerProperty';
export { newSharedShortProperty } from './model/property/SharedShortProperty';
export { newSharedStringProperty } from './model/property/SharedStringProperty';
export { newShortProperty } from './model/property/ShortProperty';
export { newSimpleProperty } from './model/property/SimpleProperty';
export { newStringProperty } from './model/property/StringProperty';
export { newTimeProperty } from './model/property/TimeProperty';
export { newYearProperty } from './model/property/YearProperty';

export { newAssociation, NoAssociation } from './model/Association';
export { newAssociationExtension } from './model/AssociationExtension';
export { newAssociationSubclass } from './model/AssociationSubclass';
export { newChoice } from './model/Choice';
export { newCommon, newInlineCommon } from './model/Common';
export { newCommonSubclass } from './model/CommonSubclass';
export { newCommonExtension } from './model/CommonExtension';
export { newDecimalType } from './model/DecimalType';
export { newDescriptor } from './model/Descriptor';
export { newDomain } from './model/Domain';
export { newDomainEntity, NoDomainEntity } from './model/DomainEntity';
export { newDomainEntityExtension } from './model/DomainEntityExtension';
export { newDomainEntitySubclass } from './model/DomainEntitySubclass';
export { newDomainItem } from './model/DomainItem';
export { newEnumeration } from './model/Enumeration';
export { newEnumerationItem } from './model/EnumerationItem';
export { newIntegerType } from './model/IntegerType';
export { newInterchange } from './model/Interchange';
export { newInterchangeExtension } from './model/InterchangeExtension';
export { newInterchangeItem } from './model/InterchangeItem';
export { newMapTypeEnumeration } from './model/MapTypeEnumeration';
export { newNamespace } from './model/Namespace';
export { newSchoolYearEnumeration } from './model/SchoolYearEnumeration';
export { newSharedDecimal } from './model/SharedDecimal';
export { newSharedInteger } from './model/SharedInteger';
export { newSharedString } from './model/SharedString';
export { newSourceMap } from './model/SourceMap';
export { newStringType } from './model/StringType';
export { newSubdomain } from './model/Subdomain';
export { newTopLevelEntity } from './model/TopLevelEntity';

// utilities
export { normalizeDescriptorSuffix, normalizeEnumerationSuffix, decapitalize } from './Utility';
export { isDataStandard, findDataStandardVersions } from './project/ProjectTypes';
export { scanForProjects, overrideProjectNameAndNamespace } from './project/ProjectLoader';

// for plugin testing
export { MetaEdTextBuilder } from './grammar/MetaEdTextBuilder';

export { Logger } from './Logger';

// Branded types
export { BrandType } from './model/BrandType';
export { MetaEdProjectName } from './model/MetaEdProjectName';
export { MetaEdPropertyFullName } from './model/MetaEdPropertyFullName';
export { MetaEdPropertyPath } from './model/MetaEdPropertyPath';
