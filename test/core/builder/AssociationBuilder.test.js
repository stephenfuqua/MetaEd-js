// @noflow
import AssociationBuilder from '../../../src/core/builder/AssociationBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { repositoryFactory } from '../../../src/core/model/Repository';
import type { Repository } from '../../../src/core/model/Repository';

describe('when building association in extension namespace', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association', () => {
    expect(repository.association.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.association.get(entityName)).toBeDefined();
  });

  it('should have correct namespace', () => {
    expect(repository.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have correct project extension', () => {
    expect(repository.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct association documentation', () => {
    expect(repository.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(repository.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building association without extension', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association', () => {
    expect(repository.association.size).toBe(1);
  });

  it('should be found in repository', () => {
    expect(repository.association.get(entityName)).toBeDefined();
    expect(repository.association.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have correct namespace', () => {
    expect(repository.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(repository.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have no project extension', () => {
    expect(repository.association.get(entityName).namespaceInfo.projectExtension).toBe('');
  });

  it('should have correct association documentation', () => {
    expect(repository.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(repository.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});


describe('when building association with additional identity property', () => {
  const repository: Repository = repositoryFactory();
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const identityProperty: string = 'IdentityProperty';


  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartAssociation(entityName, '1')
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty(firstDomainEntityName, 'doc', null, '2')
      .withAssociationDomainEntityProperty(secondDomainEntityName, 'doc', null, '3')
      .withDomainEntityIdentity(identityProperty, 'doc')
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have three properties', () => {
    expect(repository.association.get(entityName).properties).toHaveLength(3);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have other domain entity property', () => {
    const domainEntityProperty = repository.association.get(entityName).properties[2];

    expect(domainEntityProperty.metaEdName).toBe(identityProperty);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have other domain entity property as identity property', () => {
    const domainEntityProperty = repository.association.get(entityName).identityProperties[2];

    expect(domainEntityProperty.metaEdName).toBe(identityProperty);
    expect(domainEntityProperty.type).toBe('domain entity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building association with missing association name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with lowercase association name', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with missing documentation', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const entityMetaEdId: string = '1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with missing domain entity property', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withStartProperty('domain entity', firstDomainEntityName, firstDomainEntityMetaEdId)
      .withDocumentation(documentation2)
      .withContext(null)
      .withEndProperty()
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with missing documentation in the first domain entity', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withStartProperty('domain entity', firstDomainEntityName, firstDomainEntityMetaEdId)
      .withContext(null)
      .withEndProperty()
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with missing documentation in the second domain entity', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const documentation2: string = 'documentation2';
  const firstDomainEntityMetaEdId: string = '2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withStartProperty('domain entity', secondDomainEntityName, secondDomainEntityMetaEdId)
      .withContext(null)
      .withEndProperty()
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with invalid trailing text', () => {
  const repository: Repository = repositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const entityMetaEdId: string = '1';
  const documentation1: string = 'documentation1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new AssociationBuilder(repository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withTrailingText(trailingText)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

