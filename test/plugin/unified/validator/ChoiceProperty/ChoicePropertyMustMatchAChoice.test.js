// @flow
import ChoiceBuilder from '../../../../../src/core/builder/ChoiceBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/ChoiceProperty/ChoicePropertyMustMatchAChoice';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';
import type { PropertyType } from '../../../../../src/core/model/property/PropertyType';
import type { EntityProperty } from '../../../../../src/core/model/property/EntityProperty';
import { domainEntityFrom } from '../../../../core/TestHelper';

describe('when choice property has identifier of choice', () => {
  const repository: Repository = repositoryFactory();
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
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new ChoiceBuilder(repository.entity, [], new Map()));

    const propertyIndex: Map<PropertyType, Array<EntityProperty>> = new Map();
    propertyIndex.set('choice', domainEntityFrom(repository, domainEntityName).properties);
    failures = validate(repository, propertyIndex);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when choice property has invalid identifier', () => {
  const repository: Repository = repositoryFactory();
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
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new ChoiceBuilder(repository.entity, [], new Map()));

    const propertyIndex: Map<PropertyType, Array<EntityProperty>> = new Map();
    propertyIndex.set('choice', domainEntityFrom(repository, domainEntityName).properties);
    failures = validate(repository, propertyIndex);
  });

  it('should have validation failures()', () => {
    expect(failures.length).toBe(1);
  });

  it('should have validation failure for property', () => {
    expect(failures.length).toBe(1);

    expect(failures[0].validatorName).toBe('ChoicePropertyMustMatchAChoice');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when choice property has invalid identifier should have validation failures for each property -> message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when choice property has invalid identifier should have validation failures for each property -> sourceMap');
  });
});
