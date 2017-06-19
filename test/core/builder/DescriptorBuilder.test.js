// @noflow
import DescriptorBuilder from '../../../src/core/builder/DescriptorBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building descriptor without map type', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(entityRepository.descriptor.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.descriptor.get(entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(false);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });
});

describe('when building multiple descriptors', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()

      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('DescriptorBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate descriptors should have validation failures for each entity -> Descriptor 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate descriptors should have validation failures for each entity -> Descriptor 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('DescriptorBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate descriptors should have validation failures for each entity -> Descriptor 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate descriptors should have validation failures for each entity -> Descriptor 2 sourceMap');
  });
});

describe('when building descriptor with optional map type', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const mapTypeDocumentation: string = 'MapTypeDocumentation';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(false)
      .withDocumentation(mapTypeDocumentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(0);
  });

  it('should have optional map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(true);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(false);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(entityRepository.mapTypeEnumeration.size).toBe(1);
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`)).toBeDefined();
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have map type enumeration documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building descriptor with required map type', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const mapTypeDocumentation: string = 'MapTypeDocumentation';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(true)
      .withDocumentation(mapTypeDocumentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(0);
  });

  it('should have required map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(true);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(entityRepository.mapTypeEnumeration.size).toBe(1);
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`)).toBeDefined();
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have map type enumeration documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building descriptor with no descriptor name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with lowercase descriptor name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(entityRepository.descriptor.get('Name')).toBeDefined();
    expect(entityRepository.descriptor.get('Name').metaEdName).toBe('Name');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get('Name').documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(entityRepository.descriptor.get('Name').properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(entityRepository.descriptor.get('Name').properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.descriptor.get('Name').properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(entityRepository.descriptor.get('Name').isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get('Name').isMapTypeRequired).toBe(false);
    expect(entityRepository.descriptor.get('Name').mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with no documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe('');
  });

  it('should have one property', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(entityRepository.descriptor.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.descriptor.get(entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(false);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with no documentation in map type', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(true)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(0);
  });

  it('should have required map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(true);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(entityRepository.mapTypeEnumeration.size).toBe(1);
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`)).toBeDefined();
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should not  have map type enumeration documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.documentation).toBe('');
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with no enumeration item in map type', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const mapTypeDocumentation: string = 'MapTypeDocumentation';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(true)
      .withDocumentation(mapTypeDocumentation)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(0);
  });

  it('should not have required map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(true);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(entityRepository.mapTypeEnumeration.size).toBe(1);
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`)).toBeDefined();
    expect(entityRepository.mapTypeEnumeration.get(`${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have map type enumeration documentation', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with no enumeration item', () => {
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Documentation';
  const propertyName: string = 'PropertyName';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DescriptorBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withTrailingText(trailingText)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one descriptor', () => {
    expect(entityRepository.descriptor.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(entityRepository.descriptor.get(entityName)).toBeDefined();
    expect(entityRepository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(entityRepository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(entityRepository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(entityRepository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(entityRepository.descriptor.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(entityRepository.descriptor.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(entityRepository.descriptor.get(entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(entityRepository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(entityRepository.descriptor.get(entityName).isMapTypeRequired).toBe(false);
    expect(entityRepository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
