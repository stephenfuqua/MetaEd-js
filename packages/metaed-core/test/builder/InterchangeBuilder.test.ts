import { InterchangeBuilder } from '../../src/builder/InterchangeBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getInterchange, getInterchangeExtension } from '../TestHelper';
import { InterchangeSourceMap } from '../../src/model/Interchange';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building single interchange', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  const extendedDocumentation = 'ExtendedDocumentation';
  const useCaseDocumentation = 'UseCaseDocumentation';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const interchangeIdentityTemplateName = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withExtendedDocumentation(extendedDocumentation)
      .withUseCaseDocumentation(useCaseDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withAssociationIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have interchange documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have extended documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).extendedDocumentation).toBe(extendedDocumentation);
  });

  it('should have use case documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).useCaseDocumentation).toBe(useCaseDocumentation);
  });

  it('should have one element', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].referencedType).toEqual([
      'domainEntity',
      'domainEntitySubclass',
    ]);
  });

  it('should have one identity template', () => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].metaEdName).toBe(
      interchangeIdentityTemplateName,
    );
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].metaEdId).toBe(
      interchangeIdentityTemplateMetaEdId,
    );
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].referencedType).toEqual([
      'association',
      'associationSubclass',
    ]);
  });
});

describe('when building interchange with additional element and identity types', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const interchangeName = 'InterchangeName';
  const interchangeElementName1 = 'InterchangeElementName1';
  const interchangeElementName2 = 'InterchangeElementName2';
  const interchangeIdentityTemplateName = 'InterchangeIdentityTemplateName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, 'ProjectExtension')
      .withStartInterchange(interchangeName, '1')
      .withDocumentation('doc')
      .withExtendedDocumentation('doc')
      .withUseCaseDocumentation('doc')
      .withAssociationElement(interchangeElementName1, '2')
      .withDescriptorElement(interchangeElementName2, '3')
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, '4')
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have two element', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(2);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].referencedType).toEqual([
      'association',
      'associationSubclass',
    ]);
    expect(getInterchange(namespace.entity, interchangeName).elements[1].metaEdName).toBe(interchangeElementName2);
    expect(getInterchange(namespace.entity, interchangeName).elements[1].referencedType).toEqual(['descriptor']);
  });

  it('should have one identity template', () => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].metaEdName).toBe(
      interchangeIdentityTemplateName,
    );
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].referencedType).toEqual([
      'domainEntity',
      'domainEntitySubclass',
    ]);
  });
});

describe('when building duplicate interchanges', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  const extendedDocumentation = 'ExtendedDocumentation';
  const useCaseDocumentation = 'UseCaseDocumentation';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const interchangeIdentityTemplateName = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
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
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('InterchangeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('InterchangeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 2 sourceMap',
    );
  });
});

describe('when building single interchange extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const interchangeIdentityTemplateName = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have one element', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have one identity template', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdName).toBe(
      interchangeIdentityTemplateName,
    );
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdId).toBe(
      interchangeIdentityTemplateMetaEdId,
    );
  });
});

describe('when building duplicate interchange extensions', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const interchangeIdentityTemplateName = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchangeExtension()

      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange extension', () => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('InterchangeBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 1 message',
    );
    expect(validationFailures[0].sourceMap).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 1 sourceMap',
    );

    expect(validationFailures[1].validatorName).toBe('InterchangeBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 2 message',
    );
    expect(validationFailures[1].sourceMap).toMatchSnapshot(
      'when building duplicate interchanges should have validation failures for each entity -> Interchange 2 sourceMap',
    );
  });
});

describe('when building interchange with no interchange name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = '';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build interchange', () => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with lowercase interchange name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'interchangeName';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build interchange', () => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with no documentation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe('');
  });

  it('should have one element', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with no interchange component property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });
  it('should build one interchange', () => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have no element', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withTrailingText(trailingText)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', () => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have one element', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with no interchange extension name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = '';
  const interchangeMetaEdId = '1';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build interchange extension', () => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with lowercase interchange extension name', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'interchangeName';
  const interchangeMetaEdId = '1';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should not build interchange extension', () => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with no element property', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no element', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const trailingText = '\r\nTrailingText';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchangeExtension(interchangeName, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withTrailingText(trailingText)
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should build one interchange', () => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have one element', () => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have no viable alternative error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building single interchange source map', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: Array<ValidationFailure> = [];
  const namespaceName = 'namespace';
  const projectExtension = 'ProjectExtension';

  const interchangeName = 'InterchangeName';
  const interchangeMetaEdId = '1';
  const interchangeDocumentation = 'InterchangeDocumentation';
  const extendedDocumentation = 'ExtendedDocumentation';
  const useCaseDocumentation = 'UseCaseDocumentation';
  const interchangeElementName = 'InterchangeElementName';
  const interchangeElementMetaEdId = '2';
  const interchangeIdentityTemplateName = 'InterchangeIdentityTemplateName';
  const interchangeIdentityTemplateMetaEdId = '3';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new InterchangeBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName, projectExtension)
      .withStartInterchange(interchangeName, interchangeMetaEdId)
      .withDocumentation(interchangeDocumentation)
      .withExtendedDocumentation(extendedDocumentation)
      .withUseCaseDocumentation(useCaseDocumentation)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(interchangeIdentityTemplateName, interchangeIdentityTemplateMetaEdId)
      .withEndInterchange()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  // ModelBaseSourceMap
  it('should have type', () => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdName).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdName.tokenText).toBe(interchangeName);
  });

  it('should have metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdId).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdId.tokenText).toBe(`[${interchangeMetaEdId}]`);
  });

  // InterchangeSourceMap
  it('should have extendedDocumentation', () => {
    expect(
      (getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).extendedDocumentation,
    ).toBeDefined();
  });

  it('should have useCaseDocumentation', () => {
    expect(
      (getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).useCaseDocumentation,
    ).toBeDefined();
  });

  it('should have one element', () => {
    expect((getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).elements).toHaveLength(1);
  });

  it('should have one identityTemplate', () => {
    expect(
      (getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).identityTemplates,
    ).toHaveLength(1);
  });

  it('should have line, column, text for each property', () => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap).toMatchSnapshot();
  });

  // InterchangeItemSourceMap
  it('should have element type', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap.type).toBeDefined();
  });

  it('should have element metaEdName', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap.metaEdName).toBeDefined();
  });

  it('should have element metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap.metaEdId).toBeDefined();
  });

  it('should have element line, column, text for each property', () => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap).toMatchSnapshot();
  });

  it('should have identityTemplate type', () => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap.type).toBeDefined();
  });

  it('should have identityTemplate metaEdName', () => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap.metaEdName).toBeDefined();
  });

  it('should have identityTemplate metaEdId', () => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap.metaEdId).toBeDefined();
  });

  it('should have identityTemplate line, column, text for each property', () => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap).toMatchSnapshot();
  });
});
