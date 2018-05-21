// @flow
import R from 'ramda';
import { String as sugar } from 'sugar';
import { asTopLevelEntity, getEntitiesOfTypeForNamespaces, newIntegerProperty, versionSatisfies } from 'metaed-core';
import type {
  EnhancerResult,
  EntityProperty,
  IntegerProperty,
  DomainEntitySubclass,
  MetaEdEnvironment,
  ModelBase,
  Namespace,
} from 'metaed-core';
import { addEntityPropertyEdfiOdsTo } from '../model/property/EntityProperty';

// METAED-498
// Replacing EducationOrganization and subclasses with surrogate key identity
const enhancerName: string = 'ModifyIdentityForEducationOrganizationAndSubTypesDiminisher';
const targetVersions: string = '2.x';

const educationOrganization: string = 'EducationOrganization';
const educationOrganizationIdentifier: string = 'EducationOrganizationIdentifier';
const surrogateKeyNameTemplate: string = '{0}Id';
const educationOrganizationSurrogateKeyName: string = sugar.format(surrogateKeyNameTemplate, educationOrganization);

function modifyIdentityForEducationOrganizationSubclasses(namespace: Namespace): void {
  getEntitiesOfTypeForNamespaces([namespace], 'domainEntitySubclass').forEach(entity => {
    const entitySubclass: DomainEntitySubclass = ((entity: any): DomainEntitySubclass);
    if (entitySubclass.baseEntityName !== educationOrganization) return;

    const identifierProperty: ?EntityProperty = entitySubclass.data.edfiOds.ods_IdentityProperties.find(
      (x: EntityProperty) => x.metaEdName === educationOrganizationIdentifier,
    );
    if (identifierProperty != null) {
      identifierProperty.data.edfiOds.ods_IsUniqueIndex = true;
      identifierProperty.isPartOfIdentity = false;
      entitySubclass.data.edfiOds.ods_IdentityProperties = R.reject(
        (x: EntityProperty) => x.metaEdName === identifierProperty.metaEdName,
      )(entitySubclass.data.edfiOds.ods_IdentityProperties);
      entitySubclass.data.edfiOds.ods_Properties = R.reject(
        (x: EntityProperty) => x.metaEdName === identifierProperty.metaEdName,
      )(entitySubclass.data.edfiOds.ods_Properties);
    }

    // Remove any identity renames
    const removeIdentityRenames = R.without(
      entitySubclass.data.edfiOds.ods_Properties.filter((property: EntityProperty) => property.isIdentityRename),
    );

    entitySubclass.data.edfiOds.ods_IdentityProperties = removeIdentityRenames(
      entitySubclass.data.edfiOds.ods_IdentityProperties,
    );
    entitySubclass.data.edfiOds.ods_Properties = removeIdentityRenames(entitySubclass.data.edfiOds.ods_Properties);

    const surrogateKeyProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: sugar.format(surrogateKeyNameTemplate, entitySubclass.metaEdName),
      documentation: `The identifier assigned to a ${asTopLevelEntity(entitySubclass).typeHumanizedName}.`,
      isPartOfIdentity: true,
      namespace: entitySubclass.namespace,
      parentEntity: asTopLevelEntity(entitySubclass),
      parentEntityName: entitySubclass.metaEdName,
      isIdentityRename: true,
      baseKeyName: educationOrganizationSurrogateKeyName,
    });
    addEntityPropertyEdfiOdsTo(surrogateKeyProperty);
    entitySubclass.data.edfiOds.ods_IdentityProperties.push(surrogateKeyProperty);
    entitySubclass.data.edfiOds.ods_Properties.push(surrogateKeyProperty);
  });
}

function modifyIdentityForEducationOrganization(namespace: Namespace): void {
  const entity: ?ModelBase = getEntitiesOfTypeForNamespaces([namespace], 'domainEntity').find(
    (x: ModelBase) => x.metaEdName === educationOrganization,
  );
  if (entity == null || entity.data.edfiOds.ods_IdentityProperties.length === 0) return;

  const identifierProperty: ?EntityProperty = entity.data.edfiOds.ods_IdentityProperties.find(
    (x: EntityProperty) => x.metaEdName === educationOrganizationIdentifier,
  );
  if (identifierProperty == null) return;

  identifierProperty.data.edfiOds.ods_IsUniqueIndex = true;
  identifierProperty.isPartOfIdentity = false;
  entity.data.edfiOds.ods_IdentityProperties = R.reject(
    (x: EntityProperty) => x.metaEdName === identifierProperty.metaEdName,
  )(entity.data.edfiOds.ods_IdentityProperties);

  const surrogateKeyProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
    metaEdName: educationOrganizationSurrogateKeyName,
    documentation: identifierProperty.documentation,
    isPartOfIdentity: true,
    namespace: identifierProperty.namespace,
    parentEntity: identifierProperty.parentEntity,
    parentEntityName: identifierProperty.parentEntityName,
    data: {
      edfiOds: {
        ods_IsIdentityDatabaseType: true,
      },
    },
  });
  addEntityPropertyEdfiOdsTo(surrogateKeyProperty);
  entity.data.edfiOds.ods_IdentityProperties.push(surrogateKeyProperty);
  entity.data.edfiOds.ods_Properties.push(surrogateKeyProperty);

  modifyIdentityForEducationOrganizationSubclasses(namespace);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  modifyIdentityForEducationOrganization(coreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
