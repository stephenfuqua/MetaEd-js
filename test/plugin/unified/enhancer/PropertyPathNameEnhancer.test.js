// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import { domainEntityFactory } from '../../../../src/core/model/DomainEntity';
import { domainEntityPropertyFactory } from '../../../../src/core/model/property/DomainEntityProperty';
import { addEntity } from '../../../../src/core/model/EntityRepository';
import { addProperty } from '../../../../src/core/model/property/PropertyRepository';
import { enhance } from '../../../../src/plugin/unified/enhancer/PropertyPathNameEnhancer';

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
