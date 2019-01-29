import R from 'ramda';
import {
  addEntityForNamespace,
  newDescriptor,
  newIntegerProperty,
  newMapTypeEnumeration,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { MetaEdEnvironment, Descriptor, IntegerProperty, MapTypeEnumeration, Namespace } from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/DescriptorTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { Table } from '../../../src/model/database/Table';

describe('when DescriptorTableEnhancer enhances simple descriptor', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const descriptorName = 'DescriptorName';
  const descriptorNameDescriptor: string = `${descriptorName}Descriptor`;
  const descriptorDocumentation = 'DescriptorDocumentation';
  const integerPropertyName = 'integerPropertyName';

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      documentation: descriptorDocumentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: descriptorNameDescriptor,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: integerPropertyName,
      documentation: 'IntegerPropertyDocumentation',
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    descriptor.data.edfiOds.odsProperties.push(property);

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(descriptor);
    enhance(metaEd);
  });

  it('should create table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameDescriptor);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(descriptorDocumentation);
  });

  it('should create two columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.columns).toHaveLength(2);
  });

  it('should have primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorName}DescriptorId`);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.head(table.columns).description).not.toBe('');
  });

  it('should have property column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.columns).name).toBe(integerPropertyName);
    expect(R.last(table.columns).isPartOfPrimaryKey).toBe(false);
    expect(R.last(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have foreign key to descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.foreignKeys).columnNames).toHaveLength(1);
    expect(R.head(table.foreignKeys).withDeleteCascade).toBe(true);

    expect(R.head(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.head(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameDescriptor}Id`);

    expect(R.head(table.foreignKeys).foreignTableName).toBe('Descriptor');
    expect(R.head(R.head(table.foreignKeys).columnNames).foreignTableColumnName).toBe('DescriptorId');
  });
});

describe('when DescriptorTableEnhancer enhances descriptor with required map type', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const descriptorName = 'DescriptorName';
  const descriptorNameDescriptor: string = `${descriptorName}Descriptor`;
  const descriptorNameType: string = `${descriptorName}Type`;
  const descriptorDocumentation = 'DescriptorDocumentation';
  const mapTypeEnumerationName: string = `${descriptorName}Map`;
  const mapTypeEnumerationDocumentation = 'MapTypeEnumerationDocumentation';

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      documentation: descriptorDocumentation,
      isMapTypeRequired: true,
      namespace,
      data: {
        edfiOds: {
          odsIsMapType: true,
          odsTableName: descriptorNameDescriptor,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: mapTypeEnumerationName,
      documentation: mapTypeEnumerationDocumentation,
    });
    descriptor.mapTypeEnumeration = mapTypeEnumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(descriptor);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameDescriptor);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(descriptorDocumentation);
  });

  it('should have two columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.columns).toHaveLength(2);
  });

  it('should have primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorName}DescriptorId`);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.head(table.columns).description).not.toBe('');
  });

  it('should have type column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.columns).name).toBe(`${descriptorNameType}Id`);
    expect(R.last(table.columns).isPartOfPrimaryKey).toBe(false);
    expect(R.last(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have two foreign keys', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.foreignKeys).toHaveLength(2);
  });

  it('should have foreign key to descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.foreignKeys).withDeleteCascade).toBe(true);

    expect(R.head(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.head(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameDescriptor}Id`);

    expect(R.head(table.foreignKeys).foreignTableName).toBe('Descriptor');
    expect(R.head(R.head(table.foreignKeys).columnNames).foreignTableColumnName).toBe('DescriptorId');
  });

  it('should have foreign key to map type enumeration table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.foreignKeys).columnNames).toHaveLength(1);
    expect(R.last(table.foreignKeys).withDeleteCascade).toBe(false);

    expect(R.last(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.last(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameType}Id`);

    expect(R.last(table.foreignKeys).foreignTableName).toBe(descriptorNameType);
    expect(R.head(R.last(table.foreignKeys).columnNames).foreignTableColumnName).toBe(`${descriptorNameType}Id`);
  });

  it('should have map type enumeration table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameType);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(mapTypeEnumerationDocumentation);
    expect(table.includeCreateDateColumn).toBe(true);
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });

  it('should have four columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(table.columns).toHaveLength(4);
  });

  it('should have one primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorNameType}Id`);
    expect(R.head(table.columns).isIdentityDatabaseType).toBe(true);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have code value column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'CodeValue'));
    expect(column).toBeDefined();
    expect(column.length).toBe('50');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have description column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'Description'));
    expect(column).toBeDefined();
    expect(column.length).toBe('1024');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have short description column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'ShortDescription'));
    expect(column).toBeDefined();
    expect(column.length).toBe('450');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });
});

describe('when DescriptorTableEnhancer enhances descriptor with optional map type', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const descriptorName = 'DescriptorName';
  const descriptorNameDescriptor: string = `${descriptorName}Descriptor`;
  const descriptorNameType: string = `${descriptorName}Type`;
  const descriptorDocumentation = 'DescriptorDocumentation';
  const mapTypeEnumerationName: string = `${descriptorName}Map`;
  const mapTypeEnumerationDocumentation = 'MapTypeEnumerationDocumentation';

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      documentation: descriptorDocumentation,
      isMapTypeOptional: true,
      namespace,
      data: {
        edfiOds: {
          odsIsMapType: true,
          odsTableName: descriptorNameDescriptor,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: mapTypeEnumerationName,
      documentation: mapTypeEnumerationDocumentation,
    });
    descriptor.mapTypeEnumeration = mapTypeEnumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(descriptor);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameDescriptor);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(descriptorDocumentation);
  });

  it('should have two columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.columns).toHaveLength(2);
  });

  it('should have primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorName}DescriptorId`);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.head(table.columns).description).not.toBe('');
  });

  it('should have type column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.columns).name).toBe(`${descriptorNameType}Id`);
    expect(R.last(table.columns).isPartOfPrimaryKey).toBe(false);
    expect(R.last(table.columns).isNullable).toBe(true);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have two foreign keys', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.foreignKeys).toHaveLength(2);
  });

  it('should have foreign key to descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.foreignKeys).withDeleteCascade).toBe(true);

    expect(R.head(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.head(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameDescriptor}Id`);

    expect(R.head(table.foreignKeys).foreignTableName).toBe('Descriptor');
    expect(R.head(R.head(table.foreignKeys).columnNames).foreignTableColumnName).toBe('DescriptorId');
  });

  it('should have foreign key to map type enumeration table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.foreignKeys).columnNames).toHaveLength(1);
    expect(R.last(table.foreignKeys).withDeleteCascade).toBe(false);

    expect(R.last(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.last(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameType}Id`);

    expect(R.last(table.foreignKeys).foreignTableName).toBe(descriptorNameType);
    expect(R.head(R.last(table.foreignKeys).columnNames).foreignTableColumnName).toBe(`${descriptorNameType}Id`);
  });

  it('should have map type enumeration table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameType);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(mapTypeEnumerationDocumentation);
    expect(table.includeCreateDateColumn).toBe(true);
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });

  it('should have four columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(table.columns).toHaveLength(4);
  });

  it('should have one primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorNameType}Id`);
    expect(R.head(table.columns).isIdentityDatabaseType).toBe(true);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have code value column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'CodeValue'));
    expect(column).toBeDefined();
    expect(column.length).toBe('50');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have description column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'Description'));
    expect(column).toBeDefined();
    expect(column.length).toBe('1024');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have short description column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'ShortDescription'));
    expect(column).toBeDefined();
    expect(column.length).toBe('450');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });
});

describe("when DescriptorTableEnhancer enhances descriptor with map type name ending with 'Type'", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const descriptorName = 'DescriptorName';
  const descriptorNameDescriptor: string = `${descriptorName}Descriptor`;
  const descriptorNameType: string = `${descriptorName}Type`;
  const descriptorDocumentation = 'DescriptorDocumentation';
  const mapTypeEnumerationName: string = `${descriptorNameType}Map`;
  const mapTypeEnumerationDocumentation = 'MapTypeEnumerationDocumentation';

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorNameType,
      documentation: descriptorDocumentation,
      isMapTypeOptional: true,
      namespace,
      data: {
        edfiOds: {
          odsIsMapType: true,
          odsTableName: descriptorNameDescriptor,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const mapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: mapTypeEnumerationName,
      documentation: mapTypeEnumerationDocumentation,
    });
    descriptor.mapTypeEnumeration = mapTypeEnumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(descriptor);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameDescriptor);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(descriptorDocumentation);
  });

  it('should have two columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.columns).toHaveLength(2);
  });

  it('should have primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorNameType}DescriptorId`);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.head(table.columns).description).not.toBe('');
  });

  it('should have type column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.columns).name).toBe(`${descriptorNameType}Id`);
    expect(R.last(table.columns).isPartOfPrimaryKey).toBe(false);
    expect(R.last(table.columns).isNullable).toBe(true);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have two foreign keys', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(table.foreignKeys).toHaveLength(2);
  });

  it('should have foreign key to descriptor table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.head(table.foreignKeys).withDeleteCascade).toBe(true);

    expect(R.head(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.head(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameDescriptor}Id`);

    expect(R.head(table.foreignKeys).foreignTableName).toBe('Descriptor');
    expect(R.head(R.head(table.foreignKeys).columnNames).foreignTableColumnName).toBe('DescriptorId');
  });

  it('should have foreign key to map type enumeration table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameDescriptor) as Table;
    expect(R.last(table.foreignKeys).columnNames).toHaveLength(1);
    expect(R.last(table.foreignKeys).withDeleteCascade).toBe(false);

    expect(R.last(table.foreignKeys).parentTableName).toBe(descriptorNameDescriptor);
    expect(R.head(R.last(table.foreignKeys).columnNames).parentTableColumnName).toBe(`${descriptorNameType}Id`);

    expect(R.last(table.foreignKeys).foreignTableName).toBe(descriptorNameType);
    expect(R.head(R.last(table.foreignKeys).columnNames).foreignTableColumnName).toBe(`${descriptorNameType}Id`);
  });

  it('should have map type enumeration table', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(table).toBeDefined();
    expect(table.name).toBe(descriptorNameType);
    expect(table.schema).toBe('edfi');
    expect(table.description).toBe(mapTypeEnumerationDocumentation);
    expect(table.includeCreateDateColumn).toBe(true);
    expect(table.includeLastModifiedDateAndIdColumn).toBe(true);
  });

  it('should have four columns', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(table.columns).toHaveLength(4);
  });

  it('should have one primary key', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    expect(R.head(table.columns).name).toBe(`${descriptorNameType}Id`);
    expect(R.head(table.columns).isIdentityDatabaseType).toBe(true);
    expect(R.head(table.columns).isPartOfPrimaryKey).toBe(true);
    expect(R.head(table.columns).isNullable).toBe(false);
    expect(R.last(table.columns).description).not.toBe('');
  });

  it('should have code value column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'CodeValue'));
    expect(column).toBeDefined();
    expect(column.length).toBe('50');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have description column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'Description'));
    expect(column).toBeDefined();
    expect(column.length).toBe('1024');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });

  it('should have short description column', () => {
    const table = tableEntities(metaEd, namespace).get(descriptorNameType) as Table;
    const column = R.head(table.columns.filter(x => x.name === 'ShortDescription'));
    expect(column).toBeDefined();
    expect(column.length).toBe('450');
    expect(column.isPartOfPrimaryKey).toBe(false);
    expect(column.isNullable).toBe(false);
    expect(column.description).not.toBe('');
  });
});
