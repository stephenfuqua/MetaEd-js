import R from 'ramda';
import {
  Common,
  MetaEdEnvironment,
  Namespace,
  addEntityForNamespace,
  newCommon,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newElement } from '../../src/model/schema/Element';
import { NoSimpleType } from '../../src/model/schema/SimpleType';
import { enhance } from '../../src/diminisher/ModifyOrderOfPriorityToUsePositiveIntegerDiminisher';
import { IntegerType, newIntegerType } from '../../src/model/IntegerType';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';

describe('when ModifyOrderOfPriorityToUsePositiveIntegerDiminisher diminishes telephone common type', (): void => {
  const positiveIntegerType = 'xs:positiveInteger';
  let commonEntity: Common;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const commonEntityName = 'Telephone';
    const elementNameType = 'OrderOfPriority';

    commonEntity = {
      ...newCommon(),
      metaEdName: commonEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: commonEntityName,
              items: [{ ...newElement(), name: elementNameType, type: elementNameType }],
            },
          ],
        },
      },
    };
    addEntityForNamespace(commonEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have element with positive integer type', (): void => {
    expect(R.head(R.head(commonEntity.data.edfiXsd.xsdComplexTypes).items).type).toBe(positiveIntegerType);
  });
});

describe('when ModifyOrderOfPriorityToUsePositiveIntegerDiminisher diminishes order of priority simple type', (): void => {
  let integerType: IntegerType;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const integerTypeName = 'OrderOfPriority';

    integerType = {
      ...newIntegerType(),
      metaEdName: integerTypeName,
      namespace,
      minValue: '1',
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.integerType.push(integerType);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have no integer simple type for order of priority integer type', (): void => {
    expect(integerType.xsdSimpleType).toBe(NoSimpleType);
  });
});

describe('when ModifyOrderOfPriorityToUsePositiveIntegerDiminisher diminishes with no order of priority', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const commonEntityName = 'CommonEntityName';
    const integerTypeName = 'IntegerTypeName';

    const commonEntity: Common = {
      ...newCommon(),
      metaEdName: 'commonEntityName',
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: commonEntityName,
              items: [{ ...newElement(), name: 'ElementName', type: 'ElementType' }],
            },
          ],
        },
      },
    };
    addEntityForNamespace(commonEntity);

    const integerType: IntegerType = {
      ...newIntegerType(),
      metaEdName: integerTypeName,
      namespace,
      minValue: '1',
    };
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;
    edFiXsdEntityRepository.integerType.push(integerType);

    metaEd.dataStandardVersion = '2.0.0';
  });

  it('should run without error', (): void => {
    expect(enhance(metaEd).success).toBe(true);
  });
});
