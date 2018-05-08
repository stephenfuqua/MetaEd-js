// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  DomainEntityBuilder,
  SharedIntegerBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/DecimalProperty/DecimalPropertyMustNotMatchASharedInteger';

describe('when validating decimal property does not match shared integer', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const decimalProperty: string = 'DecimalProperty';
  const totalDigits: string = '10';
  const decimalPlaces: string = '2';
  const minValue: string = '0';
  const maxValue: string = '10';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedInteger('SharedInteger')
      .withDocumentation('doc')
      .withEndSharedInteger()

      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity(decimalProperty, 'doc', totalDigits, decimalPlaces, minValue, maxValue)
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedIntegerBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating decimal property matches shared integer', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const decimalProperty: string = 'DecimalProperty';
  const totalDigits: string = '10';
  const decimalPlaces: string = '2';
  const minValue: string = '0';
  const maxValue: string = '10';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedInteger(decimalProperty)
      .withDocumentation('doc')
      .withEndSharedInteger()

      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity(decimalProperty, 'doc', totalDigits, decimalPlaces, minValue, maxValue)
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedIntegerBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DecimalPropertyMustNotMatchASharedInteger');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating decimal property matches shared integer -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating decimal property matches shared integer -> sourceMap');
  });
});
