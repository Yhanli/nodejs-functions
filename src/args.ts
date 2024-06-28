import { readFileSync } from 'fs';
import * as Yargs from 'yargs';
import { Arguments, getOptionsConfig } from './options';

const configParser = (configPath: string): any => {
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));

  // Backwards compatibility for directory string, as opposed to an array
  if (config.directory && typeof config.directory === 'string') {
    config.directory = [config.directory];
  }

  return config;
};

export function getArgs(): Yargs.Argv<Arguments> {
  return Yargs.usage('Usage: Nodejs Function [options]')
    .example('nfunc', 'Run nfunc')

    .options(getOptionsConfig(configParser))

    .version()
    .alias('v', 'version')
    .default('v', false)
    .help('h')
    .alias('h', 'help')
    .default('h', false);
}
