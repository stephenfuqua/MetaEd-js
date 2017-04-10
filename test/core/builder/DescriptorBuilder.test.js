// @noflow
import DescriptorBuilder from '../../../src/core/builder/DescriptorBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { repositoryFactory } from '../../../src/core/model/Repository';
import type { Repository } from '../../../src/core/model/Repository';

describe('when building descriptor without map type', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

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
    expect(repository.descriptor.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.descriptor.get(entityName)).toBeDefined();
    expect(repository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have correct project extension', () => {
    expect(repository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct documentation', () => {
    expect(repository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(repository.descriptor.get(entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(repository.descriptor.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.descriptor.get(entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(repository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(repository.descriptor.get(entityName).isMapTypeRequired).toBe(false);
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });
});

describe('when building descriptor with optional map type', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const mapTypeDocumentation: string = 'MapTypeDocumentation';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

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
    expect(repository.descriptor.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.descriptor.get(entityName)).toBeDefined();
    expect(repository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have correct project extension', () => {
    expect(repository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct documentation', () => {
    expect(repository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(repository.descriptor.get(entityName).properties).toHaveLength(0);
  });

  it('should have optional map type enumeration', () => {
    expect(repository.descriptor.get(entityName).isMapTypeOptional).toBe(true);
    expect(repository.descriptor.get(entityName).isMapTypeRequired).toBe(false);
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in repository', () => {
    expect(repository.mapTypeEnumeration.size).toBe(1);
    expect(repository.mapTypeEnumeration.get(`${entityName}Map`)).toBeDefined();
    expect(repository.mapTypeEnumeration.get(`${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have correct map type enumeration documentation', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with correct short description', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with correct documentation', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with correct metaEdId ', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building descriptor with required map type', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const mapTypeDocumentation: string = 'MapTypeDocumentation';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

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
    expect(repository.descriptor.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.descriptor.get(entityName)).toBeDefined();
    expect(repository.descriptor.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.descriptor.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.descriptor.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have correct project extension', () => {
    expect(repository.descriptor.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct documentation', () => {
    expect(repository.descriptor.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(repository.descriptor.get(entityName).properties).toHaveLength(0);
  });

  it('should have required map type enumeration', () => {
    expect(repository.descriptor.get(entityName).isMapTypeOptional).toBe(false);
    expect(repository.descriptor.get(entityName).isMapTypeRequired).toBe(true);
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in repository', () => {
    expect(repository.mapTypeEnumeration.size).toBe(1);
    expect(repository.mapTypeEnumeration.get(`${entityName}Map`)).toBeDefined();
    expect(repository.mapTypeEnumeration.get(`${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have correct map type enumeration documentation', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with correct short description', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with correct documentation', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with correct metaEdId ', () => {
    expect(repository.descriptor.get(entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building descriptor with missing descriptor name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with lowercase descriptor name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with missing documentation', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with missing documentation in map type', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

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

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with missing enumeration item in map type', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const mapTypeDocumentation: string = 'MapTypeDocumentation';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

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

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with invalid trailing text', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DescriptorBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTrailingText(trailingText)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
