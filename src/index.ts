import { readdirSync } from 'fs';
import { Arguments } from './options';
import { spawn } from 'child_process';

import { ScheduledParams } from './types/scheduled.types';
import { CronJob } from 'cron';

export async function NodeFunction(args: Arguments) {
  const directories = args.directory;
  if (directories) {
    for (const dir of directories) {
      const dirents = readdirSync(dir, { withFileTypes: true });

      for (const dirent of dirents) {
        if (
          dirent.isFile() &&
          !dirent.name.includes('.d.ts') &&
          !dirent.name.includes('.map') &&
          !dirent.name.includes('.js.map')
        ) {
          // const executing = exec(`node ${dir}/${dirent.name}`);
          // executing.stdout.pipe(process.stdout);
          // executing.stderr.pipe(process.stderr);
          const newProcess = spawn('node', [`${dir}/${dirent.name}`], { stdio: 'inherit' });
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
  }
}

export class NodeFunctionApp {
  constructor() {}

  ScheduledTask(schedule: ScheduledParams['schedule'], handler: ScheduledParams['handler']) {
    const tryCatchHandler = () => {
      try {
        handler();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    new CronJob(schedule, tryCatchHandler, null, true);
  }
}
export const app = new NodeFunctionApp();
export default app;
