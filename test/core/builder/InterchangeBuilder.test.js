// @noflow
import InterchangeBuilder from '../../../src/core/builder/InterchangeBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building single interchange', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const extendedDocumentation: string = 'ExtendedDocumentation';
  const useCaseDocumentation: string = 'UseCaseDocumentation';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';
  const interchangeIdentityTemplateName: string = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId: string = '3';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withExtendedDocumentation(extendedDocumentation)
      .withUseCaseDocumentation(useCaseDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one interchange', () => {
    expect(entityRepository.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.interchange.get(interchangeName)).toBeDefined();
    expect(entityRepository.interchange.get(interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.interchange.get(interchangeName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(entityRepository.interchange.get(interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.interchange.get(interchangeName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should not be an interchange extension', () => {
    expect(entityRepository.interchange.get(interchangeName).isExtension).toBe(false);
  });

  it('should have correct interchange documentation', () => {
    expect(entityRepository.interchange.get(interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have correct extended documentation', () => {
    expect(entityRepository.interchange.get(interchangeName).extendedDocumentation).toBe(extendedDocumentation);
  });

  it('should have correct use case documentation', () => {
    expect(entityRepository.interchange.get(interchangeName).useCaseDocumentation).toBe(useCaseDocumentation);
  });

  it('should have one element', () => {
    expect(entityRepository.interchange.get(interchangeName).elements).toHaveLength(1);
    expect(entityRepository.interchange.get(interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(entityRepository.interchange.get(interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have one identity template', () => {
    expect(entityRepository.interchange.get(interchangeName).identityTemplates).toHaveLength(1);
    expect(entityRepository.interchange.get(interchangeName).identityTemplates[0].metaEdName).toBe(interchangeIdentityTemplateName);
    expect(entityRepository.interchange.get(interchangeName).identityTemplates[0].metaEdId).toBe(interchangeIdentityTemplateMetaEdId);
  });
});

describe('when building duplicate interchanges', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const extendedDocumentation: string = 'ExtendedDocumentation';
  const useCaseDocumentation: string = 'UseCaseDocumentation';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';
  const interchangeIdentityTemplateName: string = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId: string = '3';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withExtendedDocumentation(extendedDocumentation)
      .withUseCaseDocumentation(useCaseDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchange()

      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withExtendedDocumentation(extendedDocumentation)
      .withUseCaseDocumentation(useCaseDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one interchange', () => {
    expect(entityRepository.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.interchange.get(interchangeName)).toBeDefined();
    expect(entityRepository.interchange.get(interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  xit('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('InterchangeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate interchanges should have validation failures for each entity -> Interchange 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate interchanges should have validation failures for each entity -> Interchange 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('InterchangeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate interchanges should have validation failures for each entity -> Interchange 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate interchanges should have validation failures for each entity -> Interchange 2 sourceMap');
  });
});

describe('when building single interchange extension', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';
  const interchangeIdentityTemplateName: string = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId: string = '3';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one interchange', () => {
    expect(entityRepository.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.interchange.get(interchangeName)).toBeDefined();
    expect(entityRepository.interchange.get(interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.interchange.get(interchangeName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(entityRepository.interchange.get(interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.interchange.get(interchangeName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should be an interchange extension', () => {
    expect(entityRepository.interchange.get(interchangeName).isExtension).toBe(true);
  });

  it('should have one element', () => {
    expect(entityRepository.interchange.get(interchangeName).elements).toHaveLength(1);
    expect(entityRepository.interchange.get(interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(entityRepository.interchange.get(interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have one identity template', () => {
    expect(entityRepository.interchange.get(interchangeName).identityTemplates).toHaveLength(1);
    expect(entityRepository.interchange.get(interchangeName).identityTemplates[0].metaEdName).toBe(interchangeIdentityTemplateName);
    expect(entityRepository.interchange.get(interchangeName).identityTemplates[0].metaEdId).toBe(interchangeIdentityTemplateMetaEdId);
  });
});

describe('when building interchange with missing interchange name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = '';
  const interchangeMetaEdId: string = '1';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with lowercase interchange name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'interchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with missing interchange component property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeDocumentation: string = 'InterchangeDocumentation';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withTrailingText(trailingText)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with missing interchange extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = '';
  const interchangeMetaEdId: string = '1';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with lowercase interchange extension name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'interchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with missing element property', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'interchangeName';
  const interchangeMetaEdId: string = '1';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const interchangeName: string = 'InterchangeName';
  const interchangeMetaEdId: string = '1';
  const interchangeElementName: string = 'InterchangeElementName';
  const interchangeElementMetaEdId: string = '2';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new InterchangeBuilder(entityRepository, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withTrailingText(trailingText)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});
