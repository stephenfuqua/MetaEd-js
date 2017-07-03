// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { StringProperty } from '../../../../../src/core/model/property/StringProperty';
import { stringPropertyFactory } from '../../../../../src/core/model/property/StringProperty';
import type { SharedStringProperty } from '../../../../../src/core/model/property/SharedStringProperty';
import { sharedStringPropertyFactory } from '../../../../../src/core/model/property/SharedStringProperty';
import type { StringType } from '../../../../../src/core/model/StringType';
import { stringTypeFactory } from '../../../../../src/core/model/StringType';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/StringReferenceEnhancer';


describe('when enhancing string property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: StringProperty = Object.assign(stringPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.string.push(property);

    const referencedEntity: StringType = Object.assign(stringTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.stringType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.string.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing shared string property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: SharedStringProperty = Object.assign(sharedStringPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedString.push(property);

    const referencedEntity: StringType = Object.assign(stringTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.stringType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.sharedString.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
