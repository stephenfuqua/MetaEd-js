// @flow
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { StringProperty } from '../../../../../packages/metaed-core/src/model/property/StringProperty';
import { newStringProperty } from '../../../../../packages/metaed-core/src/model/property/StringProperty';
import type { SharedStringProperty } from '../../../../../packages/metaed-core/src/model/property/SharedStringProperty';
import { newSharedStringProperty } from '../../../../../packages/metaed-core/src/model/property/SharedStringProperty';
import type { StringType } from '../../../../../packages/metaed-core/src/model/StringType';
import { stringTypeFactory } from '../../../../../packages/metaed-core/src/model/StringType';
import { enhance } from '../../../src/enhancer/property/StringReferenceEnhancer';


describe('when enhancing string property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: StringProperty;
  let referencedEntity: StringType;

  beforeAll(() => {
    property = Object.assign(newStringProperty(), {
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
    property = Object.assign(newSharedStringProperty(), {
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
