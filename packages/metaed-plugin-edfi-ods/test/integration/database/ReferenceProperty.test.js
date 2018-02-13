// @flow
import {
  CommonBuilder,
  DescriptorBuilder,
  DomainEntityBuilder,
  EnumerationBuilder,
  MetaEdTextBuilder,
  NamespaceInfoBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { column, enhanceGenerateAndExecuteSql, foreignKey, table, testTearDown, columnDataTypes } from './DatabaseTestBase';
import {
  columnExists,
  columnIsNullable,
  columnDataType,
  columnMSDescription,
  columnDefaultConstraint,
} from './DatabaseColumn';
import { foreignKeyDeleteCascades, foreignKeyExists } from './DatabaseForeignKey';
import { tableExists, tablePrimaryKeys, tableColumnCount, tableMSDescription } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';

describe('when entity has descriptor property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const descriptorName: string = 'DescriptorName';
  const descriptorPropertyDocumentation: string = 'DescriptorPropertyDocumentation';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const descriptorTableName: string = `${descriptorName}Descriptor`;
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withDescriptorProperty(descriptorName, descriptorPropertyDocumentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have descriptor id column', async () => {
    const descriptorIdColumn: DatabaseColumn = column(namespace, domainEntityName, descriptorColumnName);
    expect(await columnExists(descriptorIdColumn)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn)).toBe(false);
    expect(await columnDataType(descriptorIdColumn)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(descriptorIdColumn)).toBe(descriptorPropertyDocumentation);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have type table', async () => {
    expect(await tableExists(table(namespace, descriptorTableName))).toBe(true);
  });

  it('should have descriptor id column', async () => {
    const descriptorIdColumn: DatabaseColumn = column(namespace, descriptorTableName, descriptorColumnName);
    expect(await columnExists(descriptorIdColumn)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when entity has multiple descriptor properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const contextName1: string = 'ContextName1';
  const contextName2: string = 'ContextName2';
  const descriptorName: string = 'DescriptorName';
  const descriptorPropertyDocumentation1: string = 'DescriptorPropertyDocumentation1';
  const descriptorPropertyDocumentation2: string = 'DescriptorPropertyDocumentation2';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const descriptorTableName: string = `${descriptorName}Descriptor`;
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withDescriptorProperty(descriptorName, descriptorPropertyDocumentation1, true, false, contextName1)
      .withDescriptorProperty(descriptorName, descriptorPropertyDocumentation2, false, false, contextName2)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have descriptor id columns', async () => {
    const descriptorIdColumn1: DatabaseColumn = column(namespace, domainEntityName, contextName1 + descriptorColumnName);
    expect(await columnExists(descriptorIdColumn1)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn1)).toBe(false);
    expect(await columnDataType(descriptorIdColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(descriptorIdColumn1)).toBe(descriptorPropertyDocumentation1);

    const descriptorIdColumn2: DatabaseColumn = column(namespace, domainEntityName, contextName2 + descriptorColumnName);
    expect(await columnExists(descriptorIdColumn2)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn2)).toBe(true);
    expect(await columnDataType(descriptorIdColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(descriptorIdColumn2)).toBe(descriptorPropertyDocumentation2);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have type table', async () => {
    expect(await tableExists(table(namespace, descriptorTableName))).toBe(true);
  });

  it('should have descriptor id column', async () => {
    const descriptorIdColumn: DatabaseColumn = column(namespace, descriptorTableName, descriptorColumnName);
    expect(await columnExists(descriptorIdColumn)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, contextName1 + descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, contextName2 + descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has collection descriptor property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const contextName: string = 'ContextName';
  const descriptorName: string = 'DescriptorName';
  const descriptorPropertyDocumentation1: string = 'DescriptorPropertyDocumentation1';
  const descriptorPropertyDocumentation2: string = 'DescriptorPropertyDocumentation';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const descriptorTableName: string = `${descriptorName}Descriptor`;
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withDescriptorProperty(descriptorName, descriptorPropertyDocumentation1, true, true)
      .withDescriptorProperty(descriptorName, descriptorPropertyDocumentation2, false, true, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName))).toBe(4);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have first collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + descriptorName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName + descriptorName))).toBe(3);
  });

  it('should have descriptor id column', async () => {
    const descriptorIdColumn: DatabaseColumn = column(namespace, domainEntityName + descriptorName, descriptorColumnName);
    expect(await columnExists(descriptorIdColumn)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn)).toBe(false);
    expect(await columnDataType(descriptorIdColumn)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(descriptorIdColumn)).toBe(descriptorPropertyDocumentation1);
  });

  it('should have create date resource column', async () => {
    const createDateColumn: DatabaseColumn = column(namespace, domainEntityName + descriptorName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have id and last modified date resource columns', async () => {
    expect(await columnExists(column(namespace, domainEntityName + descriptorName, 'Id'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntityName + descriptorName, 'LastModifiedDate'))).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + descriptorName))).toEqual([
      descriptorColumnName,
      integerPropertyName,
    ]);
  });

  it('should have second collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + contextName + descriptorName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName + contextName + descriptorName))).toBe(3);
  });

  it('should have descriptor id column', async () => {
    const descriptorIdColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + descriptorName,
      descriptorColumnName,
    );
    expect(await columnExists(descriptorIdColumn)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn)).toBe(false);
    expect(await columnDataType(descriptorIdColumn)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(descriptorIdColumn)).toBe(descriptorPropertyDocumentation2);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + contextName + descriptorName))).toEqual([
      descriptorColumnName,
      integerPropertyName,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + descriptorName, integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + descriptorName, integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(true);

    const foreignKey3: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + descriptorName, descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey3)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(false);

    const foreignKey4: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + descriptorName, descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey4)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(false);
  });
});

describe('when entity has enumeration property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const enumerationName: string = 'EnumerationName';
  const enumerationItemName: string = 'EnumerationItemName';
  const enumerationPropertyDocumentation: string = 'EnumerationPropertyDocumentation';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationColumnName: string = `${enumerationName}TypeId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(enumerationItemName)
      .withEndEnumeration()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withEnumerationProperty(enumerationName, enumerationPropertyDocumentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have enumeration id column', async () => {
    const enumerationIdColumn: DatabaseColumn = column(namespace, domainEntityName, enumerationColumnName);
    expect(await columnExists(enumerationIdColumn)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn)).toBe(false);
    expect(await columnDataType(enumerationIdColumn)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(enumerationIdColumn)).toBe(enumerationPropertyDocumentation);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have type table', async () => {
    expect(await tableExists(table(namespace, enumerationTableName))).toBe(true);
  });

  it('should have enumeration id column', async () => {
    const enumerationIdColumn: DatabaseColumn = column(namespace, enumerationTableName, enumerationColumnName);
    expect(await columnExists(enumerationIdColumn)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, enumerationColumnName)],
      [column(namespace, enumerationTableName, enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when entity has multiple enumeration properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const contextName1: string = 'ContextName1';
  const contextName2: string = 'ContextName2';
  const enumerationName: string = 'EnumerationName';
  const enumerationItemName: string = 'EnumerationItemName';
  const enumerationPropertyDocumentation1: string = 'EnumerationPropertyDocumentation1';
  const enumerationPropertyDocumentation2: string = 'EnumerationPropertyDocumentation2';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationColumnName: string = `${enumerationName}TypeId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(enumerationItemName)
      .withEndEnumeration()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withEnumerationProperty(enumerationName, enumerationPropertyDocumentation1, true, false, contextName1)
      .withEnumerationProperty(enumerationName, enumerationPropertyDocumentation2, false, false, contextName2)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have enumeration id columns', async () => {
    const enumerationIdColumn1: DatabaseColumn = column(namespace, domainEntityName, contextName1 + enumerationColumnName);
    expect(await columnExists(enumerationIdColumn1)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn1)).toBe(false);
    expect(await columnDataType(enumerationIdColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(enumerationIdColumn1)).toBe(enumerationPropertyDocumentation1);

    const enumerationIdColumn2: DatabaseColumn = column(namespace, domainEntityName, contextName2 + enumerationColumnName);
    expect(await columnExists(enumerationIdColumn2)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn2)).toBe(true);
    expect(await columnDataType(enumerationIdColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(enumerationIdColumn2)).toBe(enumerationPropertyDocumentation2);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have type table', async () => {
    expect(await tableExists(table(namespace, enumerationTableName))).toBe(true);
  });

  it('should have enumeration id column', async () => {
    const enumerationIdColumn: DatabaseColumn = column(namespace, enumerationTableName, enumerationColumnName);
    expect(await columnExists(enumerationIdColumn)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, contextName1 + enumerationColumnName)],
      [column(namespace, enumerationTableName, enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, contextName2 + enumerationColumnName)],
      [column(namespace, enumerationTableName, enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has collection enumeration property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const contextName: string = 'ContextName';
  const enumerationName: string = 'EnumerationName';
  const enumerationPropertyDocumentation1: string = 'EnumerationPropertyDocumentation1';
  const enumerationPropertyDocumentation2: string = 'EnumerationPropertyDocumentation';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationColumnName: string = `${enumerationName}TypeId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEndEnumeration()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withEnumerationProperty(enumerationName, enumerationPropertyDocumentation1, true, true)
      .withEnumerationProperty(enumerationName, enumerationPropertyDocumentation2, false, true, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName))).toBe(4);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have first collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + enumerationName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName + enumerationName))).toBe(3);
  });

  it('should have enumeration id column', async () => {
    const enumerationIdColumn: DatabaseColumn = column(namespace, domainEntityName + enumerationName, enumerationColumnName);
    expect(await columnExists(enumerationIdColumn)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn)).toBe(false);
    expect(await columnDataType(enumerationIdColumn)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(enumerationIdColumn)).toBe(enumerationPropertyDocumentation1);
  });

  it('should have create date resource column', async () => {
    const createDateColumn: DatabaseColumn = column(namespace, domainEntityName + enumerationName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have id and last modified date resource columns', async () => {
    expect(await columnExists(column(namespace, domainEntityName + enumerationName, 'Id'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntityName + enumerationName, 'LastModifiedDate'))).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + enumerationName))).toEqual([
      enumerationColumnName,
      integerPropertyName,
    ]);
  });

  it('should have second collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + contextName + enumerationName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName + contextName + enumerationName))).toBe(3);
  });

  it('should have enumeration id column', async () => {
    const enumerationIdColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + enumerationName,
      enumerationColumnName,
    );
    expect(await columnExists(enumerationIdColumn)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn)).toBe(false);
    expect(await columnDataType(enumerationIdColumn)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(enumerationIdColumn)).toBe(enumerationPropertyDocumentation2);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + contextName + enumerationName))).toEqual([
      enumerationColumnName,
      integerPropertyName,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + enumerationName, integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + enumerationName, integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(true);

    const foreignKey3: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + enumerationName, enumerationColumnName)],
      [column(namespace, enumerationTableName, enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey3)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(false);

    const foreignKey4: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + enumerationName, enumerationColumnName)],
      [column(namespace, enumerationTableName, enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey4)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(false);
  });
});

describe('when entity has collection enumeration property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const overlapName: string = 'OverlapName';
  const enumerationName: string = 'EnumerationName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationColumnName: string = `${enumerationName}TypeId`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartEnumeration(overlapName + enumerationName)
      .withDocumentation('Documentation')
      .withEndEnumeration()

      .withStartDomainEntity(domainEntityName + overlapName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withEnumerationProperty(overlapName + enumerationName, 'Documentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + overlapName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName + overlapName))).toBe(4);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName + overlapName, integerPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + overlapName))).toEqual([integerPropertyName]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + overlapName + enumerationName))).toBe(true);
    expect(await tableColumnCount(table(namespace, domainEntityName + overlapName + enumerationName))).toBe(3);
  });

  it('should have enumeration id column', async () => {
    const enumerationIdColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + overlapName + enumerationName,
      overlapName + enumerationColumnName,
    );
    expect(await columnExists(enumerationIdColumn)).toBe(true);
    expect(await columnIsNullable(enumerationIdColumn)).toBe(false);
    expect(await columnDataType(enumerationIdColumn)).toBe(columnDataTypes.integer);
  });

  it('should have create date resource column', async () => {
    const createDateColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + overlapName + enumerationName,
      'CreateDate',
    );
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have id and last modified date resource columns', async () => {
    expect(await columnExists(column(namespace, domainEntityName + overlapName + enumerationName, 'Id'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntityName + overlapName + enumerationName, 'LastModifiedDate'))).toBe(
      false,
    );
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + overlapName + enumerationName))).toEqual([
      integerPropertyName,
      overlapName + enumerationColumnName,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + overlapName + enumerationName, integerPropertyName)],
      [column(namespace, domainEntityName + overlapName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + overlapName + enumerationName, overlapName + enumerationColumnName)],
      [column(namespace, overlapName + enumerationTableName, overlapName + enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has domain entity property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityPropertyDocumentation: string = 'DomainEntityPropertyDocumentation';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const referencedEntityName: string = 'ReferencedDomainEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, domainEntityPropertyDocumentation)
      .withIntegerIdentity(integerPropertyName2, domainEntityPropertyDocumentation)
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withDomainEntityProperty(referencedEntityName, 'Documentation', false, false)
      .withDomainEntityProperty(referencedEntityName, 'Documentation', true, false, false, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referencedColumn1: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName1);
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(true);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn1)).toBe(domainEntityPropertyDocumentation);

    const referencedColumn2: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(true);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn2)).toBe(domainEntityPropertyDocumentation);

    const referencedContextColumn1: DatabaseColumn = column(namespace, domainEntityName, contextName + integerPropertyName1);
    expect(await columnExists(referencedContextColumn1)).toBe(true);
    expect(await columnIsNullable(referencedContextColumn1)).toBe(false);
    expect(await columnDataType(referencedContextColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedContextColumn1)).toBe(domainEntityPropertyDocumentation);

    const referencedContextColumn2: DatabaseColumn = column(namespace, domainEntityName, contextName + integerPropertyName2);
    expect(await columnExists(referencedContextColumn2)).toBe(true);
    expect(await columnIsNullable(referencedContextColumn2)).toBe(false);
    expect(await columnDataType(referencedContextColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedContextColumn2)).toBe(domainEntityPropertyDocumentation);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName3]);
  });

  it('should have referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn1: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName1);
    expect(await columnExists(identityColumn1)).toBe(true);
    expect(await columnIsNullable(identityColumn1)).toBe(false);
    expect(await columnDataType(identityColumn1)).toBe(columnDataTypes.integer);

    const identityColumn2: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName2);
    expect(await columnExists(identityColumn2)).toBe(true);
    expect(await columnIsNullable(identityColumn2)).toBe(false);
    expect(await columnDataType(identityColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, integerPropertyName1), column(namespace, domainEntityName, integerPropertyName2)],
      [
        column(namespace, referencedEntityName, integerPropertyName1),
        column(namespace, referencedEntityName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName, contextName + integerPropertyName1),
        column(namespace, domainEntityName, contextName + integerPropertyName2),
      ],
      [
        column(namespace, referencedEntityName, integerPropertyName1),
        column(namespace, referencedEntityName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has domain entity identity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyDocumentation: string = 'IntegerPropertyDocumentation';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const referencedEntityName: string = 'ReferencedDomainEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, integerPropertyDocumentation)
      .withIntegerIdentity(integerPropertyName2, integerPropertyDocumentation)
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withDomainEntityIdentity(referencedEntityName, 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referencedColumn1: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName1);
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn1)).toBe(integerPropertyDocumentation);

    const referencedColumn2: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn2)).toBe(integerPropertyDocumentation);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn1: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName1);
    expect(await columnExists(identityColumn1)).toBe(true);
    expect(await columnIsNullable(identityColumn1)).toBe(false);
    expect(await columnDataType(identityColumn1)).toBe(columnDataTypes.integer);

    const identityColumn2: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName2);
    expect(await columnExists(identityColumn2)).toBe(true);
    expect(await columnIsNullable(identityColumn2)).toBe(false);
    expect(await columnDataType(identityColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, integerPropertyName1), column(namespace, domainEntityName, integerPropertyName2)],
      [
        column(namespace, referencedEntityName, integerPropertyName1),
        column(namespace, referencedEntityName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when entity has nested domain entity identities', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';
  const referencedEntityName1: string = 'ReferencedEntityName1';
  const referencedEntityName2: string = 'ReferencedEntityName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(referencedEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withDomainEntityIdentity(referencedEntityName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName4, 'Documentation')
      .withDomainEntityIdentity(referencedEntityName2, 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referencedColumn1: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);

    const referencedColumn2: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);

    const referencedColumn3: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(referencedColumn3)).toBe(true);
    expect(await columnIsNullable(referencedColumn3)).toBe(false);
    expect(await columnDataType(referencedColumn3)).toBe(columnDataTypes.integer);

    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName4);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName3,
      integerPropertyName4,
    ]);
  });

  it('should have first referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName1))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn1: DatabaseColumn = column(namespace, referencedEntityName1, integerPropertyName1);
    expect(await columnExists(identityColumn1)).toBe(true);
    expect(await columnIsNullable(identityColumn1)).toBe(false);
    expect(await columnDataType(identityColumn1)).toBe(columnDataTypes.integer);

    const identityColumn2: DatabaseColumn = column(namespace, referencedEntityName1, integerPropertyName2);
    expect(await columnExists(identityColumn2)).toBe(true);
    expect(await columnIsNullable(identityColumn2)).toBe(false);
    expect(await columnDataType(identityColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have second referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName2))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referencedColumn1: DatabaseColumn = column(namespace, referencedEntityName2, integerPropertyName1);
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);

    const referencedColumn2: DatabaseColumn = column(namespace, referencedEntityName2, integerPropertyName2);
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);

    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName, integerPropertyName1),
        column(namespace, domainEntityName, integerPropertyName2),
        column(namespace, domainEntityName, integerPropertyName3),
      ],
      [
        column(namespace, referencedEntityName2, integerPropertyName1),
        column(namespace, referencedEntityName2, integerPropertyName2),
        column(namespace, referencedEntityName2, integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [
        column(namespace, referencedEntityName2, integerPropertyName1),
        column(namespace, referencedEntityName2, integerPropertyName2),
      ],
      [
        column(namespace, referencedEntityName1, integerPropertyName1),
        column(namespace, referencedEntityName1, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has collection domain entity property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityPropertyDocumentation1: string = 'DomainEntityPropertyDocumentation1';
  const domainEntityPropertyDocumentation2: string = 'DomainEntityPropertyDocumentation2';
  const integerPropertyDocumentation1: string = 'IntegerPropertyDocumentation1';
  const integerPropertyDocumentation2: string = 'IntegerPropertyDocumentation2';
  const integerPropertyDocumentation3: string = 'IntegerPropertyDocumentation3';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, integerPropertyDocumentation1)
      .withIntegerIdentity(integerPropertyName2, integerPropertyDocumentation2)
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, integerPropertyDocumentation3)
      .withDomainEntityProperty(referencedEntityName, domainEntityPropertyDocumentation1, false, true)
      .withDomainEntityProperty(referencedEntityName, domainEntityPropertyDocumentation2, true, true, false, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName3]);
  });

  it('should have referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const referencedColumn1: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName1);
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);

    const referencedColumn2: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName2);
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have first collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + referencedEntityName))).toBe(true);
    expect(await tableMSDescription(table(namespace, domainEntityName + referencedEntityName))).toBe(
      domainEntityPropertyDocumentation1,
    );
  });

  it('should have correct columns', async () => {
    const referencedColumn1: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName,
      integerPropertyName1,
    );
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn1)).toBe(integerPropertyDocumentation1);

    const referencedColumn2: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName,
      integerPropertyName2,
    );
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn2)).toBe(integerPropertyDocumentation2);

    const referencedColumn3: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName,
      integerPropertyName3,
    );
    expect(await columnExists(referencedColumn3)).toBe(true);
    expect(await columnIsNullable(referencedColumn3)).toBe(false);
    expect(await columnDataType(referencedColumn3)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn3)).toBe(integerPropertyDocumentation3);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + referencedEntityName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have second collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + contextName + referencedEntityName))).toBe(true);
    expect(await tableMSDescription(table(namespace, domainEntityName + contextName + referencedEntityName))).toBe(
      domainEntityPropertyDocumentation2,
    );
  });

  it('should have correct columns', async () => {
    const referencedColumn1: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + referencedEntityName,
      contextName + integerPropertyName1,
    );
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn1)).toBe(integerPropertyDocumentation1);

    const referencedColumn2: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + referencedEntityName,
      contextName + integerPropertyName2,
    );
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn2)).toBe(integerPropertyDocumentation2);

    const referencedColumn3: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + referencedEntityName,
      integerPropertyName3,
    );
    expect(await columnExists(referencedColumn3)).toBe(true);
    expect(await columnIsNullable(referencedColumn3)).toBe(false);
    expect(await columnDataType(referencedColumn3)).toBe(columnDataTypes.integer);
    expect(await columnMSDescription(referencedColumn3)).toBe(integerPropertyDocumentation3);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + contextName + referencedEntityName))).toEqual([
      contextName + integerPropertyName1,
      contextName + integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + referencedEntityName, integerPropertyName3)],
      [column(namespace, domainEntityName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName + referencedEntityName, integerPropertyName1),
        column(namespace, domainEntityName + referencedEntityName, integerPropertyName2),
      ],
      [
        column(namespace, referencedEntityName, integerPropertyName1),
        column(namespace, referencedEntityName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);

    const foreignKey3: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + referencedEntityName, integerPropertyName3)],
      [column(namespace, domainEntityName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey3)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(true);

    const foreignKey4: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName + contextName + referencedEntityName, contextName + integerPropertyName1),
        column(namespace, domainEntityName + contextName + referencedEntityName, contextName + integerPropertyName2),
      ],
      [
        column(namespace, referencedEntityName, integerPropertyName1),
        column(namespace, referencedEntityName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey4)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey4)).toBe(false);
  });
});

describe('when entity has collection domain entity that references domain entity with matching context name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const referencedEntityName1: string = 'ReferencedEntityName1';
  const referencedEntityName2: string = 'ReferencedEntityName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(referencedEntityName2)
      .withDocumentation('Documentation')
      .withDomainEntityIdentity(referencedEntityName1, 'Documentation', referencedEntityName1)
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityProperty(referencedEntityName2, 'Documentation', false, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName2]);
  });

  it('should have first referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName1))).toBe(true);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, referencedEntityName1, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName1))).toEqual([integerPropertyName1]);
  });

  it('should have second referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName2))).toBe(true);
  });

  it('should have referenced column', async () => {
    const referencedColumn: DatabaseColumn = column(
      namespace,
      referencedEntityName2,
      referencedEntityName1 + integerPropertyName1,
    );
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(false);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName2))).toEqual([
      referencedEntityName1 + integerPropertyName1,
    ]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + referencedEntityName2))).toBe(true);
  });

  it('should have referenced columns', async () => {
    const referencedColumn1: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName2,
      integerPropertyName2,
    );
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);

    const referencedColumn2: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName2,
      referencedEntityName1 + integerPropertyName1,
    );
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + referencedEntityName2))).toEqual([
      integerPropertyName2,
      referencedEntityName1 + integerPropertyName1,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + referencedEntityName2, referencedEntityName1 + integerPropertyName1)],
      [column(namespace, referencedEntityName2, referencedEntityName1 + integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + referencedEntityName2, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(true);

    const foreignKey3: DatabaseForeignKey = foreignKey(
      [column(namespace, referencedEntityName2, referencedEntityName1 + integerPropertyName1)],
      [column(namespace, referencedEntityName1, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey3)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(false);
  });
});

describe('when entity has domain entity property with shortened context', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const shortenTo: string = 'ShortenTo';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityProperty(referencedEntityName, 'Documentation', false, false)
      .withContext(referencedEntityName, shortenTo)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referencedColumn: DatabaseColumn = column(namespace, domainEntityName, shortenTo + integerPropertyName1);
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(true);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName2]);
  });

  it('should have first referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName))).toBe(true);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, referencedEntityName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName))).toEqual([integerPropertyName1]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, shortenTo + integerPropertyName1)],
      [column(namespace, referencedEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when entity has collection domain entity that references domain entity with shortened context name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const shortenTo: string = 'ShortenTo';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const referencedEntityName1: string = 'ReferencedEntityName1';
  const referencedEntityName2: string = 'ReferencedEntityName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(shortenTo + integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(referencedEntityName2 + shortenTo)
      .withDocumentation('Documentation')
      .withDomainEntityIdentity(referencedEntityName1, 'Documentation')
      .withContext(referencedEntityName1, shortenTo)
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityProperty(referencedEntityName2 + shortenTo, 'Documentation', false, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName2]);
  });

  it('should have first referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName1))).toBe(true);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, referencedEntityName1, shortenTo + integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName1))).toEqual([shortenTo + integerPropertyName1]);
  });

  it('should have second referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName2 + shortenTo))).toBe(true);
  });

  it('should have referenced column', async () => {
    const referencedColumn: DatabaseColumn = column(
      namespace,
      referencedEntityName2 + shortenTo,
      shortenTo + integerPropertyName1,
    );
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(false);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName2 + shortenTo))).toEqual([
      shortenTo + integerPropertyName1,
    ]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + referencedEntityName2 + shortenTo))).toBe(true);
  });

  it('should have referenced columns', async () => {
    const referencedColumn1: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName2 + shortenTo,
      integerPropertyName2,
    );
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);

    const referencedColumn2: DatabaseColumn = column(
      namespace,
      domainEntityName + referencedEntityName2 + shortenTo,
      shortenTo + integerPropertyName1,
    );
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + referencedEntityName2 + shortenTo))).toEqual([
      integerPropertyName2,
      shortenTo + integerPropertyName1,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + referencedEntityName2 + shortenTo, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + referencedEntityName2 + shortenTo, shortenTo + integerPropertyName1)],
      [column(namespace, referencedEntityName2 + shortenTo, shortenTo + integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);

    const foreignKey3: DatabaseForeignKey = foreignKey(
      [column(namespace, referencedEntityName2 + shortenTo, shortenTo + integerPropertyName1)],
      [column(namespace, referencedEntityName1, shortenTo + integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey3)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey3)).toBe(false);
  });
});

describe('when entity has reference to self', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withDomainEntityProperty(domainEntityName, 'Documentation', false, false, false, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referencedColumn: DatabaseColumn = column(namespace, domainEntityName, contextName + integerPropertyName);
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(true);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, contextName + integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when entity has reference to self', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withDomainEntityProperty(domainEntityName, 'Documentation', false, false, false, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referencedColumn: DatabaseColumn = column(namespace, domainEntityName, contextName + integerPropertyName);
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(true);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName, contextName + integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when entity has collection reference to self', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withDomainEntityProperty(domainEntityName, 'Documentation', false, true, false, contextName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have identity columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + contextName + domainEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + domainEntityName,
      contextName + integerPropertyName,
    );
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referencedColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + contextName + domainEntityName,
      integerPropertyName,
    );
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(false);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + contextName + domainEntityName))).toEqual([
      contextName + integerPropertyName,
      integerPropertyName,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + domainEntityName, integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + contextName + domainEntityName, contextName + integerPropertyName)],
      [column(namespace, domainEntityName, integerPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has identity collection reference with context and a collection property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const contextName: string = 'ContextName';
  const descriptorName: string = 'DescriptorName';
  const descriptorTableName: string = `${descriptorName}Descriptor`;
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityIdentity(referencedEntityName, 'Documentation', contextName)
      .withDescriptorProperty(descriptorName, 'Documentation', false, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referencedColumn: DatabaseColumn = column(namespace, domainEntityName, contextName + integerPropertyName1);
    expect(await columnExists(referencedColumn)).toBe(true);
    expect(await columnIsNullable(referencedColumn)).toBe(false);
    expect(await columnDataType(referencedColumn)).toBe(columnDataTypes.integer);

    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([
      contextName + integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + descriptorName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referencedColumn1: DatabaseColumn = column(
      namespace,
      domainEntityName + descriptorName,
      contextName + integerPropertyName1,
    );
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);
    expect(await columnDataType(referencedColumn1)).toBe(columnDataTypes.integer);

    const referencedColumn2: DatabaseColumn = column(namespace, domainEntityName + descriptorName, integerPropertyName2);
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
    expect(await columnDataType(referencedColumn2)).toBe(columnDataTypes.integer);

    const descriptorIdColumn: DatabaseColumn = column(namespace, domainEntityName + descriptorName, descriptorColumnName);
    expect(await columnExists(descriptorIdColumn)).toBe(true);
    expect(await columnIsNullable(descriptorIdColumn)).toBe(false);
    expect(await columnDataType(descriptorIdColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + descriptorName))).toEqual([
      contextName + integerPropertyName1,
      descriptorColumnName,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName + descriptorName, contextName + integerPropertyName1),
        column(namespace, domainEntityName + descriptorName, integerPropertyName2),
      ],
      [
        column(namespace, domainEntityName, contextName + integerPropertyName1),
        column(namespace, domainEntityName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + descriptorName, descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when entity has collection reference to entity that starts with the same name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const domainEntityName: string = 'DomainEntityName';
  const referencedEntityName: string = `${domainEntityName}ReferencedEntityName`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityProperty(referencedEntityName, 'Documentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + referencedEntityName))).toBe(true);
  });
});

describe('when entity has collection reference to entity that overlaps names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const domainEntityName: string = 'DomainEntityName';
  const referencedEntityName: string = `EntityNameReferencedEntityName`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityProperty(referencedEntityName, 'Documentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + referencedEntityName))).toBe(true);
  });
});

describe('when entity has referenced entity with matching context name and properties that start with same name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const referencedEntityName: string = `ReferencedEntityName`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', true, false)
      .withEndCommon()

      .withStartDomainEntity(referencedEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(referencedEntityName + integerPropertyName2, 'Documentation')
      .withIntegerIdentity(referencedEntityName + integerPropertyName3, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName4, 'Documentation')
      .withDomainEntityIdentity(referencedEntityName, 'Documentation', referencedEntityName)
      .withCommonProperty(commonName, 'Documentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName4);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);

    const referencedColumn1: DatabaseColumn = column(
      namespace,
      domainEntityName,
      referencedEntityName + integerPropertyName2,
    );
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);

    const referencedColumn2: DatabaseColumn = column(
      namespace,
      domainEntityName,
      referencedEntityName + integerPropertyName3,
    );
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([
      integerPropertyName4,
      referencedEntityName + integerPropertyName2,
      referencedEntityName + integerPropertyName3,
    ]);
  });

  it('should have referenced entity table', async () => {
    expect(await tableExists(table(namespace, referencedEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn1: DatabaseColumn = column(
      namespace,
      referencedEntityName,
      referencedEntityName + integerPropertyName2,
    );
    expect(await columnExists(identityColumn1)).toBe(true);
    expect(await columnIsNullable(identityColumn1)).toBe(false);

    const identityColumn2: DatabaseColumn = column(
      namespace,
      referencedEntityName,
      referencedEntityName + integerPropertyName3,
    );
    expect(await columnExists(identityColumn2)).toBe(true);
    expect(await columnIsNullable(identityColumn2)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, referencedEntityName))).toEqual([
      referencedEntityName + integerPropertyName2,
      referencedEntityName + integerPropertyName3,
    ]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + commonName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referencedColumn1: DatabaseColumn = column(namespace, domainEntityName + commonName, integerPropertyName4);
    expect(await columnExists(referencedColumn1)).toBe(true);
    expect(await columnIsNullable(referencedColumn1)).toBe(false);

    const referencedColumn2: DatabaseColumn = column(
      namespace,
      domainEntityName + commonName,
      referencedEntityName + integerPropertyName2,
    );
    expect(await columnExists(referencedColumn2)).toBe(true);
    expect(await columnIsNullable(referencedColumn2)).toBe(false);

    const referencedColumn3: DatabaseColumn = column(
      namespace,
      domainEntityName + commonName,
      referencedEntityName + integerPropertyName3,
    );
    expect(await columnExists(referencedColumn3)).toBe(true);
    expect(await columnIsNullable(referencedColumn3)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + commonName))).toEqual([
      integerPropertyName4,
      referencedEntityName + integerPropertyName2,
      referencedEntityName + integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName, referencedEntityName + integerPropertyName2),
        column(namespace, domainEntityName, referencedEntityName + integerPropertyName3),
      ],
      [
        column(namespace, referencedEntityName, referencedEntityName + integerPropertyName2),
        column(namespace, referencedEntityName, referencedEntityName + integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [
        column(namespace, domainEntityName + commonName, integerPropertyName4),
        column(namespace, domainEntityName + commonName, referencedEntityName + integerPropertyName2),
        column(namespace, domainEntityName + commonName, referencedEntityName + integerPropertyName3),
      ],
      [
        column(namespace, domainEntityName, integerPropertyName4),
        column(namespace, domainEntityName, referencedEntityName + integerPropertyName2),
        column(namespace, domainEntityName, referencedEntityName + integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(true);
  });
});
