// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { Domain } from '../../../../src/core/model/Domain';
import { domainFactory } from '../../../../src/core/model/Domain';
import type { Subdomain } from '../../../../src/core/model/Subdomain';
import { subdomainFactory } from '../../../../src/core/model/Subdomain';
import { domainItemFactory } from '../../../../src/core/model/DomainItem';
import type { DomainEntity } from '../../../../src/core/model/DomainEntity';
import { domainEntityFactory } from '../../../../src/core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../src/core/model/DomainEntitySubclass';
import { domainEntitySubclassFactory } from '../../../../src/core/model/DomainEntitySubclass';
import type { Association } from '../../../../src/core/model/Association';
import { associationFactory } from '../../../../src/core/model/Association';
import type { AssociationSubclass } from '../../../../src/core/model/AssociationSubclass';
import { associationSubclassFactory } from '../../../../src/core/model/AssociationSubclass';
import { addEntity } from '../../../../src/core/model/EntityRepository';

import { enhance } from '../../../../src/plugin/unified/enhancer/DomainBaseEntityEnhancer';

describe('when enhancing domain', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();

  const domainEntity1MetaEdName = 'DomainEntity1Name';
  const domainEntity2MetaEdName = 'DomainEntity2Name';

  const domainEntitySubclass1MetaEdName = 'DomainEntitySubclass1Name';
  const domainEntitySubclass2MetaEdName = 'DomainEntitySubclass2Name';

  const association1MetaEdName = 'Association1Name';
  const association2MetaEdName = 'Association2Name';

  const associationSubclass1MetaEdName = 'AssociationSubclass1Name';
  const associationSubclass2MetaEdName = 'AssociationSubclass2Name';

  const domainEntity1: DomainEntity = Object.assign(domainEntityFactory(), { metaEdName: domainEntity1MetaEdName });
  const domainEntity2: DomainEntity = Object.assign(domainEntityFactory(), { metaEdName: domainEntity2MetaEdName });

  const domainEntitySubclass1: DomainEntitySubclass = Object.assign(domainEntitySubclassFactory(), { metaEdName: domainEntitySubclass1MetaEdName });
  const domainEntitySubclass2: DomainEntitySubclass = Object.assign(domainEntitySubclassFactory(), { metaEdName: domainEntitySubclass2MetaEdName });

  const association1: Association = Object.assign(associationFactory(), { metaEdName: association1MetaEdName });
  const association2: Association = Object.assign(associationFactory(), { metaEdName: association2MetaEdName });

  const associationSubclass1: AssociationSubclass = Object.assign(associationSubclassFactory(), { metaEdName: associationSubclass1MetaEdName });
  const associationSubclass2: AssociationSubclass = Object.assign(associationSubclassFactory(), { metaEdName: associationSubclass2MetaEdName });

  const domainMetaEdName = 'domainMetaEdName';

  beforeAll(() => {
    const domain: Domain = Object.assign(domainFactory(), { metaEdName: domainMetaEdName });
    addEntity(metaEd.entity, domain);
    addEntity(metaEd.entity, domainEntity1);
    addEntity(metaEd.entity, domainEntity2);
    addEntity(metaEd.entity, domainEntitySubclass1);
    addEntity(metaEd.entity, domainEntitySubclass2);
    addEntity(metaEd.entity, association1);
    addEntity(metaEd.entity, association2);
    addEntity(metaEd.entity, associationSubclass1);
    addEntity(metaEd.entity, associationSubclass2);

    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntity1MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntity2MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntitySubclass1MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntitySubclass2MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: association1MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: association2MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: associationSubclass1MetaEdName }));
    domain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: associationSubclass2MetaEdName }));

    enhance(metaEd);
  });

  it('should have references to domain entities', () => {
    const domain: any = metaEd.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(domainEntity1);
    expect(domain.entities).toContain(domainEntity2);
  });

  it('should have references to domain subclasses', () => {
    const domain: any = metaEd.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(domainEntitySubclass1);
    expect(domain.entities).toContain(domainEntitySubclass2);
  });

  it('should have references to associations', () => {
    const domain: any = metaEd.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(association1);
    expect(domain.entities).toContain(association2);
  });

  it('should have references to association subclasses', () => {
    const domain: any = metaEd.entity.domain.get(domainMetaEdName);
    expect(domain.entities).toContain(associationSubclass1);
    expect(domain.entities).toContain(associationSubclass2);
  });
});

describe('when enhancing subdomain', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();

  const domainEntity1MetaEdName = 'DomainEntity1Name';
  const domainEntity2MetaEdName = 'DomainEntity2Name';

  const domainEntitySubclass1MetaEdName = 'DomainEntitySubclass1Name';
  const domainEntitySubclass2MetaEdName = 'DomainEntitySubclass2Name';

  const association1MetaEdName = 'Association1Name';
  const association2MetaEdName = 'Association2Name';

  const associationSubclass1MetaEdName = 'AssociationSubclass1Name';
  const associationSubclass2MetaEdName = 'AssociationSubclass2Name';

  const domainEntity1: DomainEntity = Object.assign(domainEntityFactory(), { metaEdName: domainEntity1MetaEdName });
  const domainEntity2: DomainEntity = Object.assign(domainEntityFactory(), { metaEdName: domainEntity2MetaEdName });

  const domainEntitySubclass1: DomainEntitySubclass = Object.assign(domainEntitySubclassFactory(), { metaEdName: domainEntitySubclass1MetaEdName });
  const domainEntitySubclass2: DomainEntitySubclass = Object.assign(domainEntitySubclassFactory(), { metaEdName: domainEntitySubclass2MetaEdName });

  const association1: Association = Object.assign(associationFactory(), { metaEdName: association1MetaEdName });
  const association2: Association = Object.assign(associationFactory(), { metaEdName: association2MetaEdName });

  const associationSubclass1: AssociationSubclass = Object.assign(associationSubclassFactory(), { metaEdName: associationSubclass1MetaEdName });
  const associationSubclass2: AssociationSubclass = Object.assign(associationSubclassFactory(), { metaEdName: associationSubclass2MetaEdName });

  const subdomainMetaEdName = 'domainMetaEdName';

  beforeAll(() => {
    const subdomain: Subdomain = Object.assign(subdomainFactory(), { metaEdName: subdomainMetaEdName });
    addEntity(metaEd.entity, subdomain);
    addEntity(metaEd.entity, domainEntity1);
    addEntity(metaEd.entity, domainEntity2);
    addEntity(metaEd.entity, domainEntitySubclass1);
    addEntity(metaEd.entity, domainEntitySubclass2);
    addEntity(metaEd.entity, association1);
    addEntity(metaEd.entity, association2);
    addEntity(metaEd.entity, associationSubclass1);
    addEntity(metaEd.entity, associationSubclass2);

    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntity1MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntity2MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntitySubclass1MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: domainEntitySubclass2MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: association1MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: association2MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: associationSubclass1MetaEdName }));
    subdomain.domainItems.push(Object.assign(domainItemFactory(), { metaEdName: associationSubclass2MetaEdName }));

    enhance(metaEd);
  });

  it('should have references to domain entities', () => {
    const subdomain: any = metaEd.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(domainEntity1);
    expect(subdomain.entities).toContain(domainEntity2);
  });

  it('should have references to domain subclasses', () => {
    const subdomain: any = metaEd.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(domainEntitySubclass1);
    expect(subdomain.entities).toContain(domainEntitySubclass2);
  });

  it('should have references to associations', () => {
    const subdomain: any = metaEd.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(association1);
    expect(subdomain.entities).toContain(association2);
  });

  it('should have references to association subclasses', () => {
    const subdomain: any = metaEd.entity.subdomain.get(subdomainMetaEdName);
    expect(subdomain.entities).toContain(associationSubclass1);
    expect(subdomain.entities).toContain(associationSubclass2);
  });
});
