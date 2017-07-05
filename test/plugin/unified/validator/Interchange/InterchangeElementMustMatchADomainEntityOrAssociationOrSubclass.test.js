// @flow
import AssociationBuilder from '../../../../../src/core/builder/AssociationBuilder';
import AssociationSubclassBuilder from '../../../../../src/core/builder/AssociationSubclassBuilder';
import DescriptorBuilder from '../../../../../src/core/builder/DescriptorBuilder';
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import DomainEntitySubclassBuilder from '../../../../../src/core/builder/DomainEntitySubclassBuilder';
import InterchangeBuilder from '../../../../../src/core/builder/InterchangeBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import { validate } from '../../../../../src/plugin/unified/validator/Interchange/InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating interchange element is an abstract entity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const abstractEntityName: string = 'AbstractEntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAbstractEntity(abstractEntityName)
      .withDocumentation('AbstractEntityDocumentation')
      .withStringIdentity('StringName', 'StringDocumentation', '100')
      .withEndAbstractEntity()

      .withStartInterchange('InterchangeName')
      .withDocumentation('InterchangeDocumentation')
      .withDomainEntityElement(abstractEntityName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one abstract entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange element is a domain entity', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainEntityName: string = 'DomainEntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('DomainEntityDocumentation')
      .withStringIdentity('StringName', 'StringDocumentation', '100')
      .withEndDomainEntity()

      .withStartInterchange('InterchangeName')
      .withDocumentation('EntityDocumentation')
      .withDomainEntityElement(domainEntityName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one domain entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange element is a domain entity subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainEntityName: string = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('DomainEntityDocumentation')
      .withBooleanProperty('BooleanName1', 'BooleanDocumentation', true, false)
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName)
      .withDocumentation('DomainEntitySubclassDocumentation')
      .withBooleanProperty('BooleanName2', 'BooleanDocumentation', true, false)
      .withEndDomainEntitySubclass()

      .withStartInterchange('InterchangeName')
      .withDocumentation('InterchangeDocumentation')
      .withDomainEntityElement(domainEntitySubclassName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one domain entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity subclass', () => {
    expect(metaEd.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange element is an association', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const associationName: string = 'AssociationName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(associationName)
      .withDocumentation('AssociationDocumentation')
      .withAssociationDomainEntityProperty('DomainEntityName1', 'DomainEntityDocumentation')
      .withAssociationDomainEntityProperty('DomainEntityName2', 'DomainEntityDocumentation')
      .withBooleanProperty('BooleanName', 'BooleanDocumentation', true, false)
      .withEndAssociation()

      .withStartInterchange('InterchangeName')
      .withDocumentation('InterchangeDocumentation')
      .withAssociationElement(associationName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange element is an association subclass', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const associationName: string = 'AssociationName';
  const associationSubclassName: string = 'AssociationSubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(associationName)
      .withDocumentation('AssociationDocumentation')
      .withAssociationDomainEntityProperty('DomainEntityName1', 'EntityDocumentation')
      .withAssociationDomainEntityProperty('DomainEntityName2', 'EntityDocumentation')
      .withBooleanProperty('BooleanName1', 'BooleanDocumentation', true, false)
      .withEndAssociation()

      .withStartAssociationSubclass(associationSubclassName, associationName)
      .withDocumentation('SubclassDocumentation')
      .withBooleanProperty('BooleanName2', 'BooleanDocumentation', true, false)
      .withEndAssociationSubclass()

      .withStartInterchange('InterchangeName')
      .withDocumentation('InterchangeDocumentation')
      .withAssociationElement(associationSubclassName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one association', () => {
    expect(metaEd.entity.association.size).toBe(1);
  });

  it('should build one association subclass', () => {
    expect(metaEd.entity.associationSubclass.size).toBe(1);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange element is a descriptor', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const descriptorName: string = 'DescriptorName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDescriptor(descriptorName)
      .withDocumentation('DescriptorDocumentation')
      .withStartMapType()
      .withDocumentation('MapTypeDocumentation')
      .withEnumerationItem('EnumerationItemShortDescription', 'EnumerationItemDocumentation')
      .withEndMapType()
      .withEndDescriptor()

      .withStartInterchange('InterchangeName')
      .withDocumentation('InterchangeDocumentation')
      .withDescriptorElement(descriptorName)
      .withEndInterchange()
      .withEndNamespace()

      .sendToListener(new DescriptorBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one descriptor', () => {
    expect(metaEd.entity.descriptor.size).toBe(1);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange element has invalid name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartInterchange('InterchangeName')
      .withDocumentation('InterchangeDocumentation')
      .withDomainEntityElement('DomainEntityName')
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new InterchangeBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one interchange', () => {
    expect(metaEd.entity.interchange.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating interchange element has invalid name should have validation failures -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating interchange element has invalid name should have validation failures -> sourceMap');
  });
});
