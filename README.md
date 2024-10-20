# egg-bull-new

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-bull-new.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-bull-new
[travis-image]: https://img.shields.io/travis/eggjs/egg-bull-new.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-bull-new
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-bull-new.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-bull-new?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-bull-new.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-bull-new
[snyk-image]: https://snyk.io/test/npm/egg-bull-new/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-bull-new
[download-image]: https://img.shields.io/npm/dm/egg-bull-new.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-bull-new

<!--
Description here.
-->

## Install

```bash
$ npm i egg-bull-new --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.bull = {
  enable: true,
  package: 'egg-bull-new',
};
```

## Configuration

### Single queue
```js
// {app_root}/config/config.default.js
exports.bull = {
  client: {
    name: 'queue',
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
  },
};
```
### Multiple queue (recommended)

```js
exports.bull = {
  clients: {
    q1: { name: 'q1' },
    q2: { name: 'q2' },
  },
  default: {
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
app.bull.process(job => {
  console.log(job.data, job1); // 'this is a job'
});

app.bull.add({ job1: 'this is a job' });
```

For Bull's api read [Reference](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queueclose) for more details.

## License

[MIT](LICENSE)
