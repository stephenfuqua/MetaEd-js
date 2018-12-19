import R from 'ramda';
import { String as sugar } from 'sugar';
import { asTopLevelEntity, getEntitiesOfTypeForNamespaces, newIntegerProperty, versionSatisfies } from 'metaed-core';
import {
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
const enhancerName = 'ModifyIdentityForEducationOrganizationAndSubTypesDiminisher';
const targetVersions = '2.x';

const educationOrganization = 'EducationOrganization';
const educationOrganizationIdentifier = 'EducationOrganizationIdentifier';
const surrogateKeyNameTemplate = '{0}Id';
const educationOrganizationSurrogateKeyName: string = sugar.format(surrogateKeyNameTemplate, educationOrganization);

function modifyIdentityForEducationOrganizationSubclasses(namespace: Namespace): void {
  getEntitiesOfTypeForNamespaces([namespace], 'domainEntitySubclass').forEach(entity => {
    const entitySubclass: DomainEntitySubclass = entity as DomainEntitySubclass;
    if (entitySubclass.baseEntityName !== educationOrganization) return;

    const identifierProperty: EntityProperty | null = entitySubclass.data.edfiOds.odsIdentityProperties.find(
      (x: EntityProperty) => x.metaEdName === educationOrganizationIdentifier,
    );
    if (identifierProperty != null) {
      identifierProperty.data.edfiOds.odsIsUniqueIndex = true;
      identifierProperty.isPartOfIdentity = false;
      entitySubclass.data.edfiOds.odsIdentityProperties = R.reject(
        (x: EntityProperty) => x.metaEdName === identifierProperty.metaEdName,
      )(entitySubclass.data.edfiOds.odsIdentityProperties);
      entitySubclass.data.edfiOds.odsProperties = R.reject(
        (x: EntityProperty) => x.metaEdName === identifierProperty.metaEdName,
      )(entitySubclass.data.edfiOds.odsProperties);
    }

    // Remove any identity renames
    const removeIdentityRenames = R.without(
      entitySubclass.data.edfiOds.odsProperties.filter((property: EntityProperty) => property.isIdentityRename),
    );

    entitySubclass.data.edfiOds.odsIdentityProperties = removeIdentityRenames(
      entitySubclass.data.edfiOds.odsIdentityProperties,
    );
    entitySubclass.data.edfiOds.odsProperties = removeIdentityRenames(entitySubclass.data.edfiOds.odsProperties);

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
    entitySubclass.data.edfiOds.odsIdentityProperties.push(surrogateKeyProperty);
    entitySubclass.data.edfiOds.odsProperties.push(surrogateKeyProperty);
  });
}

function modifyIdentityForEducationOrganization(namespace: Namespace): void {
  const entity: ModelBase | undefined = getEntitiesOfTypeForNamespaces([namespace], 'domainEntity').find(
    (x: ModelBase) => x.metaEdName === educationOrganization,
  );
  if (entity == null || entity.data.edfiOds.odsIdentityProperties.length === 0) return;

  const identifierProperty: EntityProperty | null = entity.data.edfiOds.odsIdentityProperties.find(
    (x: EntityProperty) => x.metaEdName === educationOrganizationIdentifier,
  );
  if (identifierProperty == null) return;

  identifierProperty.data.edfiOds.odsIsUniqueIndex = true;
  identifierProperty.isPartOfIdentity = false;
  entity.data.edfiOds.odsIdentityProperties = R.reject(
    (x: EntityProperty) => x.metaEdName === identifierProperty.metaEdName,
  )(entity.data.edfiOds.odsIdentityProperties);

  const surrogateKeyProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
    metaEdName: educationOrganizationSurrogateKeyName,
    documentation: identifierProperty.documentation,
    isPartOfIdentity: true,
    namespace: identifierProperty.namespace,
    parentEntity: identifierProperty.parentEntity,
    parentEntityName: identifierProperty.parentEntityName,
    data: {
      edfiOds: {
        odsIsIdentityDatabaseType: true,
      },
    },
  });
  addEntityPropertyEdfiOdsTo(surrogateKeyProperty);
  entity.data.edfiOds.odsIdentityProperties.push(surrogateKeyProperty);
  entity.data.edfiOds.odsProperties.push(surrogateKeyProperty);

  modifyIdentityForEducationOrganizationSubclasses(namespace);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };

  modifyIdentityForEducationOrganization(coreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
