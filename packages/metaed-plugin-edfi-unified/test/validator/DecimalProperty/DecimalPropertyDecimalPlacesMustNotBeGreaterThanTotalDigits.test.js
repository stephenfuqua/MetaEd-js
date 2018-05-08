// @flow
import { newMetaEdEnvironment, MetaEdTextBuilder, DomainEntityBuilder, NamespaceBuilder } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/DecimalProperty/DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits';

describe('when validating decimal property with correct total digits and decimal places', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const totalDigits: string = '10';
  const decimalPlaces: string = '2';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity('DecimalProperty', 'doc', totalDigits, decimalPlaces)
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));
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

describe('when validating decimal property with same total digits and decimal places', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const totalDigits: string = '10';
  const decimalPlaces: string = '10';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity('DecimalProperty', 'doc', totalDigits, decimalPlaces)
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

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

describe('when validating decimal property with decimal places greater than total digits', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  const totalDigits: string = '2';
  const decimalPlaces: string = '10';

  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAbstractEntity(entityName, '1')
      .withDocumentation('doc')
      .withDecimalIdentity('DecimalProperty', 'doc', totalDigits, decimalPlaces)
      .withEndAbstractEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));
    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DecimalPropertyDecimalPlacesMustNotBeGreaterThanTotalDigits');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});
