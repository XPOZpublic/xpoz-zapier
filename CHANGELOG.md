# Changelog

## 1.0.2

Omit blank optional fields (since, until, lang, subreddit) from API requests so searches and triggers no longer fail with "Invalid date value" when optional inputs are left empty.

## 1.0.1

Initial public release. Search Twitter/X and Reddit posts, and trigger on new Twitter posts matching a search, powered by the Xpoz social media intelligence API.

Fix search/search_twitter_posts response parsing to use the API results field.
Fix search/search_reddit_posts response parsing to use the API results field.
Update trigger/new_twitter_post response parsing to use the API results field.

## 1.0.0

Initial private release.
