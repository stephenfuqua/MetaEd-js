// @flow
import type { Enhancer } from 'metaed-core';

import { enhance as moveFederalFundsDiminisher } from '../diminisher/domainMetadata/MoveFederalFundsDiminisher';
import { enhance as associationAggregateEnhancer } from '../enhancer/domainMetadata/AssociationAggregateEnhancer';
import { enhance as associationExtensionAggregateEnhancer } from '../enhancer/domainMetadata/AssociationExtensionAggregateEnhancer';
import { enhance as associationSubclassAggregateEnhancer } from '../enhancer/domainMetadata/AssociationSubclassAggregateEnhancer';
import { enhance as baseDescriptorAggregateEnhancer } from '../enhancer/domainMetadata/BaseDescriptorAggregateEnhancer';
import { enhance as descriptorAggregateEnhancer } from '../enhancer/domainMetadata/DescriptorAggregateEnhancer';
import { enhance as domainEntityAggregateEnhancer } from '../enhancer/domainMetadata/DomainEntityAggregateEnhancer';
import { enhance as domainEntityExtensionAggregateEnhancer } from '../enhancer/domainMetadata/DomainEntityExtensionAggregateEnhancer';
import { enhance as domainEntitySubclassAggregateEnhancer } from '../enhancer/domainMetadata/DomainEntitySubclassAggregateEnhancer';
import { enhance as educationOrganizationReferenceEnhancer } from '../enhancer/educationOrganizationReferenceMetadata/EducationOrganizationReferenceEnhancer';
import { enhance as enumerationAggregateEnhancer } from '../enhancer/domainMetadata/EnumerationAggregateEnhancer';
import { enhance as schoolYearEnumerationAggregateEnhancer } from '../enhancer/domainMetadata/SchoolYearEnumerationAggregateEnhancer';

import { enhance as descriptorSetupEnhancer } from '../model/Descriptor';
import { enhance as namespaceInfoSetupEnhancer } from '../model/NamespaceInfo';
import { enhance as topLevelEntitySetupEnhancer } from '../model/TopLevelEntity';

import { enhance as createDomainModelDefinitionEnhancer } from '../enhancer/apiModel/CreateDomainModelDefinitionEnhancer';

export function enhancerList(): Array<Enhancer> {
  return [
    // **************************
    // API Metadata Default Phase

    // Models
    descriptorSetupEnhancer,
    namespaceInfoSetupEnhancer,
    topLevelEntitySetupEnhancer,

    // Domain Metadata
    associationAggregateEnhancer,
    associationExtensionAggregateEnhancer,
    associationSubclassAggregateEnhancer,
    baseDescriptorAggregateEnhancer,
    descriptorAggregateEnhancer,
    domainEntityAggregateEnhancer,
    domainEntityExtensionAggregateEnhancer,
    domainEntitySubclassAggregateEnhancer,
    enumerationAggregateEnhancer,
    schoolYearEnumerationAggregateEnhancer,

    educationOrganizationReferenceEnhancer,
    // API Model
    createDomainModelDefinitionEnhancer,

    // **************************
    // API Metadata Diminish Phase
    moveFederalFundsDiminisher,
  ];
}
