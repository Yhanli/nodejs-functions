import { app } from '..';

app.ScheduledTask('* * * * * *', () => {
  // eslint-disable-next-line no-console
  console.log(`send 1 ${new Date().toISOString()}`);
});
