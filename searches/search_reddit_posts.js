'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api.xpoz.ai/api/data/reddit/posts',
    params: {
      q: bundle.inputData.query,
      subreddit: bundle.inputData.subreddit,
      since: bundle.inputData.since,
      until: bundle.inputData.until,
      limit: bundle.inputData.limit || 10,
    },
  });
  return response.data.results || [];
};

module.exports = {
  key: 'search_reddit_posts',
  noun: 'Reddit Post',
  display: {
    label: 'Find Reddit Posts',
    description: 'Searches Reddit posts by keywords, optionally within one subreddit.',
  },
  operation: {
    inputFields: [
      {
        key: 'query',
        label: 'Query',
        type: 'string',
        required: true,
        helpText: 'Search keywords.',
      },
      {
        key: 'subreddit',
        label: 'Subreddit',
        type: 'string',
        required: false,
        helpText: 'Restrict to this subreddit (without r/).',
      },
      {
        key: 'since',
        label: 'Since',
        type: 'string',
        required: false,
        helpText: 'Only posts after this date (YYYY-MM-DD).',
      },
      {
        key: 'until',
        label: 'Until',
        type: 'string',
        required: false,
        helpText: 'Only posts before this date (YYYY-MM-DD).',
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of posts to return (default 10).',
      },
    ],
    perform,
    sample: {
      id: 'abc123',
      title: 'What social listening tools do you use?',
      selftext: 'Looking for recommendations...',
      subreddit: 'marketing',
      author: 'example_user',
      score: 15,
      num_comments: 8,
      created_at: '2026-08-01T12:00:00.000Z',
    },
    outputFields: [
      { key: 'id', label: 'Post ID' },
      { key: 'title', label: 'Title' },
      { key: 'selftext', label: 'Body' },
      { key: 'subreddit', label: 'Subreddit' },
      { key: 'author', label: 'Author' },
      { key: 'score', label: 'Score', type: 'integer' },
      { key: 'num_comments', label: 'Comment Count', type: 'integer' },
      { key: 'created_at', label: 'Created At' },
    ],
  },
};
