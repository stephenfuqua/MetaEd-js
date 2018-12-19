import { newMetaEdEnvironment, newAssociation, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Association, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/AssociationAggregateEnhancer';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing associations', () => {
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const namespaceName = 'namespace';

  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = {
    ...newNamespace(),
    namespaceName,
    data: {
      edfiOdsApi: {
        aggregates: [],
      },
    },
  };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: namespaceName,
    };

    const association: Association = Object.assign(newAssociation(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsTableName: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.association.set(association.metaEdName, association);

    enhance(metaEd);
    ({ aggregate } = association.data.edfiOdsApi);
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
