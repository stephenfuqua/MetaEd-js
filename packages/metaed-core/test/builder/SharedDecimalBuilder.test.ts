import { SharedDecimalBuilder } from '../../src/builder/SharedDecimalBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getSharedDecimal } from '../TestHelper';
import { SharedDecimalSourceMap } from '../../src/model/SharedDecimal';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared decimal in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared decimal', () => {
    expect(namespace.entity.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getSharedDecimal(namespace.entity, entityName)).toBeDefined();
    expect(getSharedDecimal(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });
});

describe('when building duplicate shared decimals', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()

      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared decimal', () => {
    expect(namespace.entity.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getSharedDecimal(namespace.entity, entityName)).toBeDefined();
    expect(getSharedDecimal(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate shared decimals should have validation failures for each entity -> SD 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate shared decimals should have validation failures for each entity -> SD 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate shared decimals should have validation failures for each entity -> SD 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate shared decimals should have validation failures for each entity -> SD 2 sourceMap',
    );
  });
});

describe('when building shared decimal with no shared decimal name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build shared decimal', () => {
    expect(namespace.entity.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with lowercase shared decimal name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build no shared decimal', () => {
    expect(namespace.entity.sharedDecimal.size).toBe(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no metaed id', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have correct namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have correct project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should not have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe('');
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should have token recognition error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no total digits property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should not have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe('');
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no total digits value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits because decimal places token was ignored', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(decimalPlaces);
  });

  it('should not have decimal places because it was consumed by total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe('');
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input and mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no decimal places property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should not have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe('');
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should have mismatched input and extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no min value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue because max value token was ignored', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have maxValue because it was consumed by min value', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe('');
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no max value', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withTotalDigits(totalDigits)
      .withDecimalPlaces(decimalPlaces)
      .withMinValue(minValue)
      .withMaxValue(maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe('');
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withTrailingText(trailingText)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedDecimal(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedDecimal(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(getSharedDecimal(namespace.entity, entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(getSharedDecimal(namespace.entity, entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(getSharedDecimal(namespace.entity, entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const totalDigits = '10';
  const decimalPlaces = '3';
  const minValue = '2';
  const maxValue = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedDecimalBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDocumentation(documentation)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  // SharedSimpleSourceMap
  it('should have type', () => {
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  // SharedDecimalSourceMap
  it('should have totalDigits', () => {
    expect((getSharedDecimal(namespace.entity, entityName).sourceMap as SharedDecimalSourceMap).totalDigits).toBeDefined();
  });

  it('should have decimalPlaces', () => {
    expect((getSharedDecimal(namespace.entity, entityName).sourceMap as SharedDecimalSourceMap).decimalPlaces).toBeDefined();
  });

  it('should have minValue', () => {
    expect((getSharedDecimal(namespace.entity, entityName).sourceMap as SharedDecimalSourceMap).minValue).toBeDefined();
  });

  it('should have maxValue', () => {
    expect((getSharedDecimal(namespace.entity, entityName).sourceMap as SharedDecimalSourceMap).maxValue).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(getSharedDecimal(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
