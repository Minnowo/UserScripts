// ==UserScript==
// @name        Libreddit
// @namespace   Violentmonkey Scripts
// @match       *://*reddit.com/*
// @grant       none
// @version     1.1
// @author      -
// @description Redirect reddit to a libreddit instance
// ==/UserScript==

// https://github.com/libreddit/libreddit-instances/blob/master/instances.md
const INSTANCE = "reddit.invak.id";

url = location.href;
url = url.replace(/\bwww\.\b/, "");
url = url.replace("old.reddit.com", INSTANCE);
url = url.replace("reddit.com", INSTANCE);

location.href = url;
