// @noflow
import { SharedDecimalBuilder } from '../../src/builder/SharedDecimalBuilder';
import { MetaEdTextBuilder } from '../MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared decimal in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared decimal', () => {
    expect(metaEd.entity.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName)).toBeDefined();
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });
});

describe('when building duplicate shared decimals', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared decimal', () => {
    expect(metaEd.entity.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName)).toBeDefined();
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate shared decimals should have validation failures for each entity -> SD 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate shared decimals should have validation failures for each entity -> SD 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate shared decimals should have validation failures for each entity -> SD 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate shared decimals should have validation failures for each entity -> SD 2 sourceMap');
  });
});

describe('when building shared decimal with no shared decimal name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = '';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build shared decimal', () => {
    expect(metaEd.entity.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with lowercase shared decimal name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'entityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one shared decimal', () => {
    expect(metaEd.entity.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.sharedDecimal.get('Name')).toBeDefined();
    expect(metaEd.entity.sharedDecimal.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get('Name').maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe('');
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no metaed id', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have correct namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe('');
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have token recognition error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no total digits property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should not have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe('');
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no total digits value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits because decimal places token was ignored', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(decimalPlaces);
  });

  it('should not have decimal places because it was consumed by total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe('');
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input and mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no decimal places property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should not have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe('');
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have mismatched input and extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no min value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue because max value token was ignored', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have maxValue because it was consumed by min value', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe('');
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no max value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe('');
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withTrailingText(trailingText)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const entityName: string = 'EntityName';
  const metaEdId: string = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  // SharedSimpleSourceMap
  it('should have type', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.metaEdName).toBeDefined();
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.metaEdId).toBeDefined();
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  it('should have namespaceInfo', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.namespaceInfo).toBeDefined();
  });

  // SharedDecimalSourceMap
  it('should have totalDigits', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.totalDigits).toBeDefined();
  });

  it('should have decimalPlaces', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.decimalPlaces).toBeDefined();
  });

  it('should have minValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.minValue).toBeDefined();
  });

  it('should have maxValue', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap.maxValue).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(metaEd.entity.sharedDecimal.get(entityName).sourceMap).toMatchSnapshot();
  });
});
