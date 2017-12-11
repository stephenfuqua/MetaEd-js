/** @babel */
// @flow

export function metaEdProjectFileTemplate(metaEdCoreDirectory: string) {
  const cleanMetaEdCoreDirectory = metaEdCoreDirectory.replace(/\\/g, '\\\\');
  return `{
      "title": "MetaEd Extension Project",
      "dataStandardCoreSourceDirectory": "${cleanMetaEdCoreDirectory}",
      "majorVersion": "2",
      "minorVersion": "0",
      "revisionVersion": "",
      "extensionPrefix": "EXTENSION"
  }`;
}

export function associationTemplate() {
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

export function choiceTemplate() {
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

export function commonTemplate() {
  return `Common ExampleName
    documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
`;
}

export function descriptorTemplate() {
  return `Descriptor ExampleName
    documentation "This is documentation."
    with map type
        documentation "This is documentation."
        item "ShortDescription"
`;
}

export function domainEntityTemplate() {
  return `Domain Entity ExampleName
    documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
`;
}

export function domainTemplate() {
  return `Domain ExampleName
    documentation "This is documentation."
    domain entity ItemName
    footer documentation "This is documentation."
`;
}

export function enumerationTemplate() {
  return `Enumeration ExampleName
    documentation "This is documentation."
    item "ItemName"
        documentation "This is documentation."
`;
}

export function interchangeTemplate() {
  return `Interchange ExampleName
    documentation "This is documentation."
    extended documentation "This is documentation."
    use case documentation "This is documentation."
    domain entity ElementName
`;
}

export function sharedDecimalTemplate() {
  return `Shared Decimal ExampleName
    documentation "This is documentation."
    total digits 9
    decimal places 3
    min value 0
    max value 100
`;
}

export function sharedIntegerTemplate() {
  return `Shared Integer ExampleName
    documentation "This is documentation."
    min value 0
    max value 100
`;
}

export function sharedStringTemplate() {
  return `Shared String ExampleName
    documentation "This is documentation."
    min length 1
    max length 20
`;
}
