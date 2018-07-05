// @flow
import {
  AssociationBuilder,
  AssociationExtensionBuilder,
  CommonBuilder,
  DomainEntityBuilder,
  MetaEdTextBuilder,
  NamespaceBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { column, columnDataTypes, enhanceGenerateAndExecuteSql, foreignKey, table, testTearDown } from './DatabaseTestBase';
import { columnExists, columnIsNullable, columnDataType, columnDefaultConstraint } from './DatabaseColumn';
import { foreignKeyDeleteCascades, foreignKeyExists } from './DatabaseForeignKey';
import { tableExists, tablePrimaryKeys } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';

jest.setTimeout(40000);

describe('when association extension has a single property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = `${associationName}Extension`;
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartAssociationExtension(associationName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get(namespaceName);
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get(extension);
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);
    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(namespaceName, associationName))).toBe(true);
  });

  it('should have association extension table', async () => {
    expect(await tableExists(table(extension, associationExtensionName))).toBe(true);
  });

  it('should have association extension column', async () => {
    expect(await columnExists(column(extension, associationExtensionName, integerPropertyName3))).toBe(true);
  });

  it('should have domain entity primary keys as association extension primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, associationExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationExtensionName, integerPropertyName1),
        column(extension, associationExtensionName, integerPropertyName2),
      ],
      [
        column(namespaceName, associationName, integerPropertyName1),
        column(namespaceName, associationName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have standard resource columns on association', async () => {
    const idColumn: DatabaseColumn = column(namespaceName, associationName, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(namespaceName, associationName, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.datetime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(namespaceName, associationName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.datetime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have standard resource columns on association extension', async () => {
    expect(await columnExists(column(namespaceName, associationExtensionName, 'Id'))).toBe(false);
    expect(await columnExists(column(namespaceName, associationExtensionName, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(namespaceName, associationExtensionName, 'CreateDate'))).toBe(false);
  });
});

describe('when association extension has a required property and a collection', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = `${associationName}Extension`;
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartAssociationExtension(associationName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', true, false)
      .withIntegerProperty(integerPropertyName4, 'Documentation', false, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get(namespaceName);
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get(extension);
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);
    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(namespaceName, associationName))).toBe(true);
  });

  it('should have association extension table', async () => {
    expect(await tableExists(table(extension, associationExtensionName))).toBe(true);
  });

  it('should have association extension column', async () => {
    expect(await columnExists(column(extension, associationExtensionName, integerPropertyName3))).toBe(true);
  });

  it('should have domain entity primary keys as association extension primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, associationExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship from association extension to association', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationExtensionName, integerPropertyName1),
        column(extension, associationExtensionName, integerPropertyName2),
      ],
      [
        column(namespaceName, associationName, integerPropertyName1),
        column(namespaceName, associationName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(extension, associationName + integerPropertyName4))).toBe(true);
  });

  it('should have domain entity primary keys as collection table primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + integerPropertyName4))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName4,
    ]);
  });

  it('should have correct foreign key relationship from collection table to association', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationName + integerPropertyName4, integerPropertyName1),
        column(extension, associationName + integerPropertyName4, integerPropertyName2),
      ],
      [
        column(namespaceName, associationName, integerPropertyName1),
        column(namespaceName, associationName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
  it('should only have create date column on collection table', async () => {
    expect(await columnExists(column(extension, associationName + integerPropertyName4, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, associationName + integerPropertyName4, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(extension, associationName + integerPropertyName4, 'CreateDate'))).toBe(true);
  });
});

describe('when association extension only has a collection', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = `${associationName}Extension`;
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartAssociationExtension(associationName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', true, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get(namespaceName);
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get(extension);
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(namespaceName, associationName))).toBe(true);
  });

  it('should not have association extension table', async () => {
    expect(await tableExists(table(extension, associationExtensionName))).toBe(false);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(extension, associationName + integerPropertyName3))).toBe(true);
  });

  it('should have collection column', async () => {
    expect(await columnExists(column(extension, associationName + integerPropertyName3, integerPropertyName3))).toBe(true);
  });

  it('should have domain entity primary keys as collection table primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + integerPropertyName3))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship from collection table to association', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationName + integerPropertyName3, integerPropertyName1),
        column(extension, associationName + integerPropertyName3, integerPropertyName2),
      ],
      [
        column(namespaceName, associationName, integerPropertyName1),
        column(namespaceName, associationName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when association extension has a reference property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const extension: string = 'extension';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = `${associationName}Extension`;
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const domainEntityName3: string = 'DomainEntityName3';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName3)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartAssociationExtension(associationName)
      .withDomainEntityProperty(domainEntityName3, 'Documentation', false, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get(namespaceName);
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get(extension);
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(namespaceName, associationName))).toBe(true);
  });

  it('should have association extension table', async () => {
    expect(await tableExists(table(extension, associationExtensionName))).toBe(true);
  });

  it('should have association extension column', async () => {
    expect(await columnExists(column(extension, associationExtensionName, integerPropertyName3))).toBe(true);
  });

  it('should have domain entity primary keys as association extension primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, associationExtensionName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [
        column(extension, associationExtensionName, integerPropertyName1),
        column(extension, associationExtensionName, integerPropertyName2),
      ],
      [
        column(namespaceName, associationName, integerPropertyName1),
        column(namespaceName, associationName, integerPropertyName2),
      ],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when association extension has multiple common properties', () => {
  const metaEd: MetaEdEnvironment = { ...newMetaEdEnvironment(), dataStandardVersion: '3.0.0' };
  const namespaceName: string = 'namespace';
  const extension: string = 'extension';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const commonName1: string = 'CommonName1';
  const commonName2: string = 'CommonName2';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = `${associationName}Extension`;
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withEndDomainEntity()

      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withAssociationDomainEntityProperty(domainEntityName1, 'Documentation')
      .withAssociationDomainEntityProperty(domainEntityName2, 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartCommon(commonName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withEndCommon()

      .withStartCommon(commonName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName4, 'Documentation')
      .withEndCommon()

      .withStartAssociationExtension(associationName)
      .withCommonProperty(commonName1, 'Documentation', false, false)
      .withCommonProperty(commonName2, 'Documentation', false, true)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get(namespaceName);
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get(extension);
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have association table', async () => {
    expect(await tableExists(table(namespaceName, associationName))).toBe(true);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(namespaceName, associationName, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(namespaceName, associationName, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.datetime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(namespaceName, associationName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.datetime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should not have association extension table', async () => {
    expect(await tableExists(table(extension, associationExtensionName))).toBe(false);
  });

  it('should have common table', async () => {
    expect(await tableExists(table(extension, associationName + commonName1))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn1: DatabaseColumn = column(extension, associationName + commonName1, integerPropertyName1);
    expect(await columnExists(referenceColumn1)).toBe(true);
    expect(await columnIsNullable(referenceColumn1)).toBe(false);
    expect(await columnDataType(referenceColumn1)).toBe(columnDataTypes.integer);

    const referenceColumn2: DatabaseColumn = column(extension, associationName + commonName1, integerPropertyName2);
    expect(await columnExists(referenceColumn2)).toBe(true);
    expect(await columnIsNullable(referenceColumn2)).toBe(false);
    expect(await columnDataType(referenceColumn2)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + commonName1))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, associationName + commonName1, integerPropertyName1)],
      [column(namespaceName, associationName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, associationName + commonName1, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, associationName + commonName1, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, associationName + commonName1, 'LastModifiedDate'))).toBe(false);
  });

  it('should have common collection table', async () => {
    expect(await tableExists(table(extension, associationName + commonName2))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn1: DatabaseColumn = column(extension, associationName + commonName2, integerPropertyName1);
    expect(await columnExists(referenceColumn1)).toBe(true);
    expect(await columnIsNullable(referenceColumn1)).toBe(false);
    expect(await columnDataType(referenceColumn1)).toBe(columnDataTypes.integer);

    const referenceColumn3: DatabaseColumn = column(extension, associationName + commonName2, integerPropertyName4);
    expect(await columnExists(referenceColumn3)).toBe(true);
    expect(await columnIsNullable(referenceColumn3)).toBe(false);
    expect(await columnDataType(referenceColumn3)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, associationName + commonName2))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
      integerPropertyName4,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, associationName + commonName2, integerPropertyName1)],
      [column(namespaceName, associationName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });

  it('should have create date column', async () => {
    expect(await columnExists(column(extension, associationName + commonName2, 'CreateDate'))).toBe(true);
  });

  it('should not have id and last modified data columns', async () => {
    expect(await columnExists(column(extension, associationName + commonName2, 'Id'))).toBe(false);
    expect(await columnExists(column(extension, associationName + commonName2, 'LastModifiedDate'))).toBe(false);
  });
});
