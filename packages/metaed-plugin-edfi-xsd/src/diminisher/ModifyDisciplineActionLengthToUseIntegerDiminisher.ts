import R from 'ramda';
import { getEntityFromNamespace, versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { NoSimpleType } from '../model/schema/SimpleType';
import { Element } from '../model/schema/Element';
import { ComplexType } from '../model/schema/ComplexType';
import { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../enhancer/EnhancerHelper';
import { IntegerType } from '../model/IntegerType';

// Workaround for METAED-453: Force Data Type to xs:integer in Xsd for DisciplineActionLength and ActualDisciplineActionLength
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-870
const enhancerName = 'ModifyDisciplineActionLengthToUseIntegerDiminisher';
const targetVersions = '2.0.x';

const disciplineActionName = 'DisciplineAction';
const disciplineActionLengthName = 'DisciplineActionLength';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };

  const entity: ModelBase | null = getEntityFromNamespace(disciplineActionName, coreNamespace, 'domainEntity');
  if (entity != null && !R.isEmpty(entity.data.edfiXsd.xsdComplexTypes)) {
    const complexType: ComplexType = entity.data.edfiXsd.xsdComplexTypes.find(x => x.name === disciplineActionName);

    if (complexType != null && complexType.hasItems()) {
      const element1: any = ((complexType.items as unknown) as Element[]).find(
        x =>
          x.name != null && x.name === disciplineActionLengthName && x.type != null && x.type === disciplineActionLengthName,
      );
      if (element1 != null) Object.assign(element1, { type: 'xs:integer' });

      const element2: any = ((complexType.items as unknown) as Element[]).find(
        x =>
          x.name != null &&
          x.name === 'ActualDisciplineActionLength' &&
          x.type != null &&
          x.type === disciplineActionLengthName,
      );
      if (element2 != null) Object.assign(element2, { type: 'xs:integer' });
    }
  }

  const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, coreNamespace);
  if (edFiXsdEntityRepository == null) return { enhancerName, success: false };

  const integerType: IntegerType | undefined = edFiXsdEntityRepository.integerType.find(
    x => x.metaEdName === disciplineActionLengthName,
  );
  if (integerType != null) integerType.xsdSimpleType = NoSimpleType;

  return {
    enhancerName,
    success: true,
  };
}
