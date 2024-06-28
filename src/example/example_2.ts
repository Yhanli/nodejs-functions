import app from '..';

function send2() {
  // eslint-disable-next-line no-console
  console.log(`send 2 ${new Date().toISOString()}`);
}

app.ScheduledTask('* * * * * *', send2);
