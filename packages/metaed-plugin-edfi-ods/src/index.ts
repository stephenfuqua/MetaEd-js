import { Validator, MetaEdPlugin } from 'metaed-core';
import { enhancerList } from './enhancer/EnhancerList';
import { generate as OdsGenerator } from './generator/OdsGenerator';
import { generate as SchemaGenerator } from './generator/SchemaGenerator';
import { generate as IdIndexesGenerator } from './generator/IdIndexesGenerator';

export { ColumnDataTypes } from './model/database/ColumnDataTypes';

// Entities
export { Column, DecimalColumn, StringColumn } from './model/database/Column';
export { ColumnData } from './model/database/ColumnDataTypes';
export { ColumnNamePair } from './model/database/ColumnNamePair';
export { ColumnType } from './model/database/ColumnType';
export { EnumerationRow } from './model/database/EnumerationRow';
export { ForeignKey, ForeignKeySourceReference } from './model/database/ForeignKey';
export { SchoolYearEnumerationRow } from './model/database/SchoolYearEnumerationRow';
export { Table } from './model/database/Table';
export { TopLevelEntityEdfiOds } from './model/TopLevelEntity';
export { DescriptorEdfiOds } from './model/Descriptor';
export { AssociationExtensionEdfiOds } from './model/AssociationExtension';
export { DomainEntityExtensionEdfiOds } from './model/DomainEntityExtension';
export { ReferencePropertyEdfiOds } from './model/property/ReferenceProperty';

// ODS Repository
export { EdFiOdsEntityRepository } from './model/EdFiOdsEntityRepository';
export { newEdFiOdsEntityRepository, addEdFiOdsEntityRepositoryTo } from './model/EdFiOdsEntityRepository';

// Factories
export {
  newColumn,
  newBooleanColumn,
  newCurrencyColumn,
  newDateColumn,
  newDecimalColumn,
  newDurationColumn,
  newIntegerColumn,
  newPercentColumn,
  newShortColumn,
  newStringColumn,
  newTimeColumn,
} from './model/database/Column';
export { newTable } from './model/database/Table';

// Utilities
export { edfiOdsRepositoryForNamespace, tableEntities, rowEntities } from './enhancer/EnhancerHelper';
export { getPrimaryKeys } from './model/database/Table';
export { newForeignKey, newForeignKeySourceReference } from './model/database/ForeignKey';

// Enhancer for testing
export { enhance as baseDescriptorTableCreatingEnhancer } from './enhancer/table/BaseDescriptorTableCreatingEnhancer';

function validatorList(): Array<Validator> {
  return [];
}

export function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: enhancerList(),
    generator: [SchemaGenerator, OdsGenerator, IdIndexesGenerator],
    configurationSchemas: new Map(),
  };
}
