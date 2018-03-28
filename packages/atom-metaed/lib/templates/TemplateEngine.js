/** @babel */
// @flow

export function metaEdConfigTemplate(
  targetVersion: string,
  dataStandardCoreSourceDirectory: string,
  dataStandardExtensionSourceDirectory: ?string = null,
): string {
  return `{
  "metaEdConfiguration": {
    "title": ${dataStandardExtensionSourceDirectory != null ? '"MetaEd Extension Project"' : '"MetaEd Core Project"'},
    "namespace": ${dataStandardExtensionSourceDirectory != null ? '"extension"' : '"edfi"'},
    "dataStandardCoreSourceVersion": "${targetVersion}",
    "dataStandardCoreSourceDirectory": "${dataStandardCoreSourceDirectory.replace(/\\/g, '/')}",
    ${
      dataStandardExtensionSourceDirectory != null
        ? `"dataStandardExtensionSourceDirectory": "${dataStandardExtensionSourceDirectory.replace(/\\/g, '/')}",`
        : ''
    }
    "artifactDirectory": "./MetaEdOutput-Experimental/",
    "pluginConfig": {
      "edfiUnified": {
        "targetTechnologyVersion": "${targetVersion}"
      },
      "edfiOds": {
        "targetTechnologyVersion": "${targetVersion}"
      },
      "edfiOdsApi": {
        "targetTechnologyVersion": "${targetVersion}"
      },
      "edfiXsd": {
        "targetTechnologyVersion": "${targetVersion}"
      },
      "edfiHandbook": {
        "targetTechnologyVersion": "${targetVersion}"
      },
      "edfiInterchangeBrief": {
        "targetTechnologyVersion": "${targetVersion}"
      },
      "edfiXmlDictionary": {
        "targetTechnologyVersion": "${targetVersion}"
      }
    }
  }
}`;
}

export function associationTemplate(): string {
  return `Association ExampleName
    documentation "This is documentation."
    domain entity FirstEntityName
        documentation "This is documentation."
    domain entity SecondEntityName
        documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
`;
}

export function choiceTemplate(): string {
  return `Choice ExampleName
    documentation "This is documentation."
    bool FirstPropertyName
        documentation "This is documentation."
        is required
    bool SecondPropertyName
        documentation "This is documentation."
        is required
`;
}

export function commonTemplate(): string {
  return `Common ExampleName
    documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
`;
}

export function descriptorTemplate(): string {
  return `Descriptor ExampleName
    documentation "This is documentation."
    with map type
        documentation "This is documentation."
        item "ShortDescription"
`;
}

export function domainEntityTemplate(): string {
  return `Domain Entity ExampleName
    documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
`;
}

export function domainTemplate(): string {
  return `Domain ExampleName
    documentation "This is documentation."
    domain entity ItemName
    footer documentation "This is documentation."
`;
}

export function enumerationTemplate(): string {
  return `Enumeration ExampleName
    documentation "This is documentation."
    item "ItemName"
        documentation "This is documentation."
`;
}

export function interchangeTemplate(): string {
  return `Interchange ExampleName
    documentation "This is documentation."
    extended documentation "This is documentation."
    use case documentation "This is documentation."
    domain entity ElementName
`;
}

export function sharedDecimalTemplate(): string {
  return `Shared Decimal ExampleName
    documentation "This is documentation."
    total digits 9
    decimal places 3
    min value 0
    max value 100
`;
}

export function sharedIntegerTemplate(): string {
  return `Shared Integer ExampleName
    documentation "This is documentation."
    min value 0
    max value 100
`;
}

export function sharedStringTemplate(): string {
  return `Shared String ExampleName
    documentation "This is documentation."
    min length 1
    max length 20
`;
}
