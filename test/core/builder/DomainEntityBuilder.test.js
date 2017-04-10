// @noflow
import DomainEntityBuilder from '../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { repositoryFactory } from '../../../src/core/model/Repository';
import type { Repository } from '../../../src/core/model/Repository';

describe('when building simple domain entity in extension namespace', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const metaEdId: string = '1';
  const projectExtension: string = 'ProjectExtension';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';
  const documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain entity', () => {
    expect(repository.domainEntity.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.domainEntity.get(entityName)).toBeDefined();
    expect(repository.domainEntity.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.domainEntity.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.domainEntity.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have correct project extension', () => {
    expect(repository.domainEntity.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not be abstract', () => {
    expect(repository.domainEntity.get(entityName).isAbstract).toBe(false);
  });

  it('should not have updates set', () => {
    expect(repository.domainEntity.get(entityName).allowPrimaryKeyUpdates).toBe(false);
  });

  it('should have correct documentation', () => {
    expect(repository.domainEntity.get(entityName).documentation).toBe(documentation);
  });

  it('should have two properties', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(2);
  });

  it('should have integer property', () => {
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('integer');
  });

  it('should have string property', () => {
    expect(repository.domainEntity.get(entityName).properties[1].metaEdName).toBe(stringPropertyName);
    expect(repository.domainEntity.get(entityName).properties[1].type).toBe('string');
  });

  it('should not have queryable fields', () => {
    expect(repository.domainEntity.get(entityName).queryableFields).toHaveLength(0);
  });
});

describe('when building domain entity without extension', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const metaEdId: string = '1';
  const entityName: string = 'EntityName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation('doc')
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain entity', () => {
    expect(repository.domainEntity.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.domainEntity.get(entityName)).toBeDefined();
    expect(repository.domainEntity.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.domainEntity.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.domainEntity.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have no project extension', () => {
    expect(repository.domainEntity.get(entityName).namespaceInfo.projectExtension).toBe('');
  });

  it('should not be abstract', () => {
    expect(repository.domainEntity.get(entityName).isAbstract).toBe(false);
  });

  it('should not have updates set', () => {
    expect(repository.domainEntity.get(entityName).allowPrimaryKeyUpdates).toBe(false);
  });

  it('should have one property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
  });

  it('should have string property', () => {
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(stringPropertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('string');
  });
});

describe('when building domain entity with a with context', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const withContextName: string = 'WithContextName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withCommonProperty(propertyName, 'doc', true, false, withContextName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have common property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('common');
  });

  it('should have with context', () => {
    expect(repository.domainEntity.get(entityName).properties[0].withContext).toBe(withContextName);
  });
});

describe('when building domain entity with a with context and shorten to', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const withContextName: string = 'WithContextName';
  const shortenToName: string = 'ShortenToName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withCommonProperty(propertyName, 'doc', true, false, withContextName, null, shortenToName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have common property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('common');
  });

  it('should have with context', () => {
    expect(repository.domainEntity.get(entityName).properties[0].withContext).toBe(withContextName);
  });

  it('should have shorten to', () => {
    expect(repository.domainEntity.get(entityName).properties[0].shortenTo).toBe(shortenToName);
  });
});

describe('when building domain entity with choice', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withChoiceProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have choice property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('choice');
  });

  it('should have correct documentation', () => {
    expect(repository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });
});

describe('when building domain entity with inline common reference', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const documentation: string = 'Documentation';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withInlineCommonProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have inline common property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('inline common');
  });

  it('should have correct documentation', () => {
    expect(repository.domainEntity.get(entityName).properties[0].documentation).toBe(documentation);
  });
});

describe('when building domain entity with queryable field', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringPropertyAsQueryableField(propertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have string property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('string');
  });

  it('should have queryable field', () => {
    expect(repository.domainEntity.get(entityName).queryableFields).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).queryableFields[0].metaEdName).toBe(propertyName);
  });
});

describe('when building domain entity with queryable only property', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const queryableOnlyName: string = 'QueryableOnlyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withStringProperty(propertyName, 'doc', true, false, '10', '2')
      .withQueryableOnlyDomainEntityProperty(queryableOnlyName, 'doc')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have string property only', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('string');
  });

  it('should have queryable field separate', () => {
    expect(repository.domainEntity.get(entityName).queryableFields).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).queryableFields[0].metaEdName).toBe(queryableOnlyName);
    expect(repository.domainEntity.get(entityName).queryableFields[0].type).toBe('domain entity');
  });
});

describe('when building domain entity with shared decimal reference', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedDecimalProperty(sharedPropertyType, propertyName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared decimal property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared decimal');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared decimal reference without name', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedDecimalProperty(sharedPropertyType, null, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared decimal property named after type', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(sharedPropertyType);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared decimal');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared integer reference', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedIntegerProperty(sharedPropertyType, propertyName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared integer property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared integer');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared integer reference without name', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedIntegerProperty(sharedPropertyType, null, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared integer property named after type', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(sharedPropertyType);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared integer');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared short reference', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedShortProperty(sharedPropertyType, propertyName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared short property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared short');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared short reference without name', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedShortProperty(sharedPropertyType, null, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared short property named after type', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(sharedPropertyType);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared short');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared string reference', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedStringProperty(sharedPropertyType, propertyName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared string property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared string');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared string reference without name', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedStringProperty(sharedPropertyType, null, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared string property named after type', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(sharedPropertyType);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared string');
  });

  it('should have correct referenced type', () => {
    expect(repository.domainEntity.get(entityName).properties[0].referencedType).toBe(sharedPropertyType);
  });
});

describe('when building domain entity with shared string reference inheriting documentation', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const sharedPropertyType: string = 'SharedPropertyType';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedStringProperty(sharedPropertyType, propertyName, 'inherited', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have shared string property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('shared string');
  });

  it('should have inherited flag set instead of documentation', () => {
    expect(repository.domainEntity.get(entityName).properties[0].documentationInherited).toBe(true);
    expect(repository.domainEntity.get(entityName).properties[0].documentation).toBe('');
  });
});

describe('when building domain entity with domain entity reference inheriting documentation', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(propertyName, 'inherited', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have domain entity property', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(1);
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('domain entity');
  });

  it('should have inherited flag set instead of documentation', () => {
    expect(repository.domainEntity.get(entityName).properties[0].documentationInherited).toBe(true);
    expect(repository.domainEntity.get(entityName).properties[0].documentation).toBe('');
  });
});

describe('when building domain entity with cascading updates', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withCascadeUpdate()
      .withDomainEntityProperty(propertyName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have updates set', () => {
    expect(repository.domainEntity.get(entityName).allowPrimaryKeyUpdates).toBe(true);
  });
});

describe('when building abstract entity in extension namespace', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const metaEdId: string = '1';
  const projectExtension: string = 'ProjectExtension';
  const entityName: string = 'EntityName';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';
  const documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAbstractEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndAbstractEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one abstract entity', () => {
    expect(repository.domainEntity.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.domainEntity.get(entityName)).toBeDefined();
    expect(repository.domainEntity.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.domainEntity.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.domainEntity.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have correct project extension', () => {
    expect(repository.domainEntity.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be abstract', () => {
    expect(repository.domainEntity.get(entityName).isAbstract).toBe(true);
  });

  it('should not have updates set', () => {
    expect(repository.domainEntity.get(entityName).allowPrimaryKeyUpdates).toBe(false);
  });

  it('should have correct documentation', () => {
    expect(repository.domainEntity.get(entityName).documentation).toBe(documentation);
  });

  it('should have two properties', () => {
    expect(repository.domainEntity.get(entityName).properties).toHaveLength(2);
  });

  it('should have integer property', () => {
    expect(repository.domainEntity.get(entityName).properties[0].metaEdName).toBe(propertyName);
    expect(repository.domainEntity.get(entityName).properties[0].type).toBe('integer');
  });

  it('should have string property', () => {
    expect(repository.domainEntity.get(entityName).properties[1].metaEdName).toBe(stringPropertyName);
    expect(repository.domainEntity.get(entityName).properties[1].type).toBe('string');
  });

  it('should not have queryable fields', () => {
    expect(repository.domainEntity.get(entityName).queryableFields).toHaveLength(0);
  });
});

describe('when building domain entity with missing begin namespace', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with uppercase namespace name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'Namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have missing namespace id and extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing namespace name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = '';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have missing namespace id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing metaed id value', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have token recognition error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing end namespace', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .sendToListener(builder);
  });

  it('should have extraneous input eof error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with lowercase project extension name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'projectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have an extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing top level entity property', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing domain entity name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with lowercase domain entity name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing documentation', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with missing property', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain entity with invalid trailing text', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '1';
  const documentation: string = 'Doc';
  const propertyName: string = 'PropertyName';
  const stringPropertyName: string = 'StringPropertyName';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainEntityBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomainEntity(entityName, metaEdId)
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, 'doc', true, false)
      .withStringProperty(stringPropertyName, 'doc', true, false, '10', '2')
      .withTrailingText(trailingText)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
