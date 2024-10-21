'use strict';

const path = require('path');
const assert = require('assert');

module.exports = app => {
  app.addSingleton('bull', createQueue);

  app.beforeStart(() => {
    loadQueueToApp(app);
  });
};

function createQueue(config, app) {
  const { name, redis } = config;
  assert(name, '[egg-bull-new] name is required on config');
  assert(
    redis && redis.host && redis.port,
    '[egg-bull-new] host and port of redis are required on config'
  );

  app.Queue = config.Queue || require('bull');
  const queue = new app.Queue(name, config);

  queue.on('error', error => {
    app.coreLogger.error(`[egg-bull-new] Error ! ${error.message}`);
  });

  app.beforeStart(() => {
    app.coreLogger.info(`[egg-bull-new] ${name} status OK, queue ready`);
  });

  return queue;
}

function loadQueueToApp(app) {
  const { delegate, baseDir } = app.config.queue;
  const dir = path.join(app.baseDir, 'app', baseDir);
  app.loader.loadToApp(dir, delegate, {
    inject: app,
    caseStyle: 'lower',
    filter(queue) {
      return typeof queue === 'object' && queue instanceof app.Queue;
    },
  });
}
