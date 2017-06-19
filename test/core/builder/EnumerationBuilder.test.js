// @noflow
import EnumerationBuilder from '../../../src/core/builder/EnumerationBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building single enumeration', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one enumeration', () => {
    expect(entityRepository.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.enumeration.get(entityName)).toBeDefined();
    expect(entityRepository.enumeration.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.enumeration.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(entityRepository.enumeration.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.enumeration.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct documentation', () => {
    expect(entityRepository.enumeration.get(entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(entityRepository.enumeration.get(entityName).properties).toHaveLength(0);
  });

  it('should have one enumeration item', () => {
    expect(entityRepository.enumeration.get(entityName).enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with correct short description', () => {
    expect(entityRepository.enumeration.get(entityName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with correct documentation', () => {
    expect(entityRepository.enumeration.get(entityName).enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with correct metaEdId ', () => {
    expect(entityRepository.enumeration.get(entityName).enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building duplicate enumerations', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';
  const itemDocumentation: string = 'ItemDocumentation';
  const itemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()

      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one enumeration', () => {
    expect(entityRepository.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.enumeration.get(entityName)).toBeDefined();
    expect(entityRepository.enumeration.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('EnumerationBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate enumerations should have validation failures for each entity -> Enumeration 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate enumerations should have validation failures for each entity -> Enumeration 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('EnumerationBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate enumerations should have validation failures for each entity -> Enumeration 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate enumerations should have validation failures for each entity -> Enumeration 2 sourceMap');
  });
});

describe('when building enumeration without item documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have correct documentation', () => {
    expect(entityRepository.enumeration.get(entityName).documentation).toBe(documentation);
  });

  it('should have enumeration item with correct short description', () => {
    expect(entityRepository.enumeration.get(entityName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with no documentation', () => {
    expect(entityRepository.enumeration.get(entityName).enumerationItems[0].documentation).toBe('');
  });
});

describe('when building multiple enumerations', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName1: string = 'EntityName1';
  const metaEdId1: string = '1';
  const entityName2: string = 'EntityName2';
  const metaEdId2: string = '2';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName1, metaEdId1)
      .withDocumentation('doc')
      .withEnumerationItem('sd1')
      .withEndEnumeration()

      .withStartEnumeration(entityName2, metaEdId2)
      .withDocumentation('doc')
      .withEnumerationItem('sd2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build two enumerations', () => {
    expect(entityRepository.enumeration.size).toBe(2);
  });

  it('should both be found in entityRepository', () => {
    expect(entityRepository.enumeration.get(entityName1)).toBeDefined();
    expect(entityRepository.enumeration.get(entityName1).metaEdName).toBe(entityName1);

    expect(entityRepository.enumeration.get(entityName2)).toBeDefined();
    expect(entityRepository.enumeration.get(entityName2).metaEdName).toBe(entityName2);
  });

  it('should both have correct metaEdIds', () => {
    expect(entityRepository.enumeration.get(entityName1).metaEdId).toBe(metaEdId1);
    expect(entityRepository.enumeration.get(entityName2).metaEdId).toBe(metaEdId2);
  });
});

describe('when building enumeration with missing enumeration name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with lowercase enumeration name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const itemShortDescription: string = 'ItemShortDescription';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with missing enumeration item', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with empty enumeration item description', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const documentation: string = 'Doc';
  const itemShortDescription: string = '';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const documentation: string = 'Doc';
  const itemShortDescription: string = 'ItemShortDescription';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new EnumerationBuilder(entityRepository, validationFailures, new Map());

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withTrailingText(trailingText)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
