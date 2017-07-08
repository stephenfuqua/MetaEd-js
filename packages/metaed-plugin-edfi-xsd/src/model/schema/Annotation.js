// @flow
export type Annotation = {
  documentation: string,
  typeGroup: string,
  descriptorName: string,

  hasTypeGroup: () => boolean,
  hasDescriptorName: () => boolean,
  hasAppInfo: () => boolean,
}

export function newAnnotation(): Annotation {
  return {
    documentation: '',
    typeGroup: '',
    descriptorName: '',
    hasTypeGroup: () => !!this.typeGroup,
    hasDescriptorName: () => !!this.descriptorName,
    hasAppInfo: () => this.hasTypeGroup() || this.hasDescriptorName(),
  };
}
