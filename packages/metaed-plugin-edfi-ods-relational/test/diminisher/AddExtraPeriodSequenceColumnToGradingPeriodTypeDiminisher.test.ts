import R from 'ramda';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Table } from '../../src/model/database/Table';

describe('when AddExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher diminishes GradingPeriodType table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const gradingPeriodType = 'GradingPeriodType';
  const periodSequence = 'PeriodSequence';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: gradingPeriodType,
      nameComponents: [gradingPeriodType],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should add PeriodSequence column', (): void => {
    const table: Table | undefined = tableEntities(metaEd, namespace).get(gradingPeriodType);
    expect(table).toBeDefined();
    if (table == null) throw new Error();
    expect(R.head(table.columns).name).toBe(periodSequence);
    expect(R.head(table.columns).isNullable).toBe(true);
  });
});

describe('when AddExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher diminishes GradingPeriodType table with existing PeriodSequence column', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const gradingPeriodType = 'GradingPeriodType';
  const periodSequence = 'PeriodSequence';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: gradingPeriodType,
      nameComponents: [gradingPeriodType],
      columns: [
        Object.assign(newColumn(), {
          name: periodSequence,
          isNullable: false,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify PeriodSequence column', (): void => {
    const table: Table | undefined = tableEntities(metaEd, namespace).get(gradingPeriodType);
    expect(table).toBeDefined();
    if (table == null) throw new Error();
    expect(table.columns).toHaveLength(1);
    expect(R.head(table.columns).name).toBe(periodSequence);
    expect(R.head(table.columns).isNullable).toBe(false);
  });
});
