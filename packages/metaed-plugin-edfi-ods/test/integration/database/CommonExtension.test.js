// @flow
import {
  AssociationBuilder,
  AssociationExtensionBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
  CommonBuilder,
  CommonExtensionBuilder,
  MetaEdTextBuilder,
  NamespaceInfoBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { column, foreignKey, table, testTearDown, columnDataTypes, enhanceGenerateAndExecuteSql } from './DatabaseTestBase';
import { columnExists, columnIsNullable, columnDataType, columnDefaultConstraint } from './DatabaseColumn';
import { foreignKeyDeleteCascades, foreignKeyExists } from './DatabaseForeignKey';
import { tableExists, tablePrimaryKeys } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';

describe('when common extension is a required property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const commonExtensionName: string = `${domainEntityName + commonName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartCommonExtension(commonName)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndCommonExtension()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(extension, domainEntityName))).toBe(true);
  });

  it('should have join table', async () => {
    expect(await tableExists(table(extension, domainEntityName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const identityColumn: DatabaseColumn = column(extension, domainEntityName + commonName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + commonName, integerPropertyName3)],
      [column(extension, domainEntityName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date resource column', async () => {
    const createDateColumn: DatabaseColumn = column(extension, domainEntityName + commonName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have id and last modified date resource columns', async () => {
    expect(await columnExists(column(extension, domainEntityName + commonName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, domainEntityName + commonName, 'LastModifiedDate'))).toBe(false);
  });

  it('should have common extension table', async () => {
    expect(await tableExists(table(extension, commonExtensionName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, commonExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
    ]);
  });

  it('should have extension property', async () => {
    const collectionColumn: DatabaseColumn = column(extension, commonExtensionName, integerPropertyName2);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(true);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, commonExtensionName, integerPropertyName1),
        column(extension, commonExtensionName, integerPropertyName3),
      ],
      [
        column(extension, domainEntityName + commonName, integerPropertyName1),
        column(extension, domainEntityName + commonName, integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have no resource columns', async () => {
    expect(await columnExists(column(extension, commonExtensionName, 'CreateDate'))).toBe(false);
    expect(await columnExists(column(extension, commonExtensionName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, commonExtensionName, 'LastModifiedDate'))).toBe(false);
  });
});

describe('when common extension is a required property on association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const commonName: string = 'CommonName';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const commonExtensionName: string = `${associationName + commonName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartCommonExtension(commonName)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndCommonExtension()

      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName4, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(extension, associationName))).toBe(true);
  });

  it('should have join table', async () => {
    expect(await tableExists(table(extension, associationName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const identityColumn: DatabaseColumn = column(extension, associationName + commonName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
      integerPropertyName4,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationName + commonName, integerPropertyName3),
        column(extension, associationName + commonName, integerPropertyName4),
      ],
      [column(extension, associationName, integerPropertyName3), column(extension, associationName, integerPropertyName4)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date resource column', async () => {
    const createDateColumn: DatabaseColumn = column(extension, associationName + commonName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have id and last modified date resource columns', async () => {
    expect(await columnExists(column(extension, associationName + commonName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, associationName + commonName, 'LastModifiedDate'))).toBe(false);
  });

  it('should have common extension table', async () => {
    expect(await tableExists(table(extension, commonExtensionName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, commonExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
      integerPropertyName4,
    ]);
  });

  it('should have extension property', async () => {
    const collectionColumn: DatabaseColumn = column(extension, commonExtensionName, integerPropertyName2);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(true);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, commonExtensionName, integerPropertyName1),
        column(extension, commonExtensionName, integerPropertyName3),
      ],
      [
        column(extension, associationName + commonName, integerPropertyName1),
        column(extension, associationName + commonName, integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have no resource columns', async () => {
    expect(await columnExists(column(extension, commonExtensionName, 'CreateDate'))).toBe(false);
    expect(await columnExists(column(extension, commonExtensionName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, commonExtensionName, 'LastModifiedDate'))).toBe(false);
  });
});

describe('when common extension is a required property on association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const commonName: string = 'CommonName';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const commonExtensionName: string = `${associationName + commonName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartCommonExtension(commonName)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndCommonExtension()

      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName4, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(extension, associationName))).toBe(true);
  });

  it('should have join table', async () => {
    expect(await tableExists(table(extension, associationName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const identityColumn: DatabaseColumn = column(extension, associationName + commonName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
      integerPropertyName4,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationName + commonName, integerPropertyName3),
        column(extension, associationName + commonName, integerPropertyName4),
      ],
      [column(extension, associationName, integerPropertyName3), column(extension, associationName, integerPropertyName4)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date resource column', async () => {
    const createDateColumn: DatabaseColumn = column(extension, associationName + commonName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have id and last modified date resource columns', async () => {
    expect(await columnExists(column(extension, associationName + commonName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, associationName + commonName, 'LastModifiedDate'))).toBe(false);
  });

  it('should have common extension table', async () => {
    expect(await tableExists(table(extension, commonExtensionName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, commonExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
      integerPropertyName4,
    ]);
  });

  it('should have extension property', async () => {
    const collectionColumn: DatabaseColumn = column(extension, commonExtensionName, integerPropertyName2);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(true);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, commonExtensionName, integerPropertyName1),
        column(extension, commonExtensionName, integerPropertyName3),
      ],
      [
        column(extension, associationName + commonName, integerPropertyName1),
        column(extension, associationName + commonName, integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have no resource columns', async () => {
    expect(await columnExists(column(extension, commonExtensionName, 'CreateDate'))).toBe(false);
    expect(await columnExists(column(extension, commonExtensionName, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, commonExtensionName, 'LastModifiedDate'))).toBe(false);
  });
});

describe('when common extension is a required property on domain entity extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityExtensionName: string = `${domainEntityName}Extension`;
  const commonExtensionName: string = `${domainEntityName + commonName}Extension`;
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

      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartDomainEntityExtension(domainEntityName)
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndDomainEntityExtension()

      .withStartCommonExtension(commonName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndCommonExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have domain entity extension table', async () => {
    expect(await tableExists(table(extension, domainEntityExtensionName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
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

  it('should have common table', async () => {
    expect(await tableExists(table(extension, domainEntityName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const identityColumn: DatabaseColumn = column(extension, domainEntityName + commonName, integerPropertyName2);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
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

  it('should have common extension table', async () => {
    expect(await tableExists(table(extension, commonExtensionName))).toBe(true);
  });

  it('should have common extension property', async () => {
    const optionalColumn: DatabaseColumn = column(extension, commonExtensionName, integerPropertyName3);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, commonExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, commonExtensionName, integerPropertyName1)],
      [column(extension, domainEntityName + commonName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when common extension is a required property on association extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = `${associationName}Extension`;
  const commonName: string = 'CommonName';
  const commonExtensionName: string = `${associationName + commonName}Extension`;
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';
  const integerPropertyName5: string = 'IntegerPropertyName5';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndCommon()

      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withIntegerProperty(integerPropertyName4, 'Documentation', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartAssociationExtension(associationName)
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndAssociationExtension()

      .withStartCommonExtension(commonName)
      .withIntegerProperty(integerPropertyName5, 'Documentation', false, false)
      .withEndCommonExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(namespace, associationName))).toBe(true);
  });

  it('should have association extension table', async () => {
    expect(await tableExists(table(extension, associationExtensionName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, associationExtensionName))).toEqual([
      integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationExtensionName, integerPropertyName2),
        column(extension, associationExtensionName, integerPropertyName3),
      ],
      [column(namespace, associationName, integerPropertyName2), column(namespace, associationName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have common table', async () => {
    expect(await tableExists(table(extension, associationName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const identityColumn: DatabaseColumn = column(extension, associationName + commonName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationName + commonName, integerPropertyName2),
        column(extension, associationName + commonName, integerPropertyName3),
      ],
      [column(namespace, associationName, integerPropertyName2), column(namespace, associationName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have common extension table', async () => {
    expect(await tableExists(table(extension, commonExtensionName))).toBe(true);
  });

  it('should have common extension property', async () => {
    const optionalColumn: DatabaseColumn = column(extension, commonExtensionName, integerPropertyName5);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, commonExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, commonExtensionName, integerPropertyName1),
        column(extension, commonExtensionName, integerPropertyName2),
        column(extension, commonExtensionName, integerPropertyName3),
      ],
      [
        column(extension, associationName + commonName, integerPropertyName1),
        column(extension, associationName + commonName, integerPropertyName2),
        column(extension, associationName + commonName, integerPropertyName3),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when common extension is a required common override property on domain entity extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntityExtensionName: string = `${domainEntityName}Extension`;
  const commonExtensionName: string = `${domainEntityName + commonName}Extension`;
  const integerPropertyName2: string = 'IntegerPropertyName1';
  const integerPropertyName1: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndCommon()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartDomainEntityExtension(domainEntityName)
      .withCommonExtensionOverrideProperty(commonName, 'Documentation', true, false)
      .withEndDomainEntityExtension()

      .withStartCommonExtension(commonName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndCommonExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have domain entity extension table', async () => {
    expect(await tableExists(table(extension, domainEntityExtensionName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityExtensionName))).toEqual([integerPropertyName2]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityExtensionName, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have common table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName + commonName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + commonName))).toEqual([
      integerPropertyName2,
      integerPropertyName1,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + commonName, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have common extension table', async () => {
    expect(await tableExists(table(extension, commonExtensionName))).toBe(true);
  });

  it('should have common extension property', async () => {
    const optionalColumn: DatabaseColumn = column(extension, commonExtensionName, integerPropertyName3);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, commonExtensionName))).toEqual([
      integerPropertyName2,
      integerPropertyName1,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, commonExtensionName, integerPropertyName2)],
      [column(namespace, domainEntityName + commonName, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});
