// @flow
import R from 'ramda';
import type { EnhancerResult, MetaEdEnvironment, ModelBase, ModelType } from 'metaed-core';
import { getEntity } from 'metaed-core';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';
import { asElement } from '../model/schema/Element';

// Workaround for METAED-457: Rename StateOfIssueStateAbbreviation to StateOfIssueStateAbbreviationType on Credential Common TYpe
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-819
const enhancerName: string = 'ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher';
const targetVersions: string = '2.0.0';

const commonName: string = 'Credential';
const commonModelType: ModelType = 'common';
const elementName: string = 'StateOfIssueStateAbbreviation';
const elementType: string = 'StateAbbreviationType';
const newElementName: string = 'StateOfIssueStateAbbreviationType';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (metaEd.dataStandardVersion !== targetVersions) return { enhancerName, success: true };

  const common: ?ModelBase = getEntity(metaEd.entity, commonName, commonModelType);
  const complexType: ?ComplexType = common != null
    ? R.head(common.data.edfiXsd.xsd_ComplexTypes)
    : null;
  const element: ?Element = complexType != null
    ? complexType.items.map(x => asElement(x)).find(x => x.name === elementName && x.type === elementType)
    : null;

  if (element != null) element.name = newElementName;

  return {
    enhancerName,
    success: true,
  };
}
