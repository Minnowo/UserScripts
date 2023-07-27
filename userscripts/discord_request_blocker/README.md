## Discord XHR Blocker

This script wraps all XMLHttpRequest with a function allowing for the client to filter them.

By default, this script redirects the Discord typing indicator request to localhost, making it not show that you are typing for anyone but yourself.

You can modify the `onXHROpen` function at the top of the script to return JSON which determine how it should handle the request about to be made.

The following JSON keys are valid:

- `block`, should be true or false, if true the requst will not be opened, causing an error when trying to make the request

- `new_url`, should be a string, replaces the request url with this value, allows for sending the request to another host

- `headers`, should be a JSON of headers, lets you set headers for the request after it is opened, any headers set after the hook will replace any set here


