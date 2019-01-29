import { DescriptorBuilder } from '../../src/builder/DescriptorBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getDescriptor, getMapTypeEnumeration } from '../TestHelper';
import { DescriptorSourceMap } from '../../src/model/Descriptor';
import { EnumerationSourceMap } from '../../src/model/Enumeration';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building descriptor without map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(getDescriptor(namespace.entity, entityName).properties[0].metaEdName).toBe(propertyName);
    expect(getDescriptor(namespace.entity, entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });
});

describe('when building multiple descriptors', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()

      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate descriptors should have validation failures for each entity -> Descriptor 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate descriptors should have validation failures for each entity -> Descriptor 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate descriptors should have validation failures for each entity -> Descriptor 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate descriptors should have validation failures for each entity -> Descriptor 2 sourceMap',
    );
  });
});

describe('when building descriptor with optional map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const mapTypeDocumentation = 'MapTypeDocumentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(false)
      .withDocumentation(mapTypeDocumentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have optional map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(true);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(namespace.entity.mapTypeEnumeration.size).toBe(1);
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`)).toBeDefined();
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have map type enumeration documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(
      itemShortDescription,
    );
  });

  it('should have enumeration item with documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(
      itemDocumentation,
    );
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building descriptor with required map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const mapTypeDocumentation = 'MapTypeDocumentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(true)
      .withDocumentation(mapTypeDocumentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have required map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(true);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(namespace.entity.mapTypeEnumeration.size).toBe(1);
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`)).toBeDefined();
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have map type enumeration documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(
      itemShortDescription,
    );
  });

  it('should have enumeration item with documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(
      itemDocumentation,
    );
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building descriptor with no descriptor name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const metaEdId = '1';
  const documentation = 'Documentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with lowercase descriptor name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build no descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have one property', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(getDescriptor(namespace.entity, entityName).properties[0].metaEdName).toBe(propertyName);
    expect(getDescriptor(namespace.entity, entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with no documentation in map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(true)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have required map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(true);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).not.toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(namespace.entity.mapTypeEnumeration.size).toBe(1);
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`)).toBeDefined();
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should not  have map type enumeration documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.documentation).toBe('');
  });

  it('should have map type enumeration with one enumeration item', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].shortDescription).toBe(
      itemShortDescription,
    );
  });

  it('should have enumeration item with documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].documentation).toBe(
      itemDocumentation,
    );
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with no enumeration item in map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const mapTypeDocumentation = 'MapTypeDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStartMapType(true)
      .withDocumentation(mapTypeDocumentation)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should not have required map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(true);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have map type enumeration in entityRepository', () => {
    expect(namespace.entity.mapTypeEnumeration.size).toBe(1);
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`)).toBeDefined();
    expect(getMapTypeEnumeration(namespace.entity, `${entityName}Map`).metaEdName).toBe(`${entityName}Map`);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.metaEdName).toBe(`${entityName}Map`);
  });

  it('should have map type enumeration documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.documentation).toBe(mapTypeDocumentation);
  });

  it('should have map type enumeration with no enumeration item', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withTrailingText(trailingText)
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one descriptor', () => {
    expect(namespace.entity.descriptor.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(getDescriptor(namespace.entity, entityName)).toBeDefined();
    expect(getDescriptor(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getDescriptor(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have one property', () => {
    expect(getDescriptor(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have integer property', () => {
    expect(getDescriptor(namespace.entity, entityName).properties[0].metaEdName).toBe(propertyName);
    expect(getDescriptor(namespace.entity, entityName).properties[0].type).toBe('integer');
  });

  it('should not have map type enumeration', () => {
    expect(getDescriptor(namespace.entity, entityName).isMapTypeOptional).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).isMapTypeRequired).toBe(false);
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems).toHaveLength(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building descriptor source map with optional map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStartMapType(false)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have type', () => {
    expect(getDescriptor(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(getDescriptor(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have metaEdId', () => {
    expect(getDescriptor(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have isMapTypeOptional', () => {
    expect((getDescriptor(namespace.entity, entityName).sourceMap as DescriptorSourceMap).isMapTypeOptional).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(getDescriptor(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});

describe('when building descriptor source map with required map type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStartMapType(true)
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have isMapTypeRequired', () => {
    expect((getDescriptor(namespace.entity, entityName).sourceMap as DescriptorSourceMap).isMapTypeRequired).toBeDefined();
  });

  it('should have mapTypeEnumeration', () => {
    expect((getDescriptor(namespace.entity, entityName).sourceMap as DescriptorSourceMap).mapTypeEnumeration).toBeDefined();
  });

  it('should have source map with line, column, text for each property', () => {
    expect(getDescriptor(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});

describe('when building required map type enumeration source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const mapDocumentation = 'MapDocumentation';
  const shortDescription = 'ShortDescription';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', false, false)
      .withStartMapType(true)
      .withDocumentation(mapDocumentation)
      .withEnumerationItem(shortDescription, 'doc', '2')
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have type', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.sourceMap.documentation).toBeDefined();
  });

  it('should have enumerationItems', () => {
    expect(
      (getDescriptor(namespace.entity, entityName).mapTypeEnumeration.sourceMap as EnumerationSourceMap).enumerationItems,
    ).toHaveLength(1);
  });

  it('should have line, column, text for each property', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.sourceMap).toMatchSnapshot();
  });
});

describe('when building map type enumeration item source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  const mapDocumentation = 'MapDocumentation';
  const shortDescription = 'ShortDescription';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DescriptorBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDescriptor(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStartMapType(true)
      .withDocumentation(mapDocumentation)
      .withEnumerationItem(shortDescription, 'doc', '2')
      .withEndMapType()
      .withEndDescriptor()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have type', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(
      getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].sourceMap.documentation,
    ).toBeDefined();
  });

  it('should have metaEdId', () => {
    expect(
      getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].sourceMap.metaEdId,
    ).toBeDefined();
  });

  it('should have shortDescription', () => {
    expect(
      getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].sourceMap.shortDescription,
    ).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(getDescriptor(namespace.entity, entityName).mapTypeEnumeration.enumerationItems[0].sourceMap).toMatchSnapshot();
  });
});
