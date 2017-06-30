// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { EnumerationProperty } from '../../../../../src/core/model/property/EnumerationProperty';
import { enumerationPropertyFactory } from '../../../../../src/core/model/property/EnumerationProperty';
import type { Enumeration } from '../../../../../src/core/model/Enumeration';
import { enumerationFactory } from '../../../../../src/core/model/Enumeration';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/EnumerationReferenceEnhancer';

describe('when enhancing enumeration property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: EnumerationProperty = Object.assign(enumerationPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.enumeration.push(property);

    const parentEntity: Enumeration = Object.assign(enumerationFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.enumeration.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Enumeration = Object.assign(enumerationFactory(), {
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
