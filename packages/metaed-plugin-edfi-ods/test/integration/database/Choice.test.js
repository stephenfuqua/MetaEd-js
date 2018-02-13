// @flow
import {
  DomainEntityBuilder,
  ChoiceBuilder,
  CommonBuilder,
  DescriptorBuilder,
  EnumerationBuilder,
  MetaEdTextBuilder,
  NamespaceInfoBuilder,
  newMetaEdEnvironment,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { column, enhanceGenerateAndExecuteSql, foreignKey, table, testTearDown } from './DatabaseTestBase';
import { columnExists, columnIsNullable } from './DatabaseColumn';
import { foreignKeyDeleteCascades, foreignKeyExists } from './DatabaseForeignKey';
import { tableExists, tablePrimaryKeys } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';
import type { DatabaseForeignKey } from './DatabaseForeignKey';

describe('when choice is a required property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';
  const integerPropertyName5: string = 'IntegerPropertyName5';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', false, false)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false, null, null, contextName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', true, false)
      .withIntegerProperty(integerPropertyName4, 'Documentation', false, true)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName5, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have choice properties', async () => {
    const optionalColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName1);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);

    const contextColumn: DatabaseColumn = column(namespace, domainEntityName, contextName + integerPropertyName2);
    expect(await columnExists(contextColumn)).toBe(true);
    expect(await columnIsNullable(contextColumn)).toBe(true);

    const requiredColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName3);
    expect(await columnExists(requiredColumn)).toBe(true);
    expect(await columnIsNullable(requiredColumn)).toBe(true);
  });

  it('should have join table for collection property', async () => {
    expect(await tableExists(table(namespace, domainEntityName + integerPropertyName4))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + integerPropertyName4))).toEqual([
      integerPropertyName4,
      integerPropertyName5,
    ]);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(
      namespace,
      domainEntityName + integerPropertyName4,
      integerPropertyName4,
    );
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + integerPropertyName4, integerPropertyName5)],
      [column(namespace, domainEntityName, integerPropertyName5)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when choice is an optional property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', false, false)
      .withIntegerProperty(integerPropertyName2, 'Documentation', true, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have choice properties', async () => {
    const optionalColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName1);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);

    const requiredColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(requiredColumn)).toBe(true);
    expect(await columnIsNullable(requiredColumn)).toBe(true);
  });
});

describe('when choice is a required property on extension entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const choiceName: string = 'ChoiceName';
  const contextName: string = 'ContextName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';
  const integerPropertyName5: string = 'IntegerPropertyName5';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', false, false)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false, null, null, contextName)
      .withIntegerProperty(integerPropertyName3, 'Documentation', true, false)
      .withIntegerProperty(integerPropertyName4, 'Documentation', false, true)
      .withEndChoice()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName5, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(extension, domainEntityName))).toBe(true);
  });

  it('should have choice properties', async () => {
    const optionalColumn: DatabaseColumn = column(extension, domainEntityName, integerPropertyName1);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);

    const contextColumn: DatabaseColumn = column(extension, domainEntityName, contextName + integerPropertyName2);
    expect(await columnExists(contextColumn)).toBe(true);
    expect(await columnIsNullable(contextColumn)).toBe(true);

    const requiredColumn: DatabaseColumn = column(extension, domainEntityName, integerPropertyName3);
    expect(await columnExists(requiredColumn)).toBe(true);
    expect(await columnIsNullable(requiredColumn)).toBe(true);
  });

  it('should have join table for collection property', async () => {
    expect(await tableExists(table(extension, domainEntityName + integerPropertyName4))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName + integerPropertyName4))).toEqual([
      integerPropertyName4,
      integerPropertyName5,
    ]);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(
      extension,
      domainEntityName + integerPropertyName4,
      integerPropertyName4,
    );
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName + integerPropertyName4, integerPropertyName5)],
      [column(extension, domainEntityName, integerPropertyName5)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when extension choice is a required property on extension entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const extension: string = 'extension';
  const choiceName: string = 'ChoiceName';
  const contextName: string = 'ContextName';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';
  const integerPropertyName4: string = 'IntegerPropertyName4';
  const integerPropertyName5: string = 'IntegerPropertyName5';
  const integerPropertyName6: string = 'IntegerPropertyName6';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity('DomainEntityName1')
      .withDocumentation('Documentation')
      .withIntegerIdentity('IntegerPropertyName1', 'Documentation')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace(extension)
      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withIntegerProperty(integerPropertyName3, 'Documentation', false, false, null, null, contextName)
      .withIntegerProperty(integerPropertyName4, 'Documentation', true, false)
      .withIntegerProperty(integerPropertyName5, 'Documentation', false, true)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName6, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(extension, domainEntityName2))).toBe(true);
  });

  it('should have choice properties', async () => {
    const optionalColumn: DatabaseColumn = column(extension, domainEntityName2, integerPropertyName2);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);

    const contextColumn: DatabaseColumn = column(extension, domainEntityName2, contextName + integerPropertyName3);
    expect(await columnExists(contextColumn)).toBe(true);
    expect(await columnIsNullable(contextColumn)).toBe(true);

    const requiredColumn: DatabaseColumn = column(extension, domainEntityName2, integerPropertyName4);
    expect(await columnExists(requiredColumn)).toBe(true);
    expect(await columnIsNullable(requiredColumn)).toBe(true);
  });

  it('should have join table for collection property', async () => {
    expect(await tableExists(table(extension, domainEntityName2 + integerPropertyName5))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(extension, domainEntityName2 + integerPropertyName5))).toEqual([
      integerPropertyName5,
      integerPropertyName6,
    ]);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(
      extension,
      domainEntityName2 + integerPropertyName5,
      integerPropertyName5,
    );
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(extension, domainEntityName2 + integerPropertyName5, integerPropertyName6)],
      [column(extension, domainEntityName2, integerPropertyName6)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when choice has an enumeration property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const enumerationName: string = 'EnumerationName';
  const enumerationItemName: string = 'EnumerationItemName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationColumnName: string = `${enumerationName}TypeId`;
  const choiceName: string = 'ChoiceName';
  const domainEntityName: string = 'DomainEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(enumerationItemName)
      .withEndEnumeration()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withEnumerationProperty(enumerationName, 'Documentation', true, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('IntegerPropertyName', 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have enumeration property', async () => {
    const enumerationColumn: DatabaseColumn = column(namespace, domainEntityName, enumerationColumnName);
    expect(await columnExists(enumerationColumn)).toBe(true);
    expect(await columnIsNullable(enumerationColumn)).toBe(true);
  });

  it('should have enumeration table', async () => {
    expect(await tableExists(table(namespace, enumerationTableName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, enumerationTableName))).toEqual([enumerationColumnName]);
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

describe('when choice has a collection enumeration property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const enumerationName: string = 'EnumerationName';
  const enumerationItemName: string = 'EnumerationItemName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationColumnName: string = `${enumerationName}TypeId`;
  const choiceName: string = 'ChoiceName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(enumerationItemName)
      .withEndEnumeration()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withEnumerationProperty(enumerationName, 'Documentation', true, true)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have enumeration table', async () => {
    expect(await tableExists(table(namespace, enumerationTableName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, enumerationTableName))).toEqual([enumerationColumnName]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + enumerationName))).toBe(true);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(namespace, domainEntityName + enumerationName, integerPropertyName);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + enumerationName))).toEqual([
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
      [column(namespace, domainEntityName + enumerationName, enumerationColumnName)],
      [column(namespace, enumerationTableName, enumerationColumnName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when choice has a descriptor property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const descriptorName: string = 'DescriptorName';
  const descriptorTableName: string = `${descriptorName}Descriptor`;
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;
  const choiceName: string = 'ChoiceName';
  const domainEntityName: string = 'DomainEntityName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withDescriptorProperty(descriptorName, 'Documentation', true, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('IntegerPropertyName', 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have descriptor property', async () => {
    const descriptorColumn: DatabaseColumn = column(namespace, domainEntityName, descriptorColumnName);
    expect(await columnExists(descriptorColumn)).toBe(true);
    expect(await columnIsNullable(descriptorColumn)).toBe(true);
  });

  it('should have descriptor table', async () => {
    expect(await tableExists(table(namespace, descriptorTableName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, descriptorTableName))).toEqual([descriptorColumnName]);
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

describe('when choice has a collection descriptor property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'edfi';
  const descriptorName: string = 'DescriptorName';
  const descriptorTableName: string = `${descriptorName}Descriptor`;
  const descriptorColumnName: string = `${descriptorName}DescriptorId`;
  const choiceName: string = 'ChoiceName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName: string = 'IntegerPropertyName';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDescriptor(descriptorName)
      .withDocumentation('Documentation')
      .withEndDescriptor()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withDescriptorProperty(descriptorName, 'Documentation', true, true)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new DescriptorBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have descriptor table', async () => {
    expect(await tableExists(table(namespace, descriptorTableName))).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, descriptorTableName))).toEqual([descriptorColumnName]);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + descriptorName))).toBe(true);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(namespace, domainEntityName + descriptorName, integerPropertyName);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + descriptorName))).toEqual([
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
      [column(namespace, domainEntityName + descriptorName, descriptorColumnName)],
      [column(namespace, descriptorTableName, descriptorColumnName)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when choice has a domain entity property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndDomainEntity()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withDomainEntityProperty(domainEntityName1, 'Documentation', true, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName2))).toBe(true);
  });

  it('should have referenced domain entity property', async () => {
    const column1: DatabaseColumn = column(namespace, domainEntityName2, integerPropertyName1);
    expect(await columnExists(column1)).toBe(true);
    expect(await columnIsNullable(column1)).toBe(true);
  });

  it('should have referenced domainEntity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName1))).toBe(true);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName2, integerPropertyName1)],
      [column(namespace, domainEntityName1, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(false);
  });
});

describe('when choice has a collection domain entity property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const domainEntityName1: string = 'DomainEntityName1';
  const domainEntityName2: string = 'DomainEntityName2';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndDomainEntity()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withDomainEntityProperty(domainEntityName1, 'Documentation', true, true)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName2))).toBe(true);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName2 + domainEntityName1))).toBe(true);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(namespace, domainEntityName2 + domainEntityName1, integerPropertyName1);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName2 + domainEntityName1))).toEqual([
      integerPropertyName1,
      integerPropertyName3,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName2 + domainEntityName1, integerPropertyName3)],
      [column(namespace, domainEntityName2, integerPropertyName3)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName2 + domainEntityName1, integerPropertyName1)],
      [column(namespace, domainEntityName1, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when choice has a common property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', false, false)
      .withEndCommon()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withCommonProperty(commonName, 'Documentation', true, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have common table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + commonName))).toBe(true);
  });

  it('should have common property', async () => {
    const collectionColumn: DatabaseColumn = column(namespace, domainEntityName + commonName, integerPropertyName1);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + commonName))).toEqual([integerPropertyName2]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName + commonName, integerPropertyName2)],
      [column(namespace, domainEntityName, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);
  });
});

describe('when choice has a collection common property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const commonName: string = 'CommonName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartCommon(commonName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName1, 'Documentation')
      .withEndCommon()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withCommonProperty(commonName, 'Documentation', true, true)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName + commonName))).toBe(true);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(namespace, domainEntityName + commonName, integerPropertyName1);
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName + commonName))).toEqual([
      integerPropertyName1,
      integerPropertyName2,
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
});

describe('when choice has a inline common property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const inlineCommonName: string = 'InlineCommonName';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartInlineCommon(inlineCommonName)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', true, false)
      .withIntegerProperty(integerPropertyName2, 'Documentation', false, false)
      .withEndInlineCommon()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withInlineCommonProperty(inlineCommonName, 'Documentation', false, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have inline common properties', async () => {
    const optionalColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName1);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);

    const requiredColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(requiredColumn)).toBe(true);
    expect(await columnIsNullable(requiredColumn)).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName3]);
  });
});

describe('when choice has a inline common property with context with collection reference property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName: string = 'ChoiceName';
  const contextName: string = 'ContextName';
  const inlineCommonName: string = 'InlineCommonName';
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

      .withStartInlineCommon(inlineCommonName)
      .withDocumentation('Documentation')
      .withDomainEntityProperty(domainEntityName1, 'Documentation', false, true)
      .withEndInlineCommon()

      .withStartChoice(choiceName)
      .withDocumentation('Documentation')
      .withInlineCommonProperty(inlineCommonName, 'Documentation', false, false, contextName)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName2, 'Documentation')
      .withChoiceProperty(choiceName, 'Documentation', false, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName2))).toBe(true);
  });

  it('should have collection table', async () => {
    expect(await tableExists(table(namespace, domainEntityName2 + contextName + domainEntityName1))).toBe(true);
  });

  it('should have collection property', async () => {
    const collectionColumn: DatabaseColumn = column(
      namespace,
      domainEntityName2 + contextName + domainEntityName1,
      contextName + integerPropertyName1,
    );
    expect(await columnExists(collectionColumn)).toBe(true);
    expect(await columnIsNullable(collectionColumn)).toBe(false);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName2 + contextName + domainEntityName1))).toEqual([
      contextName + integerPropertyName1,
      integerPropertyName2,
    ]);
  });

  it('should have correct foreign key relationship', async () => {
    const foreignKey1: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName2 + contextName + domainEntityName1, integerPropertyName2)],
      [column(namespace, domainEntityName2, integerPropertyName2)],
    );
    expect(await foreignKeyExists(foreignKey1)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey1)).toBe(true);

    const foreignKey2: DatabaseForeignKey = foreignKey(
      [column(namespace, domainEntityName2 + contextName + domainEntityName1, contextName + integerPropertyName1)],
      [column(namespace, domainEntityName1, integerPropertyName1)],
    );
    expect(await foreignKeyExists(foreignKey2)).toBe(true);
    expect(await foreignKeyDeleteCascades(foreignKey2)).toBe(false);
  });
});

describe('when choice has a choice property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: string = 'namespace';
  const choiceName1: string = 'ChoiceName1';
  const choiceName2: string = 'ChoiceName2';
  const domainEntityName: string = 'DomainEntityName';
  const integerPropertyName1: string = 'IntegerPropertyName1';
  const integerPropertyName2: string = 'IntegerPropertyName2';
  const integerPropertyName3: string = 'IntegerPropertyName3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartChoice(choiceName1)
      .withDocumentation('Documentation')
      .withIntegerProperty(integerPropertyName1, 'Documentation', true, false)
      .withIntegerProperty(integerPropertyName2, 'Documentation', true, false)
      .withEndChoice()

      .withStartChoice(choiceName2)
      .withDocumentation('Documentation')
      .withChoiceProperty(choiceName1, 'Documentation', true, false)
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('Documentation')
      .withIntegerIdentity(integerPropertyName3, 'Documentation')
      .withChoiceProperty(choiceName2, 'Documentation', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have domain entity table', async () => {
    expect(await tableExists(table(namespace, domainEntityName))).toBe(true);
  });

  it('should have choice properties', async () => {
    const optionalColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName1);
    expect(await columnExists(optionalColumn)).toBe(true);
    expect(await columnIsNullable(optionalColumn)).toBe(true);

    const requiredColumn: DatabaseColumn = column(namespace, domainEntityName, integerPropertyName2);
    expect(await columnExists(requiredColumn)).toBe(true);
    expect(await columnIsNullable(requiredColumn)).toBe(true);
  });

  it('should have correct primary keys', async () => {
    expect(await tablePrimaryKeys(table(namespace, domainEntityName))).toEqual([integerPropertyName3]);
  });
});
