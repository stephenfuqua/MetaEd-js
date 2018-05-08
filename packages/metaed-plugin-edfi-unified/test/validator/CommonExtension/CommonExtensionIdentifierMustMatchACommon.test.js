// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  CommonBuilder,
  CommonExtensionBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/CommonExtension/CommonExtensionIdentifierMustMatchACommon';

describe('when common extension extends common', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const commonName: string = 'CommonName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

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

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common extension', () => {
    expect(extensionNamespace.entity.commonExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when common extension extends an invalid identifier', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const commonName: string = 'CommonName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon('NotAMatch')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartCommonExtension(commonName, '1')
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndCommonExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new CommonExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one common extension', () => {
    expect(extensionNamespace.entity.commonExtension.size).toBe(1);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('CommonExtensionIdentifierMustMatchACommon');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot(
      'when common extension extends an invalid identifier should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when common extension extends an invalid identifier should have validation failure -> sourceMap',
    );
  });
});
