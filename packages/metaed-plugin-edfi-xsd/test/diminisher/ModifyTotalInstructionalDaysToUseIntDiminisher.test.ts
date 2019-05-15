import R from 'ramda';
import { DomainEntity, IntegerType, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addEntityForNamespace, newDomainEntity, newIntegerType, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { newComplexType } from '../../src/model/schema/ComplexType';
import { newElement } from '../../src/model/schema/Element';
import { newIntegerSimpleType } from '../../src/model/schema/IntegerSimpleType';
import { enhance } from '../../src/diminisher/ModifyTotalInstructionalDaysToUseIntDiminisher';

describe('when ModifyTotalInstructionalDaysToUseIntDiminisher diminishes academic week domain entity', (): void => {
  const intType = 'xs:int';
  let domainEntity: DomainEntity;
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const domainEntityName = 'AcademicWeek';
    const elementNameType = 'TotalInstructionalDays';

    domainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            Object.assign(newComplexType(), {
              name: domainEntityName,
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
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const domainEntityName = 'Session';
    const elementNameType = 'TotalInstructionalDays';

    domainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            Object.assign(newComplexType(), {
              name: domainEntityName,
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
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const domainEntityName = 'DomainEntityName';
    const integerTypeName = 'IntegerTypeName';

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      namespace,
      data: {
        edfiXsd: {
          xsdComplexTypes: [
            Object.assign(newComplexType(), {
              name: domainEntityName,
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
    addEntityForNamespace(domainEntity);

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
