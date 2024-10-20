'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/bull.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/bull-multi-client',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should OK', () => {
    assert(app.bull.get('q1'));
  });

  it('should work', done => {
    app.bull.get('q1').add(
      { job1: 'this is a job' },
      {
        removeOnComplete: true, // 任务成功后自动删除
        removeOnFail: false, // 任务失败后自动删除（可选）
      }
    );
    app.bull.get('q1').process(job => {
      if (job.data.job1 === 'this is a job') {
        done();
        return Promise.reject(new Error('error transcoding'));
      }
      done(new Error());
    });
  });
});
