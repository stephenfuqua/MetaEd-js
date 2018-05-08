// @flow
import { newMetaEdEnvironment, MetaEdTextBuilder, ChoiceBuilder, DomainEntityBuilder, NamespaceBuilder } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/ChoiceProperty/ChoicePropertyMustMatchAChoice';

describe('when choice property has identifier of choice', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when choice property has identifier of choice in dependency namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartChoice(entityName)
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndChoice()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withChoiceProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);
    failures = validate(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when choice property has invalid identifier', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
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

      .sendToListener(new NamespaceBuilder(metaEd, []))
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
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when choice property has invalid identifier in dependency namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const domainEntityName: string = 'DomainEntityName';
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartChoice('WrongName')
      .withDocumentation('doc')
      .withStringProperty('StringProperty', 'doc', true, false, '100')
      .withEndChoice()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartDomainEntity(domainEntityName)
      .withDocumentation('doc')
      .withChoiceProperty(entityName, 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new ChoiceBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should have validation failures()', () => {
    expect(failures).toHaveLength(1);
  });

  it('should have validation failure for property', () => {
    expect(failures[0].validatorName).toBe('ChoicePropertyMustMatchAChoice');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});
