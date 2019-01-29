import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { GeneratorResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { generate } from '../../src/generator/IdIndexesGenerator';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { Table } from '../../src/model/database/Table';

describe('when generating id indexes for core namespace table with no id', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);

    initializeEdFiOdsEntityRepository(metaEd);
    const table: Table = Object.assign(newTable(), {
      name: 'TableName',
      schema: 'edfi',
      includeLastModifiedDateAndIdColumn: false,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    result = await generate(metaEd);
  });

  it('should not generate id index', () => {
    expect(result.generatorName).toEqual('edfiOds.IdIndexesGenerator');
    expect(result.generatedOutput).toEqual([]);
  });
});

describe('when generating id indexes for core namespace table with no type', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);

    initializeEdFiOdsEntityRepository(metaEd);
    const table: Table = Object.assign(newTable(), {
      name: 'TableName',
      schema: 'edfi',
      includeLastModifiedDateAndIdColumn: true,
      isTypeTable: false,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    result = await generate(metaEd);
  });

  it('should generate correct id index', () => {
    expect(result.generatorName).toEqual('edfiOds.IdIndexesGenerator');
    expect(R.head(result.generatedOutput).fileName).toBe('0040-IdColumnUniqueIndexes.sql');
    expect(R.head(result.generatedOutput).namespace).toBe('EdFi');
    expect(R.head(result.generatedOutput).folderName).toBe('/Database/SQLServer/ODS/Structure/');
    expect(R.head(result.generatedOutput).name).toBe('ODS Id Indexes');
    expect(R.head(result.generatedOutput).resultStream).toBeNull();
    expect(R.head(result.generatedOutput).resultString).toEqual(expect.stringMatching('FILLFACTOR = 75'));
    expect(R.head(result.generatedOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating id indexes for core namespace table with type', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);

    initializeEdFiOdsEntityRepository(metaEd);
    const table: Table = Object.assign(newTable(), {
      name: 'TableNameType',
      schema: 'edfi',
      includeLastModifiedDateAndIdColumn: true,
      isTypeTable: true,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    result = await generate(metaEd);
  });

  it('should generate correct id index', () => {
    expect(result.generatorName).toEqual('edfiOds.IdIndexesGenerator');
    expect(R.head(result.generatedOutput).fileName).toBe('0040-IdColumnUniqueIndexes.sql');
    expect(R.head(result.generatedOutput).namespace).toBe('EdFi');
    expect(R.head(result.generatedOutput).folderName).toBe('/Database/SQLServer/ODS/Structure/');
    expect(R.head(result.generatedOutput).name).toBe('ODS Id Indexes');
    expect(R.head(result.generatedOutput).resultStream).toBeNull();
    expect(R.head(result.generatedOutput).resultString).toEqual(expect.stringMatching('FILLFACTOR = 100'));
    expect(R.head(result.generatedOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating id indexes for extension namespace table with no type', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: 'Extension',
      isExtension: true,
      projectExtension: 'EXTENSION',
    };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);

    initializeEdFiOdsEntityRepository(metaEd);
    const table: Table = Object.assign(newTable(), {
      name: 'TableName',
      schema: 'extension',
      includeLastModifiedDateAndIdColumn: true,
      isTypeTable: false,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    result = await generate(metaEd);
  });

  it('should generate correct id index', () => {
    expect(result.generatorName).toEqual('edfiOds.IdIndexesGenerator');
    expect(R.head(result.generatedOutput).fileName).toBe('0040-EXTENSION-Extension-IdColumnUniqueIndexes.sql');
    expect(R.head(result.generatedOutput).namespace).toBe('Extension');
    expect(R.head(result.generatedOutput).folderName).toBe('/Database/SQLServer/ODS/Structure/');
    expect(R.head(result.generatedOutput).name).toBe('ODS Id Indexes');
    expect(R.head(result.generatedOutput).resultStream).toBeNull();
    expect(R.head(result.generatedOutput).resultString).toEqual(expect.stringMatching('FILLFACTOR = 75'));
    expect(R.head(result.generatedOutput).resultString).toMatchSnapshot();
  });
});
