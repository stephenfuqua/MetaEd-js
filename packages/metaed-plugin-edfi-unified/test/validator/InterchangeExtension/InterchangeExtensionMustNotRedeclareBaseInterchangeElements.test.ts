import { newMetaEdEnvironment, MetaEdTextBuilder, InterchangeBuilder, NamespaceBuilder } from 'metaed-core';
import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/InterchangeExtension/InterchangeExtensionMustNotRedeclareBaseInterchangeElements';

describe('when validating interchange extension elements has different names than base interchange', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const interchangeName = 'InterchangeName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartInterchange(interchangeName)
      .withDocumentation('InterchangeDocumentation')
      .withDomainEntityElement('DomainEntityElementName1')
      .withEndInterchange()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartInterchangeExtension(interchangeName)
      .withDomainEntityElement('DomainEntityElementName2')
      .withEndInterchangeExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one interchange', () => {
    expect(coreNamespace.entity.interchange.size).toBe(1);
  });

  it('should build one interchange extension', () => {
    expect(extensionNamespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating interchange extension elements duplicates names in base interchange', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const interchangeName = 'InterchangeName';
  const domainEntityElementName = 'DomainEntityElementName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartInterchange(interchangeName)
      .withDocumentation('InterchangeDocumentation')
      .withDomainEntityElement(domainEntityElementName)
      .withEndInterchange()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartInterchangeExtension(interchangeName)
      .withDomainEntityElement(domainEntityElementName)
      .withEndInterchangeExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one interchange', () => {
    expect(coreNamespace.entity.interchange.size).toBe(1);
  });

  it('should build one interchange extension', () => {
    expect(extensionNamespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('InterchangeExtensionMustNotRedeclareBaseInterchangeElements');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();
  });
});

describe('when interchange extension elements duplicates multiple names in base interchange', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const interchangeName = 'InterchangeName';
  const domainEntityElementName1 = 'DomainEntityElementName1';
  const domainEntityElementName2 = 'DomainEntityElementName2';
  const notDuplicateDomainEntityTemplateName = 'NotDuplicateDomainEntityElementName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartInterchange(interchangeName)
      .withDocumentation('InterchangeDocumentation')
      .withDomainEntityElement(domainEntityElementName1)
      .withDomainEntityElement(domainEntityElementName2)
      .withEndInterchange()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartInterchangeExtension(interchangeName)
      .withDomainEntityElement(domainEntityElementName1)
      .withDomainEntityElement(domainEntityElementName2)
      .withDomainEntityIdentityTemplate(notDuplicateDomainEntityTemplateName)
      .withEndInterchangeExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new InterchangeBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one interchange', () => {
    expect(coreNamespace.entity.interchange.size).toBe(1);
  });

  it('should build one interchange extension', () => {
    expect(extensionNamespace.entity.interchangeExtension.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('InterchangeExtensionMustNotRedeclareBaseInterchangeElements');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).not.toMatch(new RegExp(notDuplicateDomainEntityTemplateName));
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('InterchangeExtensionMustNotRedeclareBaseInterchangeElements');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).not.toMatch(new RegExp(notDuplicateDomainEntityTemplateName));
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});
