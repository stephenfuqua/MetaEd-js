// schema from the joi library
// https://github.com/hapijs/joi/blob/master/API.md
export type JoiSchema = any;

export type JoiErrorDetail = {
  message: string;
  path: Array<string>;
};

export type JoiError = {
  details: Array<JoiErrorDetail>;
  message: string;
};

export type JoiResult = {
  error: JoiError | null;
};
