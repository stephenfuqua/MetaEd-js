import R from 'ramda';
import { getEntityFromNamespace, versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { NoSimpleType } from '../model/schema/SimpleType';
import { ComplexType } from '../model/schema/ComplexType';
import { Element } from '../model/schema/Element';
import { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../enhancer/EnhancerHelper';
import { IntegerType } from '../model/IntegerType';

// Workaround for METAED-451: Force Data Type to Positive Integer in Xsd for Order of Priority
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-866
const enhancerName = 'ModifyOrderOfPriorityToUsePositiveIntegerDiminisher';
const targetVersions = '2.0.x';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };

  const commonEntity: ModelBase | null = getEntityFromNamespace('Telephone', coreNamespace, 'common');
  const complexType: ComplexType | null = commonEntity != null ? R.head(commonEntity.data.edfiXsd.xsdComplexTypes) : null;

  const element: Element | undefined | null =
    complexType != null
      ? complexType.items
          .map(x => (x as unknown) as Element)
          .find(x => x.name === 'OrderOfPriority' && x.type === 'OrderOfPriority')
      : null;
  if (element != null) element.type = 'xs:positiveInteger';

  const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, coreNamespace);
  if (edFiXsdEntityRepository == null) return { enhancerName, success: false };

  const integerType: IntegerType | undefined = edFiXsdEntityRepository.integerType.find(
    x => x.metaEdName === 'OrderOfPriority',
  );
  if (integerType != null) integerType.xsdSimpleType = NoSimpleType;

  return {
    enhancerName,
    success: true,
  };
}
