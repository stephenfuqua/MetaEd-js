// @flow
import { newMetaEdEnvironment, MetaEdTextBuilder, DomainBuilder, CommonBuilder, NamespaceBuilder } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/Domain/InlineCommonDomainItemMustMatchTopLevelEntity';

describe('when validating inline common domain item matches top level entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainName: string = 'DomainName';
  const inlineCommonName: string = 'InlineCommonName';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withInlineCommonDomainItem(inlineCommonName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartInlineCommon(inlineCommonName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withInlineCommonProperty('InlineInOds', 'doc', true, false)
      .withEndInlineCommon()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one domain', () => {
    expect(coreNamespace.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating inline common domain item does not match top level entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainName: string = 'DomainName';
  const inlineCommonName: string = 'InlineCommonName';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withInlineCommonDomainItem('InlineCommonDomainItemName')
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartInlineCommon(inlineCommonName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withInlineCommonProperty('InlineInOds', 'doc', true, false)
      .withEndInlineCommon()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one domain', () => {
    expect(coreNamespace.entity.domain.size).toBe(1);
  });

  it('should have one validation failure()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('InlineCommonDomainItemMustMatchTopLevelEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});
