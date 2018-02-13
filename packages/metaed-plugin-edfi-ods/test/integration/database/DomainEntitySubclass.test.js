// @flow
import {
  DomainEntityBuilder,
  DomainEntitySubclassBuilder,
  MetaEdTextBuilder,
  NamespaceInfoBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { column, columnDataTypes, enhanceGenerateAndExecuteSql, foreignKey, table, testTearDown } from './DatabaseTestBase';
import { columnExists, columnIsNullable, columnDataType, columnDefaultConstraint } from './DatabaseColumn';
import { foreignKeyDeleteCascades, foreignKeyExists } from './DatabaseForeignKey';
import { tableExists, tablePrimaryKeys } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';

describe('when core domain entity subclass has identity rename property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentityRename(integerPropertyName2, integerPropertyName1, 'Documentation')
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(namespace, domainEntityName, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(namespace, domainEntityName, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(namespace, domainEntityName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should have domain entity subclass table', async () => {
    expect(await tableExists(table(namespace, domainEntitySubclassName))).toBe(true);
  });

  it('should have domain entity subclass column', async () => {
    expect(await columnExists(column(namespace, domainEntitySubclassName, integerPropertyName2))).toBe(true);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntitySubclassName))).toEqual([integerPropertyName2]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntitySubclassName, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should not have standard resource columns', async () => {
    expect(await columnExists(column(namespace, domainEntitySubclassName, 'Id'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntitySubclassName, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntitySubclassName, 'CreateDate'))).toBe(false);
  });
});

describe('when extension domain entity subclasses core domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentityRename(integerPropertyName2, integerPropertyName1, 'Documentation')
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(namespace, domainEntityName, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(namespace, domainEntityName, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(namespace, domainEntityName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should have domain entity subclass table', async () => {
    expect(await tableExists(table(extension, domainEntitySubclassName))).toBe(true);
  });

  it('should have domain entity subclass column', async () => {
    expect(await columnExists(column(extension, domainEntitySubclassName, integerPropertyName2))).toBe(true);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntitySubclassName))).toEqual([integerPropertyName2]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntitySubclassName, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should not have standard resource columns', async () => {
    expect(await columnExists(column(extension, domainEntitySubclassName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntitySubclassName, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(extension, domainEntitySubclassName, 'CreateDate'))).toBe(false);
  });
});

describe('when extension domain entity subclasses extension domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const extension: string = 'extension';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(extension)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentityRename(integerPropertyName2, integerPropertyName1, 'Documentation')
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(extension, domainEntityName))).toBe(true);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(extension, domainEntityName, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(extension, domainEntityName, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(extension, domainEntityName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should have domain entity subclass table', async () => {
    expect(await tableExists(table(extension, domainEntitySubclassName))).toBe(true);
  });

  it('should have domain entity subclass column', async () => {
    expect(await columnExists(column(extension, domainEntitySubclassName, integerPropertyName2))).toBe(true);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntitySubclassName))).toEqual([integerPropertyName2]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntitySubclassName, integerPropertyName2)],
      [column(extension, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should not have standard resource columns', async () => {
    expect(await columnExists(column(extension, domainEntitySubclassName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntitySubclassName, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(extension, domainEntitySubclassName, 'CreateDate'))).toBe(false);
  });
});
