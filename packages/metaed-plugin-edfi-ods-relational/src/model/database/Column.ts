import deepFreeze from 'deep-freeze';
import R from 'ramda';
import winston from 'winston';
import { EntityProperty, TopLevelEntity } from 'metaed-core';
import { ColumnDataTypes } from './ColumnDataTypes';
import { ColumnType } from './ColumnType';
import { ColumnNamer } from './ColumnNamer';
import { NoTable, Table } from './Table';

winston.configure({ transports: [new winston.transports.Console()], format: winston.format.cli() });

/** A single component of the name of the column used by dependent plugins to construct the actual name */
export interface ColumnNameComponent {
  /** the string name component itself */
  nameComponent: string;
  /** is the source of the name component a property 'shorten to' directive */
  isShortenToRename: boolean;
  /** is the source of the name component a property 'role name' directive */
  isPropertyRoleName: boolean;
  /** is the source of the name component a property MetaEdName */
  isPropertyMetaEdName: boolean;
  /** the source property for the name component, if applicable */
  sourceProperty?: EntityProperty;
  /** the source entity for the name component, if applicable */
  sourceEntity?: EntityProperty;
}

export function newColumnNameComponent(): ColumnNameComponent {
  return {
    nameComponent: '',
    isShortenToRename: false,
    isPropertyRoleName: false,
    isPropertyMetaEdName: false,
  };
}

/** The reason why this column exists */
export interface ColumnExistenceReason {
  /** is the column data directly from a simple property */
  isDirectlyFromSimpleProperty: boolean;
  /** is the column part of a foreign key reference used to implement a collection property */
  isPartOfForeignKeyImplementingCollection: boolean;
  /** is the column part of a foreign key reference used to implement a common property */
  isPartOfForeignKeyImplementingCommon: boolean;
  /** the source property if one exists, whether a simple property or a property requiring a foreign key implementation */
  sourceProperty?: EntityProperty;

  /** is the column part of a foreign key reference of an extension back to a parent entity */
  isPartOfForeignKeyToExtensionTable: boolean;
  /** is the column part of a foreign key reference of a subclass back to a parent entity */
  isPartOfForeignKeyToSubclassTable: boolean;
  /** the parent entity requiring a foreign key implementation, if one exists */
  parentEntity?: TopLevelEntity;

  /** is the column an API create date column */
  isSyntheticCreateDate: boolean;
  /** is the column an API last modified date column */
  isSyntheticLastModifiedDate: boolean;
  /** is the column an API id column */
  isSyntheticIdGuid: boolean;
  /** is the column a subclass discriminator column */
  isSyntheticDiscriminator: boolean;

  /** is the column a participant in a merge due to a merge directive somewhere in the model */
  isInvolvedInMerge: boolean;
  /** the properties that would also have created this column if there were no merge directives, if this column is a participant in a merge */
  mergedAwayProperties?: EntityProperty[];
}

export function newColumnExistenceReason(): ColumnExistenceReason {
  return {
    isDirectlyFromSimpleProperty: false,
    isPartOfForeignKeyImplementingCollection: false,
    isPartOfForeignKeyImplementingCommon: false,
    isPartOfForeignKeyToExtensionTable: false,
    isPartOfForeignKeyToSubclassTable: false,
    isSyntheticCreateDate: false,
    isSyntheticLastModifiedDate: false,
    isSyntheticIdGuid: false,
    isSyntheticDiscriminator: false,
    isInvolvedInMerge: false,
  };
}

export const NoColumnExistenceReason: ColumnExistenceReason = deepFreeze(newColumnExistenceReason());

export interface Column {
  // new stuff here
  nameComponents: ColumnNameComponent[];
  existenceReason: ColumnExistenceReason;
  parentTable: Table,

  name: string;
  type: ColumnType;
  dataType: string;
  referenceContext: string;
  description: string;
  sqlEscapedDescription: string;
  originalContextPrefix: string;
  isNullable: boolean;
  isPartOfPrimaryKey: boolean;
  isPartOfAlternateKey: boolean;
  isUniqueIndex: boolean;
  isIdentityDatabaseType: boolean;
  sourceEntityProperties: EntityProperty[];
  mergedReferenceContexts: string[];
  isDeprecated: boolean;
  deprecationReasons: string[];
}

export interface DecimalColumn extends Column {
  precision: string;
  scale: string;
}

export interface StringColumn extends Column {
  length: string;
}

export function newColumn(): Column {
  return {
    nameComponents: [],
    existenceReason: NoColumnExistenceReason,
    parentTable: NoTable,

    name: '',
    type: 'unknown',
    dataType: '',
    referenceContext: '',
    description: '',
    sqlEscapedDescription: '',
    originalContextPrefix: '',
    isNullable: false,
    isPartOfPrimaryKey: false,
    isPartOfAlternateKey: false,
    isUniqueIndex: false,
    isIdentityDatabaseType: false,
    sourceEntityProperties: [],
    mergedReferenceContexts: [],
    isDeprecated: false,
    deprecationReasons: [],
  };
}

export const NoColumn: Column = deepFreeze(
  Object.assign(newColumn(), {
    name: 'NoColumn',
  }),
);

export function initializeColumn(
  column: Column,
  property: EntityProperty,
  columnNamer: ColumnNamer,
  suppressPrimaryKey: boolean,
): Column {
  Object.assign(column, {
    name: columnNamer(),
    description: property.documentation,
    isIdentityDatabaseType: property.data.edfiOds.odsIsIdentityDatabaseType,
    isNullable: property.isOptional,
    isPartOfPrimaryKey: suppressPrimaryKey ? false : property.isPartOfIdentity,
    isUniqueIndex: property.data.edfiOds.odsIsUniqueIndex,
    originalContextPrefix: property.data.edfiOds.odsContextPrefix,
  });
  column.sourceEntityProperties.push(property);
  return column;
}

export function cloneColumn(column: Column): Column {
  return { ...column };
}

export function columnConstraintMerge(existing: Column, received: Column): Column {
  const clone = cloneColumn(existing);
  clone.mergedReferenceContexts = R.union(clone.mergedReferenceContexts, received.mergedReferenceContexts);
  clone.sourceEntityProperties = R.union(clone.sourceEntityProperties, received.sourceEntityProperties);

  // ensure alternate key if set by either
  if (received.isPartOfAlternateKey) clone.isPartOfAlternateKey = true;

  // ensure unique index key if set by either
  if (received.isUniqueIndex) clone.isUniqueIndex = true;

  // ensure primary key if set by either
  if (clone.isPartOfPrimaryKey) return clone;
  if (received.isPartOfPrimaryKey) {
    clone.isPartOfPrimaryKey = true;
    clone.isNullable = false;
    return clone;
  }

  // ensure not nullable if set by either
  if (!clone.isNullable) return clone;
  if (!received.isNullable) {
    clone.isNullable = false;
    return clone;
  }

  return clone;
}

export function addSourceEntityProperty(column: Column, property: EntityProperty): void {
  const existingProperty = column.sourceEntityProperties.find(
    x => x.metaEdName === property.metaEdName && x.type === property.type,
  );
  if (existingProperty == null) {
    column.sourceEntityProperties.push(property);
  } else {
    winston.warn(
      `  Attempt to add duplicate source entity property: ${property.metaEdName} (${
        property.typeHumanizedName
      })  to column ${column.name} failed.`,
    );
  }
}

export function addMergedReferenceContext(column: Column, referenceContext: string): void {
  const existingProperty: string | undefined = column.mergedReferenceContexts.find(x => x === referenceContext);
  if (existingProperty == null) {
    column.mergedReferenceContexts.push(referenceContext);
  } else {
    // winston.warn(`Attempt to add duplicate merged reference context: ${referenceContext} to column ${column.name} failed.`);
  }
}

export function newBooleanColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'boolean',
    dataType: ColumnDataTypes.boolean,
  });
}

export function newCurrencyColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'currency',
    dataType: ColumnDataTypes.currency,
  });
}

export function newDateColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'date',
    dataType: ColumnDataTypes.date,
  });
}

export function newDatetimeColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'datetime',
    dataType: ColumnDataTypes.datetime,
  });
}

export function newDecimalColumn(precision: string, scale: string): DecimalColumn {
  return Object.assign({}, newColumn(), {
    type: 'decimal',
    dataType: ColumnDataTypes.decimal(precision, scale),
    precision,
    scale,
  });
}

export function newDurationColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'duration',
    dataType: ColumnDataTypes.duration,
  });
}

export function newIntegerColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'integer',
    dataType: ColumnDataTypes.integer,
  });
}

export function newPercentColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'percent',
    dataType: ColumnDataTypes.percent,
  });
}

export function newShortColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'short',
    dataType: ColumnDataTypes.short,
  });
}

export function newStringColumn(length: string): StringColumn {
  return Object.assign({}, newColumn(), {
    type: 'string',
    dataType: ColumnDataTypes.string(length),
    length,
  });
}

export function newTimeColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'time',
    dataType: ColumnDataTypes.time,
  });
}

export function newYearColumn(): Column {
  return Object.assign({}, newColumn(), {
    type: 'year',
    dataType: ColumnDataTypes.year,
  });
}
