// @noflow
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';
import { metaEdEnvironmentFactory } from '../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../src/core/MetaEdEnvironment';
import DecimalTypeBuilder from '../../../src/core/builder/DecimalTypeBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';

describe('when building shared decimal in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build one decimal type', () => {
    expect(metaEd.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.decimalType.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.decimalType.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.decimalType.get(entityName).type).toBe('decimalType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.decimalType.get(entityName).typeHumanizedName).toBe('Decimal Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.decimalType.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.decimalType.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.decimalType.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.decimalType.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.decimalType.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.decimalType.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a generated type', () => {
    expect(metaEd.entity.decimalType.get(entityName).generatedSimpleType).toBe(false);
  });
});

describe('when building domain entity with decimal property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(entityName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build one decimal type', () => {
    expect(metaEd.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.decimalType.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.decimalType.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.decimalType.get(entityName).type).toBe('decimalType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.decimalType.get(entityName).typeHumanizedName).toBe('Decimal Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.decimalType.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.decimalType.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.decimalType.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.decimalType.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.decimalType.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.decimalType.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a generated type', () => {
    expect(metaEd.entity.decimalType.get(entityName).generatedSimpleType).toBe(true);
  });
});

describe('when building multiple shared decimals in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
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

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withStartSharedDecimal(entityName2, metaEdId2)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build two decimal types', () => {
    expect(metaEd.entity.decimalType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
    expect(metaEd.entity.decimalType.get(entityName2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with multiple decimal properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
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

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(entityName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId)
      .withDecimalProperty(entityName2, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId2)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build two decimal types', () => {
    expect(metaEd.entity.decimalType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
    expect(metaEd.entity.decimalType.get(entityName2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building duplicate shared decimals in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build one shared decimal', () => {
    expect(metaEd.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('DecimalTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate shared decimal types should have validation failures for each entity -> SDT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared decimal types should have validation failures for each entity -> SDT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('DecimalTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared decimal types should have validation failures for each entity -> SDT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared decimal types should have validation failures for each entity -> SDT 2 sourceMap');
  });
});

describe('when building domain entity with duplicate decimal properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(entityName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId)
      .withDecimalProperty(entityName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build one decimal', () => {
    expect(metaEd.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('DecimalTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate decimal types should have validation failures for each entity -> DT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate decimal types should have validation failures for each entity -> DT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('DecimalTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate decimal types should have validation failures for each entity -> DT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate decimal types should have validation failures for each entity -> DT 2 sourceMap');
  });
});

describe('when building shared decimal with duplicate decimal property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(entityName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId)
      .withEndDomainEntity()

      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withEndNamespace()
      .sendToListener(new DecimalTypeBuilder(metaEd, validationFailures));
  });

  it('should build one shared decimal', () => {
    expect(metaEd.entity.decimalType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.decimalType.get(entityName)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('DecimalTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building shared decimal with duplicate decimal property types should have validation failures for each entity -> SDT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared decimal with duplicate decimal property types should have validation failures for each entity -> SDT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('DecimalTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared decimal with duplicate decimal property types should have validation failures for each entity -> SDT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared decimal with duplicate decimal property types should have validation failures for each entity -> SDT 2 sourceMap');
  });
});
