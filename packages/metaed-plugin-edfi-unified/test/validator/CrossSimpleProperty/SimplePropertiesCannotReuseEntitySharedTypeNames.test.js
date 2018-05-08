// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  DomainEntityBuilder,
  NamespaceBuilder,
  SharedDecimalBuilder,
  SharedIntegerBuilder,
  SharedStringBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/CrossSimpleProperty/SimplePropertiesCannotReuseEntitySharedTypeNames';

describe('when building shared integer with duplicate integer property in core namespace', () => {
  let failures: Array<ValidationFailure> = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const entityName: string = 'EntityName';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue)
      .withEndDomainEntity()

      .withStartSharedInteger(entityName)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedIntegerBuilder(metaEd, []));
    failures = validate(metaEd);
  });

  it('should build one integer property', () => {
    expect(metaEd.propertyIndex.integer.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(failures[0].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});

describe('when building shared integer with duplicate integer property in extension namespace', () => {
  let failures: Array<ValidationFailure> = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

  const entityName: string = 'EntityName';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false, maxValue, minValue)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'Extension')
      .withStartSharedInteger(entityName)
      .withDocumentation(documentation)
      .withNumericRestrictions(minValue, maxValue)
      .withEndSharedInteger()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedIntegerBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one integer property', () => {
    expect(metaEd.propertyIndex.integer.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(failures[0].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});

describe('when building shared decimal with duplicate decimal property in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure> = [];

  const entityName: string = 'EntityName';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(entityName, documentation, true, false, totalDigits, decimalPlaces, minValue, maxValue)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('extension', 'Extension')
      .withStartSharedDecimal(entityName)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedDecimalBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one decimal property', () => {
    expect(metaEd.propertyIndex.decimal.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(failures[0].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});

describe('when building shared string with duplicate string property in extension namespace reversed', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure> = [];

  const entityName: string = 'EntityName';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedString(entityName)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()

      .withBeginNamespace('extension', 'Extension')
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(entityName, documentation, true, false, minLength, maxLength)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedStringBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one string property', () => {
    expect(metaEd.propertyIndex.string.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(failures[0].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});

describe('when building shared string with duplicate integer property in extension namespace reversed', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure> = [];

  const entityName: string = 'EntityName';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedString(entityName)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()

      .withBeginNamespace('extension', 'Extension')
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(entityName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new SharedStringBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one integer property', () => {
    expect(metaEd.propertyIndex.integer.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(failures[0].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('SimplePropertiesCannotReuseEntitySharedTypeNames');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});