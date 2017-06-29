// @flow
import CommonBuilder from '../../../../../src/core/builder/CommonBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import { validate } from '../../../../../src/plugin/unified/validator/CommonProperty/CommonPropertyMustMatchACommon';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when common property has identifier of common', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon(entityName)
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndCommon()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withCommonProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when common property has invalid identifier', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartCommon('WrongName')
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndCommon()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withCommonProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new CommonBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
  });

  it('should have validation failure for property', () => {
    expect(failures[0].validatorName).toBe('CommonPropertyMustMatchACommon');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when common property has invalid identifier should have validation failures for each property -> message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when common property has invalid identifier should have validation failures for each property -> sourceMap');
  });
});
