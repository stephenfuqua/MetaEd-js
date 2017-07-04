// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import { domainEntityFactory } from '../../../../src/core/model/DomainEntity';
import { domainEntityPropertyFactory } from '../../../../src/core/model/property/DomainEntityProperty';
import { integerTypeFactory } from '../../../../src/core/model/IntegerType';
import { sharedIntegerPropertyFactory } from '../../../../src/core/model/property/SharedIntegerProperty';
import { addEntity } from '../../../../src/core/model/EntityRepository';
import { addProperty } from '../../../../src/core/model/property/PropertyRepository';
import { enhance } from '../../../../src/plugin/unified/enhancer/InheritedDocumentationCopyingEnhancer';

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
