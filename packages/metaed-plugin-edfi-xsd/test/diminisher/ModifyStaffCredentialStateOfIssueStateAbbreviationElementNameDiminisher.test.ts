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
import { enhance } from '../../src/diminisher/ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher';
import { IntegerType, newIntegerType } from '../../src/model/IntegerType';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';

describe('when ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher diminishes credential common type', (): void => {
  const expectedElementName = 'StateOfIssueStateAbbreviationType';
  let commonEntity: Common;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const commonEntityName = 'Credential';
    const elementName = 'StateOfIssueStateAbbreviation';
    const elementType = 'StateAbbreviationType';

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
              items: [{ ...newElement(), name: elementName, type: elementType }],
            },
          ],
        },
      },
    };
    addEntityForNamespace(commonEntity);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have element name set to legacy name', (): void => {
    expect(R.head(R.head(commonEntity.data.edfiXsd.xsdComplexTypes).items).name).toBe(expectedElementName);
  });
});

describe('when ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher diminishes with no credential common type', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const commonEntityName = 'CommonEntityName';
    const integerTypeName = 'IntegerTypeName';

    const commonEntity: Common = {
      ...newCommon(),
      metaEdName: commonEntityName,
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
