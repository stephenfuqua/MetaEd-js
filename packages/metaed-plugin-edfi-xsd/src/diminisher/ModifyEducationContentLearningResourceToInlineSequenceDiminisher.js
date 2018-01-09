// @flow
import R from 'ramda';
import { getEntity, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase, ModelType } from 'metaed-core';
import { asElement } from '../model/schema/Element';
import { asElementGroup, newElementGroup } from '../model/schema/ElementGroup';
import type { ComplexType } from '../model/schema/ComplexType';
import type { ComplexTypeItem } from '../model/schema/ComplexTypeItem';
import type { Element } from '../model/schema/Element';
import type { ElementGroup } from '../model/schema/ElementGroup';

// Force generation of LearningStandard common type under EducationContent to output what the ods sql is expecting from an xsd perspective
// Temporary work around until ODS-904 is resolved
const enhancerName: string = 'ModifyEducationContentLearningResourceToInlineSequenceDiminisher';
const targetVersions: string = '2.x';

const entityName: string = 'EducationContent';
const entityType: ModelType = 'domainEntity';
const elementName: string = 'LearningResource';
const elementType: ModelType = 'common';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const entity: ?ModelBase = getEntity(metaEd.entity, entityName, entityType);

  if (entity != null && entity.data.edfiXsd.xsd_ComplexTypes.length === 1) {
    const entityComplexType: ComplexType = R.head(entity.data.edfiXsd.xsd_ComplexTypes);
    const entityElementGroup: ?ElementGroup = asElementGroup(
      entityComplexType.items.find(x => asElementGroup(x).isChoice === true),
    );

    if (entityElementGroup != null) {
      const learningResourceElement: ?Element = asElement(
        entityElementGroup.items.find(x => asElement(x).name === elementName),
      );
      const inlineCommon: ?ModelBase = getEntity(metaEd.entity, elementName, elementType);

      if (
        learningResourceElement != null &&
        inlineCommon != null &&
        inlineCommon.data.edfiXsd.xsd_ComplexTypes.length === 1
      ) {
        const propertyComplexTypeItems: Array<ComplexTypeItem> = R.head(inlineCommon.data.edfiXsd.xsd_ComplexTypes).items;

        // Clear out generation of the common type
        inlineCommon.data.edfiXsd.xsd_ComplexTypes = [];

        // Build new element group to replace element
        const elementIndex: number = entityElementGroup.items.indexOf(learningResourceElement);
        entityElementGroup.items[elementIndex] = Object.assign(newElementGroup(), {
          items: [...propertyComplexTypeItems],
        });
      }
    }
  }

  return {
    enhancerName,
    success: true,
  };
}
