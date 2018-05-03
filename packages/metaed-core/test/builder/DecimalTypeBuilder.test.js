// @flow
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { DecimalTypeBuilder } from '../../src/builder/DecimalTypeBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { getDecimalType } from '../TestHelper';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared decimal in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one decimal type', () => {
    expect(namespace.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).type).toBe('decimalType');
  });

  it('should have type humanized name', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).typeHumanizedName).toBe('Decimal Type');
  });

  it('should have metaed id', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).maxValue).toBe(maxValue);
  });

  it('should have data', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).data).toBeDefined();
  });

  it('should not be a generated type', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).generatedSimpleType).toBe(false);
  });
});

describe('when building domain entity with decimal property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(
        entityName,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId,
      )
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one decimal type', () => {
    expect(namespace.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).type).toBe('decimalType');
  });

  it('should have type humanized name', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).typeHumanizedName).toBe('Decimal Type');
  });

  it('should have metaed id', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).maxValue).toBe(maxValue);
  });

  it('should have data', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).data).toBeDefined();
  });

  it('should be a generated type', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId).generatedSimpleType).toBe(true);
  });
});

describe('when building multiple shared decimals in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '1234';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  const expectedRepositoryId2 = `${projectExtension}-${entityName2}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withStartSharedDecimal(entityName2, metaEdId2)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build two decimal types', () => {
    expect(namespace.entity.decimalType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId)).toBeDefined();
    expect(namespace.entity.decimalType.get(expectedRepositoryId2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with multiple decimal properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '1234';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  const expectedRepositoryId2 = `${projectExtension}-${entityName2}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(
        entityName,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId,
      )
      .withDecimalProperty(
        entityName2,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId2,
      )
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build two decimal types', () => {
    expect(namespace.entity.decimalType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(getDecimalType(namespace.entity, expectedRepositoryId)).toBeDefined();
    expect(namespace.entity.decimalType.get(expectedRepositoryId2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});
