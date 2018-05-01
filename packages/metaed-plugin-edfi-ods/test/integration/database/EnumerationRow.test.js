// @flow
import { EnumerationBuilder, MetaEdTextBuilder, NamespaceBuilder, newMetaEdEnvironment } from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { column, enhanceGenerateAndExecuteSql, table, testTearDown } from './DatabaseTestBase';
import { columnExists, columnFirstRowValue, columnMSDescription, columnNthRowValue } from './DatabaseColumn';
import { tableExists } from './DatabaseTable';
import type { DatabaseColumn } from './DatabaseColumn';

describe('when enumeration has single item', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const enumerationName: string = 'EnumerationName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationItemShortDescription: string = `This is the documentation\nfor the descriptor with 'some' ""special"" --characters--.`;

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(enumerationItemShortDescription, 'Documentation')
      .withEndEnumeration()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have enumeration table', async () => {
    expect(await tableExists(table(namespaceName, enumerationTableName))).toBe(true);
  });

  it('should have correct inserted values', async () => {
    const codeValueColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'CodeValue');
    expect(await columnExists(codeValueColumn)).toBe(true);
    expect(await columnFirstRowValue(codeValueColumn)).toBe('');

    const shortDescriptionColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'ShortDescription');
    expect(await columnExists(shortDescriptionColumn)).toBe(true);
    expect(await columnFirstRowValue(shortDescriptionColumn)).toBe(enumerationItemShortDescription.replace(/""/g, '"'));

    const descriptionColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'Description');
    expect(await columnExists(descriptionColumn)).toBe(true);
    expect(await columnFirstRowValue(descriptionColumn)).toBe(enumerationItemShortDescription.replace(/""/g, '"'));
  });
});

describe('when enumeration has multiple items', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const enumerationName: string = 'EnumerationName';
  const enumerationTableName: string = `${enumerationName}Type`;
  const enumerationTypeIdColumnName: string = `${enumerationName}TypeId`;
  const shortDescription1: string = 'ShortDescription1';
  const shortDescription2: string = 'ShortDescription2';
  const shortDescription3: string = 'ShortDescription3';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(shortDescription1, 'Documentation')
      .withEnumerationItem(shortDescription2, 'Documentation')
      .withEnumerationItem(shortDescription3, 'Documentation')
      .withEndEnumeration()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have enumeration table', async () => {
    expect(await tableExists(table(namespaceName, enumerationTableName))).toBe(true);
  });

  it('should have standard descriptor columns', async () => {
    const codeValueColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'CodeValue');
    expect(await columnExists(codeValueColumn)).toBe(true);
    expect(await columnFirstRowValue(codeValueColumn)).toBe('');
    expect(await columnNthRowValue(codeValueColumn, enumerationTypeIdColumnName, '2')).toBe('');
    expect(await columnNthRowValue(codeValueColumn, enumerationTypeIdColumnName, '3')).toBe('');

    const shortDescriptionColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'ShortDescription');
    expect(await columnExists(shortDescriptionColumn)).toBe(true);
    expect(await columnFirstRowValue(shortDescriptionColumn)).toBe(shortDescription1.replace(/""/g, '"'));
    expect(await columnNthRowValue(shortDescriptionColumn, enumerationTypeIdColumnName, '2')).toBe(shortDescription2);
    expect(await columnNthRowValue(shortDescriptionColumn, enumerationTypeIdColumnName, '3')).toBe(shortDescription3);

    const descriptionColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'Description');
    expect(await columnExists(descriptionColumn)).toBe(true);
    expect(await columnFirstRowValue(descriptionColumn)).toBe(shortDescription1.replace(/""/g, '"'));
    expect(await columnNthRowValue(descriptionColumn, enumerationTypeIdColumnName, '2')).toBe(shortDescription2);
    expect(await columnNthRowValue(descriptionColumn, enumerationTypeIdColumnName, '3')).toBe(shortDescription3);
  });
});

describe('when enumeration name ends in type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'namespace';
  const enumerationName: string = 'EnumerationNameType';
  const enumerationTableName: string = enumerationName;
  const shortDescription: string = 'ShortDescription';

  beforeAll(async () => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartEnumeration(enumerationName)
      .withDocumentation('Documentation')
      .withEnumerationItem(shortDescription, 'Documentation')
      .withEndEnumeration()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new EnumerationBuilder(metaEd, []));

    return enhanceGenerateAndExecuteSql(metaEd);
  });

  afterAll(async () => testTearDown());

  it('should have enumeration table', async () => {
    expect(await tableExists(table(namespaceName, enumerationTableName))).toBe(true);
  });

  it('should have correct inserted values', async () => {
    const codeValueColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'CodeValue');
    expect(await columnExists(codeValueColumn)).toBe(true);
    expect(await columnFirstRowValue(codeValueColumn)).toBe('');

    const shortDescriptionColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'ShortDescription');
    expect(await columnExists(shortDescriptionColumn)).toBe(true);
    expect(await columnMSDescription(shortDescriptionColumn)).toBe(
      `The value for the ${enumerationName.replace(/Type$/g, '')} type.`,
    );
    expect(await columnFirstRowValue(shortDescriptionColumn)).toBe(shortDescription.replace(/""/g, '"'));

    const descriptionColumn: DatabaseColumn = column(namespaceName, enumerationTableName, 'Description');
    expect(await columnExists(descriptionColumn)).toBe(true);
    expect(await columnMSDescription(descriptionColumn)).toBe(
      `The description for the ${enumerationName.replace(/Type$/g, '')} type.`,
    );
    expect(await columnFirstRowValue(descriptionColumn)).toBe(shortDescription.replace(/""/g, '"'));
  });
});
