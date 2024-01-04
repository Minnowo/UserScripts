// ==UserScript==
// @name        Libreddit
// @namespace   Violentmonkey Scripts
// @match       *://*.reddit.com/r/*
// @grant       none
// @version     1.0
// @author      -
// @description Redirect reddit to a libreddit instance
// ==/UserScript==

// https://github.com/libreddit/libreddit-instances/blob/master/instances.md

url = location.href;
url = url.replace(/\bwww\.\b/, "");
url = url.replace("reddit.com", "reddit.invak.id");

location.href = url;
