import R from 'ramda';
import { Common, MetaEdEnvironment, IntegerType, Namespace } from 'metaed-core';
import { addEntityForNamespace, newCommon, newMetaEdEnvironment, newIntegerType, newNamespace } from 'metaed-core';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newElement } from '../../src/model/schema/Element';
import { newIntegerSimpleType } from '../../src/model/schema/IntegerSimpleType';
import { NoSimpleType } from '../../src/model/schema/SimpleType';
import { enhance } from '../../src/diminisher/ModifyOrderOfPriorityToUsePositiveIntegerDiminisher';

describe('when ModifyOrderOfPriorityToUsePositiveIntegerDiminisher diminishes telephone common type', () => {
  const positiveIntegerType = 'xs:positiveInteger';
  let commonEntity: Common;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const commonEntityName = 'Telephone';
    const elementNameType = 'OrderOfPriority';

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
                  name: elementNameType,
                  type: elementNameType,
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

  it('should have element with positive integer type', () => {
    expect(R.head(R.head(commonEntity.data.edfiXsd.xsdComplexTypes).items).type).toBe(positiveIntegerType);
  });
});

describe('when ModifyOrderOfPriorityToUsePositiveIntegerDiminisher diminishes order of priority simple type', () => {
  let integerType: IntegerType;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const integerTypeName = 'OrderOfPriority';

    integerType = Object.assign(newIntegerType(), {
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
    enhance(metaEd);
  });

  it('should have no integer simple type for order of priority integer type', () => {
    expect(integerType.data.edfiXsd.xsdSimpleType).toBe(NoSimpleType);
  });
});

describe('when ModifyOrderOfPriorityToUsePositiveIntegerDiminisher diminishes with no order of priority', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const commonEntityName = 'CommonEntityName';
    const integerTypeName = 'IntegerTypeName';

    const commonEntity: Common = Object.assign(newCommon(), {
      metaEdName: 'commonEntityName',
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

  it('should run without error', () => {
    expect(enhance(metaEd).success).toBe(true);
  });
});
