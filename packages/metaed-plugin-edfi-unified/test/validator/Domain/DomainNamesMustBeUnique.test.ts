import { newMetaEdEnvironment, MetaEdTextBuilder, DomainBuilder, NamespaceBuilder } from 'metaed-core';
import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/Domain/DomainNamesMustBeUnique';

describe('when entities in same namespace have different names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()

      .withStartDomain('ValidName2')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    failures = validate(metaEd);
  });

  it('should build two domain', () => {
    expect(coreNamespace.entity.domain.size).toBe(2);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when entities in same namespace have identical names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()

      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    failures = validate(metaEd);
  });

  it('should build one domain because DomainBuilder will not let it get that far', () => {
    expect(coreNamespace.entity.domain.size).toBe(1);
  });

  it('should have no validation failures because of DomainBuilder', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domains in separate dependency-linked namespaces have identical names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .withBeginNamespace('Extension', 'Extension')
      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    extensionNamespace = metaEd.namespace.get('Extension');
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one domain in core namespace', () => {
    expect(coreNamespace.entity.domain.size).toBe(1);
  });

  it('should build one domain in extension namespace', () => {
    expect(extensionNamespace.entity.domain.size).toBe(1);
  });

  it('should have validation failures for each entity', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domains in non-dependency-linked namespaces have identical names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespacea: any = null;
  let extensionNamespaceb: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomain('NotADuplicate')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .withBeginNamespace('Extensiona', 'Extensiona')
      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .withBeginNamespace('Extensionb', 'Extensionb')
      .withStartDomain('ValidName1')
      .withDocumentation('doc')
      .withDomainEntityDomainItem('DomainItem1')
      .withEndDomain()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    extensionNamespacea = metaEd.namespace.get('Extensiona');
    extensionNamespaceb = metaEd.namespace.get('Extensionb');
    // $FlowIgnore - null check
    extensionNamespacea.dependencies.push(coreNamespace);
    // $FlowIgnore - null check
    extensionNamespaceb.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one core domain', () => {
    expect(coreNamespace.entity.domain.size).toBe(1);
  });

  it('should build one extension1 domain', () => {
    expect(extensionNamespacea.entity.domain.size).toBe(1);
  });

  it('should build one extension2 domain', () => {
    expect(extensionNamespaceb.entity.domain.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});
