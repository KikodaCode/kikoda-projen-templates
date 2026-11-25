/**
 * CJS-compatible stand-in for projen's ESM-only `dax` dependency, which Jest 27 cannot load.
 */
export const $ = Object.assign(
  () => {
    throw new Error('dax command execution is not available in unit tests');
  },
  {
    escapeArg: (arg: string) => JSON.stringify(arg),
  },
);
