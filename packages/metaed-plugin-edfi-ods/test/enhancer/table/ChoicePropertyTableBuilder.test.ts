import { DomainEntity, Choice, ChoiceProperty, IntegerProperty } from 'metaed-core';
import { newDomainEntity, newChoice, newChoiceProperty, newIntegerProperty } from 'metaed-core';
import { BuildStrategyDefault } from '../../../src/enhancer/table/BuildStrategy';
import { columnCreatorFactory } from '../../../src/enhancer/table/ColumnCreatorFactory';
import { newTable } from '../../../src/model/database/Table';
import { tableBuilderFactory } from '../../../src/enhancer/table/TableBuilderFactory';
import { TableStrategy } from '../../../src/model/database/TableStrategy';
import { Column } from '../../../src/model/database/Column';
import { ColumnCreator } from '../../../src/enhancer/table/ColumnCreator';
import { Table } from '../../../src/model/database/Table';
import { TableBuilder } from '../../../src/enhancer/table/TableBuilder';

describe('when building choice property table with two integer properties', () => {
  const choiceEntityPropertyName1 = 'ChoiceEntityPropertyName1';
  const choiceEntityPropertyName2 = 'ChoiceEntityPropertyName2';
  const entityPkName = 'EntityPkName';
  const tables: Array<Table> = [];
  let table: Table;

  beforeAll(() => {
    table = Object.assign(newTable(), {
      schema: 'TableSchema',
      name: 'TableName',
    });

    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      data: {
        edfiOds: {
          odsCascadePrimaryKeyUpdates: false,
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkName,
      parentEntity: entity,
      isPartOfIdentity: true,
      data: {
        edfiOds: {
          odsName: '',
          odsContextPrefix: '',
          odsIsIdentityDatabaseType: false,
          odsIsUniqueIndex: false,
          odsIsCollection: false,
        },
      },
    });
    const entityChoiceProperty: ChoiceProperty = Object.assign(newChoiceProperty(), {
      parentEntity: entity,
      data: {
        edfiOds: {},
      },
    });

    const choice: Choice = Object.assign(newChoice(), {
      data: {
        edfiOds: {
          odsProperties: [],
        },
      },
    });
    const choiceEntityProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: choiceEntityPropertyName1,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    const choiceEntityProperty2: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: choiceEntityPropertyName2,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsUniqueIndex: false,
        },
      },
    });
    choice.data.edfiOds.odsProperties.push(...[choiceEntityProperty1, choiceEntityProperty2]);
    entityChoiceProperty.referencedEntity = choice;

    const columnCreator: ColumnCreator = columnCreatorFactory.columnCreatorFor(entityPkProperty);
    const primaryKeys: Array<Column> = columnCreator.createColumns(entityPkProperty, BuildStrategyDefault);

    const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(entityChoiceProperty);
    tableBuilder.buildTables(
      entityChoiceProperty,
      TableStrategy.default(table),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });

  it('should return no join table', () => {
    expect(tables).toHaveLength(0);
  });

  it('should have two columns', () => {
    expect(table.columns).toHaveLength(2);
    expect(table.columns[0].name).toBe(choiceEntityPropertyName1);
    expect(table.columns[1].name).toBe(choiceEntityPropertyName2);
  });
});
