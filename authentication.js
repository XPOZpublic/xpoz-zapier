'use strict';

const test = (z) =>
  z.request({
    url: 'https://api.xpoz.ai/api/data/twitter/posts/count',
    params: { phrase: 'zapier connection test' },
  });

const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.api_key) {
    request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
  }
  return request;
};

module.exports = {
  config: {
    type: 'custom',
    fields: [
      {
        key: 'api_key',
        label: 'Access Key',
        required: true,
        type: 'password',
        helpText:
          'Get a free access key (no credit card) at [xpoz.ai/get-token](https://xpoz.ai/get-token).',
      },
    ],
    test,
    connectionLabel: 'Xpoz account',
  },
  befores: [includeBearerToken],
  afters: [],
};
