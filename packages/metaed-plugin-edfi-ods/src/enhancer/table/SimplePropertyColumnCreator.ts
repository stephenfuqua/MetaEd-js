import { EntityProperty, DecimalProperty, StringProperty, SimpleProperty } from 'metaed-core';
import {
  initializeColumn,
  newBooleanColumn,
  newCurrencyColumn,
  newDateColumn,
  newDatetimeColumn,
  newDecimalColumn,
  newDurationColumn,
  newIntegerColumn,
  newPercentColumn,
  newShortColumn,
  newStringColumn,
  newTimeColumn,
  newYearColumn,
} from '../../model/database/Column';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreator } from './ColumnCreator';
import { ColumnNamer } from '../../model/database/ColumnNamer';

const createDecimalColumn = (property: DecimalProperty): Column =>
  newDecimalColumn(property.totalDigits, property.decimalPlaces);
const createStringColumn = (property: StringProperty): Column => newStringColumn(property.maxLength as string);

export function createNewColumnFor(property: SimpleProperty): Column {
  const createNewColumn: { [propertyType: string]: () => Column } = {
    boolean: () => newBooleanColumn(),
    currency: () => newCurrencyColumn(),
    date: () => newDateColumn(),
    datetime: () => newDatetimeColumn(),
    decimal: () => createDecimalColumn(property as DecimalProperty),
    duration: () => newDurationColumn(),
    integer: () => newIntegerColumn(),
    percent: () => newPercentColumn(),
    sharedDecimal: () => createDecimalColumn(property as DecimalProperty),
    sharedInteger: () => newIntegerColumn(),
    sharedShort: () => newShortColumn(),
    sharedString: () => createStringColumn(property as StringProperty),
    short: () => newShortColumn(),
    string: () => createStringColumn(property as StringProperty),
    time: () => newTimeColumn(),
    year: () => newYearColumn(),
  };

  return createNewColumn[property.type]();
}

export function simplePropertyColumnCreator(): ColumnCreator {
  return {
    createColumns: (property: EntityProperty, strategy: BuildStrategy): Array<Column> => {
      if (!strategy.buildColumns(property)) return [];

      const column: Column = createNewColumnFor(property as SimpleProperty);
      Object.assign(column, {
        referenceContext: property.data.edfiOds.odsName,
        mergedReferenceContexts: [property.data.edfiOds.odsName],
      });
      const columnNamer: ColumnNamer = strategy.columnNamer(
        strategy.parentContext(),
        property.data.edfiOds.odsContextPrefix,
        property.metaEdName,
      );
      const suppressPrimaryKey: boolean = strategy.suppressPrimaryKeyCreation();

      return [initializeColumn(column, property, columnNamer, suppressPrimaryKey)];
    },
  };
}
