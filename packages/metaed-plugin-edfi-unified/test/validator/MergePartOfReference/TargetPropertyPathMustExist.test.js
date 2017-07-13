// @flow
import { newMetaEdEnvironment, MetaEdTextBuilder, DomainEntityBuilder, DomainEntityExtensionBuilder, DomainEntitySubclassBuilder,
  AssociationBuilder, AssociationExtensionBuilder, AssociationSubclassBuilder } from '../../../../../packages/metaed-core/index';
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { validate } from '../../../src/validator/MergePartOfReference/TargetPropertyPathMustExist';
import { CommonBuilder } from '../../../../metaed-core/src/builder/CommonBuilder';

describe('when validating domain entity has target property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'DomainEntity1';
  const propertyName = 'Property1';
  const targetEntityName = 'DomainEntity2';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetEntityName}.${targetPropertyName}`)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity has merge property and entity is wrong', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'Entity1';
  const propertyName = 'Property1';
  const targetEntityName = 'DomainEntity2';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `EntityNotValid.${targetPropertyName}`)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have one validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('MergePropertyPathMustExist');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating domain entity has merge property and entity is wrong -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating domain entity has merge property and entity is wrong -> sourceMap');
  });
});

describe('when validating domain entity has merge property and property is wrong', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'GoodEntity1';
  const propertyName = 'Property1';
  const targetEntityName = 'GoodEntity2';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetEntityName}.NotThere`)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have one validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('MergePropertyPathMustExist');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating domain entity has merge property and property is wrong -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating domain entity has merge property and property is wrong -> sourceMap');
  });
});

describe('when validating domain entity has merge property on common type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'Entity1';
  const secondEntityName = 'SecondEntity2';
  const propertyName = 'Property1';
  const targetEntityName = 'TargetEntity3';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartCommon(secondEntityName)
      .withDocumentation('doc')
      .withDomainEntityIdentity(domainEntityName, 'doc')
      .withEndCommon()

      .withStartDomainEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withCommonProperty(secondEntityName, 'doc', false, false)
      .withMergePartOfReference(`${secondEntityName}.${domainEntityName}`, domainEntityName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures))
      .sendToListener(new CommonBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity extension has merge property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'EntityWithExt1';
  const propertyName = 'Property1';
  const targetEntityName = 'EntityWithExt2';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntityExtension(targetEntityName)
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetEntityName}.${targetPropertyName}`)
      .withEndDomainEntityExtension()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity subclass has merge property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'EntityWithSub1';
  const propertyName = 'Property1';
  const targetEntityName = 'EntityWithSub2';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity('IdentityProperty', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity('IdentityProperty2', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntitySubclass('Entity3', targetEntityName)
      .withDocumentation('doc')
      .withIntegerProperty(targetPropertyName, 'doc', true, false)
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetEntityName}.Entity3.${targetPropertyName}`)
      .withEndDomainEntitySubclass()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating association has merge property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'EntityWithAssoc1';
  const propertyName = 'Property1';
  const targetAssociationName = 'Association';
  const targetPropertyName = 'Property4';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('Entity2')
      .withDocumentation('doc')
      .withIntegerIdentity('Property2', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('Entity3')
      .withDocumentation('doc')
      .withIntegerIdentity('Property3', 'doc')
      .withEndDomainEntity()

      .withStartAssociation(targetAssociationName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('Entity2', 'doc')
      .withAssociationDomainEntityProperty('Entity3', 'doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetAssociationName}.${targetPropertyName}`)
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures))
      .sendToListener(new AssociationBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build three domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(3);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating association extension has merge property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'EntityWithAssocExt1';
  const propertyName = 'Property1';
  const targetAssociationName = 'Association';
  const targetPropertyName = 'Property4';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('Entity2')
      .withDocumentation('doc')
      .withIntegerIdentity('Property2', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('Entity3')
      .withDocumentation('doc')
      .withIntegerIdentity('Property3', 'doc')
      .withEndDomainEntity()

      .withStartAssociation(targetAssociationName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('Entity2', 'doc')
      .withAssociationDomainEntityProperty('Entity3', 'doc')
      .withIntegerIdentity(targetPropertyName, 'doc')

      .withStartAssociationExtension(targetAssociationName)
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetAssociationName}.${targetPropertyName}`)
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures))
      .sendToListener(new AssociationBuilder(metaEd, failures))
      .sendToListener(new AssociationExtensionBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build three domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(3);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating association subclass has merge property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'EntityWithAssocSub1';
  const propertyName = 'Property1';
  const targetAssociationName = 'Association';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('Entity2')
      .withDocumentation('doc')
      .withIntegerIdentity('Property2', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('Entity3')
      .withDocumentation('doc')
      .withIntegerIdentity('Property3', 'doc')
      .withEndDomainEntity()

      .withStartAssociation(targetAssociationName)
      .withDocumentation('doc')
      .withAssociationDomainEntityProperty('Entity2', 'doc')
      .withAssociationDomainEntityProperty('Entity3', 'doc')
      .withIntegerIdentity('Property4', 'doc')

      .withStartAssociationSubclass('Entity5', targetAssociationName)
      .withDocumentation('doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`Entity2.${propertyName}`, `${targetAssociationName}.${domainEntityName}`)
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures))
      .sendToListener(new AssociationBuilder(metaEd, failures))
      .sendToListener(new AssociationSubclassBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build three domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(3);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating abstract entity has merge property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName = 'AbstractEntity1';
  const propertyName = 'Property1';
  const targetEntityName = 'AbstractEntity2';
  const targetPropertyName = 'Property2';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(propertyName, 'doc')
      .withEndDomainEntity()

      .withStartAbstractEntity(targetEntityName)
      .withDocumentation('doc')
      .withIntegerIdentity(targetPropertyName, 'doc')
      .withAssociationProperty(domainEntityName, 'doc', false, false)
      .withMergePartOfReference(`${domainEntityName}.${propertyName}`, `${targetEntityName}.${targetPropertyName}`)
      .withEndAbstractEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, failures));

    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(metaEd.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});
