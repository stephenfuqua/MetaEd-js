// @flow

export const nextMacroTask = (): Promise<void> => new Promise(resolve => setImmediate(resolve));
