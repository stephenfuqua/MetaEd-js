// @flow
import type {
  DomainEntity,
  DomainEntitySubclass,
  EnhancerResult,
  EntityProperty,
  MetaEdEnvironment,
  NamespaceInfo,
} from 'metaed-core';
import { newEducationOrganizationReference } from '../../model/educationOrganizationReferenceMetadata/EducationOrganizationReference';
import type { EducationOrganizationReference } from '../../model/educationOrganizationReferenceMetadata/EducationOrganizationReference';

const enhancerName: string = 'EducationOrganizationReferenceEnhancer';
const educationOrganizationEntityName: string = 'EducationOrganization';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  // If no Education Organization domain entity or if for some reason it
  // has more than one identity property, generating this metadata doesn't make any sense
  const educationOrganizationAbstractEntity: ?DomainEntity = metaEd.entity.domainEntity.get(educationOrganizationEntityName);
  if (educationOrganizationAbstractEntity == null || educationOrganizationAbstractEntity.identityProperties.length !== 1)
    return { enhancerName, success: true };

  metaEd.entity.namespaceInfo.forEach((namespaceInfo: NamespaceInfo) => {
    metaEd.entity.domainEntitySubclass.forEach((subclass: DomainEntitySubclass) => {
      if (
        subclass.namespaceInfo.namespace !== namespaceInfo.namespace ||
        subclass.baseEntityName !== educationOrganizationEntityName
      )
        return;

      // Should only be one identity rename if any
      const identityProperty: EntityProperty =
        subclass.identityProperties.find((property: EntityProperty) => property.isIdentityRename) ||
        educationOrganizationAbstractEntity.identityProperties[0];

      const educationOrganizationReference: EducationOrganizationReference = {
        ...newEducationOrganizationReference(),
        name: subclass.metaEdName,
        identityPropertyName: identityProperty.data.edfiXsd.xsd_Name,
      };

      namespaceInfo.data.edfiOdsApi.api_EducationOrganizationReferences.push(educationOrganizationReference);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
