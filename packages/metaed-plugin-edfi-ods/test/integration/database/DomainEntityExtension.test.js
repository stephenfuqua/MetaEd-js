// @flow
import {
  CommonBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
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

describe('when domain entity extension has multiple properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityExtensionName: string = `${domainEntityName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartDomainEntityExtension(domainEntityName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withIntegerProperty(integerPropertyName4, 'Documentation', false, true)
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

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

  it('should have domain entity extension table', async () => {
    expect(await tableExists(table(extension, domainEntityExtensionName))).toBe(true);
  });

  it('should have domain entity extension column', async () => {
    expect(await columnExists(column(extension, domainEntityExtensionName, integerPropertyName3))).toBe(true);
  });

  it('should have domain entity primary keys as domain entity extension primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityExtensionName))).toEqual([integerPropertyName1]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityExtensionName, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should not have standard resource columns', async () => {
    expect(await columnExists(column(extension, domainEntityExtensionName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityExtensionName, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityExtensionName, 'CreateDate'))).toBe(false);
  });

  it('should have common table', async () => {
    expect(await tableExists(table(extension, domainEntityName + commonName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn1: DatabaseColumn = column(extension, domainEntityName + commonName, integerPropertyName1);
    expect(await columnExists(referenceColumn1)).toBe(true);
    expect(await columnIsNullable(referenceColumn1)).toBe(false);
    expect(await columnDataType(referenceColumn1)).toBe(columnDataTypes.integer);

    const referenceColumn2: DatabaseColumn = column(extension, domainEntityName + commonName, integerPropertyName2);
    expect(await columnExists(referenceColumn2)).toBe(true);
    expect(await columnIsNullable(referenceColumn2)).toBe(false);
    expect(await columnDataType(referenceColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + commonName, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + commonName, 'LastModifiedDate'))).toBe(false);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(extension, domainEntityName + integerPropertyName4))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn1: DatabaseColumn = column(
      extension,
      domainEntityName + integerPropertyName4,
      integerPropertyName1,
    );
    expect(await columnExists(referenceColumn1)).toBe(true);
    expect(await columnIsNullable(referenceColumn1)).toBe(false);
    expect(await columnDataType(referenceColumn1)).toBe(columnDataTypes.integer);

    const referenceColumn2: DatabaseColumn = column(
      extension,
      domainEntityName + integerPropertyName4,
      integerPropertyName4,
    );
    expect(await columnExists(referenceColumn2)).toBe(true);
    expect(await columnIsNullable(referenceColumn2)).toBe(false);
    expect(await columnDataType(referenceColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + integerPropertyName4))).toEqual([
      integerPropertyName1,
      integerPropertyName4,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + integerPropertyName4, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName4, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName4, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName4, 'LastModifiedDate'))).toBe(false);
  });
});

describe('when domain entity extension has optional collection property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityExtensionName: string = `${domainEntityName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withBeginNamespace(extension)
      .withStartDomainEntityExtension(domainEntityName)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

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

  it('should not have domain entity extension table', async () => {
    expect(await tableExists(table(extension, domainEntityExtensionName))).toBe(false);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(extension, domainEntityName + integerPropertyName2))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn: DatabaseColumn = column(extension, domainEntityName + integerPropertyName2, integerPropertyName1);
    expect(await columnExists(referenceColumn)).toBe(true);
    expect(await columnIsNullable(referenceColumn)).toBe(false);
    expect(await columnDataType(referenceColumn)).toBe(columnDataTypes.integer);

    const collectionColumn: DatabaseColumn = column(
      extension,
      domainEntityName + integerPropertyName2,
      integerPropertyName2,
    );
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
    expect(await columnDataType(collectionColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + integerPropertyName2))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + integerPropertyName2, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName2, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName2, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName2, 'LastModifiedDate'))).toBe(false);
  });
});

describe('when domain entity extension has required collection property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityExtensionName: string = `${domainEntityName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withBeginNamespace(extension)
      .withStartDomainEntityExtension(domainEntityName)
      .withIntegerProperty(integerPropertyName2, 'Documentation', true, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

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

  it('should not have domain entity extension table', async () => {
    expect(await tableExists(table(extension, domainEntityExtensionName))).toBe(false);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(extension, domainEntityName + integerPropertyName2))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn: DatabaseColumn = column(extension, domainEntityName + integerPropertyName2, integerPropertyName1);
    expect(await columnExists(referenceColumn)).toBe(true);
    expect(await columnIsNullable(referenceColumn)).toBe(false);
    expect(await columnDataType(referenceColumn)).toBe(columnDataTypes.integer);

    const collectionColumn: DatabaseColumn = column(
      extension,
      domainEntityName + integerPropertyName2,
      integerPropertyName2,
    );
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
    expect(await columnDataType(collectionColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + integerPropertyName2))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + integerPropertyName2, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName2, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName2, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + integerPropertyName2, 'LastModifiedDate'))).toBe(false);
  });
});

describe('when domain entity extension has multiple common properties', () => {
  const metaEd: MetaEdEnvironment = { ...newMetaEdEnvironment(), dataStandardVersion: '3.0.0' };
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const commonName1: string = 'CommonName1';
  const commonName2: string = 'CommonName2';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityExtensionName: string = `${domainEntityName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartCommon(commonName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndCommon()

      .withStartCommon(commonName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withEndCommon()

      .withStartDomainEntityExtension(domainEntityName)
      .withCommonProperty(commonName1, 'Documentation', false, false)
      .withCommonProperty(commonName2, 'Documentation', false, true)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []));

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

  it('should not have domain entity extension table', async () => {
    expect(await tableExists(table(extension, domainEntityExtensionName))).toBe(false);
  });

  it('should have common table', async () => {
    expect(await tableExists(table(extension, domainEntityName + commonName1))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn1: DatabaseColumn = column(extension, domainEntityName + commonName1, integerPropertyName1);
    expect(await columnExists(referenceColumn1)).toBe(true);
    expect(await columnIsNullable(referenceColumn1)).toBe(false);
    expect(await columnDataType(referenceColumn1)).toBe(columnDataTypes.integer);

    const referenceColumn2: DatabaseColumn = column(extension, domainEntityName + commonName1, integerPropertyName2);
    expect(await columnExists(referenceColumn2)).toBe(true);
    expect(await columnIsNullable(referenceColumn2)).toBe(false);
    expect(await columnDataType(referenceColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + commonName1))).toEqual([integerPropertyName1]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + commonName1, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName1, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName1, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + commonName1, 'LastModifiedDate'))).toBe(false);
  });

  it('should have common collection table', async () => {
    expect(await tableExists(table(extension, domainEntityName + commonName2))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn1: DatabaseColumn = column(extension, domainEntityName + commonName2, integerPropertyName1);
    expect(await columnExists(referenceColumn1)).toBe(true);
    expect(await columnIsNullable(referenceColumn1)).toBe(false);
    expect(await columnDataType(referenceColumn1)).toBe(columnDataTypes.integer);

    const referenceColumn3: DatabaseColumn = column(extension, domainEntityName + commonName2, integerPropertyName3);
    expect(await columnExists(referenceColumn3)).toBe(true);
    expect(await columnIsNullable(referenceColumn3)).toBe(false);
    expect(await columnDataType(referenceColumn3)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + commonName2))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + commonName2, integerPropertyName1)],
      [column(namespace, domainEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName2, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName2, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + commonName2, 'LastModifiedDate'))).toBe(false);
  });
});
