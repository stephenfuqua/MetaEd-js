// @flow
import AssociationBuilder from '../../../../../src/core/builder/AssociationBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/AssociationProperty/AssociationPropertyMustMatchAnAssociation';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';
import type { PropertyType } from '../../../../../src/core/model/property/PropertyType';
import type { EntityProperty } from '../../../../../src/core/model/property/EntityProperty';
import { domainEntityFrom } from '../../../../core/TestHelper';

describe('when association property has identifier of association', () => {
  const repository: Repository = repositoryFactory();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('DomainEntity1', 'doc')
      .withAssociationDomainEntityProperty('DomainEntity2', 'doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndAssociation()

      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withAssociationProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new AssociationBuilder(repository.entity, [], new Map()));

    const propertyIndex: Map<PropertyType, Array<EntityProperty>> = new Map();
    propertyIndex.set('association', domainEntityFrom(repository, domainEntityName).properties);
    failures = validate(repository, propertyIndex);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when association property has invalid identifier', () => {
  const repository: Repository = repositoryFactory();
  const domainEntityName: string = 'DomainEntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withAssociationProperty('UndefinedEntityName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()));

    const propertyIndex: Map<PropertyType, Array<EntityProperty>> = new Map();
    propertyIndex.set('association', domainEntityFrom(repository, domainEntityName).properties);
    failures = validate(repository, propertyIndex);
  });

  it('should have validation failures()', () => {
    expect(failures.length).toBe(1);
  });

  it('should have validation failure for property', () => {
    expect(failures.length).toBe(1);

    expect(failures[0].validatorName).toBe('AssociationPropertyMustMatchAnAssociation');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when association property has invalid identifier should have validation failures for each property -> message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when association property has invalid identifier should have validation failures for each property -> sourceMap');
  });
});
