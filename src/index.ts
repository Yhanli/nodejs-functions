import { readdirSync } from 'fs';
import { Arguments } from './options';
import { spawn } from 'child_process';

import { ScheduledParams } from './types/scheduled.types';
import { CronJob } from 'cron';
import { getArgs } from './args';

const args = getArgs().argv as Arguments;

export async function NodeFunction(args: Arguments) {
  const directories = args.directory;

  const functions = [];
  if (directories) {
    for (const dir of directories) {
      const dirents = readdirSync(dir, { withFileTypes: true });
      const functionsInDir = [];
      for (const dirent of dirents) {
        if (
          dirent.isFile() &&
          !dirent.name.endsWith('.d.ts') &&
          !dirent.name.endsWith('.map') &&
          !dirent.name.endsWith('.js.map') &&
          dirent.name.endsWith('.js')
        ) {
          functionsInDir.push(`${dir}/${dirent.name}`);
        }
      }
      // eslint-disable-next-line no-console
      console.log(`Found ${functionsInDir.length} function in ${dir}`);
      if (functionsInDir.length > 0) {
        functions.push(...functionsInDir);
      }
    }
  }
  for (const func of functions) {
    // const executing = exec(`node ${dir}/${dirent.name}`);
    // executing.stdout.pipe(process.stdout);
    // executing.stderr.pipe(process.stderr);
    const newProcess = spawn('node', [func, ...process.argv.slice(2)], { stdio: 'inherit' });
    if (args.verbose) {
      // eslint-disable-next-line no-console
      console.log(`Starting function ${func}`);
      // eslint-disable-next-line no-console
      console.log(`node ${func} ${process.argv.slice(2).join(' ')}`);
      newProcess.on('error', (error) => {
        // eslint-disable-next-line no-console
        console.error(`child process creating error with error ${error}`);
      });

      newProcess.on('close', (code) => {
        // eslint-disable-next-line no-console
        console.log(`child process exited with code ${code}`);
      });
    }
  }
}

export class NodeFunctionApp {
  constructor() {}

  ScheduledTask(name: string, schedule: ScheduledParams['schedule'], handler: ScheduledParams['handler']) {
    const tryCatchHandler = () => {
      try {
        handler();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    if (!args[`${name}_DISABLE`]) {
      new CronJob(schedule, tryCatchHandler, null, true);
    }
  }
}
export const app = new NodeFunctionApp();
export default app;
