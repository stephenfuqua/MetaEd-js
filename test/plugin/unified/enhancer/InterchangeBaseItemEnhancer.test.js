// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import { addEntity, getEntity } from '../../../../src/core/model/EntityRepository';
import { enhance } from '../../../../src/plugin/unified/enhancer/InterchangeBaseItemEnhancer';
import { domainEntityFactory } from '../../../../src/core/model/DomainEntity';
import { domainEntitySubclassFactory } from '../../../../src/core/model/DomainEntitySubclass';
import { associationFactory } from '../../../../src/core/model/Association';
import { associationSubclassFactory } from '../../../../src/core/model/AssociationSubclass';
import { descriptorFactory } from '../../../../src/core/model/Descriptor';
import { interchangeFactory } from '../../../../src/core/model/Interchange';
import { interchangeItemFactory } from '../../../../src/core/model/InterchangeItem';
import { domainEntityExtensionFactory } from '../../../../src/core/model/DomainEntityExtension';
import { interchangeExtensionFactory } from '../../../../src/core/model/InterchangeExtension';

describe('when enhancing interchange in core', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();

  const interchangeMetaEdName: string = 'InterchangeMetaEdName';

  const domainEntity1 = Object.assign(domainEntityFactory(), { metaEdName: 'DomainEntity1' });
  const domainEntity2 = Object.assign(domainEntityFactory(), { metaEdName: 'DomainEntity2' });
  const domainEntitySubclass1 = Object.assign(domainEntitySubclassFactory(), { metaEdName: 'DomainEntitySubclass1' });
  const domainEntitySubclass2 = Object.assign(domainEntitySubclassFactory(), { metaEdName: 'DomainEntitySubclass2' });
  const association1 = Object.assign(associationFactory(), { metaEdName: 'Association1' });
  const association2 = Object.assign(associationFactory(), { metaEdName: 'Association2' });
  const associationSubclass1 = Object.assign(associationSubclassFactory(), { metaEdName: 'AssociationSubclass1' });
  const associationSubclass2 = Object.assign(associationSubclassFactory(), { metaEdName: 'AssociationSubclass2' });
  const descriptor1 = Object.assign(descriptorFactory(), { metaEdName: 'Descriptor1' });
  const descriptor2 = Object.assign(descriptorFactory(), { metaEdName: 'Descriptor2' });

  const elementEntities = [domainEntity1, domainEntitySubclass1, association1, associationSubclass1, descriptor1];
  const identityTemplateEntities = [domainEntity2, domainEntitySubclass2, association2, associationSubclass2, descriptor2];

  beforeAll(() => {
    const interchange = Object.assign(interchangeFactory(), { metaEdName: interchangeMetaEdName });
    addEntity(metaEd.entity, interchange);

    elementEntities.forEach(entity => {
      interchange.elements.push(Object.assign(interchangeItemFactory(), {
        metaEdName: entity.metaEdName,
        referencedType: entity.type,
      }));
      addEntity(metaEd.entity, entity);
    });

    identityTemplateEntities.forEach(entity => {
      interchange.identityTemplates.push(Object.assign(interchangeItemFactory(), {
        metaEdName: entity.metaEdName,
        referencedType: entity.type,
      }));
      addEntity(metaEd.entity, entity);
    });

    enhance(metaEd);
  });

  it('should have references for all entities', () => {
    const interchange: any = getEntity(metaEd.entity, interchangeMetaEdName, 'interchange');
    expect(interchange.elements[0].referencedEntity).toBe(domainEntity1);
    expect(interchange.elements[1].referencedEntity).toBe(domainEntitySubclass1);
    expect(interchange.elements[2].referencedEntity).toBe(association1);
    expect(interchange.elements[3].referencedEntity).toBe(associationSubclass1);
    expect(interchange.elements[4].referencedEntity).toBe(descriptor1);

    expect(interchange.identityTemplates[0].referencedEntity).toBe(domainEntity2);
    expect(interchange.identityTemplates[1].referencedEntity).toBe(domainEntitySubclass2);
    expect(interchange.identityTemplates[2].referencedEntity).toBe(association2);
    expect(interchange.identityTemplates[3].referencedEntity).toBe(associationSubclass2);
    expect(interchange.identityTemplates[4].referencedEntity).toBe(descriptor2);
  });
});

describe('when enhancing interchange extension', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();

  const interchangeMetaEdName: string = 'InterchangeMetaEdName';

  const domainEntity = Object.assign(domainEntityFactory(), { metaEdName: 'DomainEntity' });
  const domainEntityExtension = Object.assign(domainEntityExtensionFactory(), { metaEdName: 'DomainEntity' });

  beforeAll(() => {
    addEntity(metaEd.entity, domainEntity);
    addEntity(metaEd.entity, domainEntityExtension);

    const interchange = Object.assign(interchangeFactory(), { metaEdName: interchangeMetaEdName });
    addEntity(metaEd.entity, interchange);

    const interchangeExtension = Object.assign(interchangeExtensionFactory(), { metaEdName: interchangeMetaEdName });
    addEntity(metaEd.entity, interchangeExtension);

    interchange.elements.push(Object.assign(interchangeItemFactory(), {
      metaEdName: domainEntity.metaEdName,
      referencedType: domainEntity.type,
    }));

    interchangeExtension.elements.push(Object.assign(interchangeItemFactory(), {
      metaEdName: domainEntityExtension.metaEdName,
      referencedType: domainEntityExtension.type,
    }));

    enhance(metaEd);
  });

  it('should have references for all entities', () => {
    const interchange: any = getEntity(metaEd.entity, interchangeMetaEdName, 'interchange');
    expect(interchange.elements[0].referencedEntity).toBe(domainEntity);

    const interchangeExtension: any = getEntity(metaEd.entity, interchangeMetaEdName, 'interchangeExtension');
    expect(interchangeExtension.elements[0].referencedEntity).toBe(domainEntityExtension);
  });
});
