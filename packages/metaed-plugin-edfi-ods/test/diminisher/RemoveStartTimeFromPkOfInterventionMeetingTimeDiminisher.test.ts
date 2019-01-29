import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/RemoveStartTimeFromPkOfInterventionMeetingTimeDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { Table } from '../../src/model/database/Table';

describe('when RemoveStartTimeFromPkOfInterventionMeetingTimeDiminisher diminishes InterventionMeetingTime table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const interventionMeetingTime = 'InterventionMeetingTime';

  beforeAll(() => {
    const startTime = 'StartTime';
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: interventionMeetingTime,
      columns: [
        Object.assign(newColumn(), {
          name: startTime,
          isPartOfPrimaryKey: true,
          isNullable: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should modify StartTime column to be non-primary key and non-nullable', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(interventionMeetingTime) as Table).columns);
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
  });
});

describe('when RemoveStartTimeFromPkOfInterventionMeetingTimeDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';

  beforeAll(() => {
    const columnName = 'ColumnName';
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      columns: [
        Object.assign(newColumn(), {
          name: columnName,
          isPartOfPrimaryKey: true,
          isNullable: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify column', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).columns);
    expect(column.isPartOfPrimaryKey).toBe(true);
    expect(column.isNullable).toBe(true);
  });
});
