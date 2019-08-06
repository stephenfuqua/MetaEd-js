import { MetaEdPlugin } from 'metaed-core';
import { generate as OdsGenerator } from './generator/OdsGenerator';
import { generate as SchemaGenerator } from './generator/SchemaGenerator';
import { generate as IdIndexesGenerator } from './generator/IdIndexesGenerator';

import { enhance as templateSpecificTablePropertyEnhancer } from './enhancer/TemplateSpecificTablePropertyEnhancer';
import { enhance as sqlServerTableNamingEnhancer } from './enhancer/PostgresqlTableNamingEnhancer';
import { enhance as sqlServerColumnNamingEnhancer } from './enhancer/PostgresqlColumnNamingEnhancer';
import { enhance as sqlServerForeignKeyNamingEnhancer } from './enhancer/PostgresqlForeignKeyNamingEnhancer';
import { enhance as addSchemaContainerEnhancer } from './enhancer/AddSchemaContainerEnhancer';
import { enhance as tableSetupEnhancer } from './model/Table';
import { enhance as namespaceSetupEnhancer } from './model/Namespace';

export { ColumnDataTypes } from './model/ColumnDataTypes';

export function initialize(): MetaEdPlugin {
  return {
    validator: [],
    enhancer: [
      namespaceSetupEnhancer,
      tableSetupEnhancer,
      sqlServerTableNamingEnhancer,
      sqlServerColumnNamingEnhancer,
      templateSpecificTablePropertyEnhancer,
      sqlServerForeignKeyNamingEnhancer,
      addSchemaContainerEnhancer,
    ],
    generator: [SchemaGenerator, OdsGenerator, IdIndexesGenerator],
    configurationSchemas: new Map(),
  };
}
