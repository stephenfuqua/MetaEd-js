import R from 'ramda';
import { Enumeration, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addEntityForNamespace, newEnumeration, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/EnumerationTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';

describe('when EnumerationTableEnhancer enhances enumeration', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const enumerationName = 'EnumerationName';
  const enumerationNameType = `${enumerationName}Type`;
  const enumerationDocumentation = 'EnumerationDocumentation';

  beforeAll(() => {
    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationName,
      documentation: enumerationDocumentation,
      namespace,
      data: {
        edfiOds: {
          odsTables: [],
        },
      },
    });

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(enumeration);
    enhance(metaEd);
  });

  it('should create table', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    expect(table).toBeDefined();
    expect(table.name).toBe(enumerationNameType);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(enumerationDocumentation);
  });

  it('should have four columns', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    expect(table.columns).toHaveLength(4);
  });

  it('should have one primary key', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    expect(R.head(table.columns).name).toBe(`${enumerationNameType}Id`);
    expect(R.head(table.columns).isIdentityDatabaseType).toBe(true);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have code value column', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'CodeValue'));
    expect(column).toBeDefined();
    expect(column.length).toBe('50');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have description column', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'Description'));
    expect(column).toBeDefined();
    expect(column.length).toBe('1024');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have short description column', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'ShortDescription'));
    expect(column).toBeDefined();
    expect(column.length).toBe('450');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });
});

describe("when EnumerationTableEnhancer enhances enumeration name ending with 'Type'", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const enumerationNameType = 'EnumerationNameType';
  const enumerationDocumentation = 'EnumerationDocumentation';

  beforeAll(() => {
    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationNameType,
      documentation: enumerationDocumentation,
      namespace,
      data: {
        edfiOds: {
          odsTables: [],
        },
      },
    });

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(enumeration);
    enhance(metaEd);
  });

  it('should create table', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    expect(table).toBeDefined();
    expect(table.name).toBe(enumerationNameType);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(enumerationDocumentation);
  });

  it('should have four columns', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    expect(table.columns).toHaveLength(4);
  });

  it('should have one primary key', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    expect(R.head(table.columns).name).toBe(`${enumerationNameType}Id`);
    expect(R.head(table.columns).isIdentityDatabaseType).toBe(true);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have code value column', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'CodeValue'));
    expect(column).toBeDefined();
    expect(column.length).toBe('50');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have description column', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'Description'));
    expect(column).toBeDefined();
    expect(column.length).toBe('1024');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have short description column', (): void => {
    const table = tableEntities(metaEd, namespace).get(enumerationNameType) as any;
    const column = R.head(table.columns.filter(x => x.name === 'ShortDescription'));
    expect(column).toBeDefined();
    expect(column.length).toBe('450');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });
});
