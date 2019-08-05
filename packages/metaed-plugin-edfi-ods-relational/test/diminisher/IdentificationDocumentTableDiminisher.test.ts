import R from 'ramda';
import { DomainEntity, MetaEdEnvironment, Namespace } from 'metaed-core';
import { newDomainEntity, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/IdentificationDocumentTableDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Table } from '../../src/model/database/Table';

describe('when IdentificationDocumentTableDiminisher diminishes matching table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  const identificationDocument = 'IdentificationDocument';
  let identificationDocumentTable: Table;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    identificationDocumentTable = Object.assign(newTable(), {
      name: `${domainEntityName}Schema${identificationDocument}`,
      nameComponents: [`${domainEntityName}Schema${identificationDocument}`],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          parentTableName: `${domainEntityName}Schema${identificationDocument}`,
        }),
        Object.assign(newForeignKey(), {
          parentTableName: `${domainEntityName}Schema${identificationDocument}`,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(identificationDocumentTable.name, identificationDocumentTable);

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOds: {
          odsTables: [identificationDocumentTable],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename table in repository', (): void => {
    const newLocal = tableEntities(metaEd, namespace);
    const table: Table | undefined = newLocal.get(`${domainEntityName}Schema${identificationDocument}`);
    expect(table).toBeUndefined();

    const targetTable: Table | undefined = tableEntities(metaEd, namespace).get(domainEntityName + identificationDocument);
    expect(targetTable).toBeDefined();
    expect(targetTable).toBe(identificationDocumentTable);
  });

  it('should rename table in the domain entity ods tables', (): void => {
    const { odsTables } = (namespace.entity.domainEntity.get(domainEntityName) as DomainEntity).data.edfiOds;
    expect(odsTables).toHaveLength(1);
    expect(R.head(odsTables)).toBe(identificationDocumentTable);
  });

  it('should update foreign key parent table name', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(domainEntityName + identificationDocument) as Table;
    expect(foreignKeys.every(fk => fk.parentTableName === domainEntityName + identificationDocument)).toBe(true);
  });
});

describe('when IdentificationDocumentTableDiminisher diminishes multiple matching tables', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  const identificationDocument = 'IdentificationDocument';
  let identificationDocumentTable1: Table;
  let identificationDocumentTable2: Table;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    identificationDocumentTable1 = Object.assign(newTable(), {
      name: `${domainEntityName}Schema${identificationDocument}`,
      nameComponents: [`${domainEntityName}Schema${identificationDocument}`],
    });
    tableEntities(metaEd, namespace).set(identificationDocumentTable1.name, identificationDocumentTable1);
    identificationDocumentTable2 = Object.assign(newTable(), {
      name: `${domainEntityName}OtherSchema${identificationDocument}`,
      nameComponents: [`${domainEntityName}OtherSchema${identificationDocument}`],
    });
    tableEntities(metaEd, namespace).set(identificationDocumentTable2.name, identificationDocumentTable2);

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOds: {
          odsTables: [identificationDocumentTable1, identificationDocumentTable2],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename tables in repository', (): void => {
    const table1: Table | undefined = tableEntities(metaEd, namespace).get(
      `${domainEntityName}Schema${identificationDocument}`,
    );
    expect(table1).toBeUndefined();

    const targetTable1: Table | undefined = tableEntities(metaEd, namespace).get(domainEntityName + identificationDocument);
    expect(targetTable1).toBeDefined();
    expect(targetTable1).toBe(identificationDocumentTable1);

    const table2: Table | undefined = tableEntities(metaEd, namespace).get(
      `${domainEntityName}OtherSchema${identificationDocument}`,
    );
    expect(table2).toBeUndefined();
  });

  it('should rename table in the domain entity ods tables', (): void => {
    const { odsTables } = (namespace.entity.domainEntity.get(domainEntityName) as DomainEntity).data.edfiOds;
    expect(odsTables).toHaveLength(1);
    expect(R.head(odsTables)).toBe(identificationDocumentTable1);
  });
});

describe('when IdentificationDocumentTableDiminisher diminishes non matching tables', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainEntityName = 'DomainEntityName';
  const identificationDocument = 'IdentificationDocument';
  let identificationDocumentTable1: Table;
  let identificationDocumentTable2: Table;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    identificationDocumentTable1 = Object.assign(newTable(), {
      name: `${domainEntityName}Schema${identificationDocument}1`,
      nameComponents: [`${domainEntityName}Schema${identificationDocument}`],
    });
    tableEntities(metaEd, namespace).set(identificationDocumentTable1.name, identificationDocumentTable1);
    identificationDocumentTable2 = Object.assign(newTable(), {
      name: `${domainEntityName}OtherSchema${identificationDocument}2`,
      nameComponents: [`${domainEntityName}OtherSchema${identificationDocument}2`],
    });
    tableEntities(metaEd, namespace).set(identificationDocumentTable2.name, identificationDocumentTable2);

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiOds: {
          odsTables: [identificationDocumentTable1, identificationDocumentTable2],
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify tables in repository', (): void => {
    const table1: Table | undefined = tableEntities(metaEd, namespace).get(
      `${domainEntityName}Schema${identificationDocument}1`,
    );
    expect(table1).toBeDefined();
    expect(table1).toBe(identificationDocumentTable1);

    const targetTable1: Table | undefined = tableEntities(metaEd, namespace).get(domainEntityName + identificationDocument);
    expect(targetTable1).toBeUndefined();

    const table2: Table | undefined = tableEntities(metaEd, namespace).get(
      `${domainEntityName}OtherSchema${identificationDocument}2`,
    );
    expect(table2).toBeDefined();
    expect(table2).toBe(identificationDocumentTable2);
  });

  it('should not modify table in the domain entity ods tables', (): void => {
    const { odsTables } = (namespace.entity.domainEntity.get(domainEntityName) as DomainEntity).data.edfiOds;
    expect(odsTables).toHaveLength(2);
    expect(R.head(odsTables)).toBe(identificationDocumentTable1);
    expect(R.last(odsTables)).toBe(identificationDocumentTable2);
  });
});
