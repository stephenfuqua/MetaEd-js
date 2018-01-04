// @flow
export type Annotation = {
  documentation: string,
  typeGroup: string,
  descriptorName: string,

  hasTypeGroup: () => boolean,
  hasDescriptorName: () => boolean,
  hasAppInfo: () => boolean,
};

export function newAnnotation(): Annotation {
  return {
    documentation: '',
    typeGroup: '',
    descriptorName: '',
    hasTypeGroup() {
      return !!this.typeGroup;
    },
    hasDescriptorName() {
      return !!this.descriptorName;
    },
    hasAppInfo() {
      return this.hasTypeGroup() || this.hasDescriptorName();
    },
  };
}
