// @noflow
import SharedDecimalBuilder from '../../../src/core/builder/SharedDecimalBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building shared decimal in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.sharedDecimal.get(entityName)).toBeDefined();
    expect(entityRepository.sharedDecimal.get(entityName).metaEdName).toBe(entityName);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });
});

describe('when building shared decimal with no shared decimal name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedInteger.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with lowercase shared decimal name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.sharedDecimal.get('Name')).toBeDefined();
    expect(entityRepository.sharedDecimal.get('Name').metaEdName).toBe('Name');
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedDecimal.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get('Name').metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get('Name').documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get('Name').totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get('Name').decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get('Name').minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get('Name').maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSharedDecimal(entityName, metaEdId)
      .withDecimalRestrictions(totalDigits, decimalPlaces, minValue, maxValue)
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have namespace', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe('');
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no metaed id', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe('');
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have token recognition error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no total digits property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should not have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe('');
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no total digits value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits because decimal places token was ignored', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(decimalPlaces);
  });

  it('should not have decimal places because it was consumed by total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe('');
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input and mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no decimal places property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should not have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe('');
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have mismatched input and extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no min value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue because max value token was ignored', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(`max value${maxValue}`);
  });

  it('should not have maxValue because it was consumed by min value', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe('');
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with no max value', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should not have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe('');
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared decimal with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new SharedDecimalBuilder(entityRepository);

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
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have project extension', () => {
    expect(entityRepository.sharedDecimal.get(entityName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(entityRepository.sharedDecimal.get(entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(entityRepository.sharedDecimal.get(entityName).documentation).toBe(documentation);
  });

  it('should have total digits', () => {
    expect(entityRepository.sharedDecimal.get(entityName).totalDigits).toBe(totalDigits);
  });

  it('should have decimal places', () => {
    expect(entityRepository.sharedDecimal.get(entityName).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have minValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).minValue).toBe(minValue);
  });

  it('should have maxValue', () => {
    expect(entityRepository.sharedDecimal.get(entityName).maxValue).toBe(maxValue);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
