import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/GraduationPlanRequiredAssessmentPerformanceLevelDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Table } from '../../src/model/database/Table';

describe('when GraduationPlanRequiredAssessmentPerformanceLevelDiminisher diminishes GraduationPlanRequiredAssessmentPerformanceLevel table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const graduationPlanRequiredAssessmentAssessmentPerformanceLevel =
    'GraduationPlanRequiredAssessmentAssessmentPerformanceLevel';
  const graduationPlanRequiredAssessmentPerformanceLevel = 'GraduationPlanRequiredAssessmentPerformanceLevel';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: graduationPlanRequiredAssessmentPerformanceLevel,
      nameComponents: [graduationPlanRequiredAssessmentPerformanceLevel],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          parentTableName: graduationPlanRequiredAssessmentPerformanceLevel,
        }),
        Object.assign(newForeignKey(), {
          parentTableName: graduationPlanRequiredAssessmentPerformanceLevel,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename GraduationPlanRequiredAssessmentPerformanceLevel table', (): void => {
    const table: Table | undefined = tableEntities(metaEd, namespace).get(graduationPlanRequiredAssessmentPerformanceLevel);
    expect(table).toBeUndefined();

    const targetTable: Table = tableEntities(metaEd, namespace).get(
      graduationPlanRequiredAssessmentAssessmentPerformanceLevel,
    ) as Table;
    expect(targetTable).toBeDefined();
    expect(targetTable.name).toBe(graduationPlanRequiredAssessmentAssessmentPerformanceLevel);
  });

  it('should update foreign key parent table name', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(
      graduationPlanRequiredAssessmentAssessmentPerformanceLevel,
    ) as Table;
    expect(foreignKeys.every(fk => fk.parentTableName === graduationPlanRequiredAssessmentAssessmentPerformanceLevel)).toBe(
      true,
    );
  });
});
