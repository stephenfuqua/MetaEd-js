// @flow
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import type { Repository } from '../../../../../src/core/model/Repository';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/CrossEntity/MostEntitiesCannotHaveSameName';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';
import AssociationBuilder from '../../../../../src/core/builder/AssociationBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import DomainEntityExtensionBuilder from '../../../../../src/core/builder/DomainEntityExtensionBuilder';
import AssociationExtensionBuilder from '../../../../../src/core/builder/AssociationExtensionBuilder';
import SharedIntegerBuilder from '../../../../../src/core/builder/SharedIntegerBuilder';
import DescriptorBuilder from '../../../../../src/core/builder/DescriptorBuilder';
import EnumerationBuilder from '../../../../../src/core/builder/EnumerationBuilder';
import InterchangeBuilder from '../../../../../src/core/builder/InterchangeBuilder';
import CommonBuilder from '../../../../../src/core/builder/CommonBuilder';

describe('when entities have different names', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity('DomainEntity1')
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartAssociation('Association1')
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('Prop7', 'doc')
      .withAssociationDomainEntityProperty('Prop8', 'doc')
      .withEndAssociation()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new AssociationBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity and one association', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.association.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when DE and Association have identical names', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('Prop7', 'doc')
      .withAssociationDomainEntityProperty('Prop8', 'doc')
      .withEndAssociation()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new AssociationBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity and one association', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.association.size).toBe(1);
  });

  it('should have validation failures for each entity', () => {
    expect(failures.length).toBe(2);

    expect(failures[0].validatorName).toBe('MostEntitiesCannotHaveSameName');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when DE and Association have identical names should have validation failures for each entity -> association message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when DE and Association have identical names should have validation failures for each entity -> association sourceMap');

    expect(failures[1].validatorName).toBe('MostEntitiesCannotHaveSameName');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot('when DE and Association have identical names should have validation failures for each entity -> DE message ');
    expect(failures[1].sourceMap).toMatchSnapshot('when DE and Association have identical names should have validation failures for each entity -> DE sourceMap');
  });
});

describe('when DE has same name as DE extension', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntityExtension(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new DomainEntityExtensionBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one DE and one DE extension', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when Association has same name as Association extension', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('Prop7', 'doc')
      .withAssociationDomainEntityProperty('Prop8', 'doc')
      .withEndAssociation()

      .withStartAssociationExtension(entityName)
      .withDocumentation('doc')
      .withDateProperty('BeginDate', 'doc', true, false)
      .withDateProperty('EndDate', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new AssociationBuilder(repository.entity, [], new Map()))
      .sendToListener(new AssociationExtensionBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one DE and one DE extension', () => {
    expect(repository.entity.association.size).toBe(1);
    expect(repository.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when DE and SharedInteger have identical names', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartSharedInteger(entityName)
      .withDocumentation('doc')
      .withMinValue('0')
      .withEndSharedInteger()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new SharedIntegerBuilder(repository.entity, []));

    failures = validate(repository);
  });

  it('should build one domain entity and one shared integer', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.sharedInteger.size).toBe(1);
  });

  it('should have validation failures for each entity', () => {
    expect(failures.length).toBe(2);

    expect(failures[0].validatorName).toBe('MostEntitiesCannotHaveSameName');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when DE and SharedInteger have identical names should have validation failures for each entity -> DE message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when DE and SharedInteger have identical names should have validation failures for each entity -> DE sourceMap');

    expect(failures[1].validatorName).toBe('MostEntitiesCannotHaveSameName');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot('when DE and SharedInteger have identical names should have validation failures for each entity -> SharedInteger message ');
    expect(failures[1].sourceMap).toMatchSnapshot('when DE and SharedInteger have identical names should have validation failures for each entity -> SharedInteger sourceMap');
  });
});

describe('when DE and Common have identical names', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartCommon(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop2', 'doc', true, false)
      .withEndCommon()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new CommonBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one domain entity and one common', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.common.size).toBe(1);
  });

  it('should have validation failures for each entity', () => {
    expect(failures.length).toBe(2);

    expect(failures[0].validatorName).toBe('MostEntitiesCannotHaveSameName');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when DE and Common have identical names should have validation failures for each entity -> DE message ');
    expect(failures[0].sourceMap).toMatchSnapshot('when DE and Common have identical names should have validation failures for each entity -> DE sourceMap');

    expect(failures[1].validatorName).toBe('MostEntitiesCannotHaveSameName');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot('when DE and Common have identical names should have validation failures for each entity -> SharedInteger message ');
    expect(failures[1].sourceMap).toMatchSnapshot('when DE and Common have identical names should have validation failures for each entity -> SharedInteger sourceMap');
  });
});

describe('when DE has same name as descriptor', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDescriptor(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDescriptor()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new DescriptorBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one DE and one descriptor', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.descriptor.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when DE has same name as enumeration', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartEnumeration(entityName)
      .withDocumentation('doc')
      .withEnumerationItem('ShortDescription', 'doc')
      .withEndEnumeration()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new EnumerationBuilder(repository.entity, [], new Map()));

    failures = validate(repository);
  });

  it('should build one DE and one enumeration', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.enumeration.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});

describe('when DE has same name as interchange', () => {
  const repository: Repository = repositoryFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('Prop1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartInterchange(entityName)
      .withDocumentation('doc')
      .withDomainEntityElement(entityName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(repository.entity, [], new Map()))
      .sendToListener(new InterchangeBuilder(repository.entity, []));

    failures = validate(repository);
  });

  it('should build one DE and one interchange', () => {
    expect(repository.entity.domainEntity.size).toBe(1);
    expect(repository.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures.length).toBe(0);
  });
});
