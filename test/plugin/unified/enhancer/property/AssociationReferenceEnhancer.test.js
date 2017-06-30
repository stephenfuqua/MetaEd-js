// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { AssociationProperty } from '../../../../../src/core/model/property/AssociationProperty';
import { associationPropertyFactory } from '../../../../../src/core/model/property/AssociationProperty';
import type { Association } from '../../../../../src/core/model/Association';
import { associationFactory } from '../../../../../src/core/model/Association';
import type { AssociationSubclass } from '../../../../../src/core/model/AssociationSubclass';
import { associationSubclassFactory } from '../../../../../src/core/model/AssociationSubclass';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/AssociationReferenceEnhancer';

describe('when enhancing association property referring to association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: AssociationProperty = Object.assign(associationPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.association.push(property);

    const parentEntity: Association = Object.assign(associationFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Association = Object.assign(associationFactory(), {
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
    const property: AssociationProperty = Object.assign(associationPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.association.push(property);

    const parentEntity: Association = Object.assign(associationFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.association.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: AssociationSubclass = Object.assign(associationSubclassFactory(), {
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
