import { DomainEntityBuilder } from '../../src/builder/DomainEntityBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';

import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building domain entity with duplicate decimal properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const propertyName = 'Xyz.PropertyName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(
        propertyName,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId,
      )
      .withDecimalProperty(
        propertyName,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId,
      )
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one decimal', () => {
    expect(metaEd.propertyIndex.decimal.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building domain entity with non-duplicate decimal properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withDecimalProperty(
        propertyName1,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId,
      )
      .withDecimalProperty(
        propertyName2,
        documentation,
        true,
        false,
        totalDigits,
        decimalPlaces,
        minValue,
        maxValue,
        null,
        metaEdId,
      )
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two decimals', () => {
    expect(metaEd.propertyIndex.decimal.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.decimal[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.decimal[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.decimal[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.decimal[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with duplicate integer properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const propertyName = 'Xyz.PropertyName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withIntegerProperty(propertyName, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one integer', () => {
    expect(metaEd.propertyIndex.integer.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building domain entity with non-duplicate integer properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withIntegerProperty(propertyName1, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withIntegerProperty(propertyName2, documentation, true, false, maxValue, minValue, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two integers', () => {
    expect(metaEd.propertyIndex.integer.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.integer[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.integer[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.integer[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.integer[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building domain entity with duplicate string properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const propertyName = 'Xyz.PropertyName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(propertyName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withStringProperty(propertyName, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one string', () => {
    expect(metaEd.propertyIndex.string.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building domain entity with non-duplicate string properties in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';
  const projectExtension = 'ProjectExtension';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartDomainEntity('DomainEntity', '1')
      .withDocumentation(documentation)
      .withStringProperty(propertyName1, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withStringProperty(propertyName2, documentation, true, false, maxLength, minLength, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two strings', () => {
    expect(metaEd.propertyIndex.string.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.string[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.string[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.string[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.string[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with duplicate boolean properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withBooleanProperty(propertyName, documentation, true, false)
      .withBooleanProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one boolean', () => {
    expect(metaEd.propertyIndex.boolean.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with non-duplicate boolean properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withBooleanProperty(propertyName1, documentation, true, false)
      .withBooleanProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two booleans', () => {
    expect(metaEd.propertyIndex.boolean.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.boolean[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.boolean[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.boolean[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.boolean[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with duplicate currency properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCurrencyProperty(propertyName, documentation, true, false)
      .withCurrencyProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one currency', () => {
    expect(metaEd.propertyIndex.currency.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with non-duplicate currency properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCurrencyProperty(propertyName1, documentation, true, false)
      .withCurrencyProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two currencies', () => {
    expect(metaEd.propertyIndex.currency.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.currency[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.currency[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.currency[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.currency[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with duplicate date properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withDateProperty(propertyName, documentation, true, false)
      .withDateProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one date', () => {
    expect(metaEd.propertyIndex.date.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with non-duplicate date properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withDateProperty(propertyName1, documentation, true, false)
      .withDateProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two dates', () => {
    expect(metaEd.propertyIndex.date.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.date[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.date[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.date[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.date[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with duplicate duration properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withDurationProperty(propertyName, documentation, true, false)
      .withDurationProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one duration', () => {
    expect(metaEd.propertyIndex.duration.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with non-duplicate duration properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withDurationProperty(propertyName1, documentation, true, false)
      .withDurationProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two durations', () => {
    expect(metaEd.propertyIndex.duration.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.duration[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.duration[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.duration[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.duration[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with duplicate enumeration properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withEnumerationProperty(propertyName, documentation, true, false)
      .withEnumerationProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one enumeration', () => {
    expect(metaEd.propertyIndex.enumeration.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with non-duplicate enumeration properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withEnumerationProperty(propertyName1, documentation, true, false)
      .withEnumerationProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two enumerations', () => {
    expect(metaEd.propertyIndex.enumeration.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.enumeration[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.enumeration[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.enumeration[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.enumeration[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with duplicate common properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withCommonProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with non-duplicate common properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withCommonProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two commons', () => {
    expect(metaEd.propertyIndex.common.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.common[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.common[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with an association property that duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withAssociationProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, zero associations', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.association.length).toBe(0);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with an association property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withAssociationProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one association', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.association.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.association[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.association[0].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with a short property that duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withShortProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, zero shorts', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.short.length).toBe(0);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with a short property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withShortProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one short', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.short.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.short[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.short[0].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with an shared decimal property that duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withSharedDecimalProperty(propertyName, '', documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, zero shared decimals', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.sharedDecimal.length).toBe(0);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with an shared decimal property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withSharedDecimalProperty(propertyName2, '', documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one shared decimal', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.sharedDecimal.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.sharedDecimal[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.sharedDecimal[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.sharedDecimal[0].referencedType).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with renamed shared decimal property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withSharedDecimalProperty(propertyName2, 'RenamedName', documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one shared decimal', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.sharedDecimal.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.sharedDecimal[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.sharedDecimal[0].metaEdName).toBe('RenamedName');
    expect(metaEd.propertyIndex.sharedDecimal[0].referencedType).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with a time property that duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withTimeProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it("should build one common, zero Time's", () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.time.length).toBe(0);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with a time property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withTimeProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one time', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.time.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.time[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.time[0].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with a datetime property that duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withDatetimeProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, zero datetimes', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.datetime.length).toBe(0);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with a datetime property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withDatetimeProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one datetime', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.datetime.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.datetime[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.datetime[0].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with a year property that duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName, documentation, true, false)
      .withYearProperty(propertyName, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, zero years', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.year.length).toBe(0);
  });

  it('should have validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with a year property that non-duplicates name of another property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withCommonProperty(propertyName1, documentation, true, false)
      .withYearProperty(propertyName2, documentation, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one common, one year', () => {
    expect(metaEd.propertyIndex.common.length).toBe(1);
    expect(metaEd.propertyIndex.year.length).toBe(1);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.common[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.common[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.year[0].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.year[0].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with two association properties duplicate property name but different contexts', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, documentation, true, false, false, 'Context1')
      .withAssociationProperty(propertyName, documentation, true, false, false, 'Context2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two associations', () => {
    expect(metaEd.propertyIndex.association.length).toBe(2);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with two association properties non-duplicate property name but different contexts', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName1, documentation, true, false, false, 'Context1')
      .withAssociationProperty(propertyName2, documentation, true, false, false, 'Context2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two associations', () => {
    expect(metaEd.propertyIndex.association.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.association[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.association[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.association[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.association[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with two association properties with duplicate property name and duplicate contexts', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, documentation, true, false, false, 'Context1')
      .withAssociationProperty(propertyName, documentation, true, false, false, 'Context1')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one association', () => {
    expect(metaEd.propertyIndex.association.length).toBe(1);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with two association properties with non-duplicate property name and duplicate contexts', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName1, documentation, true, false, false, 'Context1')
      .withAssociationProperty(propertyName2, documentation, true, false, false, 'Context1')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two associations', () => {
    expect(metaEd.propertyIndex.association.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.association[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.association[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.association[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.association[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with two association properties with duplicate property name and duplicate contexts, different shorten to', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, documentation, true, false, false)
      .withContext('context1', 'Short1')
      .withAssociationProperty(propertyName, documentation, true, false, false)
      .withContext('context1', 'Short2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build one association', () => {
    expect(metaEd.propertyIndex.association.length).toBe(1);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with two association properties with non-duplicate property name and duplicate contexts, different shorten to', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName1, documentation, true, false, false)
      .withContext('context1', 'Short1')
      .withAssociationProperty(propertyName2, documentation, true, false, false)
      .withContext('context1', 'Short2')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two associations', () => {
    expect(metaEd.propertyIndex.association.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.association[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.association[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.association[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.association[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});

describe('when building entities with two association properties with duplicate property name and duplicate contexts, duplicate shorten to', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName = 'Xyz.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName, documentation, true, false, false)
      .withContext('context1', 'ShortOne')
      .withAssociationProperty(propertyName, documentation, true, false, false)
      .withContext('context1', 'ShortOne')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two associations', () => {
    expect(metaEd.propertyIndex.association.length).toBe(1);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[0].category).toBe('error');

    expect(validationFailures[1].validatorName).toBe('TopLevelEntityBuilder');
    expect(validationFailures[1].category).toBe('error');
  });
});

describe('when building entities with two association properties with non-duplicate property name and duplicate contexts, duplicate shorten to', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'Namespace';

  const propertyName1 = 'Xyz.PropertyName';
  const propertyName2 = 'Abc.PropertyName';
  const documentation = 'doc';

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity('EntityName')
      .withDocumentation(documentation)
      .withAssociationProperty(propertyName1, documentation, true, false, false)
      .withContext('context1', 'ShortOne')
      .withAssociationProperty(propertyName2, documentation, true, false, false)
      .withContext('context1', 'ShortOne')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(new DomainEntityBuilder(metaEd, validationFailures));
  });

  it('should build two associations', () => {
    expect(metaEd.propertyIndex.association.length).toBe(2);
  });

  it('should have correct reference namespace and metaed name', () => {
    expect(metaEd.propertyIndex.association[0].referencedNamespaceName).toBe('Xyz');
    expect(metaEd.propertyIndex.association[0].metaEdName).toBe('PropertyName');
    expect(metaEd.propertyIndex.association[1].referencedNamespaceName).toBe('Abc');
    expect(metaEd.propertyIndex.association[1].metaEdName).toBe('PropertyName');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });
});
