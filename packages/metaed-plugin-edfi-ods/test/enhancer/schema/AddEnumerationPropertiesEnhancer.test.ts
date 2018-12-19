import { newEnumerationProperty, newMetaEdEnvironment } from 'metaed-core';
import { EnumerationProperty, MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../../src/model/property/EnumerationProperty';

describe('when EnumerationProperty enhances enumeration property', () => {
  const enumerationPropertyName = 'EnumerationPropertyName';
  let enumerationProperty: EnumerationProperty;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    enumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: enumerationPropertyName,
    });
    metaEd.propertyIndex.enumeration.push(enumerationProperty);
    enhance(metaEd);
  });

  it('should have ods name with type suffix', () => {
    expect(enumerationProperty.data.edfiOds.odsName).toBe(`${enumerationPropertyName}Type`);
  });

  it('should have ods typeified base name with type suffix', () => {
    expect(enumerationProperty.data.edfiOds.odsTypeifiedBaseName).toBe(`${enumerationPropertyName}Type`);
  });
});

describe('when EnumerationProperty enhances enumeration property with context', () => {
  const enumerationPropertyName = 'EnumerationPropertyName';
  const contextName = 'ContextName';
  let enumerationProperty: EnumerationProperty;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    enumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: enumerationPropertyName,
      withContext: contextName,
    });
    metaEd.propertyIndex.enumeration.push(enumerationProperty);
    enhance(metaEd);
  });

  it('should have ods name with type suffix and context prefix', () => {
    expect(enumerationProperty.data.edfiOds.odsName).toBe(`${contextName}${enumerationPropertyName}Type`);
  });

  it('should have ods typeified base name with type suffix', () => {
    expect(enumerationProperty.data.edfiOds.odsTypeifiedBaseName).toBe(`${enumerationPropertyName}Type`);
  });
});

describe('when EnumerationProperty enhances enumeration property with type suffix', () => {
  const enumerationPropertyName = 'EnumerationPropertyName';
  let enumerationProperty: EnumerationProperty;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    enumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: `${enumerationPropertyName}Type`,
    });
    metaEd.propertyIndex.enumeration.push(enumerationProperty);
    enhance(metaEd);
  });

  it('should have ods name with normalized type suffix', () => {
    expect(enumerationProperty.data.edfiOds.odsName).toBe(`${enumerationPropertyName}Type`);
  });

  it('should have ods typeified base name normalized type suffix', () => {
    expect(enumerationProperty.data.edfiOds.odsTypeifiedBaseName).toBe(`${enumerationPropertyName}Type`);
  });
});
