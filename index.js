'use strict';

const authentication = require('./authentication');
const searchTwitterPosts = require('./searches/search_twitter_posts');
const searchRedditPosts = require('./searches/search_reddit_posts');
const newTwitterPost = require('./triggers/new_twitter_post');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  flags: {
    cleanInputData: false,
  },

  authentication: authentication.config,
  beforeRequest: [...authentication.befores],
  afterResponse: [...authentication.afters],

  triggers: {
    [newTwitterPost.key]: newTwitterPost,
  },
  searches: {
    [searchTwitterPosts.key]: searchTwitterPosts,
    [searchRedditPosts.key]: searchRedditPosts,
  },
  creates: {},
  resources: {},
};
