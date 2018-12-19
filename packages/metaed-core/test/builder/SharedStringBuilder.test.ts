import { SharedStringBuilder } from '../../src/builder/SharedStringBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getSharedString } from '../TestHelper';
import { SharedStringSourceMap } from '../../src/model/SharedString';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building shared string in extension namespace', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared string', () => {
    expect(namespace.entity.sharedString.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getSharedString(namespace.entity, entityName)).toBeDefined();
    expect(getSharedString(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedString(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedString(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(getSharedString(namespace.entity, entityName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(getSharedString(namespace.entity, entityName).maxLength).toBe(maxLength);
  });
});

describe('when building duplicate shared strings', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);
    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()

      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared string', () => {
    expect(namespace.entity.sharedString.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getSharedString(namespace.entity, entityName)).toBeDefined();
    expect(getSharedString(namespace.entity, entityName).metaEdName).toBe(entityName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate shared strings should have validation failures for each entity -> SS 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate shared strings should have validation failures for each entity -> SS 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('SharedSimpleBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate shared strings should have validation failures for each entity -> SS 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate shared strings should have validation failures for each entity -> SS 2 sourceMap',
    );
  });
});

describe('when building shared string with no shared string name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = '';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build shared string', () => {
    expect(namespace.entity.sharedString.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with lowercase shared string name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'entityName';
  const expectedName = 'Name';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one shared string', () => {
    expect(namespace.entity.sharedString.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(getSharedString(namespace.entity, expectedName)).toBeDefined();
    expect(getSharedString(namespace.entity, expectedName).metaEdName).toBe(expectedName);
  });

  it('should have namespace', () => {
    expect(getSharedString(namespace.entity, expectedName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedString(namespace.entity, expectedName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedString(namespace.entity, expectedName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedString(namespace.entity, expectedName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(getSharedString(namespace.entity, expectedName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(getSharedString(namespace.entity, expectedName).maxLength).toBe(maxLength);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const minLength = '2';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedString(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should not have documentation', () => {
    expect(getSharedString(namespace.entity, entityName).documentation).toBe('');
  });

  it('should have min length', () => {
    expect(getSharedString(namespace.entity, entityName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(getSharedString(namespace.entity, entityName).maxLength).toBe(maxLength);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with no min length', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedString(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedString(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have a min length because max length token was ignored', () => {
    expect(getSharedString(namespace.entity, entityName).minLength).toBe(maxLength);
  });

  it('should not have max length', () => {
    expect(getSharedString(namespace.entity, entityName).maxLength).toBe('');
  });

  it('should have extraneous input and mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with no max length', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedString(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedString(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(getSharedString(namespace.entity, entityName).minLength).toBe(minLength);
  });

  it('should no max length', () => {
    expect(getSharedString(namespace.entity, entityName).maxLength).toBe('');
  });

  it('should have missing unsigned int error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withTrailingText(trailingText)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have namespace', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have project extension', () => {
    expect(getSharedString(namespace.entity, entityName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have metaed id', () => {
    expect(getSharedString(namespace.entity, entityName).metaEdId).toBe(metaEdId);
  });

  it('should have documentation', () => {
    expect(getSharedString(namespace.entity, entityName).documentation).toBe(documentation);
  });

  it('should have min length', () => {
    expect(getSharedString(namespace.entity, entityName).minLength).toBe(minLength);
  });

  it('should have max length', () => {
    expect(getSharedString(namespace.entity, entityName).maxLength).toBe(maxLength);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building shared string source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const entityName = 'EntityName';
  const metaEdId = '123';
  const documentation = 'doc';
  const minLength = '2';
  const maxLength = '100';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new SharedStringBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartSharedString(entityName, metaEdId)
      .withDocumentation(documentation)
      .withStringRestrictions(minLength, maxLength)
      .withEndSharedString()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  // SharedSimpleSourceMap
  it('should have type', () => {
    expect(getSharedString(namespace.entity, entityName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getSharedString(namespace.entity, entityName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(getSharedString(namespace.entity, entityName).sourceMap.metaEdName).toBeDefined();
    expect(getSharedString(namespace.entity, entityName).sourceMap.metaEdName.tokenText).toBe(entityName);
  });

  it('should have metaEdId', () => {
    expect(getSharedString(namespace.entity, entityName).sourceMap.metaEdId).toBeDefined();
    expect(getSharedString(namespace.entity, entityName).sourceMap.metaEdId.tokenText).toBe(`[${metaEdId}]`);
  });

  // SharedStringSourceMap
  it('should have minLength', () => {
    expect((getSharedString(namespace.entity, entityName).sourceMap as SharedStringSourceMap).minLength).toBeDefined();
  });

  it('should have maxLength', () => {
    expect((getSharedString(namespace.entity, entityName).sourceMap as SharedStringSourceMap).maxLength).toBeDefined();
  });

  it('should have line, column, text for each property', () => {
    expect(getSharedString(namespace.entity, entityName).sourceMap).toMatchSnapshot();
  });
});
