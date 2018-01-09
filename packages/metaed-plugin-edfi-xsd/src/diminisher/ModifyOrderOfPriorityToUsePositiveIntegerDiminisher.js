// @flow
import R from 'ramda';
import { getEntity, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase, ModelType } from 'metaed-core';
import { asElement } from '../model/schema/Element';
import { NoSimpleType } from '../model/schema/SimpleType';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';

// Workaround for METAED-451: Force Data Type to Positive Integer in Xsd for Order of Priority
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-866
const enhancerName: string = 'ModifyOrderOfPriorityToUsePositiveIntegerDiminisher';
const targetVersions: string = '2.0.x';

const commonEntityName: string = 'Telephone';
const commonEntityType: ModelType = 'common';
const nameType: string = 'OrderOfPriority';
const integerTypeEntityType: ModelType = 'integerType';
const positiveIntegerType: string = 'xs:positiveInteger';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const commonEntity: ?ModelBase = getEntity(metaEd.entity, commonEntityName, commonEntityType);
  const complexType: ?ComplexType = commonEntity != null ? R.head(commonEntity.data.edfiXsd.xsd_ComplexTypes) : null;

  const element: ?Element =
    complexType != null
      ? complexType.items.map(x => asElement(x)).find(x => x.name === nameType && x.type === nameType)
      : null;
  if (element != null) element.type = positiveIntegerType;

  const integerType: ?ModelBase = getEntity(metaEd.entity, nameType, integerTypeEntityType);
  if (integerType != null) integerType.data.edfiXsd.xsd_SimpleType = NoSimpleType;

  return {
    enhancerName,
    success: true,
  };
}
