// @flow
import type {
  MetaEdEnvironment,
  EnhancerResult,
  TopLevelEntity,
  EntityProperty,
  ReferentialProperty,
  SimpleProperty,
  CommonProperty,
  PropertyType,
  SharedDecimalProperty,
  SharedIntegerProperty,
  SharedShortProperty,
  SharedStringProperty,
  DecimalProperty,
  IntegerProperty,
  ShortProperty,
  StringProperty,
  InlineCommonProperty,
  EnumerationProperty,
  SchoolYearEnumerationProperty,
  DescriptorProperty,
  AssociationProperty,
  DomainEntityProperty,
} from 'metaed-core';
import { NoTopLevelEntity, getAllProperties, getAllTopLevelEntities } from 'metaed-core';
import type { EntityPropertyEdfiXsd } from '../model/property/EntityProperty';

const enhancerName: string = 'PropertyEnhancer';

// Ramda flatmap was too slow
const queryableFieldsFrom = (topLevelEntities: Array<TopLevelEntity>): Array<EntityProperty> => {
  const result: Array<EntityProperty> = [];
  topLevelEntities.forEach((topLevelEntity: TopLevelEntity) => result.push(...topLevelEntity.queryableFields));
  return result;
};

const adjustEnumerationSuffix = (metaEdName: string): string =>
  metaEdName.endsWith('Type') ? metaEdName : `${metaEdName}Type`;

function noParentOrReferencedEntityProjectExtension(property: ReferentialProperty | SimpleProperty): boolean {
  return (
    !property.parentEntityName ||
    property.referencedEntity === NoTopLevelEntity ||
    property.referencedEntity.namespaceInfo.projectExtension == null
  );
}

function prependedWithProjectExtension(projectExtension: string, typeName: string) {
  return projectExtension ? `${projectExtension}-${typeName}` : typeName;
}

function prependReferencedProjectExtension(property: ReferentialProperty, typeName: string) {
  if (noParentOrReferencedEntityProjectExtension(property)) {
    return prependedWithProjectExtension(property.namespaceInfo.projectExtension, typeName);
  }
  return prependedWithProjectExtension(property.referencedEntity.namespaceInfo.projectExtension, typeName);
}

function prependReferencedProjectExtensionForCommonProperty(property: CommonProperty, typeName: string) {
  if (property.isExtensionOverride) {
    return prependedWithProjectExtension(
      property.namespaceInfo.projectExtension,
      `${typeName}${property.namespaceInfo.extensionEntitySuffix}`,
    );
  }

  return prependReferencedProjectExtension(property, typeName);
}

function reconcileSimpleTypeExtension(property: SimpleProperty, typeName: string) {
  if (noParentOrReferencedEntityProjectExtension(property)) {
    return prependedWithProjectExtension(property.namespaceInfo.projectExtension, typeName);
  }
  return prependedWithProjectExtension(property.referencedEntity.namespaceInfo.projectExtension, typeName);
}

function xsdTypeFor(property: EntityProperty): string {
  const typeStringFor: { [PropertyType]: () => string } = {
    sharedDecimal: () => reconcileSimpleTypeExtension(((property: any): SharedDecimalProperty), property.referencedType),
    sharedInteger: () => reconcileSimpleTypeExtension(((property: any): SharedIntegerProperty), property.referencedType),
    sharedShort: () => reconcileSimpleTypeExtension(((property: any): SharedShortProperty), property.referencedType),
    sharedString: () => reconcileSimpleTypeExtension(((property: any): SharedStringProperty), property.referencedType),
    boolean: () => 'xs:boolean',
    currency: () => 'Currency',
    date: () => 'xs:date',
    duration: () => 'TimeInterval',
    percent: () => 'Percent',
    time: () => 'xs:time',
    year: () => 'xs:gYear',
    decimal: () => reconcileSimpleTypeExtension(((property: any): DecimalProperty), property.metaEdName),
    integer: () =>
      property.hasRestriction
        ? reconcileSimpleTypeExtension(((property: any): IntegerProperty), property.metaEdName)
        : 'xs:int',
    short: () =>
      property.hasRestriction
        ? reconcileSimpleTypeExtension(((property: any): ShortProperty), property.metaEdName)
        : 'xs:short',
    string: () => reconcileSimpleTypeExtension(((property: any): StringProperty), property.metaEdName),
    choice: () => 'ChoiceEntityPropertyHasNoType',
    inlineCommon: () => prependReferencedProjectExtension(((property: any): InlineCommonProperty), property.metaEdName),
    common: () => prependReferencedProjectExtensionForCommonProperty(((property: any): CommonProperty), property.metaEdName),
    enumeration: () =>
      prependReferencedProjectExtension(
        ((property: any): EnumerationProperty),
        adjustEnumerationSuffix(property.metaEdName),
      ),
    schoolYearEnumeration: () =>
      prependReferencedProjectExtension(
        ((property: any): SchoolYearEnumerationProperty),
        adjustEnumerationSuffix(property.metaEdName),
      ),
    descriptor: () =>
      prependReferencedProjectExtension(
        ((property: any): DescriptorProperty),
        `${property.metaEdName}DescriptorReferenceType`,
      ),
    association: () =>
      prependReferencedProjectExtension(((property: any): AssociationProperty), `${property.metaEdName}ReferenceType`),
    domainEntity: () =>
      prependReferencedProjectExtension(((property: any): DomainEntityProperty), `${property.metaEdName}ReferenceType`),
  };

  return typeStringFor[property.type]();
}

// Note: XSD ignores 'with context' entry if same name as entity (typically used for ODS naming)
function xsdNameFor(property: EntityProperty): string {
  const baseName =
    property.withContext === property.metaEdName ? property.metaEdName : `${property.withContext}${property.metaEdName}`;
  return ['choice', 'association', 'domainEntity'].includes(property.type) ? `${baseName}Reference` : baseName;
}

function applyXsdNameAndType(property: EntityProperty) {
  const entityPropertyEdfiXsd: EntityPropertyEdfiXsd = property.data.edfiXsd;
  entityPropertyEdfiXsd.xsd_Name = xsdNameFor(property);
  entityPropertyEdfiXsd.xsd_Type = xsdTypeFor(property);
}

// this assumes all properties in propertyIndex **and** all queryable fields have been edfiXsd initialized
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const allProperties: Array<EntityProperty> = getAllProperties(metaEd.propertyIndex);
  allProperties.forEach(property => applyXsdNameAndType(property));

  const allQueryableFields: Array<EntityProperty> = queryableFieldsFrom(getAllTopLevelEntities(metaEd.entity));
  allQueryableFields.forEach(property => applyXsdNameAndType(property));

  return {
    enhancerName,
    success: true,
  };
}
