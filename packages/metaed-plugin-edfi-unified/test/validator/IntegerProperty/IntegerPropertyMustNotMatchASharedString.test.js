// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  DomainEntityBuilder,
  SharedStringBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/IntegerProperty/IntegerPropertyMustNotMatchASharedString';

describe('when validating integer property does not match shared string', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi', 'ProjectExtension')
      .withStartSharedString('EntityName1')
      .withDocumentation('EntityDocumentation')
      .withEndSharedString()

      .withStartAbstractEntity('EntityName2')
      .withDocumentation('EntityDocumentation')
      .withIntegerIdentity('PropertyName', 'PropertyDocumentation', '10', '2')
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedStringBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one shared string', () => {
    expect(coreNamespace.entity.sharedString.size).toBe(1);
  });

  it('should build one abstract entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating integer property matches shared string', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi', 'ProjectExtension')
      .withStartSharedString(entityName)
      .withDocumentation('EntityDocumentation')
      .withEndSharedString()

      .withStartAbstractEntity('EntityName')
      .withDocumentation('EntityDocumentation')
      .withIntegerIdentity(entityName, 'PropertyDocumentation', '10', '2', '0', '10')
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedStringBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one shared string', () => {
    expect(coreNamespace.entity.sharedString.size).toBe(1);
  });

  it('should build one abstract entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('IntegerPropertyMustNotMatchASharedString');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});
