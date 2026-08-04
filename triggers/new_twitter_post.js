'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api.xpoz.ai/api/data/twitter/posts',
    params: {
      q: bundle.inputData.query,
      lang: bundle.inputData.lang,
      sortBy: 'latest',
      limit: 50,
    },
  });
  return (response.data.results || []).map((post) => ({
    ...post,
    id: post.id,
  }));
};

module.exports = {
  key: 'new_twitter_post',
  noun: 'Twitter Post',
  display: {
    label: 'New Twitter Post Matching Search',
    description: 'Triggers when a new Twitter/X post matches your search query.',
  },
  operation: {
    type: 'polling',
    inputFields: [
      {
        key: 'query',
        label: 'Query',
        type: 'string',
        required: true,
        helpText:
          'Search keywords, e.g. your brand name. Supports AND, OR, NOT operators and quoted phrases.',
      },
      {
        key: 'lang',
        label: 'Language',
        type: 'string',
        required: false,
        helpText: 'Two-letter language code, e.g. `en`.',
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
