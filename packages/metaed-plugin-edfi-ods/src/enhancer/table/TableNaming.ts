import { EntityProperty } from 'metaed-core';

export interface TableNaming {
  name: string;
  nameComponents: string[];
}

export function appendOverlapping(base: string, suffix: string): string {
  const shortestLength = Math.min(base.length, suffix.length);
  let indexOfOverlap = -1;

  for (let i = shortestLength; i > 0; i -= 1) {
    if (base.endsWith(suffix.substring(0, i))) {
      indexOfOverlap = i;
      break;
    }
  }

  if (indexOfOverlap < 0) return base + suffix;
  if (indexOfOverlap <= suffix.length) return base + suffix.substring(indexOfOverlap);
  return base;
}

function getRoleName(property: EntityProperty): string {
  return property.roleName !== property.metaEdName ? property.roleName : '';
}

export function baseNameCollapsingJoinTableNamer(
  property: EntityProperty,
  parentTableName: string,
  parentTableNameComponents: string[],
  parentContextName: string,
): TableNaming {
  const contextName: string = getRoleName(property);

  let nameComponents: string[] = [];
  let secondPart = '';
  if (property.metaEdName.startsWith(parentTableName)) {
    const groupedContexts = appendOverlapping(parentContextName, contextName);
    const propertyNameWithContexts = appendOverlapping(groupedContexts, property.metaEdName);
    nameComponents = [...parentTableNameComponents, propertyNameWithContexts];
    secondPart = propertyNameWithContexts;
  } else {
    const groupedContexts = appendOverlapping(parentContextName, contextName);
    const propertyNameWithContexts = appendOverlapping(groupedContexts, property.metaEdName);
    secondPart = appendOverlapping(parentTableName, propertyNameWithContexts);
    nameComponents = [...parentTableNameComponents, propertyNameWithContexts];
  }

  const finalPart = secondPart.substring(0, secondPart.length - property.metaEdName.length);

  return {
    name: finalPart + property.metaEdName,
    nameComponents,
  };
}

export function joinTableNamer(
  property: EntityProperty,
  parentTableName: string,
  parentTableNameComponents: string[],
  parentContextName: string,
): TableNaming {
  const contextName: string = getRoleName(property);
  const tableNameSuffix = parentContextName + contextName + property.metaEdName;
  return {
    name: parentTableName + tableNameSuffix,
    nameComponents: [...parentTableNameComponents, tableNameSuffix],
  };
}
