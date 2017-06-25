// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import { domainEntityFactory } from '../../../../packages/metaed-core/src/model/DomainEntity';
import { domainEntityPropertyFactory } from '../../../../packages/metaed-core/src/model/property/DomainEntityProperty';
import { integerTypeFactory } from '../../../../packages/metaed-core/src/model/IntegerType';
import { sharedIntegerPropertyFactory } from '../../../../packages/metaed-core/src/model/property/SharedIntegerProperty';
import { addEntity } from '../../../../packages/metaed-core/src/model/EntityRepository';
import { addProperty } from '../../../../packages/metaed-core/src/model/property/PropertyRepository';
import { enhance } from '../../src/enhancer/InheritedDocumentationCopyingEnhancer';

describe('when enhancing shared integer property with inherited documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityDocumentation: string = 'ReferencedEntityDocumentation';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const referencedEntity = Object.assign(integerTypeFactory(), {
      metaEdName: referencedEntityName,
      documentation: referencedEntityDocumentation,
    });

    const property = Object.assign(sharedIntegerPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
      referencedEntity,
      documentationInherited: true,
    });

    const parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });

    addEntity(metaEd.entity, referencedEntity);
    addEntity(metaEd.entity, parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct referenced entity()', () => {
    const property = R.head(metaEd.propertyIndex.sharedInteger.filter(p => p.metaEdName === referencedEntityName));
    expect(property.documentation).toBe(referencedEntityDocumentation);
  });
});

describe('when enhancing domain entity property with inherited documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityDocumentation: string = 'ReferencedEntityDocumentation';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const referencedEntity = Object.assign(domainEntityFactory(), {
      metaEdName: referencedEntityName,
      documentation: referencedEntityDocumentation,
    });

    const property = Object.assign(domainEntityPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
      referencedEntity,
      documentationInherited: true,
    });

    const parentEntity = Object.assign(domainEntityFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });

    addEntity(metaEd.entity, referencedEntity);
    addEntity(metaEd.entity, parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct referenced entity()', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === referencedEntityName));
    expect(property.documentation).toBe(referencedEntityDocumentation);
  });
});
