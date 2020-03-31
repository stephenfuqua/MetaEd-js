import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  CommonBuilder,
  DomainEntityBuilder,
  NamespaceBuilder,
  MetaEdEnvironment,
  ValidationFailure,
} from 'metaed-core';
import { commonReferenceEnhancer } from 'metaed-plugin-edfi-unified';
import { validate } from '../../../src/validator/CommonProperty/CommonPropertyCollectionTargetMustContainIdentity';

describe('when validating collection common property target has no identity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: ValidationFailure[];
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartCommon('EntityName')
      .withDocumentation('EntityDocumentation')
      .withStringProperty('PropertyName1', 'PropertyDocumentation', true, false, '100')
      .withEndCommon()

      .withStartDomainEntity('EntityName2')
      .withDocumentation('EntityDocumentation')
      .withCommonProperty('EntityName', 'PropertyDocumentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    commonReferenceEnhancer(metaEd);

    failures = validate(metaEd);
  });

  it('should build one common', (): void => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', (): void => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failure for property', (): void => {
    expect(failures[0].validatorName).toBe('CommonPropertyCollectionTargetMustContainIdentity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchInlineSnapshot(
      `"Common property EntityName cannot be used as a collection because Common EntityName does not have any identity properties."`,
    );
    expect(failures[0].sourceMap).toMatchInlineSnapshot(`
      Object {
        "column": 11,
        "line": 13,
        "tokenText": "EntityName",
      }
    `);
  });
});

describe('when validating collection common property target has an identity', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: ValidationFailure[];
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartCommon('EntityName')
      .withDocumentation('EntityDocumentation')
      .withStringIdentity('PropertyName1', 'PropertyDocumentation', '100')
      .withEndCommon()

      .withStartDomainEntity('EntityName2')
      .withDocumentation('EntityDocumentation')
      .withCommonProperty('EntityName', 'PropertyDocumentation', true, true)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    commonReferenceEnhancer(metaEd);

    failures = validate(metaEd);
  });

  it('should build one common', (): void => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should build one domain entity', (): void => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', (): void => {
    expect(failures).toHaveLength(0);
  });
});
