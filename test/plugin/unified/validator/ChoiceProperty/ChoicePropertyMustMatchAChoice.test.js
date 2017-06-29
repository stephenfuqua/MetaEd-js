// @flow
import ChoiceBuilder from '../../../../../src/core/builder/ChoiceBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import { validate } from '../../../../../src/plugin/unified/validator/ChoiceProperty/ChoicePropertyMustMatchAChoice';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when choice property has identifier of choice', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartChoice(entityName)
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withChoiceProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when choice property has invalid identifier', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartChoice('WrongName')
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndChoice()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withChoiceProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
  });

  it('should have validation failure for property', () => {
    expect(failures[0].validatorName).toBe('ChoicePropertyMustMatchAChoice');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when choice property has invalid identifier should have validation failures for each property -> message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when choice property has invalid identifier should have validation failures for each property -> sourceMap');
  });
});
