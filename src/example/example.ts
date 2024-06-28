import { app } from '..';

app.ScheduledTask('ScheduledFunction1', '* * * * * *', () => {
  // eslint-disable-next-line no-console
  console.log(`send 1 ${new Date().toISOString()}`);
});
