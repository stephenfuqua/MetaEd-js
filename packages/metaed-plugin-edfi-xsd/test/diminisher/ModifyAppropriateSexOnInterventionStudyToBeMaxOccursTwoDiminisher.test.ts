import R from 'ramda';
import {
  MetaEdEnvironment,
  DomainEntity,
  EnhancerResult,
  Namespace,
  newDomainEntity,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newElement } from '../../src/model/schema/Element';
import { enhance } from '../../src/diminisher/ModifyAppropriateSexOnInterventionStudyToBeMaxOccursTwoDiminisher';
import { IntegerType, newIntegerType } from '../../src/model/IntegerType';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';

describe('when ModifyAppropriateSexOnInterventionStudyToBeMaxOccursTwoDiminisher diminishes intervention study domain entity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  let entity: DomainEntity;

  beforeAll(() => {
    const domainEntityName1 = 'InterventionStudy';
    const domainEntity1: DomainEntity = {
      ...newDomainEntity(),
      metaEdName: domainEntityName1,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: domainEntityName1,
              items: [{ ...newElement(), name: 'AppropriateSex', type: 'SexType', maxOccursIsUnbounded: true }],
            },
          ],
        },
      },
    };
    namespace.entity.domainEntity.set(domainEntityName1, domainEntity1);
    metaEd.dataStandardVersion = '2.0.0';

    enhance(metaEd);

    entity = namespace.entity.domainEntity.get(domainEntityName1) as DomainEntity;
    expect(entity).toBeDefined();
  });

  it("should have maxOccurs set to '2'", () => {
    expect(R.head(R.head(entity.data.edfiXsd.xsdComplexTypes).items).maxOccursIsUnbounded).toBe(false);
    expect(R.head(R.head(entity.data.edfiXsd.xsdComplexTypes).items).maxOccurs).toBe('2');
  });
});

describe('when ModifyAppropriateSexOnInterventionStudyToBeMaxOccursTwoDiminisher diminishes with no intervention study', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  let result: EnhancerResult;

  beforeAll(() => {
    const domainEntityName1 = 'DomainEntityName1';
    const integerTypeName1 = 'IntegerTypeName1';
    const domainEntity1: DomainEntity = {
      ...newDomainEntity(),
      metaEdName: domainEntityName1,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: domainEntityName1,
              items: [{ ...newElement(), name: 'ComplexItemName', type: 'ComplexItemType' }],
            },
          ],
        },
      },
    };
    namespace.entity.domainEntity.set(domainEntityName1, domainEntity1);

    const integerType1: IntegerType = {
      ...newIntegerType(),
      metaEdName: integerTypeName1,
      minValue: '1',
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.integerType.push(integerType1);
    metaEd.dataStandardVersion = '2.0.0';

    result = enhance(metaEd);
  });

  it('should run without error', (): void => {
    expect(result.success).toBe(true);
  });
});
