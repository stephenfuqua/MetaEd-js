// @flow
import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ChangeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { Table } from '../../src/model/database/Table';

describe('when ChangeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher diminishes LocalEducationAgencyFederalFunds table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const innovativeDollarsSpentOnStrategicPriorities: string = 'InnovativeDollarsSpentOnStrategicPriorities';
  const localEducationAgencyFederalFunds: string = 'LocalEducationAgencyFederalFunds';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const innovativeDollarsSpentStrategicPriorities: string = 'InnovativeDollarsSpentStrategicPriorities';
    const table: Table = Object.assign(newTable(), {
      name: localEducationAgencyFederalFunds,
      columns: [
        Object.assign(newColumn(), {
          name: innovativeDollarsSpentStrategicPriorities,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename InnovativeDollarsSpentStrategicPriorities column to InnovativeDollarsSpentOnStrategicPriorities', () => {
    // $FlowIgnore - null check
    const column: Column = R.head(tableEntities(metaEd, namespace).get(localEducationAgencyFederalFunds).columns);
    expect(column.name).toBe(innovativeDollarsSpentOnStrategicPriorities);
  });
});

describe('when ChangeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher diminishes LocalEducationAgencyFederalFunds table with existing InnovativeDollarsSpentOnStrategicPriorities column', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const innovativeDollarsSpentOnStrategicPriorities: string = 'InnovativeDollarsSpentOnStrategicPriorities';
  const localEducationAgencyFederalFunds: string = 'LocalEducationAgencyFederalFunds';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: localEducationAgencyFederalFunds,
      columns: [
        Object.assign(newColumn(), {
          name: innovativeDollarsSpentOnStrategicPriorities,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have InnovativeDollarsSpentOnStrategicPriorities column', () => {
    // $FlowIgnore - null check
    const column: Column = R.head(tableEntities(metaEd, namespace).get(localEducationAgencyFederalFunds).columns);
    expect(column.name).toBe(innovativeDollarsSpentOnStrategicPriorities);
  });
});
