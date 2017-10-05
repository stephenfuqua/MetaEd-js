// @flow
import type {
  MetaEdEnvironment,
  EnhancerResult,
  TopLevelEntity,
} from '../../../../packages/metaed-core/index';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';
import { getAllTopLevelEntities, prependIndefiniteArticle } from '../../../../packages/metaed-core/index';
import { createSchemaComplexTypeItems } from '../enhancer/schema/XsdElementFromPropertyCreator';
import { newAnnotation } from '../model/schema/Annotation';
import { newComplexType, NoComplexType } from '../model/schema/ComplexType';
import { newElement } from '../model/schema/Element';

// Force generation of lookup types for specific named top level entities
// Temporary work around until lookup types fully disappear
const enhancerName: string = 'AddLookupTypesDiminisher';

const typeGroup: string = 'Lookup';
const documentation: string = 'Encapsulates alternative attributes that can be used to look up the identity of {entity.metaEdName}.';
const lookupTypeNames: Array<string> = [
  'Assessment',
  'AssessmentFamily',
  'Course',
  'EducationOrganization',
  'EducationOrganizationNetwork',
  'EducationServiceCenter',
  'GradebookEntry',
  'LearningStandard',
  'LocalEducationAgency',
  'Parent',
  'Program',
  'School',
  'Section',
  'Session',
  'Staff',
  'StateEducationAgency',
  'Student',
];

const createLookupType = (entity: TopLevelEntity): ComplexType =>
  Object.assign(newComplexType(), {
    name: `${entity.data.edfiXsd.xsd_MetaEdNameWithExtension()}${typeGroup}Type`,
    items: createSchemaComplexTypeItems(entity.queryableFields, '0', false),
    annotation: Object.assign(newAnnotation(), {
      documentation: documentation.replace('{entity.metaEdName}', prependIndefiniteArticle(entity.metaEdName)),
      typeGroup,
    }),
  });

const createReferenceTypeItem = (entity: TopLevelEntity, lookupType: ComplexType): Element =>
  Object.assign(newElement(), {
    name: `${entity.metaEdName}${typeGroup}`,
    type: lookupType.name,
    minOccurs: '0',
    annotation: Object.assign(newAnnotation(), {
      documentation: lookupType.annotation.documentation,
    }),
  });

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntities(metaEd.entity)
    .filter(x => !x.namespaceInfo.isExtension && lookupTypeNames.includes(x.metaEdName))
    .forEach(entity => {
      const lookupType: ComplexType = createLookupType(entity);
      entity.data.edfiXsd.xsd_LookupType = lookupType;

      const referenceType: Element = createReferenceTypeItem(entity, lookupType);
      if (entity.data.edfiXsd.xsd_ReferenceType === NoComplexType) {
        entity.data.edfiXsd.xsd_ReferenceType = Object.assign(newComplexType(), { items: [referenceType] });
      } else {
        entity.data.edfiXsd.xsd_ReferenceType.items.push(referenceType);
      }
    });

  return {
    enhancerName,
    success: true,
  };
}
