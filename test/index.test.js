'use strict';

const nock = require('nock');
const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

const AUTH = { api_key: 'test-key-123' };

describe('authentication', () => {
  it('passes the bearer token and hits the test endpoint', async () => {
    const scope = nock('https://api.xpoz.ai', {
      reqheaders: { authorization: 'Bearer test-key-123' },
    })
      .get('/api/data/twitter/posts/count')
      .query(true)
      .reply(200, { success: true, count: 0 });

    const response = await appTester(App.authentication.test, {
      authData: AUTH,
    });
    expect(response.status).toBe(200);
    scope.done();
  });
});

describe('searches.search_twitter_posts', () => {
  it('returns the data array', async () => {
    nock('https://api.xpoz.ai')
      .get('/api/data/twitter/posts')
      .query((query) => query.q === 'ai agents')
      .reply(200, {
        success: true,
        results: [{ id: "1", text: "hello agents" }],
      });

    const results = await appTester(
      App.searches.search_twitter_posts.operation.perform,
      { authData: AUTH, inputData: { query: 'ai agents' } },
    );
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('1');
  });
});

describe('searches.search_reddit_posts', () => {
  it('omits blank optional fields from the request', async () => {
    nock('https://api.xpoz.ai')
      .get('/api/data/reddit/posts')
      .query(
        (query) =>
          query.q === 'social media api' &&
          !('subreddit' in query) &&
          !('since' in query) &&
          !('until' in query),
      )
      .reply(200, {
        success: true,
        results: [{ id: "r2", title: "clean params" }],
      });

    const results = await appTester(
      App.searches.search_reddit_posts.operation.perform,
      {
        authData: AUTH,
        inputData: { query: 'social media api', subreddit: '', since: '', until: '', limit: 3 },
      },
    );
    expect(results).toHaveLength(1);
  });

  it('passes the subreddit filter', async () => {
    nock('https://api.xpoz.ai')
      .get('/api/data/reddit/posts')
      .query((query) => query.q === 'xpoz' && query.subreddit === 'marketing')
      .reply(200, {
        success: true,
        results: [{ id: "r1", title: "thread" }],
      });

    const results = await appTester(
      App.searches.search_reddit_posts.operation.perform,
      { authData: AUTH, inputData: { query: 'xpoz', subreddit: 'marketing' } },
    );
    expect(results).toHaveLength(1);
  });
});

describe('triggers.new_twitter_post', () => {
  it('returns posts with ids for deduplication', async () => {
    nock('https://api.xpoz.ai')
      .get('/api/data/twitter/posts')
      .query((query) => query.q === 'brand' && query.sortBy === 'latest')
      .reply(200, {
        success: true,
        results: [
          { id: '2', text: 'newest' },
          { id: '1', text: 'older' },
        ],
      });

    const results = await appTester(
      App.triggers.new_twitter_post.operation.perform,
      { authData: AUTH, inputData: { query: 'brand' } },
    );
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe('2');
  });
});
