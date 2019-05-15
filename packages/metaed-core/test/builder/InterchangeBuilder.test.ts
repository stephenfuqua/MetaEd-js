import { InterchangeBuilder } from '../../src/builder/InterchangeBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { getInterchange, getInterchangeExtension } from '../TestHelper';
import { InterchangeSourceMap } from '../../src/model/Interchange';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when building single interchange', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have no validation failures', (): void => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have interchange documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have extended documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).extendedDocumentation).toBe(extendedDocumentation);
  });

  it('should have use case documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).useCaseDocumentation).toBe(useCaseDocumentation);
  });

  it('should have one element', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].referencedType).toEqual([
      'domainEntity',
      'domainEntitySubclass',
    ]);
  });

  it('should have one identity template', (): void => {
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

describe('when building interchange with additional element and identity types', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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

  it('should have two element', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(2);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].referencedType).toEqual([
      'association',
      'associationSubclass',
    ]);
    expect(getInterchange(namespace.entity, interchangeName).elements[1].metaEdName).toBe(interchangeElementName2);
    expect(getInterchange(namespace.entity, interchangeName).elements[1].referencedType).toEqual(['descriptor']);
  });

  it('should have one identity template', (): void => {
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

describe('when building duplicate interchanges', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', (): void => {
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

describe('when building single interchange extension', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have base entity namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).baseEntityNamespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have one element', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have one identity template', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdName).toBe(
      interchangeIdentityTemplateName,
    );
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdId).toBe(
      interchangeIdentityTemplateMetaEdId,
    );
  });
});

describe('when building single interchange extension', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have base entity namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).baseEntityNamespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have one element', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have one identity template', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdName).toBe(
      interchangeIdentityTemplateName,
    );
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdId).toBe(
      interchangeIdentityTemplateMetaEdId,
    );
  });
});

describe('when building single interchange extension extending core interchange', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
  const coreNamespaceName = 'EdFi';
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
      .withStartInterchangeExtension(`${coreNamespaceName}.${interchangeName}`, interchangeMetaEdId)
      .withDomainEntityElement(interchangeElementName, interchangeElementMetaEdId)
      .withDomainEntityIdentityTemplate(
        `${coreNamespaceName}.${interchangeIdentityTemplateName}`,
        interchangeIdentityTemplateMetaEdId,
      )
      .withEndInterchangeExtension()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have extendee name', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have base entity namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).baseEntityNamespaceName).toBe(coreNamespaceName);
  });

  it('should have one element in local namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].referencedNamespaceName).toBe(
      namespaceName,
    );
  });

  it('should have one identity template in core namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdName).toBe(
      interchangeIdentityTemplateName,
    );
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].metaEdId).toBe(
      interchangeIdentityTemplateMetaEdId,
    );
    expect(getInterchangeExtension(namespace.entity, interchangeName).identityTemplates[0].referencedNamespaceName).toBe(
      coreNamespaceName,
    );
  });
});

describe('when building duplicate interchange extensions', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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

  it('should build one interchange extension', (): void => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have two validation failures', (): void => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', (): void => {
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

describe('when building interchange with no interchange name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should not build interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with lowercase interchange name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should not build interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with no documentation', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe('');
  });

  it('should have one element', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with no interchange component property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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
  it('should build one interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have no element', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchange.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchange(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).documentation).toBe(interchangeDocumentation);
  });

  it('should have one element', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchange(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have extraneous input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with no interchange extension name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should not build interchange extension', (): void => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with lowercase interchange extension name', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should not build interchange extension', (): void => {
    expect(namespace.entity.interchange.size).toBe(0);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with no element property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have project extension', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.projectExtension).toBe(projectExtension);
  });

  it('should have no element', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(0);
  });

  it('should have mismatched input error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building interchange extension with invalid trailing text', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespaceName = 'Namespace';
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

  it('should build one interchange', (): void => {
    expect(namespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should be found in entity repository', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName)).toBeDefined();
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdName).toBe(interchangeName);
  });

  it('should have namespace', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).namespace.namespaceName).toBe(namespaceName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).metaEdId).toBe(interchangeMetaEdId);
  });

  it('should have one element', (): void => {
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements).toHaveLength(1);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdName).toBe(interchangeElementName);
    expect(getInterchangeExtension(namespace.entity, interchangeName).elements[0].metaEdId).toBe(interchangeElementMetaEdId);
  });

  it('should have no viable alternative error', (): void => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building single interchange source map', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const validationFailures: ValidationFailure[] = [];
  const namespaceName = 'Namespace';
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
  it('should have type', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdName).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdName.tokenText).toBe(interchangeName);
  });

  it('should have metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdId).toBeDefined();
    expect(getInterchange(namespace.entity, interchangeName).sourceMap.metaEdId.tokenText).toBe(`[${interchangeMetaEdId}]`);
  });

  // InterchangeSourceMap
  it('should have extendedDocumentation', (): void => {
    expect(
      (getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).extendedDocumentation,
    ).toBeDefined();
  });

  it('should have useCaseDocumentation', (): void => {
    expect(
      (getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).useCaseDocumentation,
    ).toBeDefined();
  });

  it('should have one element', (): void => {
    expect((getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).elements).toHaveLength(1);
  });

  it('should have one identityTemplate', (): void => {
    expect(
      (getInterchange(namespace.entity, interchangeName).sourceMap as InterchangeSourceMap).identityTemplates,
    ).toHaveLength(1);
  });

  it('should have line, column, text for each property', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).sourceMap).toMatchSnapshot();
  });

  // InterchangeItemSourceMap
  it('should have element type', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap.type).toBeDefined();
  });

  it('should have element metaEdName', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap.metaEdName).toBeDefined();
  });

  it('should have element metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap.metaEdId).toBeDefined();
  });

  it('should have element line, column, text for each property', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).elements[0].sourceMap).toMatchSnapshot();
  });

  it('should have identityTemplate type', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap.type).toBeDefined();
  });

  it('should have identityTemplate metaEdName', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap.metaEdName).toBeDefined();
  });

  it('should have identityTemplate metaEdId', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap.metaEdId).toBeDefined();
  });

  it('should have identityTemplate line, column, text for each property', (): void => {
    expect(getInterchange(namespace.entity, interchangeName).identityTemplates[0].sourceMap).toMatchSnapshot();
  });
});
