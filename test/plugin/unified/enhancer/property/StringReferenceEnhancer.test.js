// @flow
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
  let property: StringProperty;
  let referencedEntity: StringType;

  beforeAll(() => {
    property = Object.assign(stringPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.string.push(property);

    referencedEntity = Object.assign(stringTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.stringType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(referencedEntity.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing shared string property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedStringProperty;
  let referencedEntity: StringType;

  beforeAll(() => {
    property = Object.assign(sharedStringPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.sharedString.push(property);

    referencedEntity = Object.assign(stringTypeFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.stringType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(referencedEntity.referringSimpleProperties).toContain(property);
  });
});
