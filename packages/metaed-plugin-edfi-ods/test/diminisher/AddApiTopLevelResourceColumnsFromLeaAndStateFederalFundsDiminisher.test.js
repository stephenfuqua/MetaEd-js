// @flow
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Table } from '../../src/model/database/Table';

describe('when AddApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher diminishes local/state education agency federal fund tables', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const localEducationAgencyFederalFunds: string = 'LocalEducationAgencyFederalFunds';
  const stateEducationAgencyFederalFunds: string = 'StateEducationAgencyFederalFunds';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);
    const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, namespace);

    const localTable: Table = Object.assign(newTable(), {
      name: localEducationAgencyFederalFunds,
    });
    tablesForCoreNamespace.set(localTable.name, localTable);

    const stateTable: Table = Object.assign(newTable(), {
      name: stateEducationAgencyFederalFunds,
    });
    tablesForCoreNamespace.set(stateTable.name, stateTable);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have local table with includeLastModifiedDateAndIdColumn set to true', () => {
    const table: ?Table = tableEntities(metaEd, namespace).get(localEducationAgencyFederalFunds);
    expect(table).toBeDefined();
    // $FlowIgnore - null check
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });

  it('should have state table with includeLastModifiedDateAndIdColumn set to true', () => {
    const table: ?Table = tableEntities(metaEd, namespace).get(stateEducationAgencyFederalFunds);
    expect(table).toBeDefined();
    // $FlowIgnore - null check
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });
});
