// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import { domainEntityFactory } from '../../../../packages/metaed-core/src/model/DomainEntity';
import { domainEntityPropertyFactory } from '../../../../packages/metaed-core/src/model/property/DomainEntityProperty';
import { addEntity } from '../../../../packages/metaed-core/src/model/EntityRepository';
import { addProperty } from '../../../../packages/metaed-core/src/model/property/PropertyRepository';
import { enhance } from '../../src/enhancer/PropertyPathNameEnhancer';

describe('when enhancing entity property without with context', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const property = Object.assign(domainEntityPropertyFactory(), {
      metaEdName: propertyName,
      parentEntityName,
    });

    const parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });

    addEntity(metaEd.entity, parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct property path', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === propertyName));
    expect(property.propertyPathName).toBe(propertyName);
  });
});

describe('when enhancing entity property with a with context', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const propertyName: string = 'PropertyName';
  const withContext: string = 'WithContext';

  beforeAll(() => {
    const property = Object.assign(domainEntityPropertyFactory(), {
      metaEdName: propertyName,
      parentEntityName,
      withContext,
    });

    const parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });

    addEntity(metaEd.entity, parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct property path', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === propertyName));
    expect(property.propertyPathName).toBe(withContext + propertyName);
  });
});

describe('when enhancing entity property with identical with context', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const propertyName: string = 'PropertyName';
  const withContext: string = propertyName;

  beforeAll(() => {
    const property = Object.assign(domainEntityPropertyFactory(), {
      metaEdName: propertyName,
      parentEntityName,
      withContext,
    });

    const parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });

    addEntity(metaEd.entity, parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct property path', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === propertyName));
    expect(property.propertyPathName).toBe(withContext);
  });
});
