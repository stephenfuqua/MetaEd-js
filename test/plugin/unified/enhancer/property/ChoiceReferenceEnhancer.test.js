// @flow
import R from 'ramda';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import type { ChoiceProperty } from '../../../../../src/core/model/property/ChoiceProperty';
import { choicePropertyFactory } from '../../../../../src/core/model/property/ChoiceProperty';
import type { Choice } from '../../../../../src/core/model/Choice';
import { choiceFactory } from '../../../../../src/core/model/Choice';
import { enhance } from '../../../../../src/plugin/unified/enhancer/property/ChoiceReferenceEnhancer';

describe('when enhancing choice property', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: ChoiceProperty = Object.assign(choicePropertyFactory(), {
      metaEdName: referencedEntityName,
      parentEntityName,
    });
    metaEd.propertyIndex.choice.push(property);

    const parentEntity: Choice = Object.assign(choiceFactory(), {
      metaEdName: parentEntityName,
      properties: [property],
    });
    metaEd.entity.choice.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Choice = Object.assign(choiceFactory(), {
      metaEdName: referencedEntityName,
    });
    metaEd.entity.choice.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.choice.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
