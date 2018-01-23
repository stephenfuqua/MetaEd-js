// @flow
import type { Validator, MetaEdPlugin } from 'metaed-core';
import { enhancerList } from './enhancer/EnhancerList';
import { generate as OdsGenerator } from './generator/OdsGenerator';
import { generate as SchemaGenerator } from './generator/SchemaGenerator';
import { generate as IdIndexesGenerator } from './generator/IdIndexesGenerator';

// Entities
export type { Column, DecimalColumn, StringColumn } from './model/database/Column';
export type { ColumnData } from './model/database/ColumnDataTypes';
export type { ColumnNamePair } from './model/database/ColumnNamePair';
export type { ColumnType } from './model/database/ColumnType';
export type { EnumerationRow } from './model/database/EnumerationRow';
export type { ForeignKey } from './model/database/ForeignKey';
export type { SchoolYearEnumerationRow } from './model/database/SchoolYearEnumerationRow';
export type { Table } from './model/database/Table';
export type { Trigger } from './model/database/Trigger';
export type { EdFiOdsEntityRepository } from './model/EdFiOdsEntityRepository';
export type { TopLevelEntityEdfiOds } from './model/TopLevelEntity';

function validatorList(): Array<Validator> {
  return [];
}

export function initialize(): MetaEdPlugin {
  return {
    validator: validatorList(),
    enhancer: enhancerList(),
    generator: [SchemaGenerator, OdsGenerator, IdIndexesGenerator],
  };
}
