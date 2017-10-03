// @flow
import R from 'ramda';
import type {
  EnhancerResult,
  MetaEdEnvironment,
  ModelBase,
  ModelType,
} from '../../../../packages/metaed-core/index';
import type { ComplexType } from '../model/schema/ComplexType';
import { getEntity } from '../../../../packages/metaed-core/index';

// Workaround for METAED-456: Force Max Occurs to 2 for AppropriateSex on InterventionStudy
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-818
const enhancerName: string = 'ModifyAppropriateSexOnInterventionStudyToBeMaxOccursTwoDiminisher';
const targetVersions: string = '2.0.0';

const entityName: string = 'InterventionStudy';
const entityType: ModelType = 'domainEntity';
const elementName: string = 'AppropriateSex';
const elementType: string = 'SexType';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (metaEd.dataStandardVersion !== targetVersions) return { enhancerName, success: true };

  const entity: ?ModelBase = getEntity(metaEd.entity, entityName, entityType);
  if (entity != null && !R.isEmpty(entity.data.edfiXsd.xsd_ComplexTypes)) {
    const complexType: ComplexType = entity.data.edfiXsd.xsd_ComplexTypes.find(x => x.name === entityName);
    if (complexType != null && complexType.hasItems()) {
      const element = complexType.items.find(x => x.name != null && x.name === elementName
        && x.type != null && x.type === elementType);
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
