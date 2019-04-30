import { EntityProperty } from 'metaed-core';
import { appendOverlapping } from '../../shared/Utility';

export type JoinTableNamer = string;

function getroleName(property: EntityProperty): string {
  return property.roleName !== property.metaEdName ? property.roleName : '';
}

export function baseNameCollapsingJoinTableNamer(
  property: EntityProperty,
  parentEntityName: string,
  parentContextName: string,
): string {
  const contextName: string = getroleName(property);

  if (property.metaEdName.startsWith(parentEntityName)) {
    return appendOverlapping(appendOverlapping(parentContextName, contextName), property.metaEdName);
  }
  return appendOverlapping(
    appendOverlapping(appendOverlapping(parentEntityName, parentContextName), contextName),
    property.metaEdName,
  );
}

export function joinTableNamer(property: EntityProperty, parentEntityName: string, parentContextName: string): string {
  const contextName: string = getroleName(property);
  return parentEntityName + parentContextName + contextName + property.metaEdName;
}
