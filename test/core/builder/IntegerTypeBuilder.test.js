// @noflow
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';
import { metaEdEnvironmentFactory } from '../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../src/core/MetaEdEnvironment';
import IntegerTypeBuilder from '../../../src/core/builder/IntegerTypeBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';

describe('when building shared integer in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one integer type', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.integerType.get(entityName).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.integerType.get(entityName).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.integerType.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.integerType.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.integerType.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.integerType.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a generated type', () => {
    expect(metaEd.entity.integerType.get(entityName).generatedSimpleType).toBe(false);
  });

  it('should not be a short type', () => {
    expect(metaEd.entity.integerType.get(entityName).isShort).toBe(false);
  });
});

describe('when building domain entity with integer property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one integer type', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.integerType.get(entityName).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.integerType.get(entityName).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.integerType.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.integerType.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.integerType.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.integerType.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a generated type', () => {
    expect(metaEd.entity.integerType.get(entityName).generatedSimpleType).toBe(true);
  });

  it('should not be a short type', () => {
    expect(metaEd.entity.integerType.get(entityName).isShort).toBe(false);
  });
});

describe('when building shared short in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one integer type', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.integerType.get(entityName).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.integerType.get(entityName).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.integerType.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.integerType.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.integerType.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.integerType.get(entityName).maxValue).toBe(maxValue);
  });

  it('should not be a generated type', () => {
    expect(metaEd.entity.integerType.get(entityName).generatedSimpleType).toBe(false);
  });

  it('should be a short type', () => {
    expect(metaEd.entity.integerType.get(entityName).isShort).toBe(true);
  });
});

describe('when building domain entity with short property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withShortProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one integer type', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.integerType.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.integerType.get(entityName).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.integerType.get(entityName).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.integerType.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.integerType.get(entityName).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.integerType.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.integerType.get(entityName).maxValue).toBe(maxValue);
  });

  it('should be a generated type', () => {
    expect(metaEd.entity.integerType.get(entityName).generatedSimpleType).toBe(true);
  });

  it('should be a short type', () => {
    expect(metaEd.entity.integerType.get(entityName).isShort).toBe(true);
  });
});

describe('when building multiple shared integers in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '1234';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()

      .withStartSharedInteger(entityName2, metaEdId2)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build two integer types', () => {
    expect(metaEd.entity.integerType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
    expect(metaEd.entity.integerType.get(entityName2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with multiple integer properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '1234';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withIntegerProperty(entityName2, documentation, true, false, maxValue, minValue, null, metaEdId2)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build two integer types', () => {
    expect(metaEd.entity.integerType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
    expect(metaEd.entity.integerType.get(entityName2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building duplicate shared integers in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()

      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one shared integer', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('IntegerTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate shared integer types should have validation failures for each entity -> SDT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared integer types should have validation failures for each entity -> SDT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('IntegerTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared integer types should have validation failures for each entity -> SDT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared integer types should have validation failures for each entity -> SDT 2 sourceMap');
  });
});

describe('when building domain entity with duplicate integer properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one integer', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('IntegerTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate integer types should have validation failures for each entity -> DT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate integer types should have validation failures for each entity -> DT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('IntegerTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate integer types should have validation failures for each entity -> DT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate integer types should have validation failures for each entity -> DT 2 sourceMap');
  });
});

describe('when building shared integer with duplicate integer property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()

      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()

      .withEndNamespace()
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));
  });

  it('should build one shared integer', () => {
    expect(metaEd.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.integerType.get(entityName)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('IntegerTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building shared integer with duplicate integer property types should have validation failures for each entity -> SDT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared integer with duplicate integer property types should have validation failures for each entity -> SDT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('IntegerTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared integer with duplicate integer property types should have validation failures for each entity -> SDT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared integer with duplicate integer property types should have validation failures for each entity -> SDT 2 sourceMap');
  });
});
