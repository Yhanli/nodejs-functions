<p align="center">
  <br />
  <b>nodejs functions</b> a simple nodejs function allow for schedule tasks
  <br />
  Perfect for simple schedule tasks
</p>

# Functions for Node.js

[![Version](https://img.shields.io/npm/v/nodejs-functions?label=version&logo=npm)](https://www.npmjs.com/package/nodejs-functions)
[![Monthly Downloads](https://img.shields.io/npm/dm/nodejs-functions?logo=npm)](https://www.npmjs.com/package/nodejs-functions)

## 🌟 Features

- execute a function whenever your scheduled job triggers

## 🚀 Installation

```bash
npm install nodejs-functions
```

## 🛠 Basic Usage

```javascript
import { app } from 'nodejs-functions';

app.ScheduledTask('* * * * * *', () => {
  console.log(`trigger every second ${new Date().toISOString()}`);
});
```

or

```typescript
import { app } from 'nodejs-functions';

function send2() {
  console.log(`send 2 ${new Date().toISOString()}`);
}

app.ScheduledTask('* * * * * *', send2);
```

## Configure Function Directories using `.nfunc.json`

```json
{
  "directory": ["dist/test"]
}
```

## Future Features

- Queue trigger
- DB trigger
- Storage trigger
- HTTP/HTTPS
