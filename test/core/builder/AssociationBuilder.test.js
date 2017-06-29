// @noflow
import AssociationBuilder from '../../../src/core/builder/AssociationBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../src/core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building association in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have association documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building association without extension', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
    expect(metaEd.entity.association.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have no project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe('');
  });

  it('should have association documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building duplicate associations', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()

      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have two validation failures', () => {
    expect(validationFailures.length).toBe(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate associations should have validation failures for each entity -> Association 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate associations should have validation failures for each entity -> Association 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate associations should have validation failures for each entity -> Association 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate associations should have validation failures for each entity -> Association 2 sourceMap');
  });
});

describe('when building association with additional identity property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  const entityName: string = 'EntityName';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const identityProperty: string = 'IdentityProperty';

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

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
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(3);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have other domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[2];

    expect(domainEntityProperty.metaEdName).toBe(identityProperty);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have other domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[2];

    expect(domainEntityProperty.metaEdName).toBe(identityProperty);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building association with no association name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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

  it('should not build association', () => {
    expect(metaEd.entity.association.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with lowercase association name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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

  it('should not build association', () => {
    expect(metaEd.entity.association.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const entityMetaEdId: string = '1';
  const firstDomainEntityName: string = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId: string = '2';
  const documentation2: string = 'documentation2';
  const secondDomainEntityName: string = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId: string = '3';
  const documentation3: string = 'documentation3';

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe('');
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no domain entity property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property with no metaEdName, metaEdId, or documentation', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe('');
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe('');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have second domain entity property as identity property with no metaEdName, metaEdId, or documentation', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe('');
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe('');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no documentation in the first domain entity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have second domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have second domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no documentation in the second domain entity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

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

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property with no documentation', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have second domain entity property as identity property with no documentation', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
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
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

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

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.association.get(entityName)).toBeDefined();
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.association.get(entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.association.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.association.get(entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', () => {
    expect(metaEd.entity.association.get(entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property with', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have second domain entity property as identity property with', () => {
    const domainEntityProperty = metaEd.entity.association.get(entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association source map', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
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
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withCascadeUpdate()
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have an allowPrimaryKeyUpdates property', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap.allowPrimaryKeyUpdates).toBeDefined();
  });

  it('should have a documentation property', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have two identity properties', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap.identityProperties).toBeDefined();
    expect(metaEd.entity.association.get(entityName).sourceMap.identityProperties).toHaveLength(2);
  });

  it('should have a metaEdId property', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have a metaEdName property', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have a type property', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map data', () => {
    expect(metaEd.entity.association.get(entityName).sourceMap).toMatchSnapshot();
  });
});
