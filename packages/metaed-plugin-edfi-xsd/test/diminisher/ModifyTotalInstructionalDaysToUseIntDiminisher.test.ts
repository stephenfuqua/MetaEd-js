import R from 'ramda';
import {
  DomainEntity,
  MetaEdEnvironment,
  Namespace,
  addEntityForNamespace,
  newDomainEntity,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newElement } from '../../src/model/schema/Element';
import { enhance } from '../../src/diminisher/ModifyTotalInstructionalDaysToUseIntDiminisher';
import { IntegerType, newIntegerType } from '../../src/model/IntegerType';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';

describe('when ModifyTotalInstructionalDaysToUseIntDiminisher diminishes academic week domain entity', (): void => {
  const intType = 'xs:int';
  let domainEntity: DomainEntity;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const domainEntityName = 'AcademicWeek';
    const elementNameType = 'TotalInstructionalDays';

    domainEntity = {
      ...newDomainEntity(),
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: domainEntityName,
              items: [{ ...newElement(), name: elementNameType, type: elementNameType }],
            },
          ],
        },
      },
    };
    addEntityForNamespace(domainEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have type set to int type', (): void => {
    expect(R.head(R.head(domainEntity.data.edfiXsd.xsdComplexTypes).items).type).toBe(intType);
  });
});

describe('when ModifyTotalInstructionalDaysToUseIntDiminisher diminishes session domain entity', (): void => {
  const intType = 'xs:int';
  let domainEntity: DomainEntity;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const domainEntityName = 'Session';
    const elementNameType = 'TotalInstructionalDays';

    domainEntity = {
      ...newDomainEntity(),
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: domainEntityName,
              items: [{ ...newElement(), name: elementNameType, type: elementNameType }],
            },
          ],
        },
      },
    };
    addEntityForNamespace(domainEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have type set to int type', (): void => {
    expect(R.head(R.head(domainEntity.data.edfiXsd.xsdComplexTypes).items).type).toBe(intType);
  });
});

describe('when ModifyTotalInstructionalDaysToUseIntDiminisher diminishes with no academic week or session', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const domainEntityName = 'DomainEntityName';
    const integerTypeName = 'IntegerTypeName';

    const domainEntity: DomainEntity = {
      ...newDomainEntity(),
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            {
              ...newComplexType(),
              name: domainEntityName,
              items: [{ ...newElement(), name: 'ElementName', type: 'ElementType' }],
            },
          ],
        },
      },
    };
    addEntityForNamespace(domainEntity);

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
