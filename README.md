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

app.ScheduledTask('ScheduledFunction1', '* * * * * *', () => {
  console.log(`send 1 ${new Date().toISOString()}`);
});
```

or

```typescript
import { app } from 'nodejs-functions';

function send2() {
  console.log(`send 2 ${new Date().toISOString()}`);
}

app.ScheduledTask('ScheduledFunction2', '* * * * * *', send2);
```

## Configure Function Directories using `.nfunc.json`

```json
{
  "directory": ["dist/test"],
  "ScheduledFunction1_DISABLE": true
}
```

## How it run the function

- checkout [.nfunc.json](.nfunc.json), [example.ts](./src/example/example.ts) and [example_2.ts](./src/example/example_2.ts)

Both file will later build to the `dist` folder which then give the path

1. ./dist/example/example.js
2. ./dist/example/example_2.js

Use the `.nfunc.json` to set the directory to `dist/example` folder and it will load every function inside individually.

The command below can be use to execute the functions

```bash
npx nfunc --config .nfunc.json

# recommended to have it in package.json script instead
```

## Future Features

- Queue trigger
- DB trigger
- Storage trigger
- HTTP/HTTPS
