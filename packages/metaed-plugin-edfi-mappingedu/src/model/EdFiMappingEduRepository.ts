import { newPluginEnvironment } from 'metaed-core';
import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { SimpleType, ComplexType, EnumerationSimpleType } from 'metaed-plugin-edfi-xsd';
import { ElementGroupDefinition } from './ElementGroupDefinition';
import { EntityDefinition } from './EntityDefinition';
import { ElementDefinition } from './ElementDefinition';
import { EnumerationDefinition } from './EnumerationDefinition';
import { EnumerationItemDefinition } from './EnumerationItemDefinition';

const enhancerName: string = 'EdFiMappingEduRepositorySetupEnhancer';
const shortName: string = 'edfiMappingedu';

export type xsdElementRepository = {
  association: Map<string, ComplexType>;
  common: Map<string, ComplexType>;
  base: Map<string, ComplexType>;
  descriptor: Map<string, ComplexType>;
  descriptorExtendedReference: Map<string, ComplexType>;
  domainEntity: Map<string, ComplexType>;
  enumeration: Map<string, EnumerationSimpleType>;
  extendedReference: Map<string, ComplexType>;
  identity: Map<string, ComplexType>;
  lookup: Map<string, ComplexType>;
  simple: Map<string, SimpleType>;
};

export type EdFiMappingEduRepository = {
  xsdElement: xsdElementRepository;
  elementGroupDefinitions: Array<ElementGroupDefinition>;
  entityDefinitions: Array<EntityDefinition>;
  elementDefinitions: Array<ElementDefinition>;
  enumerationDefinitions: Array<EnumerationDefinition>;
  enumerationItemDefinitions: Array<EnumerationItemDefinition>;
};

export const newXsdElementRepository = (): xsdElementRepository => ({
  association: new Map(),
  common: new Map(),
  base: new Map(),
  descriptor: new Map(),
  descriptorExtendedReference: new Map(),
  domainEntity: new Map(),
  enumeration: new Map(),
  extendedReference: new Map(),
  identity: new Map(),
  lookup: new Map(),
  simple: new Map(),
});

export const newEdFiMappingEduRepository = (): EdFiMappingEduRepository => ({
  xsdElement: newXsdElementRepository(),
  elementGroupDefinitions: [],
  entityDefinitions: [],
  elementDefinitions: [],
  enumerationDefinitions: [],
  enumerationItemDefinitions: [],
});

export const addEdFiMappingEduRepositoryTo = (metaEd: MetaEdEnvironment): void => {
  const namespace: Map<Namespace, EdFiMappingEduRepository> = new Map();
  metaEd.namespace.forEach((metaEdNamespace: Namespace) => {
    namespace.set(metaEdNamespace, newEdFiMappingEduRepository());
  });

  const edfiMappingEduPlugin = metaEd.plugin.get(shortName);
  if (edfiMappingEduPlugin == null) {
    metaEd.plugin.set(shortName, { ...newPluginEnvironment(), shortName, namespace });
  } else {
    edfiMappingEduPlugin.namespace = namespace;
  }
};

export const enhance = (metaEd: MetaEdEnvironment): EnhancerResult => {
  addEdFiMappingEduRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
};
