import { CronJobParams } from 'cron';

export interface ScheduledParams {
  schedule: CronJobParams['cronTime'];
  handler: () => void;
}
