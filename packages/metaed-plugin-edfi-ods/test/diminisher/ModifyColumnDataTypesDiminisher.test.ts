import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ModifyColumnDataTypesDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newDateColumn, newStringColumn } from '../../src/model/database/Column';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Table } from '../../src/model/database/Table';

describe('when ModifyColumnDataTypesDiminisher diminishes data types for matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentIndicator = 'StudentIndicator';
  const beginDate = 'BeginDate';
  const endDate = 'EndDate';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentIndicator,
      nameComponents: [studentIndicator],
      columns: [
        Object.assign(newDateColumn(), {
          name: beginDate,
        }),
        Object.assign(newDateColumn(), {
          name: endDate,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should modify data type for matching columns', () => {
    const { columns } = tableEntities(metaEd, namespace).get(studentIndicator) as Table;
    expect(columns).toHaveLength(2);
    expect(R.head(columns).name).toBe(beginDate);
    expect(R.head(columns).dataType).toBe('[DATETIME]');
    expect(R.last(columns).name).toBe(endDate);
    expect(R.last(columns).dataType).toBe('[DATETIME]');
  });
});

describe('when ModifyColumnDataTypesDiminisher diminishes string lengths for matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationContentAuthor = 'EducationContentAuthor';
  const author = 'Author';
  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: educationContentAuthor,
      nameComponents: [educationContentAuthor],
      columns: [
        Object.assign(newStringColumn('123'), {
          name: author,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should modify data type for matching columns', () => {
    const { columns } = tableEntities(metaEd, namespace).get(educationContentAuthor) as Table;
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).toBe(author);
    expect(R.head(columns).length).toBe('225');
    expect(R.head(columns).dataType).toBe('[NVARCHAR](225)');
  });
});

describe('when ModifyColumnDataTypesDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';
  const columnName = 'ColumnName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      columns: [
        Object.assign(newStringColumn('123'), {
          name: columnName,
          nameComponents: [columnName],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify column datatype or length', () => {
    const { columns } = tableEntities(metaEd, namespace).get(tableName) as Table;
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).toBe(columnName);
    expect(R.head(columns).length).toBe('123');
    expect(R.head(columns).dataType).toBe('[NVARCHAR](123)');
  });
});
