// @flow
import DomainBuilder from '../../../../../src/core/builder/DomainBuilder';
import CommonBuilder from '../../../../../src/core/builder/CommonBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/Domain/InlineCommonDomainItemMustMatchTopLevelEntity';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';
import type { Common } from '../../../../../src/core/model/Common';

describe('when validating inline common domain item matches top level entity', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const inlineCommonName: string = 'InlineCommonName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withInlineCommonDomainItem(inlineCommonName)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartCommon(inlineCommonName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withInlineCommonProperty('InlineInOds', 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new CommonBuilder(repository.entity, [], new Map()));

    ((repository.entity.common.get(inlineCommonName): any): Common).inlineInOds = true;

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating inline common domain item does not match top level entity', () => {
  const repository: Repository = repositoryFactory();
  const domainName: string = 'DomainName';
  const inlineCommonName: string = 'InlineCommonName';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('doc')
      .withInlineCommonDomainItem('InlineCommonDomainItemName')
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()

      .withStartCommon(inlineCommonName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withInlineCommonProperty('InlineInOds', 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()
      .sendToListener(new DomainBuilder(repository.entity, []))
      .sendToListener(new CommonBuilder(repository.entity, [], new Map()));

    ((repository.entity.common.get(inlineCommonName): any): Common).inlineInOds = true;

    failures = validate(repository);
  });

  it('should build one domain entity', () => {
    expect(repository.entity.domain.size).toBe(1);
  });

  it('should have one validation failure()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('CommonDomainItemMustMatchTopLevelEntity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when common domain item has no matching top level entity should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when common domain item has no matching top level entity should have validation failure -> sourceMap');
  });
});
