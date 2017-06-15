// @noflow
import DomainEntityBuilder from '../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building a decimal property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const totalDigits: string = '6';
  const decimalPlaces: string = '2';
  const maxValue: string = '1000';
  const minValue: string = '100';

  const metaEdId: string = '123';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDecimalProperty(propertyName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have decimal property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('decimal');
  });

  it('should have correct documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });

  it('should have correct MetaEd ID', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdId).toBe(metaEdId);
  });

  it('should have correct precision scale and value constraints', () => {
    const property = entityRepository.domainEntity.get(entityName).properties[0];

    expect(property.totalDigits).toBe(totalDigits);
    expect(property.decimalPlaces).toBe(decimalPlaces);
    expect(property.maxValue).toBe(maxValue);
    expect(property.minValue).toBe(minValue);
    expect(property.hasRestriction).toBe(true);
  });
});

describe('when building a string property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const maxLength: string = '1000';
  const minLength: string = '100';

  const metaEdId: string = '123';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringProperty(propertyName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have string property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('string');
  });

  it('should have correct documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });

  it('should have correct MetaEd ID', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdId).toBe(metaEdId);
  });

  it('should have correct length constraints', () => {
    const property = entityRepository.domainEntity.get(entityName).properties[0];

    expect(property.maxLength).toBe(maxLength);
    expect(property.minLength).toBe(minLength);
    expect(property.hasRestriction).toBe(true);
  });
});

describe('when building a integer property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const maxValue: string = '1000';
  const minValue: string = '100';

  const metaEdId: string = '123';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withIntegerProperty(propertyName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have integer property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('integer');
  });

  it('should have correct documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });

  it('should have correct MetaEd ID', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdId).toBe(metaEdId);
  });

  it('should have correct value constraints', () => {
    const property = entityRepository.domainEntity.get(entityName).properties[0];

    expect(property.maxValue).toBe(maxValue);
    expect(property.minValue).toBe(minValue);
    expect(property.hasRestriction).toBe(true);
  });
});

describe('when building a short property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const maxValue: string = '1000';
  const minValue: string = '100';

  const metaEdId: string = '123';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withShortProperty(propertyName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have short property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('short');
  });

  it('should have correct documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });

  it('should have correct MetaEd ID', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdId).toBe(metaEdId);
  });

  it('should have correct value constraints', () => {
    const property = entityRepository.domainEntity.get(entityName).properties[0];

    expect(property.maxValue).toBe(maxValue);
    expect(property.minValue).toBe(minValue);
    expect(property.hasRestriction).toBe(true);
  });
});

describe('when building a common property with extension override', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withCommonExtensionOverrideProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have common property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('common');
  });

  it('should have correct documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });

  it('should have extension override flag set', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].isExtensionOverride).toBe(true);
  });
});

describe('when building a domain entity property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const metaEdId: string = '123';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(propertyName, documentation, true, false, false, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have domain entity property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('domainEntity');
  });

  it('should have correct documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });

  it('should have correct MetaEd ID', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdId).toBe(metaEdId);
  });
});

describe('when building a domain entity property with merge reference', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const mergePropertyPath: string = 'EntityA.PropertyB';
  const targetPropertyPath: string = 'EntityC.PropertyD';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(propertyName, documentation, true, false)
      .withMergePartOfReference(mergePropertyPath, targetPropertyPath)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have domain entity property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('domainEntity');
  });

  it('should have merge a reference', () => {
    const mergedProperties = entityRepository.domainEntity.get(entityName).properties[0].mergedProperties;

    expect(mergedProperties).toHaveLength(1);
    expect(mergedProperties[0].mergePropertyPath).toHaveLength(2);
    expect(mergedProperties[0].mergePropertyPath[0]).toBe('EntityA');
    expect(mergedProperties[0].mergePropertyPath[1]).toBe('PropertyB');

    expect(mergedProperties[0].targetPropertyPath).toHaveLength(2);
    expect(mergedProperties[0].targetPropertyPath[0]).toBe('EntityC');
    expect(mergedProperties[0].targetPropertyPath[1]).toBe('PropertyD');
  });
});

describe('when building a domain entity property with multiple merge references', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  const mergePropertyPath1: string = 'PropertyA';
  const targetPropertyPath1: string = 'PropertyB';
  const mergePropertyPath2: string = 'PropertyC';
  const targetPropertyPath2: string = 'PropertyD';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(propertyName, documentation, true, false)
      .withMergePartOfReference(mergePropertyPath1, targetPropertyPath1)
      .withMergePartOfReference(mergePropertyPath2, targetPropertyPath2)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have domain entity property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe('domainEntity');
  });

  it('should have merge references', () => {
    const mergedProperties = entityRepository.domainEntity.get(entityName).properties[0].mergedProperties;

    expect(mergedProperties).toHaveLength(2);

    expect(mergedProperties[0].mergePropertyPath).toHaveLength(1);
    expect(mergedProperties[0].mergePropertyPath[0]).toBe(mergePropertyPath1);
    expect(mergedProperties[0].targetPropertyPath).toHaveLength(1);
    expect(mergedProperties[0].targetPropertyPath[0]).toBe(targetPropertyPath1);

    expect(mergedProperties[1].mergePropertyPath).toHaveLength(1);
    expect(mergedProperties[1].mergePropertyPath[0]).toBe(mergePropertyPath2);
    expect(mergedProperties[1].targetPropertyPath).toHaveLength(1);
    expect(mergedProperties[1].targetPropertyPath[0]).toBe(targetPropertyPath2);
  });
});
