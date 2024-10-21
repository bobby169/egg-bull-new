'use strict';

module.exports = app => {
  const queue = new app.Queue('q3', {
    redis: { port: 6379, host: '127.0.0.1', password: 'foobared' },
  });

  queue.process(job => {
    job.progress(42);
    return Promise.resolve();
  });

  queue.on('progress', (job, progress) => {
    console.log(`Job ${job.id} is ${progress}% complete`);
  });

  return queue;
};
