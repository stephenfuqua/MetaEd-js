import { DomainEntityProperty } from 'metaed-core';
import { newDomainEntityProperty } from 'metaed-core';
import { addColumnNamePair, newForeignKey, foreignKeySourceReferenceFrom } from '../../../src/model/database/ForeignKey';
import { newColumnNamePair } from '../../../src/model/database/ColumnNamePair';
import { ForeignKey, ForeignKeySourceReference } from '../../../src/model/database/ForeignKey';

describe('when using add column name pair to a foreign key with no existing duplicates', () => {
  const parentTableColumnName = 'ParentTableColumnName';
  const foreignTableColumnName = 'ForeignTableColumnName';
  let foreignKey: ForeignKey;

  beforeAll(() => {
    foreignKey = Object.assign(newForeignKey(), { name: 'ForeignKeyName' });
    addColumnNamePair(
      foreignKey,
      Object.assign(newColumnNamePair(), {
        parentTableColumnName,
        foreignTableColumnName,
      }),
    );
  });

  it('should successfully add column name pair', () => {
    expect(foreignKey.columnNames).toHaveLength(1);
    expect(foreignKey.columnNames[0].parentTableColumnName).toBe(parentTableColumnName);
    expect(foreignKey.columnNames[0].foreignTableColumnName).toBe(foreignTableColumnName);
  });
});

describe('when using add column name pair to a foreign key with existing duplicate', () => {
  const parentTableColumnName = 'ParentTableColumnName';
  const foreignTableColumnName = 'ForeignTableColumnName';
  let foreignKey: ForeignKey;

  beforeAll(() => {
    foreignKey = Object.assign(newForeignKey(), { name: 'ForeignKeyName' });
    addColumnNamePair(
      foreignKey,
      Object.assign(newColumnNamePair(), {
        parentTableColumnName,
        foreignTableColumnName,
      }),
    );
    addColumnNamePair(
      foreignKey,
      Object.assign(newColumnNamePair(), {
        parentTableColumnName,
        foreignTableColumnName,
      }),
    );
  });

  it('should reject incoming column name pair', () => {
    expect(foreignKey.columnNames).toHaveLength(1);
    expect(foreignKey.columnNames[0].parentTableColumnName).toBe(parentTableColumnName);
    expect(foreignKey.columnNames[0].foreignTableColumnName).toBe(foreignTableColumnName);
  });
});

describe('when creating foreign key sourceReference from identity property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isPartOfIdentity: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: false, odsIsReferenceToExtensionParent: false } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(true);
    expect(sourceReference.isRequired).toBe(true);
    expect(sourceReference.isOptional).toBe(false);
    expect(sourceReference.isRequiredCollection).toBe(false);
    expect(sourceReference.isOptionalCollection).toBe(false);
    expect(sourceReference.isSubclassRelationship).toBe(false);
    expect(sourceReference.isExtensionRelationship).toBe(false);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});

describe('when creating foreign key sourceReference from required property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isRequired: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: false, odsIsReferenceToExtensionParent: false } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(false);
    expect(sourceReference.isRequired).toBe(true);
    expect(sourceReference.isOptional).toBe(false);
    expect(sourceReference.isRequiredCollection).toBe(false);
    expect(sourceReference.isOptionalCollection).toBe(false);
    expect(sourceReference.isSubclassRelationship).toBe(false);
    expect(sourceReference.isExtensionRelationship).toBe(false);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});

describe('when creating foreign key sourceReference from optional property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isOptional: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: false, odsIsReferenceToExtensionParent: false } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(false);
    expect(sourceReference.isRequired).toBe(false);
    expect(sourceReference.isOptional).toBe(true);
    expect(sourceReference.isRequiredCollection).toBe(false);
    expect(sourceReference.isOptionalCollection).toBe(false);
    expect(sourceReference.isSubclassRelationship).toBe(false);
    expect(sourceReference.isExtensionRelationship).toBe(false);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});

describe('when creating foreign key sourceReference from required collection property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isRequiredCollection: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: false, odsIsReferenceToExtensionParent: false } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(false);
    expect(sourceReference.isRequired).toBe(false);
    expect(sourceReference.isOptional).toBe(false);
    expect(sourceReference.isRequiredCollection).toBe(true);
    expect(sourceReference.isOptionalCollection).toBe(false);
    expect(sourceReference.isSubclassRelationship).toBe(false);
    expect(sourceReference.isExtensionRelationship).toBe(false);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});

describe('when creating foreign key sourceReference from optional collection property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isOptionalCollection: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: false, odsIsReferenceToExtensionParent: false } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(false);
    expect(sourceReference.isRequired).toBe(false);
    expect(sourceReference.isOptional).toBe(false);
    expect(sourceReference.isRequiredCollection).toBe(false);
    expect(sourceReference.isOptionalCollection).toBe(true);
    expect(sourceReference.isSubclassRelationship).toBe(false);
    expect(sourceReference.isExtensionRelationship).toBe(false);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});

describe('when creating foreign key sourceReference from subclass relationship property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isPartOfIdentity: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: true, odsIsReferenceToExtensionParent: false } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(true);
    expect(sourceReference.isRequired).toBe(true);
    expect(sourceReference.isOptional).toBe(false);
    expect(sourceReference.isRequiredCollection).toBe(false);
    expect(sourceReference.isOptionalCollection).toBe(false);
    expect(sourceReference.isSubclassRelationship).toBe(true);
    expect(sourceReference.isExtensionRelationship).toBe(false);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});

describe('when creating foreign key sourceReference from extension relationship property', () => {
  const entityProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
    isPartOfIdentity: true,
    data: { edfiOds: { odsIsReferenceToSuperclass: false, odsIsReferenceToExtensionParent: true } },
  });
  const sourceReference: ForeignKeySourceReference = foreignKeySourceReferenceFrom(entityProperty);

  it('should create correct source reference', () => {
    expect(sourceReference.isPartOfIdentity).toBe(true);
    expect(sourceReference.isRequired).toBe(true);
    expect(sourceReference.isOptional).toBe(false);
    expect(sourceReference.isRequiredCollection).toBe(false);
    expect(sourceReference.isOptionalCollection).toBe(false);
    expect(sourceReference.isSubclassRelationship).toBe(false);
    expect(sourceReference.isExtensionRelationship).toBe(true);
    expect(sourceReference.isSyntheticRelationship).toBe(false);
  });
});
