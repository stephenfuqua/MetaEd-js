// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { SchoolYearEnumerationProperty } from '../../../../../src/core/model/property/SchoolYearEnumerationProperty';
import { schoolYearEnumerationPropertyFactory } from '../../../../../src/core/model/property/SchoolYearEnumerationProperty';
import type { SchoolYearEnumeration } from '../../../../../src/core/model/SchoolYearEnumeration';
import { schoolYearEnumerationFactory } from '../../../../../src/core/model/SchoolYearEnumeration';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/SchoolYearEnumerationReferenceEnhancer';

describe('when enhancing schoolYearEnumeration property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: SchoolYearEnumerationProperty = Object.assign(schoolYearEnumerationPropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.schoolYearEnumeration.push(property);

    const parentEntity: SchoolYearEnumeration = Object.assign(schoolYearEnumerationFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.schoolYearEnumeration.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: SchoolYearEnumeration = Object.assign(schoolYearEnumerationFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.schoolYearEnumeration.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.schoolYearEnumeration.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
