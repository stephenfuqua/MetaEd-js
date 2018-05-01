// @flow
import {
  addEntity,
  newDescriptor,
  newEnumerationItem,
  newMapTypeEnumeration,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type { Descriptor, EnumerationItem, MapTypeEnumeration, MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../src/enhancer/DescriptorMapTypeRowEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import type { EnumerationRow } from '../../src/model/database/EnumerationRow';

describe('when DescriptorMapTypeRowEnhancer enhances map type descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const entityName: string = 'EntityName';
  const itemDocumentation1: string = 'ItemDocumentation1';
  const shortDescription1: string = 'ShortDescription1';

  beforeAll(() => {
    const entity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: entityName,
      namespace: Object.assign(newNamespace(), {
        namespaceName,
      }),
      data: {
        edfiOds: {
          ods_IsMapType: true,
          ods_TableName: entityName,
        },
      },
    });
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: `${entityName}Map`,
    });
    const item1: EnumerationItem = Object.assign(newEnumerationItem(), {
      documentation: itemDocumentation1,
      shortDescription: shortDescription1,
    });
    mapTypeEnumeration.enumerationItems.push(item1);
    entity.mapTypeEnumeration = mapTypeEnumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntity(metaEd.entity, entity);
    enhance(metaEd);
  });

  it('should create row', () => {
    expect((metaEd.plugin.get('edfiOds'): any).entity.row.size).toBe(1);
    expect((metaEd.plugin.get('edfiOds'): any).entity.row.get(`${entityName}Type${shortDescription1}`)).toBeDefined();
  });

  it('should have correct enumeration row', () => {
    const row: EnumerationRow = (metaEd.plugin.get('edfiOds'): any).entity.row.get(`${entityName}Type${shortDescription1}`);
    expect(row.type).toBe('enumerationRow');
    expect(row.name).toBe(`${entityName}Type`);
    expect(row.namespace).toBe(namespaceName);
    expect(row.schemaName).toBe(namespaceName);
    expect(row.tableName).toBe(`${entityName}Type`);
    expect(row.documentation).toBe(itemDocumentation1);
    expect(row.codeValue).toBe('');
    expect(row.description).toBe(shortDescription1);
    expect(row.shortDescription).toBe(shortDescription1);
  });
});

describe("when DescriptorMapTypeRowEnhancer enhances map type descriptor with name that ends with 'Type'", () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const entityName: string = 'EntityName';
  const itemDocumentation1: string = 'ItemDocumentation1';
  const shortDescription1: string = 'ShortDescription1';

  beforeAll(() => {
    const entity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: `${entityName}Type`,
      namespace: Object.assign(newNamespace(), {
        namespaceName,
      }),
      data: {
        edfiOds: {
          ods_IsMapType: true,
          ods_TableName: `${entityName}Type`,
        },
      },
    });
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: `${entityName}TypeMap`,
    });
    const item1: EnumerationItem = Object.assign(newEnumerationItem(), {
      documentation: itemDocumentation1,
      shortDescription: shortDescription1,
    });
    mapTypeEnumeration.enumerationItems.push(item1);
    entity.mapTypeEnumeration = mapTypeEnumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntity(metaEd.entity, entity);
    enhance(metaEd);
  });

  it('should create row', () => {
    expect((metaEd.plugin.get('edfiOds'): any).entity.row.size).toBe(1);
    expect((metaEd.plugin.get('edfiOds'): any).entity.row.get(`${entityName}Type${shortDescription1}`)).toBeDefined();
  });

  it('should have correct enumeration row', () => {
    const row: EnumerationRow = (metaEd.plugin.get('edfiOds'): any).entity.row.get(`${entityName}Type${shortDescription1}`);
    expect(row.type).toBe('enumerationRow');
    expect(row.name).toBe(`${entityName}Type`);
    expect(row.namespace).toBe(namespaceName);
    expect(row.schemaName).toBe(namespaceName);
    expect(row.tableName).toBe(`${entityName}Type`);
    expect(row.documentation).toBe(itemDocumentation1);
    expect(row.codeValue).toBe('');
    expect(row.description).toBe(shortDescription1);
    expect(row.shortDescription).toBe(shortDescription1);
  });
});
