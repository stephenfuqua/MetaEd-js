// @noflow
import type { ValidationFailure } from '../../src/validator/ValidationFailure';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { StringTypeBuilder } from '../../src/builder/StringTypeBuilder';
import { MetaEdTextBuilder } from '../MetaEdTextBuilder';

describe('when building shared string in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';

  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build one string type', () => {
    expect(metaEd.entity.stringType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).type).toBe('stringType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).typeHumanizedName).toBe('String Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have minLength', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).minLength).toBe(minLength);
  });

  it('should have maxLength', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).maxLength).toBe(maxLength);
  });

  it('should not be a generated type', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).generatedSimpleType).toBe(false);
  });
});

describe('when building domain entity with string property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(entityName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build one string type', () => {
    expect(metaEd.entity.stringType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have type', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).type).toBe('stringType');
  });

  it('should have type humanized name', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).typeHumanizedName).toBe('String Type');
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).documentation).toBe(documentation);
  });

  it('should have minLength', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).minLength).toBe(minLength);
  });

  it('should have maxLength', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).maxLength).toBe(maxLength);
  });

  it('should be a generated type', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId).generatedSimpleType).toBe(true);
  });
});

describe('when building multiple shared strings in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '1234';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  const expectedRepositoryId2 = `${projectExtension}-${entityName2}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()

      .withStartSharedString(entityName2, metaEdId2)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build two string types', () => {
    expect(metaEd.entity.stringType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
    expect(metaEd.entity.stringType.get(expectedRepositoryId2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with multiple string properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '1234';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;
  const expectedRepositoryId2 = `${projectExtension}-${entityName2}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(entityName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withStringProperty(entityName2, documentation, true, false, maxLength, minLength, null, metaEdId2)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build two string types', () => {
    expect(metaEd.entity.stringType.size).toBe(2);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
    expect(metaEd.entity.stringType.get(expectedRepositoryId2)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building duplicate shared strings in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()

      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build one shared string', () => {
    expect(metaEd.entity.stringType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('StringTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate shared string types should have validation failures for each entity -> SDT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared string types should have validation failures for each entity -> SDT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('StringTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared string types should have validation failures for each entity -> SDT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared string types should have validation failures for each entity -> SDT 2 sourceMap');
  });
});

describe('when building domain entity with duplicate string properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(entityName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withStringProperty(entityName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build one string', () => {
    expect(metaEd.entity.stringType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('StringTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate string types should have validation failures for each entity -> DT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate string types should have validation failures for each entity -> DT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('StringTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate string types should have validation failures for each entity -> DT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate string types should have validation failures for each entity -> DT 2 sourceMap');
  });
});

describe('when building shared string with duplicate string property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  const expectedRepositoryId = `${projectExtension}-${entityName}`;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(entityName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withEndDomainEntity()

      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()

      .withEndNamespace()
      .sendToListener(new StringTypeBuilder(metaEd, validationFailures));
  });

  it('should build one shared string', () => {
    expect(metaEd.entity.stringType.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.stringType.get(expectedRepositoryId)).toBeDefined();
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('StringTypeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building shared string with duplicate string property types should have validation failures for each entity -> SDT 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared string with duplicate string property types should have validation failures for each entity -> SDT 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('StringTypeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared string with duplicate string property types should have validation failures for each entity -> SDT 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared string with duplicate string property types should have validation failures for each entity -> SDT 2 sourceMap');
  });
});
