import { EnumerationBuilder } from '../../src/builder/EnumerationBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getEnumeration, getSchoolYearEnumeration } from '../TestHelper';
import { EnumerationSourceMap } from '../../src/model/Enumeration';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building single enumeration', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getEnumeration(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have one enumeration item', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });
});

describe('when building school year enumeration', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityType = 'schoolYearEnumeration';
  const entityName = 'SchoolYear';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one school year enumeration', () => {
    expect(namespace.entity.schoolYearEnumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getSchoolYearEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getSchoolYearEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have type', () => {
    expect(getSchoolYearEnumeration(namespace.entity, entityName).type).toBe(entityType);
  });

  it('should have source map for type', () => {
    expect(getSchoolYearEnumeration(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map with line, column, text', () => {
    expect(getSchoolYearEnumeration(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});

describe('when building duplicate enumerations', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()

      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate enumerations should have validation failures for each entity -> Enumeration 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate enumerations should have validation failures for each entity -> Enumeration 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate enumerations should have validation failures for each entity -> Enumeration 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate enumerations should have validation failures for each entity -> Enumeration 2 sourceMap',
    );
  });
});

describe('when building enumeration without item documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have enumeration item with short description', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with no documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].documentation).toBe('');
  });
});

describe('when building multiple enumerations', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName1 = 'EntityName1';
  const metaEdId1 = '1';
  const entityName2 = 'EntityName2';
  const metaEdId2 = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName1, metaEdId1)
      .withDocumentation('doc')
      .withEnumerationItem('sd1')
      .withEndEnumeration()

      .withStartEnumeration(entityName2, metaEdId2)
      .withDocumentation('doc')
      .withEnumerationItem('sd2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build two enumerations', () => {
    expect(namespace.entity.enumeration.size).toBe(2);
  });

  it('should both be found in entityRepository', () => {
    expect(getEnumeration(namespace.entity, entityName1)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName1).metaEdName).toBe(entityName1);

    expect(getEnumeration(namespace.entity, entityName2)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName2).metaEdName).toBe(entityName2);
  });

  it('should both have metaEdIds', () => {
    expect(getEnumeration(namespace.entity, entityName1).metaEdId).toBe(metaEdId1);
    expect(getEnumeration(namespace.entity, entityName2).metaEdId).toBe(metaEdId2);
  });
});

describe('when building enumeration with no enumeration name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with lowercase enumeration name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const expectedName = 'Name';
  const entityMetaEdId = '1';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, entityMetaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, expectedName)).toBeDefined();
    expect(getEnumeration(namespace.entity, expectedName).metaEdName).toBe(expectedName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getEnumeration(namespace.entity, expectedName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, expectedName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(getEnumeration(namespace.entity, expectedName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, expectedName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getEnumeration(namespace.entity, expectedName).properties).toHaveLength(0);
  });

  it('should have one enumeration item', () => {
    expect(getEnumeration(namespace.entity, expectedName).enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getEnumeration(namespace.entity, expectedName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(getEnumeration(namespace.entity, expectedName).enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getEnumeration(namespace.entity, expectedName).enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, entityMetaEdId)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have no properties', () => {
    expect(getEnumeration(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have one enumeration item', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with no enumeration item', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation = 'Documentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, entityMetaEdId)
      .withDocumentation(documentation)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getEnumeration(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have no enumeration item', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with empty enumeration item description', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTrailingText(`\r\nitem  [${itemMetaEdId}]`)
      .withTrailingText(`documentation "${itemDocumentation}"`)
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getEnumeration(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have one enumeration item', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with no short description', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].shortDescription).toBe('');
  });

  it('should have enumeration item with documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });

  it('should have missing text error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withTrailingText(trailingText)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one enumeration', () => {
    expect(namespace.entity.enumeration.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getEnumeration(namespace.entity, entityName)).toBeDefined();
    expect(getEnumeration(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have project extension', () => {
    expect(getEnumeration(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have no properties', () => {
    expect(getEnumeration(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have one enumeration item', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems).toHaveLength(1);
  });

  it('should have enumeration item with short description', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].shortDescription).toBe(itemShortDescription);
  });

  it('should have enumeration item with documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].documentation).toBe(itemDocumentation);
  });

  it('should have enumeration item with metaEdId ', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].metaEdId).toBe(itemMetaEdId);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building enumeration source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '1';
  const documentation = 'Documentation';
  const itemShortDescription = 'ItemShortDescription';
  const itemDocumentation = 'ItemDocumentation';
  const itemMetaEdId = '2';
  const itemShortDescription2 = 'ItemShortDescription2';
  const itemDocumentation2 = 'ItemDocumentation2';
  const itemMetaEdId2 = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new EnumerationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartEnumeration(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEnumerationItem(itemShortDescription, itemDocumentation, itemMetaEdId)
      .withEnumerationItem(itemShortDescription2, itemDocumentation2, itemMetaEdId2)
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have type', () => {
    expect(getEnumeration(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(getEnumeration(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have for enumerationItems', () => {
    expect((getEnumeration(namespace.entity, entityName).sourceMap as EnumerationSourceMap).enumerationItems).toHaveLength(
      2,
    );
  });

  it('should have first enumeration item type', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].sourceMap.type).toBeDefined();
  });

  it('should have first enumeration item shortDescription', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].sourceMap.shortDescription).toBeDefined();
  });

  it('should have first enumeration item metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].sourceMap.metaEdId).toBeDefined();
  });

  it('should have first enumeration item documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].sourceMap.documentation).toBeDefined();
  });

  it('should have second enumeration item type', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[1].sourceMap.type).toBeDefined();
  });

  it('should have second enumeration item shortDescription', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[1].sourceMap.shortDescription).toBeDefined();
  });

  it('should have second enumeration item metaEdId', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[1].sourceMap.metaEdId).toBeDefined();
  });

  it('should have second enumeration item documentation', () => {
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[1].sourceMap.documentation).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(getEnumeration(namespace.entity, entityName).sourceMap).toMatchSnapshot();
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[0].sourceMap).toMatchSnapshot();
    expect(getEnumeration(namespace.entity, entityName).enumerationItems[1].sourceMap).toMatchSnapshot();
  });
});
