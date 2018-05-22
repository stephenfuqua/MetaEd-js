// @flow
import R from 'ramda';
import { getEntityForNamespaces, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase, ModelType, Namespace } from 'metaed-core';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';

// Workaround for METAED-456: Force Max Occurs to 2 for AppropriateSex on InterventionStudy
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-818
const enhancerName: string = 'ModifyAppropriateSexOnInterventionStudyToBeMaxOccursTwoDiminisher';
const targetVersions: string = '2.0.x';

const entityName: string = 'InterventionStudy';
const entityType: ModelType = 'domainEntity';
const elementName: string = 'AppropriateSex';
const elementType: string = 'SexType';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  const entity: ?ModelBase = getEntityForNamespaces(entityName, [coreNamespace], entityType);
  if (entity != null && !R.isEmpty(entity.data.edfiXsd.xsd_ComplexTypes)) {
    const complexType: ComplexType = entity.data.edfiXsd.xsd_ComplexTypes.find(x => x.name === entityName);
    if (complexType != null && complexType.hasItems()) {
      const element = complexType.items.find(
        // $FlowIgnore - code is assuming item is of type Element
        (x: Element) => x.name != null && x.name === elementName && x.type != null && x.type === elementType,
      );
      if (element != null) {
        Object.assign(element, {
          maxOccurs: '2',
          maxOccursIsUnbounded: false,
        });
      }
    }
  }

  return {
    enhancerName,
    success: true,
  };
}
