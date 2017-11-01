// @flow

// Test helper -- *** where should this go? ***
export { MetaEdTextBuilder } from './test/MetaEdTextBuilder';


// Functions

export { deepFreeze, deepFreezeAssign, prependIndefiniteArticle } from './src/Utility';
export { startingFromFileLoadP, build } from './src/task/Pipeline';
export { createMetaEdFile } from './src/task/MetaEdFile';
export { loadCoreBufferedFiles, loadExtensionBufferedFiles } from './src/task/BufferFileLoader';
export { loadFiles } from './src/task/FileSystemFilenameLoader';
export { loadPlugins } from './src/task/LoadPlugins';
export { newState } from './src/State';
export { loadFileIndex } from './src/task/LoadFileIndex';
export { buildParseTree } from './src/task/BuildParseTree';
export { buildMetaEd } from './src/grammar/ParseTreeBuilder';
export { execute as walkBuilders } from './src/task/WalkBuilders';
export { execute as runValidators } from './src/task/RunValidators';
export { execute as runEnhancers } from './src/task/RunEnhancers';
export { execute as runGenerators } from './src/task/RunGenerators';
export { fileMapForFailure } from './src/task/FileMapForFailure';
export { addEntity, getAllEntities, getAllTopLevelEntities, getEntity, getTopLevelCoreEntity, getEntitiesOfType, getAllEntitiesNoSimpleTypes } from './src/model/EntityRepository';
export { addProperty, getAllProperties, getPropertiesOfType, newPropertyIndex } from './src/model/property/PropertyRepository';
export { isReferenceProperty, isSharedProperty, allPropertyTypes } from './src/model/property/PropertyType';
export { allEntityModelTypes, allTopLevelEntityModelTypes, topLevelCoreEntityModelTypes } from './src/model/ModelType';

// Builders

export { AssociationBuilder } from './src/builder/AssociationBuilder';
export { AssociationExtensionBuilder } from './src/builder/AssociationExtensionBuilder';
export { AssociationSubclassBuilder } from './src/builder/AssociationSubclassBuilder';
export { ChoiceBuilder } from './src/builder/ChoiceBuilder';
export { CommonBuilder } from './src/builder/CommonBuilder';
export { CommonExtensionBuilder } from './src/builder/CommonExtensionBuilder';
export { DecimalTypeBuilder } from './src/builder/DecimalTypeBuilder';
export { DescriptorBuilder } from './src/builder/DescriptorBuilder';
export { DomainBuilder } from './src/builder/DomainBuilder';
export { DomainEntityBuilder } from './src/builder/DomainEntityBuilder';
export { DomainEntityExtensionBuilder } from './src/builder/DomainEntityExtensionBuilder';
export { DomainEntitySubclassBuilder } from './src/builder/DomainEntitySubclassBuilder';
export { EnumerationBuilder } from './src/builder/EnumerationBuilder';
export { IntegerTypeBuilder } from './src/builder/IntegerTypeBuilder';
export { InterchangeBuilder } from './src/builder/InterchangeBuilder';
export { NamespaceInfoBuilder } from './src/builder/NamespaceInfoBuilder';
export { SharedDecimalBuilder } from './src/builder/SharedDecimalBuilder';
export { SharedIntegerBuilder } from './src/builder/SharedIntegerBuilder';
export { SharedStringBuilder } from './src/builder/SharedStringBuilder';
export { StringTypeBuilder } from './src/builder/StringTypeBuilder';

// Flow types

export type { State } from './src/State';
export type { InputDirectory } from './src/task/FileSystemFilenameLoader';
export type { FileSet, MetaEdFile } from './src/task/MetaEdFile';
export type { FileIndex } from './src/task/FileIndex';
export type { Validator } from './src/validator/Validator';
export type { ValidationFailure } from './src/validator/ValidationFailure';
export type { Enhancer } from './src/enhancer/Enhancer';
export type { EnhancerResult } from './src/enhancer/EnhancerResult';
export type { Generator } from './src/generator/Generator';
export type { GeneratorResult } from './src/generator/GeneratorResult';
export type { GeneratedOutput } from './src/generator/GeneratedOutput';
export type { MetaEdEnvironment, PluginEnvironment, SemVer } from './src/MetaEdEnvironment';
export type { MetaEdPlugin, PluginManifest } from './src/plugin/PluginTypes';

// Properties
export type { AssociationProperty, AssociationPropertySourceMap } from './src/model/property/AssociationProperty';
export type { BooleanProperty, BooleanPropertySourceMap } from './src/model/property/BooleanProperty';
export type { ChoiceProperty, ChoicePropertySourceMap } from './src/model/property/ChoiceProperty';
export type { CommonProperty, CommonPropertySourceMap } from './src/model/property/CommonProperty';
export type { CurrencyProperty, CurrencyPropertySourceMap } from './src/model/property/CurrencyProperty';
export type { DateProperty, DatePropertySourceMap } from './src/model/property/DateProperty';
export type { DecimalProperty, DecimalPropertySourceMap } from './src/model/property/DecimalProperty';
export type { DescriptorProperty, DescriptorPropertySourceMap } from './src/model/property/DescriptorProperty';
export type { DomainEntityProperty, DomainEntityPropertySourceMap } from './src/model/property/DomainEntityProperty';
export type { DurationProperty, DurationPropertySourceMap } from './src/model/property/DurationProperty';
export type { EntityProperty, EntityPropertySourceMap, HasReferencedEntity } from './src/model/property/EntityProperty';
export type { EnumerationProperty, EnumerationPropertySourceMap } from './src/model/property/EnumerationProperty';
export type { InlineCommonProperty, InlineCommonPropertySourceMap } from './src/model/property/InlineCommonProperty';
export type { IntegerProperty, IntegerPropertySourceMap } from './src/model/property/IntegerProperty';
export type { MergedProperty, MergedPropertySourceMap } from './src/model/property/MergedProperty';
export type { PercentProperty, PercentPropertySourceMap } from './src/model/property/PercentProperty';
export type { PropertyIndex } from './src/model/property/PropertyRepository';
export type { PropertyType } from './src/model/property/PropertyType';
export type { ReferentialProperty, ReferentialPropertySourceMap } from './src/model/property/ReferentialProperty';
export type { SchoolYearEnumerationProperty, SchoolYearEnumerationPropertySourceMap } from './src/model/property/SchoolYearEnumerationProperty';
export type { SharedDecimalProperty } from './src/model/property/SharedDecimalProperty';
export type { SharedIntegerProperty } from './src/model/property/SharedIntegerProperty';
export type { SharedShortProperty } from './src/model/property/SharedShortProperty';
export type { SharedStringProperty } from './src/model/property/SharedStringProperty';
export type { ShortProperty, ShortPropertySourceMap } from './src/model/property/ShortProperty';
export type { SimpleProperty, SimplePropertySourceMap } from './src/model/property/SimpleProperty';
export type { SharedSimple, SharedSimpleSourceMap } from './src/model/SharedSimple';
export type { StringProperty, StringPropertySourceMap } from './src/model/property/StringProperty';
export type { TimeProperty, TimePropertySourceMap } from './src/model/property/TimeProperty';
export type { YearProperty, YearPropertySourceMap } from './src/model/property/YearProperty';

// Entities
export type { AbstractEntity, AbstractEntitySourceMap } from './src/model/AbstractEntity';
export type { Association, AssociationSourceMap } from './src/model/Association';
export type { AssociationExtension, AssociationExtensionSourceMap } from './src/model/AssociationExtension';
export type { AssociationSubclass, AssociationSubclassSourceMap } from './src/model/AssociationSubclass';
export type { Choice, ChoiceSourceMap } from './src/model/Choice';
export type { Common, CommonSourceMap } from './src/model/Common';
export type { CommonExtension, CommonExtensionSourceMap } from './src/model/CommonExtension';
export type { DecimalType, DecimalTypeSourceMap } from './src/model/DecimalType';
export type { Descriptor, DescriptorSourceMap } from './src/model/Descriptor';
export type { Domain, DomainSourceMap } from './src/model/Domain';
export type { DomainEntity, DomainEntitySourceMap } from './src/model/DomainEntity';
export type { DomainEntityExtension, DomainEntityExtensionSourceMap } from './src/model/DomainEntityExtension';
export type { DomainEntitySubclass, DomainEntitySubclassSourceMap } from './src/model/DomainEntitySubclass';
export type { DomainItem, DomainItemSourceMap } from './src/model/DomainItem';
export type { EntityRepository } from './src/model/EntityRepository';
export type { Enumeration, EnumerationSourceMap } from './src/model/Enumeration';
export type { EnumerationItem, EnumerationItemSourceMap } from './src/model/EnumerationItem';
export type { IntegerType, IntegerTypeSourceMap } from './src/model/IntegerType';
export type { Interchange, InterchangeSourceMap } from './src/model/Interchange';
export type { InterchangeExtension } from './src/model/InterchangeExtension';
export type { InterchangeItem, InterchangeItemSourceMap } from './src/model/InterchangeItem';
export type { MapTypeEnumeration } from './src/model/MapTypeEnumeration';
export type { ModelBase, ModelBaseSourceMap } from './src/model/ModelBase';
export type { ModelType } from './src/model/ModelType';
export type { NamespaceInfo, NamespaceInfoSourceMap } from './src/model/NamespaceInfo';
export type { SchoolYearEnumeration } from './src/model/SchoolYearEnumeration';
export type { SharedDecimal, SharedDecimalSourceMap } from './src/model/SharedDecimal';
export type { SharedInteger, SharedIntegerSourceMap } from './src/model/SharedInteger';
export type { SharedString, SharedStringSourceMap } from './src/model/SharedString';
export type { SourceMap } from './src/model/SourceMap';
export type { StringType, StringTypeSourceMap } from './src/model/StringType';
export type { Subdomain, SubdomainSourceMap } from './src/model/Subdomain';
export type { TopLevelEntity, TopLevelEntitySourceMap } from './src/model/TopLevelEntity';

// Null Objects
export { NoMapTypeEnumeration } from './src/model/MapTypeEnumeration';
export { NoTopLevelEntity } from './src/model/TopLevelEntity';

// Factories
export { newMetaEdEnvironment, newPluginEnvironment } from './src/MetaEdEnvironment';
export { newMetaEdPlugin } from './src/plugin/PluginTypes';

export { asAssociationProperty, newAssociationProperty } from './src/model/property/AssociationProperty';
export { asBooleanProperty, newBooleanProperty } from './src/model/property/BooleanProperty';
export { asChoiceProperty, newChoiceProperty } from './src/model/property/ChoiceProperty';
export { asCommonProperty, newCommonProperty } from './src/model/property/CommonProperty';
export { asCurrencyProperty, newCurrencyProperty } from './src/model/property/CurrencyProperty';
export { asDateProperty, newDateProperty } from './src/model/property/DateProperty';
export { asDecimalProperty, newDecimalProperty } from './src/model/property/DecimalProperty';
export { asDescriptorProperty, newDescriptorProperty } from './src/model/property/DescriptorProperty';
export { asDomainEntityProperty, newDomainEntityProperty } from './src/model/property/DomainEntityProperty';
export { asDurationProperty, newDurationProperty } from './src/model/property/DurationProperty';
export { asEnumerationProperty, newEnumerationProperty } from './src/model/property/EnumerationProperty';
export { asInlineCommonProperty, newInlineCommonProperty } from './src/model/property/InlineCommonProperty';
export { asIntegerProperty, newIntegerProperty } from './src/model/property/IntegerProperty';
export { asMergedProperty, newMergedProperty } from './src/model/property/MergedProperty';
export { asPercentProperty, newPercentProperty } from './src/model/property/PercentProperty';
export { asReferentialProperty, newReferentialProperty } from './src/model/property/ReferentialProperty';
export { asSchoolYearEnumerationProperty, newSchoolYearEnumerationProperty } from './src/model/property/SchoolYearEnumerationProperty';
export { asSharedDecimalProperty, newSharedDecimalProperty } from './src/model/property/SharedDecimalProperty';
export { asSharedIntegerProperty, newSharedIntegerProperty } from './src/model/property/SharedIntegerProperty';
export { asSharedShortProperty, newSharedShortProperty } from './src/model/property/SharedShortProperty';
export { asSharedStringProperty, newSharedStringProperty } from './src/model/property/SharedStringProperty';
export { asShortProperty, newShortProperty } from './src/model/property/ShortProperty';
export { asSimpleProperty, newSimpleProperty } from './src/model/property/SimpleProperty';
export { asStringProperty, newStringProperty } from './src/model/property/StringProperty';
export { asTimeProperty, newTimeProperty } from './src/model/property/TimeProperty';
export { asYearProperty, newYearProperty } from './src/model/property/YearProperty';

export { asAbstractEntity, newAbstractEntity } from './src/model/AbstractEntity';
export { asAssociation, newAssociation } from './src/model/Association';
export { asAssociationExtension, newAssociationExtension } from './src/model/AssociationExtension';
export { asAssociationSubclass, newAssociationSubclass } from './src/model/AssociationSubclass';
export { asChoice, newChoice } from './src/model/Choice';
export { asCommon, newCommon, asInlineCommon, newInlineCommon } from './src/model/Common';
export { asCommonExtension, newCommonExtension } from './src/model/CommonExtension';
export { asDecimalType, newDecimalType } from './src/model/DecimalType';
export { asDescriptor, newDescriptor } from './src/model/Descriptor';
export { asDomain, asDomainBase, newDomain } from './src/model/Domain';
export { asDomainEntity, newDomainEntity } from './src/model/DomainEntity';
export { asDomainEntityExtension, newDomainEntityExtension } from './src/model/DomainEntityExtension';
export { asDomainEntitySubclass, newDomainEntitySubclass } from './src/model/DomainEntitySubclass';
export { asDomainItem, newDomainItem } from './src/model/DomainItem';
export { asEnumeration, newEnumeration } from './src/model/Enumeration';
export { asEnumerationItem, newEnumerationItem } from './src/model/EnumerationItem';
export { asIntegerType, newIntegerType } from './src/model/IntegerType';
export { asInterchange, newInterchange } from './src/model/Interchange';
export { asInterchangeExtension, newInterchangeExtension } from './src/model/InterchangeExtension';
export { asInterchangeItem, newInterchangeItem } from './src/model/InterchangeItem';
export { asMapTypeEnumeration, newMapTypeEnumeration } from './src/model/MapTypeEnumeration';
export { asModelType } from './src/model/ModelType';
export { newNamespaceInfo } from './src/model/NamespaceInfo';
export { asSchoolYearEnumeration, newSchoolYearEnumeration } from './src/model/SchoolYearEnumeration';
export { asSharedDecimal, newSharedDecimal } from './src/model/SharedDecimal';
export { asSharedInteger, newSharedInteger } from './src/model/SharedInteger';
export { asSharedString, newSharedString } from './src/model/SharedString';
export { newSourceMap } from './src/model/SourceMap';
export { asStringType, newStringType } from './src/model/StringType';
export { asSubdomain, newSubdomain } from './src/model/Subdomain';
export { asTopLevelEntity, newTopLevelEntity } from './src/model/TopLevelEntity';
