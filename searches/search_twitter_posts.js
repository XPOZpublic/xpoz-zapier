'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api.xpoz.ai/api/data/twitter/posts',
    params: {
      q: bundle.inputData.query,
      since: bundle.inputData.since,
      until: bundle.inputData.until,
      lang: bundle.inputData.lang,
      limit: bundle.inputData.limit || 10,
    },
  });
  return response.data.results || [];
};

module.exports = {
  key: 'search_twitter_posts',
  noun: 'Twitter Post',
  display: {
    label: 'Find Twitter Posts',
    description:
      'Searches Twitter/X posts by keywords, hashtags, or phrases. Supports AND, OR, NOT operators and quoted phrases.',
  },
  operation: {
    inputFields: [
      {
        key: 'query',
        label: 'Query',
        type: 'string',
        required: true,
        helpText: 'Search keywords, e.g. `"AI agents" AND launch`.',
      },
      {
        key: 'since',
        label: 'Since',
        type: 'string',
        required: false,
        helpText: 'Only posts after this date (YYYY-MM-DD). Leave blank for most recent.',
      },
      {
        key: 'until',
        label: 'Until',
        type: 'string',
        required: false,
        helpText: 'Only posts before this date (YYYY-MM-DD). Leave blank for most recent.',
      },
      {
        key: 'lang',
        label: 'Language',
        type: 'string',
        required: false,
        helpText: 'Two-letter language code, e.g. `en`.',
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
      id: '1750000000000000000',
      text: 'Excited to announce our new AI agents launch!',
      author_username: 'example_user',
      created_at: '2026-08-01T12:00:00.000Z',
      like_count: 42,
      retweet_count: 7,
      reply_count: 3,
    },
    outputFields: [
      { key: 'id', label: 'Post ID' },
      { key: 'text', label: 'Text' },
      { key: 'author_username', label: 'Author Username' },
      { key: 'created_at', label: 'Created At' },
      { key: 'like_count', label: 'Like Count', type: 'integer' },
      { key: 'retweet_count', label: 'Retweet Count', type: 'integer' },
      { key: 'reply_count', label: 'Reply Count', type: 'integer' },
    ],
  },
};
