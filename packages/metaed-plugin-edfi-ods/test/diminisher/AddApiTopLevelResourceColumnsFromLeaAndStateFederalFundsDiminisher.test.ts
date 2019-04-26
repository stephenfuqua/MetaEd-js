import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Table } from '../../src/model/database/Table';

describe('when AddApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher diminishes local/state education agency federal fund tables', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const localEducationAgencyFederalFunds = 'LocalEducationAgencyFederalFunds';
  const stateEducationAgencyFederalFunds = 'StateEducationAgencyFederalFunds';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);
    const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, namespace);

    const localTable: Table = Object.assign(newTable(), {
      name: localEducationAgencyFederalFunds,
      nameComponents: [localEducationAgencyFederalFunds],
    });
    tablesForCoreNamespace.set(localTable.name, localTable);

    const stateTable: Table = Object.assign(newTable(), {
      name: stateEducationAgencyFederalFunds,
      nameComponents: [stateEducationAgencyFederalFunds],
    });
    tablesForCoreNamespace.set(stateTable.name, stateTable);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have local table with includeLastModifiedDateAndIdColumn set to true', () => {
    const table: Table | undefined = tableEntities(metaEd, namespace).get(localEducationAgencyFederalFunds);
    expect(table).toBeDefined();
    if (table == null) throw new Error();
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });

  it('should have state table with includeLastModifiedDateAndIdColumn set to true', () => {
    const table: Table | undefined = tableEntities(metaEd, namespace).get(stateEducationAgencyFederalFunds);
    expect(table).toBeDefined();
    if (table == null) throw new Error();
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });
});
