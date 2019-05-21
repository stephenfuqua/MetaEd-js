import { AssociationBuilder } from '../../src/builder/AssociationBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getAssociation } from '../TestHelper';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';
import { EntityProperty } from '../../src/model/property/EntityProperty';
import { DomainEntityProperty } from '../../src/model/property/DomainEntityProperty';

describe('when building association in extension namespace', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';

  let namespace: any = null;
  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getAssociation(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have association documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0] as DomainEntityProperty;

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.definesAssociation).toBe(true);
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0] as DomainEntityProperty;

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.definesAssociation).toBe(true);
  });

  it('should have second domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1] as DomainEntityProperty;

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.definesAssociation).toBe(true);
  });

  it('should have second domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1] as DomainEntityProperty;

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.definesAssociation).toBe(true);
  });
});

describe('when building association without extension', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';

  let namespace: any = null;
  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
    expect(getAssociation(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getAssociation(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have no project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe('');
  });

  it('should have association documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building duplicate associations', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';

  let namespace: any = null;
  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
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
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures.length).toBe(2);
  });

  it('should have validation failures for each entity', (): void => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate associations should have validation failures for each entity -> Association 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate associations should have validation failures for each entity -> Association 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate associations should have validation failures for each entity -> Association 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate associations should have validation failures for each entity -> Association 2 sourceMap',
    );
  });
});

describe('when building association with additional identity property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const identityProperty = 'IdentityProperty';

  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartAssociation(entityName, '1')
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty(firstDomainEntityName, 'doc', null, '2')
      .withAssociationDomainEntityProperty(secondDomainEntityName, 'doc', null, '3')
      .withDomainEntityIdentity(identityProperty, 'doc')
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have three properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(3);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have second domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have other domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[2];

    expect(domainEntityProperty.metaEdName).toBe(identityProperty);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });

  it('should have other domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[2];

    expect(domainEntityProperty.metaEdName).toBe(identityProperty);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
  });
});

describe('when building association with no association name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build association', (): void => {
    expect(namespace.entity.association.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with lowercase association name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build association', (): void => {
    expect(namespace.entity.association.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no documentation', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getAssociation(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have two properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have second domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no domain entity property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withStartProperty('domain entity', firstDomainEntityName, firstDomainEntityMetaEdId)
      .withDocumentation(documentation2)
      .roleName(null)
      .withEndProperty()
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe(documentation1);
  });

  it('should have no property', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no documentation in the first domain entity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withStartProperty('domain entity', firstDomainEntityName, firstDomainEntityMetaEdId)
      .roleName(null)
      .withEndProperty()
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getAssociation(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have second domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have second domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with no documentation in the second domain entity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const documentation2 = 'documentation2';
  const firstDomainEntityMetaEdId = '2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withStartProperty('domain entity', secondDomainEntityName, secondDomainEntityMetaEdId)
      .roleName(null)
      .withEndProperty()
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getAssociation(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property with no documentation', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have second domain entity property as identity property with no documentation', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe('');
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withTrailingText(trailingText)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one association', (): void => {
    expect(namespace.entity.association.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getAssociation(namespace.entity, entityName)).toBeDefined();
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getAssociation(namespace.entity, entityName).metaEdId).toBe(entityMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getAssociation(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have documentation', (): void => {
    expect(getAssociation(namespace.entity, entityName).documentation).toBe(documentation1);
  });

  it('should have two properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).properties).toHaveLength(2);
  });

  it('should have first domain entity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have first domain entity property as identity property', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[0];

    expect(domainEntityProperty.metaEdName).toBe(firstDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(firstDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation2);
  });

  it('should have second domain entity property with', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).properties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have second domain entity property as identity property with', (): void => {
    const domainEntityProperty = getAssociation(namespace.entity, entityName).identityProperties[1];

    expect(domainEntityProperty.metaEdName).toBe(secondDomainEntityName);
    expect(domainEntityProperty.type).toBe('domainEntity');
    expect(domainEntityProperty.metaEdId).toBe(secondDomainEntityMetaEdId);
    expect(domainEntityProperty.isPartOfIdentity).toBe(true);
    expect(domainEntityProperty.documentation).toBe(documentation3);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building association source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const entityMetaEdId = '1';
  const documentation1 = 'documentation1';
  const firstDomainEntityName = 'FirstDomainEntityName';
  const firstDomainEntityMetaEdId = '2';
  const documentation2 = 'documentation2';
  const secondDomainEntityName = 'SecondDomainEntityName';
  const secondDomainEntityMetaEdId = '3';
  const documentation3 = 'documentation3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new AssociationBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartAssociation(entityName, entityMetaEdId)
      .withDocumentation(documentation1)
      .withCascadeUpdate()
      .withAssociationDomainEntityProperty(firstDomainEntityName, documentation2, null, firstDomainEntityMetaEdId)
      .withAssociationDomainEntityProperty(secondDomainEntityName, documentation3, null, secondDomainEntityMetaEdId)
      .withEndAssociation()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have an allowPrimaryKeyUpdates property', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap.allowPrimaryKeyUpdates).toBeDefined();
  });

  it('should have a documentation property', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have two identity properties', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap.identityProperties).toBeDefined();
    expect(getAssociation(namespace.entity, entityName).sourceMap.identityProperties).toHaveLength(2);
  });

  it('should have a metaEdId property', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have a metaEdName property', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have a type property', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have source map data', (): void => {
    expect(getAssociation(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });

  it('should have two identity properties with sourceMaps', (): void => {
    const properties: EntityProperty[] = getAssociation(namespace.entity, entityName).identityProperties;
    expect(properties[0].sourceMap).toMatchSnapshot('Property 0');
    expect(properties[1].sourceMap).toMatchSnapshot('Property 1');
  });
});
