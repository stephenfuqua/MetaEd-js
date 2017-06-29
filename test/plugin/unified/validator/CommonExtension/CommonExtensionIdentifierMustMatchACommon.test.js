// @flow
import CommonBuilder from '../../../../../src/core/builder/CommonBuilder';
import CommonExtensionBuilder from '../../../../../src/core/builder/CommonExtensionBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import { validate } from '../../../../../src/plugin/unified/validator/CommonExtension/CommonExtensionIdentifierMustMatchACommon';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when common extension extends common', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const commonName: string = 'CommonName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(commonName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName, '1')
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one common extension', () => {
    expect(metaEd.entity.commonExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when common extension extends an invalid identifier', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const commonName: string = 'CommonName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName, '1')
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one common extension', () => {
    expect(metaEd.entity.commonExtension.size).toBe(1);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('CommonExtensionIdentifierMustMatchACommon');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when common extension extends an invalid identifier should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when common extension extends an invalid identifier should have validation failure -> sourceMap');
  });
});

