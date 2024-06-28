import { Options } from 'yargs';

export type LocationOption = 'top' | 'below' | 'all' | 'replace' | 'branch';

export enum StructureOption {
  FLAT = 'flat',
  FILESYSTEM = 'filesystem',
}

// Options provided by yargs.
export interface Arguments {
  [x: string]: unknown;
  config?: string;
  directory?: string[] | string;
  version?: boolean;
  verbose?: boolean;
}

export function getOptionsConfig(configParser: any): {
  [key: string]: Options;
} {
  return {
    c: {
      config: true,
      configParser,
      alias: 'config',
      description: 'The location of the config file.',
    },
    d: {
      type: 'array',
      alias: 'directory',
      description: 'A list of directories to create barrels for.',
      default: ['./'],
    },

    V: {
      type: 'boolean',
      alias: 'verbose',
      description: 'Display additional logging information',
      default: false,
    },
  };
}
