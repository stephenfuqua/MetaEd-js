// @flow
import {
  newMetaEdEnvironment,
  newDomain,
  newSubdomain,
  newDomainItem,
  newDomainEntity,
  newDomainEntitySubclass,
  newAssociation,
  newAssociationSubclass,
  addEntityForNamespace,
  newNamespace,
} from 'metaed-core';

import type {
  MetaEdEnvironment,
  Domain,
  Subdomain,
  DomainEntity,
  DomainEntitySubclass,
  Association,
  AssociationSubclass,
} from 'metaed-core';

import { enhance } from '../../src/enhancer/DomainBaseEntityEnhancer';

describe('when enhancing domain', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  const domainEntity1MetaEdName = 'DomainEntity1Name';
  const domainEntity2MetaEdName = 'DomainEntity2Name';

  const domainEntitySubclass1MetaEdName = 'DomainEntitySubclass1Name';
  const domainEntitySubclass2MetaEdName = 'DomainEntitySubclass2Name';

  const association1MetaEdName = 'Association1Name';
  const association2MetaEdName = 'Association2Name';

  const associationSubclass1MetaEdName = 'AssociationSubclass1Name';
  const associationSubclass2MetaEdName = 'AssociationSubclass2Name';

  const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), { metaEdName: domainEntity1MetaEdName, namespace });
  const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), { metaEdName: domainEntity2MetaEdName, namespace });

  const domainEntitySubclass1: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
    metaEdName: domainEntitySubclass1MetaEdName,
    namespace,
  });
  const domainEntitySubclass2: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
    metaEdName: domainEntitySubclass2MetaEdName,
    namespace,
  });

  const association1: Association = Object.assign(newAssociation(), { metaEdName: association1MetaEdName, namespace });
  const association2: Association = Object.assign(newAssociation(), { metaEdName: association2MetaEdName, namespace });

  const associationSubclass1: AssociationSubclass = Object.assign(newAssociationSubclass(), {
    metaEdName: associationSubclass1MetaEdName,
    namespace,
  });
  const associationSubclass2: AssociationSubclass = Object.assign(newAssociationSubclass(), {
    metaEdName: associationSubclass2MetaEdName,
    namespace,
  });

  const domainMetaEdName = 'domainMetaEdName';

  beforeAll(() => {
    const domain: Domain = Object.assign(newDomain(), { metaEdName: domainMetaEdName });
    addEntityForNamespace(namespace, domain);
    addEntityForNamespace(namespace, domainEntity1);
    addEntityForNamespace(namespace, domainEntity2);
    addEntityForNamespace(namespace, domainEntitySubclass1);
    addEntityForNamespace(namespace, domainEntitySubclass2);
    addEntityForNamespace(namespace, association1);
    addEntityForNamespace(namespace, association2);
    addEntityForNamespace(namespace, associationSubclass1);
    addEntityForNamespace(namespace, associationSubclass2);

    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntity1MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntity2MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntitySubclass1MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntitySubclass2MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: association1MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: association2MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: associationSubclass1MetaEdName, namespace }));
    domain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: associationSubclass2MetaEdName, namespace }));

    enhance(metaEd);
  });

  it('should have references to domain entities', () => {
    const domain: any = namespace.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(domainEntity1);
    expect(domain.entities).toContain(domainEntity2);
  });

  it('should have references to domain subclasses', () => {
    const domain: any = namespace.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(domainEntitySubclass1);
    expect(domain.entities).toContain(domainEntitySubclass2);
  });

  it('should have references to associations', () => {
    const domain: any = namespace.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(association1);
    expect(domain.entities).toContain(association2);
  });

  it('should have references to association subclasses', () => {
    const domain: any = namespace.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(associationSubclass1);
    expect(domain.entities).toContain(associationSubclass2);
  });
});

describe('when enhancing subdomain', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  const domainEntity1MetaEdName = 'DomainEntity1Name';
  const domainEntity2MetaEdName = 'DomainEntity2Name';

  const domainEntitySubclass1MetaEdName = 'DomainEntitySubclass1Name';
  const domainEntitySubclass2MetaEdName = 'DomainEntitySubclass2Name';

  const association1MetaEdName = 'Association1Name';
  const association2MetaEdName = 'Association2Name';

  const associationSubclass1MetaEdName = 'AssociationSubclass1Name';
  const associationSubclass2MetaEdName = 'AssociationSubclass2Name';

  const domainEntity1: DomainEntity = Object.assign(newDomainEntity(), { metaEdName: domainEntity1MetaEdName, namespace });
  const domainEntity2: DomainEntity = Object.assign(newDomainEntity(), { metaEdName: domainEntity2MetaEdName, namespace });

  const domainEntitySubclass1: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
    metaEdName: domainEntitySubclass1MetaEdName,
    namespace,
  });
  const domainEntitySubclass2: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
    metaEdName: domainEntitySubclass2MetaEdName,
    namespace,
  });

  const association1: Association = Object.assign(newAssociation(), { metaEdName: association1MetaEdName, namespace });
  const association2: Association = Object.assign(newAssociation(), { metaEdName: association2MetaEdName, namespace });

  const associationSubclass1: AssociationSubclass = Object.assign(newAssociationSubclass(), {
    metaEdName: associationSubclass1MetaEdName,
    namespace,
  });
  const associationSubclass2: AssociationSubclass = Object.assign(newAssociationSubclass(), {
    metaEdName: associationSubclass2MetaEdName,
    namespace,
  });

  const subdomainMetaEdName = 'domainMetaEdName';

  beforeAll(() => {
    const subdomain: Subdomain = Object.assign(newSubdomain(), { metaEdName: subdomainMetaEdName });
    addEntityForNamespace(namespace, subdomain);
    addEntityForNamespace(namespace, domainEntity1);
    addEntityForNamespace(namespace, domainEntity2);
    addEntityForNamespace(namespace, domainEntitySubclass1);
    addEntityForNamespace(namespace, domainEntitySubclass2);
    addEntityForNamespace(namespace, association1);
    addEntityForNamespace(namespace, association2);
    addEntityForNamespace(namespace, associationSubclass1);
    addEntityForNamespace(namespace, associationSubclass2);

    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntity1MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntity2MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntitySubclass1MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: domainEntitySubclass2MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: association1MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: association2MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: associationSubclass1MetaEdName, namespace }));
    subdomain.domainItems.push(Object.assign(newDomainItem(), { metaEdName: associationSubclass2MetaEdName, namespace }));

    enhance(metaEd);
  });

  it('should have references to domain entities', () => {
    const subdomain: any = namespace.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(domainEntity1);
    expect(subdomain.entities).toContain(domainEntity2);
  });

  it('should have references to domain subclasses', () => {
    const subdomain: any = namespace.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(domainEntitySubclass1);
    expect(subdomain.entities).toContain(domainEntitySubclass2);
  });

  it('should have references to associations', () => {
    const subdomain: any = namespace.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(association1);
    expect(subdomain.entities).toContain(association2);
  });

  it('should have references to association subclasses', () => {
    const subdomain: any = namespace.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(associationSubclass1);
    expect(subdomain.entities).toContain(associationSubclass2);
  });
});
