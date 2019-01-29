import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { IntegerTypeBuilder } from '../../src/builder/IntegerTypeBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { getIntegerType } from '../TestHelper';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared integer in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one integer type', () => {
    expect(namespace.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).maxValue).toBe(maxValue);
  });

  it('should have data', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).data).toBeDefined();
  });

  it('should not be a generated type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).generatedSimpleType).toBe(false);
  });

  it('should not be a short type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).isShort).toBe(false);
  });
});

describe('when building domain entity with integer property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one integer type', () => {
    expect(namespace.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).maxValue).toBe(maxValue);
  });

  it('should have data', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).data).toBeDefined();
  });

  it('should be a generated type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).generatedSimpleType).toBe(true);
  });

  it('should not be a short type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).isShort).toBe(false);
  });
});

describe('when building shared short in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedShort(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedShort()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one integer type', () => {
    expect(namespace.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).maxValue).toBe(maxValue);
  });

  it('should have data', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).data).toBeDefined();
  });

  it('should not be a generated type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).generatedSimpleType).toBe(false);
  });

  it('should be a short type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).isShort).toBe(true);
  });
});

describe('when building domain entity with short property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withShortProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one integer type', () => {
    expect(namespace.entity.integerType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).type).toBe('integerType');
  });

  it('should have type humanized name', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).typeHumanizedName).toBe('Integer Type');
  });

  it('should have metaed id', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have minValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).maxValue).toBe(maxValue);
  });

  it('should have data', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).data).toBeDefined();
  });

  it('should be a generated type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).generatedSimpleType).toBe(true);
  });

  it('should be a short type', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId).isShort).toBe(true);
  });
});

describe('when building multiple shared integers in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const entityName2 = 'EntityName2';
  const metaEdId2 = '1234';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  const expectedRepositoryId2 = `${projectExtension}-${entityName2}`;
  let namespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedInteger(entityName, metaEdId)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()

      .withStartSharedInteger(entityName2, metaEdId2)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build two integer types', () => {
    expect(namespace.entity.integerType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId)).toBeDefined();
    expect(namespace.entity.integerType.get(expectedRepositoryId2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with multiple integer properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const entityName2 = 'EntityName2';
  const metaEdId2 = '1234';
  const documentation = 'doc';
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
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withIntegerProperty(entityName2, documentation, true, false, maxValue, minValue, null, metaEdId2)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new IntegerTypeBuilder(metaEd, validationFailures));

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build two integer types', () => {
    expect(namespace.entity.integerType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(getIntegerType(namespace.entity, expectedRepositoryId)).toBeDefined();
    expect(namespace.entity.integerType.get(expectedRepositoryId2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});
