import { newMetaEdEnvironment, MetaEdTextBuilder, CommonBuilder, NamespaceBuilder, DomainEntityBuilder } from 'metaed-core';
import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/InlineCommon/InlineCommonExistsOnlyInCoreNamespace';

describe('when validating inline common type exists in core', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartInlineCommon('EntityName')
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName', 'PropertyDocumentation', true, false)
      .withEndInlineCommon()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(coreNamespace.entity.common.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating inline common type exists in extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity('AnEntity')
      .withDocumentation('doc1')
      .withStringProperty('Property1', 'doc2', true, false, '100')
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartInlineCommon('EntityName')
      .withDocumentation('EntityDocumentation')
      .withBooleanProperty('PropertyName', 'PropertyDocumentation', true, false)
      .withEndInlineCommon()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    extensionNamespace = metaEd.namespace.get('extension');
    failures = validate(metaEd);
  });

  it('should build one common', () => {
    expect(extensionNamespace.entity.common.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('InlineCommonExistsOnlyInCoreNamespace');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});
