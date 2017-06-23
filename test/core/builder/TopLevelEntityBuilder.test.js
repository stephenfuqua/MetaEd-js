// @noflow
import DomainEntityBuilder from '../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { PropertyType } from '../../../src/core/model/property/PropertyType';
import type { EntityProperty } from '../../../src/core/model/property/EntityProperty';

describe('when building a decimal property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const propertyIndex: Map<PropertyType, Array<EntityProperty>> = new Map();
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
    const builder = new DomainEntityBuilder(entityRepository, [], propertyIndex);

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

  it('should have decimal property in property index', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0]).toBe(propertyIndex.get('decimal')[0]);
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

  // TODO: full test of sourcemap elements, plus snapshot

  it('should have a source map', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toBeDefined();
  });

  it('should have type property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
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
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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

  // TODO: full test of sourcemap elements, plus snapshot

  it('should have a source map', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toBeDefined();
  });

  it('should have type property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
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
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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

  // TODO: full test of sourcemap elements, plus snapshot

  it('should have a source map', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toBeDefined();
  });

  it('should have type property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
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
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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

  // TODO: full test of sourcemap elements, plus snapshot

  it('should have a source map', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toBeDefined();
  });

  it('should have type property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
  });
});

describe('when building a common property with extension override', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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

  // TODO: full test of sourcemap elements, plus snapshot

  it('should have a source map', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toBeDefined();
  });

  it('should have type property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
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
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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

  // TODO: full test of sourcemap elements, plus snapshot

  it('should have a source map', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toBeDefined();
  });

  it('should have type property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
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
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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
    const builder = new DomainEntityBuilder(entityRepository, [], new Map());

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

describe('when building required association property', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const propertyType: string = 'association';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const metaEdId: string = '1';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, propertyDocumentation, true, false, false, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have association property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties).toHaveLength(1);
  });

  it('should have type', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].type).toBe(propertyType);
  });

  it('should have documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe(propertyDocumentation);
  });

  it('should have metaEdName', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].metaEdId).toBe(metaEdId);
  });

  it('should have namespaceInfo', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].namespaceInfo).toBeDefined();
  });

  it('should have parentEntityName', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].parentEntityName).toBe(entityName);
  });

  it('should have parentEntity', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].parentEntity).toBeDefined();
  });

  it('should have isRequired', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].isRequired).toBeTruthy();
  });

  it('should have source map for type', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.type.tokenText).toBe(propertyType);
  });

  it('should have source map for documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.documentation).toBeDefined();
  });

  it('should have source map for metaEdName', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.metaEdName).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.metaEdName.tokenText).toBe(propertyName);
  });

  it('should have source map for metaEdId', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.metaEdId).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have source map for parentEntityName', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.parentEntityName).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.parentEntityName.tokenText).toBe(entityName);
  });

  it('should have source map for parentEntity', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.parentEntity).toBeDefined();
  });

  it('should have source map for isRequired', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isRequired).toBeDefined();
  });

  it('should have source map with line, column, text for each property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap).toMatchSnapshot();
  });
});

describe('when building association property with inherited documentation', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const inheritedDocumentation: string = 'inherited';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, inheritedDocumentation)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have documentationInherited', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentationInherited).toBeTruthy();
  });

  it('should not have documentation', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].documentation).toBe('');
  });

  it('should have source map for documentationInherited', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.documentationInherited).toBeDefined();
  });

  it('should have source map for documentationInherited with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.documentationInherited).toMatchSnapshot();
  });
});

describe('when building queryable association property ', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withQueryableOnlyPropertyIndicator()
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have queryable field', () => {
    expect(entityRepository.domainEntity.get(entityName).queryableFields).toHaveLength(1);
  });

  it('should have entity level source map for queryable field', () => {
    expect(entityRepository.domainEntity.get(entityName).sourceMap.queryableFields).toHaveLength(1);
  });

  it('should have entity level source map for queryable field with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).sourceMap.queryableFields).toMatchSnapshot();
  });

  it('should have source map for isQueryableOnly', () => {
    expect(entityRepository.domainEntity.get(entityName).queryableFields[0].sourceMap.isQueryableOnly).toBeDefined();
  });

  it('should have source map for isQueryableOnly with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).queryableFields[0].sourceMap.isQueryableOnly).toMatchSnapshot();
  });
});

describe('when building identity association property ', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withIdentityIndicator()
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have identity property', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties).toHaveLength(1);
  });

  it('should have entity level source map for identity properties', () => {
    expect(entityRepository.domainEntity.get(entityName).sourceMap.identityProperties).toHaveLength(1);
  });

  it('should have entity level source map for identity properties with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).sourceMap.identityProperties).toMatchSnapshot();
  });

  it('should have source map for isPartOfIdentity', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.isPartOfIdentity).toBeDefined();
  });

  it('should have source map for isPartOfIdentity with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.isPartOfIdentity).toMatchSnapshot();
  });
});

describe('when building optional association property', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have isOptional', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].isOptional).toBeTruthy();
  });

  it('should have source map for isOptional', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isOptional).toBeDefined();
  });

  it('should have source map for isOptional with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isOptional).toMatchSnapshot();
  });
});

describe('when building required collection association property', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, propertyDocumentation, true, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have isRequiredCollection', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].isRequiredCollection).toBeTruthy();
  });

  it('should have source map for isRequiredCollection', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isRequiredCollection).toBeDefined();
  });

  it('should have source map for isRequiredCollection with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isRequiredCollection).toMatchSnapshot();
  });
});

describe('when building optional collection association property', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have isOptionalCollection', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].isOptionalCollection).toBeTruthy();
  });

  it('should have source map for isOptionalCollection', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isOptionalCollection).toBeDefined();
  });

  it('should have source map for isOptionalCollection with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isOptionalCollection).toMatchSnapshot();
  });
});

describe('when building association property with context', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const contextName: string = 'ContextName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false, false)
      .withContext(contextName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have withContext', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].withContext).toBe(contextName);
  });

  it('should have source map for contextName', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.withContext).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.withContext.tokenText).toBe(contextName);
  });

  it('should have source map for contextName with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.withContext).toMatchSnapshot();
  });
});

describe('when building association property with shortened context', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const contextName: string = 'ContextName';
  const shortenToName: string = 'ShortenToName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false, false)
      .withContext(contextName, shortenToName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shortenTo', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].shortenTo).toBe(shortenToName);
  });

  it('should have source map for shortenTo', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.shortenTo).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.shortenTo.tokenText).toBe(shortenToName);
  });

  it('should have source map for shortenTo with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.shortenTo).toMatchSnapshot();
  });
});

describe('when building renamed identity association property', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const baseName: string = 'BaseName';
  const baseDocumentation: string = 'BaseDocumentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationElement(baseName)
      .withDocumentation(baseDocumentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withIdentityRenameIndicator(baseName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have identity property', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties).toHaveLength(1);
  });

  it('should have isIdentityRename', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].isIdentityRename).toBeTruthy();
  });

  it('should have baseKeyName', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].baseKeyName).toBe(baseName);
  });

  it('should have source map for isIdentityRename', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.isIdentityRename).toBeDefined();
  });

  it('should have source map for isIdentityRename with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.isIdentityRename).toMatchSnapshot();
  });

  it('should have source map for baseKeyName', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.baseKeyName).toBeDefined();
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.baseKeyName.tokenText).toBe(baseName);
  });

  it('should have source map for baseKeyName with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).identityProperties[0].sourceMap.baseKeyName).toMatchSnapshot();
  });
});

describe('when building association property with weak reference', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withIsWeakReference(true)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have isWeak', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].isWeak).toBeTruthy();
  });

  it('should have source map for isWeak', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isWeak).toBeDefined();
  });

  it('should have source map for isWeak with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].sourceMap.isWeak).toMatchSnapshot();
  });
});

describe('when building association property with merged properties', () => {
  const validationFailures: Array<ValidationFailure> = [];
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const propertyDocumentation: string = 'PropertyDocumentation';
  const mergeProperty0: string = 'MergeProperty0';
  const mergeProperty1: string = 'MergeProperty1';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation(documentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withMergePartOfReference(mergeProperty0, mergeProperty1)
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have merged property', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].mergedProperties).toHaveLength(1);
  });

  it('should have mergePropertyPath', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].mergedProperties[0].mergePropertyPath[0]).toBe(mergeProperty0);
  });

  it('should have targetPropertyPath', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].mergedProperties[0].targetPropertyPath[0]).toBe(mergeProperty1);
  });

  it('should have source map for mergedProperties', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].mergedProperties).toHaveLength(1);
  });

  it('should have source map for mergedProperties with line, column, text', () => {
    expect(entityRepository.domainEntity.get(entityName).properties[0].mergedProperties).toMatchSnapshot();
  });
});
