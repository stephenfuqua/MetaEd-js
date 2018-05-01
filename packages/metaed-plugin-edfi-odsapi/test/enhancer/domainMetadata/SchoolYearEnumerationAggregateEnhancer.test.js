// @flow
import { newMetaEdEnvironment, newSchoolYearEnumeration, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, SchoolYearEnumeration, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import type { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/SchoolYearEnumerationAggregateEnhancer';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing schoolYearEnumerations', () => {
  const metaEdName: string = 'MetaEdName';
  const tableName: string = 'TableName';
  const namespaceName: string = 'namespace';

  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: {
      edfiOdsApi: {
        aggregates: [],
      },
    },
  });

  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: namespaceName,
    };

    const schoolYearEnumeration: SchoolYearEnumeration = Object.assign(newSchoolYearEnumeration(), {
      metaEdName,
      namespace: Object.assign(newNamespace(), {
        namespaceName,
        data: {
          edfiOdsApi: {
            aggregates: [],
          },
        },
      }),
      data: {
        edfiOds: {
          ods_TableName: tableName,
          ods_Tables: [table],
        },
        edfiOdsApi: {},
      },
    });
    metaEd.entity.schoolYearEnumeration.set(schoolYearEnumeration.metaEdName, schoolYearEnumeration);

    enhance(metaEd);
    aggregate = schoolYearEnumeration.data.edfiOdsApi.aggregate;
  });

  it('should create aggregate', () => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(false);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(namespaceName);
    expect(entityTable.table).toBe(tableName);
  });
});
