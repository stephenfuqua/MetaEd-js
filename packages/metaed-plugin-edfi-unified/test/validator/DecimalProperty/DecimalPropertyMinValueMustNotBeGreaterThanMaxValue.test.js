// @flow
import { newMetaEdEnvironment, MetaEdTextBuilder, DomainEntityBuilder } from '../../../../../packages/metaed-core/index';
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { validate } from '../../../src/validator/DecimalProperty/DecimalPropertyMinValueMustNotBeGreaterthanMaxValue';

describe('when validating decimal property with correct minimum value and maximum value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const totalDigits: string = '10';
  const decimalPlaces: string = '2';
  const minValue: string = '0';
  const maxValue: string = '10';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi', 'ProjectExtension')
      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity('DecimalProperty', 'doc', totalDigits, decimalPlaces, minValue, maxValue)
      .withEndAbstractEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating decimal property with same minimum value and maximum value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const totalDigits: string = '10';
  const decimalPlaces: string = '2';
  const minValue: string = '5';
  const maxValue: string = '5';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi', 'ProjectExtension')
      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity('DecimalProperty', 'doc', totalDigits, decimalPlaces, minValue, maxValue)
      .withEndAbstractEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating decimal property with minimum value greater than maximum value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const totalDigits: string = '10';
  const decimalPlaces: string = '2';
  const minValue: string = '10';
  const maxValue: string = '0';

  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi', 'ProjectExtension')
      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity('DecimalProperty', 'doc', totalDigits, decimalPlaces, minValue, maxValue)
      .withEndAbstractEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DecimalPropertyMinValueMustNotBeGreaterThanMaxValue');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating decimal property with minimum value greater than maximum value -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating decimal property with minimum value greater than maximum value -> sourceMap');
  });
});
