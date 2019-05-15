import { newMetaEdEnvironment, newAssociation, newDomainEntitySubclass, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Association, DomainEntitySubclass, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/DomainEntitySubclassAggregateEnhancer';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing association extensions', (): void => {
  const baseEntityName = 'BaseEntityName';
  const baseTableName = 'BaseTableName';
  const entityName = 'EntityName';
  const tableName = 'TableName';
  const namespaceName = 'Namespace';
  const schema = namespaceName.toLowerCase();

  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
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

    const baseEntity: Association = Object.assign(newAssociation(), {
      metaEdName: baseEntityName,
      namespace,
      data: {
        edfiOds: {
          odsTableName: baseTableName,
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.association.set(baseEntity.metaEdName, baseEntity);

    const table: Table = {
      ...newTable(),
      name: tableName,
      nameComponents: [tableName],
      schema,
    };

    const entity: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: entityName,
      baseEntity,
      namespace,
      data: {
        edfiOds: {
          odsTableName: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.domainEntitySubclass.set(entity.metaEdName, entity);

    enhance(metaEd);
    ({ aggregate } = entity.data.edfiOdsApi);
  });

  it('should create aggregate', (): void => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(false);
  });

  it('should create entity tables', (): void => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(schema);
    expect(entityTable.table).toBe(tableName);
    expect(entityTable.isA).toBe(baseTableName);
  });
});
