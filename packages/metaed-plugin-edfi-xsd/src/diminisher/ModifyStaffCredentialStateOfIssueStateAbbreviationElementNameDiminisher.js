// @flow
import R from 'ramda';
import { getEntityForNamespaces, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, ModelBase, ModelType, Namespace } from 'metaed-core';
import { asElement } from '../model/schema/Element';
import type { ComplexType } from '../model/schema/ComplexType';
import type { Element } from '../model/schema/Element';

// Workaround for METAED-457: Rename StateOfIssueStateAbbreviation to StateOfIssueStateAbbreviationType on Credential Common TYpe
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-819
const enhancerName: string = 'ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher';
const targetVersions: string = '2.0.x';

const commonName: string = 'Credential';
const commonModelType: ModelType = 'common';
const elementName: string = 'StateOfIssueStateAbbreviation';
const elementType: string = 'StateAbbreviationType';
const newElementName: string = 'StateOfIssueStateAbbreviationType';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  const common: ?ModelBase = getEntityForNamespaces(commonName, [coreNamespace], commonModelType);
  const complexType: ?ComplexType = common != null ? R.head(common.data.edfiXsd.xsd_ComplexTypes) : null;
  const element: ?Element =
    complexType != null
      ? complexType.items.map(x => asElement(x)).find(x => x.name === elementName && x.type === elementType)
      : null;

  if (element != null) element.name = newElementName;

  return {
    enhancerName,
    success: true,
  };
}
