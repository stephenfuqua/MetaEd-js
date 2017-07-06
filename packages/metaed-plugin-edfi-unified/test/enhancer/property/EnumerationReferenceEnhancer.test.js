// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnumerationProperty } from '../../../../../packages/metaed-core/src/model/property/EnumerationProperty';
import { newEnumerationProperty } from '../../../../../packages/metaed-core/src/model/property/EnumerationProperty';
import type { Enumeration } from '../../../../../packages/metaed-core/src/model/Enumeration';
import { newEnumeration } from '../../../../../packages/metaed-core/src/model/Enumeration';
import { enhance } from '../../../src/enhancer/property/EnumerationReferenceEnhancer';

describe('when enhancing enumeration property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.enumeration.push(property);

    const parentEntity: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.enumeration.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.enumeration.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.enumeration.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
