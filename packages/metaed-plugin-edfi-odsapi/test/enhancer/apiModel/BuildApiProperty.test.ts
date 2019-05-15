import { newDecimalColumn, newIntegerColumn, newStringColumn } from 'metaed-plugin-edfi-ods';
import { Column } from 'metaed-plugin-edfi-ods';
import { buildApiProperty } from '../../../src/enhancer/apiModel/BuildApiProperty';
import { ApiProperty } from '../../../src/model/apiModel/ApiProperty';

describe('when building an api property from a not null integer column', (): void => {
  const name = 'Name';
  const description = 'Description';
  const column: Column = {
    ...newIntegerColumn(),
    name,
    description,
    isNullable: false,
  };

  const apiProperty: ApiProperty = buildApiProperty(column);

  it('should have correct api property', (): void => {
    expect(apiProperty.propertyName).toBe(name);
    expect(apiProperty.description).toBe(description);
    expect(apiProperty.propertyType.dbType).toBe('Int32');
    expect(apiProperty.propertyType.isNullable).toBe(false);
    expect(apiProperty.isIdentifying).toBe(false);
    expect(apiProperty.isServerAssigned).toBe(false);
  });
});

describe('when building an api property from a nullable string column', (): void => {
  const name = 'Name';
  const description = 'Description';
  const column: Column = {
    ...newStringColumn('100'),
    name,
    description,
    isNullable: true,
  };

  const apiProperty: ApiProperty = buildApiProperty(column);

  it('should have correct api property', (): void => {
    expect(apiProperty.propertyName).toBe(name);
    expect(apiProperty.description).toBe(description);
    expect(apiProperty.propertyType.dbType).toBe('String');
    expect(apiProperty.propertyType.isNullable).toBe(true);
    expect(apiProperty.propertyType.maxLength).toBe(100);
    expect(apiProperty.isIdentifying).toBe(false);
    expect(apiProperty.isServerAssigned).toBe(false);
  });
});

describe('when building an api property from a decimal primary key column', (): void => {
  const name = 'Name';
  const description = 'Description';
  const column: Column = {
    ...newDecimalColumn('10', '100'),
    name,
    description,
    isPartOfPrimaryKey: true,
  };

  const apiProperty: ApiProperty = buildApiProperty(column);

  it('should have correct api property', (): void => {
    expect(apiProperty.propertyName).toBe(name);
    expect(apiProperty.description).toBe(description);
    expect(apiProperty.propertyType.dbType).toBe('Decimal');
    expect(apiProperty.propertyType.isNullable).toBe(false);
    expect(apiProperty.propertyType.precision).toBe(10);
    expect(apiProperty.propertyType.scale).toBe(100);
    expect(apiProperty.isIdentifying).toBe(true);
    expect(apiProperty.isServerAssigned).toBe(false);
  });
});

describe('when building an api property from an identity integer column', (): void => {
  const name = 'Name';
  const description = 'Description';
  const column: Column = {
    ...newIntegerColumn(),
    name,
    description,
    isIdentityDatabaseType: true,
  };

  const apiProperty: ApiProperty = buildApiProperty(column);

  it('should have correct api property', (): void => {
    expect(apiProperty.propertyName).toBe(name);
    expect(apiProperty.description).toBe(description);
    expect(apiProperty.propertyType.dbType).toBe('Int32');
    expect(apiProperty.propertyType.isNullable).toBe(false);
    expect(apiProperty.isIdentifying).toBe(false);
    expect(apiProperty.isServerAssigned).toBe(true);
  });
});
