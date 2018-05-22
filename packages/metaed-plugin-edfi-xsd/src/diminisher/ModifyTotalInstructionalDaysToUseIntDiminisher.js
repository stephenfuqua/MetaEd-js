// @flow
import R from 'ramda';
import { getEntityForNamespaces, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase, ModelType, Namespace } from 'metaed-core';
import { asElement } from '../model/schema/Element';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';

// Workaround for METAED-455: Force Data Type to xs:int in Xsd for TotalInstructionalDays
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-869
const enhancerName: string = 'ModifyTotalInstructionalDaysToUseIntDiminisher';
const targetVersions: string = '2.0.x';

const domainEntityNames: Array<string> = ['AcademicWeek', 'Session'];
const domainEntityType: ModelType = 'domainEntity';
const elementNameType: string = 'TotalInstructionalDays';
const intType: string = 'xs:int';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  domainEntityNames.forEach(domainEntityName => {
    const entity: ?ModelBase = getEntityForNamespaces(domainEntityName, [coreNamespace], domainEntityType);
    const complexType: ?ComplexType = entity != null ? R.head(entity.data.edfiXsd.xsd_ComplexTypes) : null;
    const element: ?Element =
      complexType != null
        ? complexType.items.map(x => asElement(x)).find(x => x.name === elementNameType && x.type === elementNameType)
        : null;

    if (element != null) element.type = intType;
  });

  return {
    enhancerName,
    success: true,
  };
}
