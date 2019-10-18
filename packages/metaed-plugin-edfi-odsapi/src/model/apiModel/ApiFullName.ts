export interface ApiFullName {
  schema: string;
  name: string;
}

export function newApiFullName(): ApiFullName {
  return {
    schema: '',
    name: '',
  };
}

export const NoApiFullName: ApiFullName = {
  ...newApiFullName(),
  name: 'NoApiFullName',
};
