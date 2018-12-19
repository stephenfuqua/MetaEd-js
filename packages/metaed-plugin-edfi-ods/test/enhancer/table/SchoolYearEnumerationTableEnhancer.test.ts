import R from 'ramda';
import { addEntityForNamespace, newMetaEdEnvironment, newNamespace, newSchoolYearEnumeration } from 'metaed-core';
import { MetaEdEnvironment, SchoolYearEnumeration, Namespace } from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/SchoolYearEnumerationTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';

describe('when SchoolYearEnumerationTableEnhancer enhances schoolYearEnumeration', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolYear = 'SchoolYear';
  const schoolYearType: string = `${schoolYear}Type`;
  const schoolYearEnumerationDocumentation = 'SchoolYearEnumerationDocumentation';

  beforeAll(() => {
    const schoolYearEnumeration: SchoolYearEnumeration = Object.assign(newSchoolYearEnumeration(), {
      metaEdName: schoolYear,
      documentation: schoolYearEnumerationDocumentation,
      namespace,
      data: {
        edfiOds: {
          odsTables: [],
        },
      },
    });

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(schoolYearEnumeration);
    enhance(metaEd);
  });

  it('should create table', () => {
    const table = tableEntities(metaEd, namespace).get(schoolYearType) as any;
    expect(table).toBeDefined();
    expect(table.name).toBe(schoolYearType);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(schoolYearEnumerationDocumentation);
    expect(table.includeCreateDateColumn).toBe(true);
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });

  it('should have three columns', () => {
    const table = tableEntities(metaEd, namespace).get(schoolYearType) as any;
    expect(table.columns).toHaveLength(3);
  });

  it('should have one primary key', () => {
    const table = tableEntities(metaEd, namespace).get(schoolYearType) as any;
    expect(R.head(table.columns).name).toBe(schoolYear);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have school year description column', () => {
    const table = tableEntities(metaEd, namespace).get(schoolYearType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'SchoolYearDescription'));
    expect(column).toBeDefined();
    expect(column.length).toBe('50');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have current school year column', () => {
    const table = tableEntities(metaEd, namespace).get(schoolYearType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'CurrentSchoolYear'));
    expect(column).toBeDefined();
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });
});
