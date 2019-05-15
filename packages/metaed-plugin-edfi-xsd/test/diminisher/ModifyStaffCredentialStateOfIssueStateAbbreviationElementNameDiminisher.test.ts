import R from 'ramda';
import { Common, IntegerType, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addEntityForNamespace, newCommon, newIntegerType, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newElement } from '../../src/model/schema/Element';
import { newIntegerSimpleType } from '../../src/model/schema/IntegerSimpleType';
import { enhance } from '../../src/diminisher/ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher';

describe('when ModifyStaffCredentialStateOfIssueStateAbbreviationElementNameDiminisher diminishes credential common type', (): void => {
  const expectedElementName = 'StateOfIssueStateAbbreviationType';
  let commonEntity: Common;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const commonEntityName = 'Credential';
    const elementName = 'StateOfIssueStateAbbreviation';
    const elementType = 'StateAbbreviationType';

    commonEntity = Object.assign(newCommon(), {
      metaEdName: commonEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            Object.assign(newComplexType(), {
              name: commonEntityName,
              items: [
                Object.assign(newElement(), {
                  name: elementName,
                  type: elementType,
                }),
              ],
            }),
          ],
        },
      },
    });
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
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const commonEntityName = 'CommonEntityName';
    const integerTypeName = 'IntegerTypeName';

    const commonEntity: Common = Object.assign(newCommon(), {
      metaEdName: commonEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            Object.assign(newComplexType(), {
              name: commonEntityName,
              items: [
                Object.assign(newElement(), {
                  name: 'ElementName',
                  type: 'ElementType',
                }),
              ],
            }),
          ],
        },
      },
    });
    addEntityForNamespace(commonEntity);

    const integerType: IntegerType = Object.assign(newIntegerType(), {
      metaEdName: integerTypeName,
      namespace,
      data: {
        edfiXsd: {
          xsdSimpleType: Object.assign(newIntegerSimpleType(), { name: integerTypeName, minValue: '1' }),
        },
      },
    });
    addEntityForNamespace(integerType);

    metaEd.dataStandardVersion = '2.0.0';
  });

  it('should run without error', (): void => {
    expect(enhance(metaEd).success).toBe(true);
  });
});
