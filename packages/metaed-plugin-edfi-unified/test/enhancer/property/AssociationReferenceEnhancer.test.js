// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { AssociationProperty } from '../../../../../packages/metaed-core/src/model/property/AssociationProperty';
import { newAssociationProperty } from '../../../../../packages/metaed-core/src/model/property/AssociationProperty';
import type { Association } from '../../../../../packages/metaed-core/src/model/Association';
import { newAssociation } from '../../../../../packages/metaed-core/src/model/Association';
import type { AssociationSubclass } from '../../../../../packages/metaed-core/src/model/AssociationSubclass';
import { newAssociationSubclass } from '../../../../../packages/metaed-core/src/model/AssociationSubclass';
import { enhance } from '../../../src/enhancer/property/AssociationReferenceEnhancer';

describe('when enhancing association property referring to association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.association.push(property);

    const parentEntity: Association = Object.assign(newAssociation(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Association = Object.assign(newAssociation(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.association.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.association.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing association property referring to subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.association.push(property);

    const parentEntity: Association = Object.assign(newAssociation(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.associationSubclass.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.association.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
