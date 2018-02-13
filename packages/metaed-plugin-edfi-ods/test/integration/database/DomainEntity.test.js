// @flow
import {
  CommonBuilder,
  DescriptorBuilder,
  DomainEntityBuilder,
  DomainEntitySubclassBuilder,
  MetaEdTextBuilder,
  NamespaceInfoBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { column, columnDataTypes, enhanceGenerateAndExecuteSql, foreignKey, table, testTearDown } from './DatabaseTestBase';
import { columnExists, columnIsNullable, columnDataType, columnDefaultConstraint, columnLength } from './DatabaseColumn';
import { foreignKeyDeleteCascades, foreignKeyExists } from './DatabaseForeignKey';
import { tableExists, tablePrimaryKeys } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';

describe('when creating extension domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withDomainEntityProperty(domainEntityName1, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have core domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName1))).toBe(true);
  });

  it('should have correct column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, domainEntityName1, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName1))).toEqual([integerPropertyName1]);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(namespace, domainEntityName1, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(namespace, domainEntityName1, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(namespace, domainEntityName1, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should have extension domain entity table', async () => {
    expect(await tableExists(table(extension, domainEntityName2))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn: DatabaseColumn = column(extension, domainEntityName2, integerPropertyName2);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const referenceColumn: DatabaseColumn = column(extension, domainEntityName2, integerPropertyName1);
    expect(await columnExists(referenceColumn)).toBe(true);
    expect(await columnIsNullable(referenceColumn)).toBe(false);
    expect(await columnDataType(referenceColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName2))).toEqual([integerPropertyName2]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName2, integerPropertyName1)],
      [column(namespace, domainEntityName1, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(extension, domainEntityName2, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(extension, domainEntityName2, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(extension, domainEntityName2, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });
});

describe('when creating domain entity based on abstract entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const abstractEntityName: string = 'AbstractEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartAbstractEntity(abstractEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndAbstractEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, abstractEntityName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false)
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have abstract entity table', async () => {
    expect(await tableExists(table(namespace, abstractEntityName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const identityColumn: DatabaseColumn = column(namespace, abstractEntityName, integerPropertyName1);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);

    const optionalColumn: DatabaseColumn = column(namespace, abstractEntityName, integerPropertyName2);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);
    expect(await columnDataType(optionalColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, abstractEntityName))).toEqual([integerPropertyName1]);
  });

  it('should have standard resource columns', async () => {
    const idColumn: DatabaseColumn = column(namespace, abstractEntityName, 'Id');
    expect(await columnExists(idColumn)).toBe(true);
    expect(await columnIsNullable(idColumn)).toBe(false);
    expect(await columnDataType(idColumn)).toBe(columnDataTypes.uniqueIdentifier);
    expect(await columnDefaultConstraint(idColumn)).toBe('(newid())');

    const lastModifiedDateColumn: DatabaseColumn = column(namespace, abstractEntityName, 'LastModifiedDate');
    expect(await columnExists(lastModifiedDateColumn)).toBe(true);
    expect(await columnIsNullable(lastModifiedDateColumn)).toBe(false);
    expect(await columnDataType(lastModifiedDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(lastModifiedDateColumn)).toBe('(getdate())');

    const createDateColumn: DatabaseColumn = column(namespace, abstractEntityName, 'CreateDate');
    expect(await columnExists(createDateColumn)).toBe(true);
    expect(await columnIsNullable(createDateColumn)).toBe(false);
    expect(await columnDataType(createDateColumn)).toBe(columnDataTypes.dateTime);
    expect(await columnDefaultConstraint(createDateColumn)).toBe('(getdate())');
  });

  it('should have subclass table', async () => {
    expect(await tableExists(table(namespace, domainEntitySubclassName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn: DatabaseColumn = column(namespace, domainEntitySubclassName, integerPropertyName1);
    expect(await columnExists(referenceColumn)).toBe(true);
    expect(await columnIsNullable(referenceColumn)).toBe(false);
    expect(await columnDataType(referenceColumn)).toBe(columnDataTypes.integer);

    const optionalColumn: DatabaseColumn = column(namespace, domainEntitySubclassName, integerPropertyName3);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);
    expect(await columnDataType(optionalColumn)).toBe(columnDataTypes.integer);
  });

  it('should not have standard resource columns', async () => {
    expect(await columnExists(column(namespace, domainEntitySubclassName, 'Id'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntitySubclassName, 'LastModifiedDate'))).toBe(false);
    expect(await columnExists(column(namespace, domainEntitySubclassName, 'CreateDate'))).toBe(false);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntitySubclassName))).toEqual([integerPropertyName1]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntitySubclassName, integerPropertyName1)],
      [column(namespace, abstractEntityName, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when creating domain entity based on abstract entity with identity rename', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const abstractEntityName: string = 'AbstractEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const stringPropertyName: string = 'StringPropertyName';
  const stringPropertyRename: string = 'StringPropertyRename';
  const maxLength: number = 10;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartAbstractEntity(abstractEntityName)
      .withDocumentation('Documentation')
      .withStringIdentity(stringPropertyName, 'Documentation', maxLength.toString())
      .withEndAbstractEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, abstractEntityName)
      .withDocumentation('Documentation')
      .withStringIdentityRename(stringPropertyRename, stringPropertyName, 'Documentation', maxLength.toString())
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have abstract entity table', async () => {
    expect(await tableExists(table(namespace, abstractEntityName))).toBe(true);
  });

  it('should have identity column', async () => {
    const identityColumn: DatabaseColumn = column(namespace, abstractEntityName, stringPropertyName);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.nvarchar);
    expect(await columnLength(identityColumn)).toBe(maxLength);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, abstractEntityName))).toEqual([stringPropertyName]);
  });

  it('should have subclass table', async () => {
    expect(await tableExists(table(namespace, domainEntitySubclassName))).toBe(true);
  });

  it('should have identity rename column', async () => {
    const identityRenameColumn: DatabaseColumn = column(namespace, domainEntitySubclassName, stringPropertyRename);
    expect(await columnExists(identityRenameColumn)).toBe(true);
    expect(await columnIsNullable(identityRenameColumn)).toBe(false);
    expect(await columnDataType(identityRenameColumn)).toBe(columnDataTypes.nvarchar);
    expect(await columnLength(identityRenameColumn)).toBe(maxLength);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntitySubclassName))).toEqual([stringPropertyRename]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntitySubclassName, stringPropertyRename)],
      [column(namespace, abstractEntityName, stringPropertyName)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});
describe('when domain entity based on abstract entity both have collection properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const abstractEntityName: string = 'AbstractEntityName';
  const commonName: string = 'CommonName';
  const descriptorName: string = 'DescriptorName';
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndCommon()

      .withStartAbstractEntity(abstractEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withCommonProperty(commonName, 'Documentation', false, true)
      .withEndAbstractEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, abstractEntityName)
      .withDocumentation('Documentation')
      .withDescriptorProperty(descriptorName, 'Documentation', false, true)
      .withEndDomainEntitySubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have common collection table', async () => {
    expect(await tableExists(table(namespace, abstractEntityName + commonName))).toBe(true);
  });

  it('should have correct columns', async () => {
    const referenceColumn: DatabaseColumn = column(namespace, abstractEntityName + commonName, integerPropertyName1);
    expect(await columnExists(referenceColumn)).toBe(true);
    expect(await columnIsNullable(referenceColumn)).toBe(false);
    expect(await columnDataType(referenceColumn)).toBe(columnDataTypes.integer);

    const identityColumn: DatabaseColumn = column(namespace, abstractEntityName + commonName, integerPropertyName3);
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, abstractEntityName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
    ]);
  });

  it('should have descriptor collection table', async () => {
    expect(await tableExists(table(namespace, domainEntitySubclassName + descriptorName))).toBe(true);
  });

  it('should have identity rename column', async () => {
    const descriptorColumn: DatabaseColumn = column(
      namespace,
      domainEntitySubclassName + descriptorName,
      descriptorColumnName,
    );
    expect(await columnExists(descriptorColumn)).toBe(true);
    expect(await columnIsNullable(descriptorColumn)).toBe(false);
    expect(await columnDataType(descriptorColumn)).toBe(columnDataTypes.integer);

    const identityColumn: DatabaseColumn = column(
      namespace,
      domainEntitySubclassName + descriptorName,
      integerPropertyName3,
    );
    expect(await columnExists(identityColumn)).toBe(true);
    expect(await columnIsNullable(identityColumn)).toBe(false);
    expect(await columnDataType(identityColumn)).toBe(columnDataTypes.integer);
  });

  it('should have correct primary key', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntitySubclassName + descriptorName))).toEqual([
      descriptorColumnName,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, abstractEntityName + commonName, integerPropertyName3)],
      [column(namespace, abstractEntityName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntitySubclassName + descriptorName, integerPropertyName3)],
      [column(namespace, domainEntitySubclassName, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(true);
  });
});
