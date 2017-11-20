// @flow
import R from 'ramda';
import type {
  EnhancerResult,
  MetaEdEnvironment,
  ModelBase,
  ModelType,
} from 'metaed-core';
import { getEntity } from 'metaed-core';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';
import { asElement } from '../model/schema/Element';

// Workaround for METAED-455: Force Data Type to xs:int in Xsd for TotalInstructionalDays
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-869
const enhancerName: string = 'ModifyTotalInstructionalDaysToUseIntDiminisher';
const targetVersions: string = '2.0.0';

const domainEntityNames: Array<string> = ['AcademicWeek', 'Session'];
const domainEntityType: ModelType = 'domainEntity';
const elementNameType: string = 'TotalInstructionalDays';
const intType: string = 'xs:int';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (metaEd.dataStandardVersion !== targetVersions) return { enhancerName, success: true };

  domainEntityNames.forEach(domainEntityName => {
    const entity: ?ModelBase = getEntity(metaEd.entity, domainEntityName, domainEntityType);
    const complexType: ?ComplexType = entity != null
      ? R.head(entity.data.edfiXsd.xsd_ComplexTypes)
      : null;
    const element: ?Element = complexType != null
      ? complexType.items.map(x => asElement(x)).find(x => x.name === elementNameType && x.type === elementNameType)
      : null;

    if (element != null) element.type = intType;
  });

  return {
    enhancerName,
    success: true,
  };
}
