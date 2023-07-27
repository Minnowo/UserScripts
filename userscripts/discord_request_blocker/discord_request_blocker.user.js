// ==UserScript==
// @name          Discord Request Blocker
// @description   Blocks discord XHR requests
// @match         *://discordapp.com/*
// @match         *://discord.com/*
// @compatible    Chrome + Violentmonkey
// @license       GPLv3
// ==/UserScript==

(function() {
    'use strict';

    // put block rules in this function,
    function onXHROpen( xhr, method, url ) {

      // redirect typing indicator to localhost
      if( url.endsWith("/typing") ) {
          return {
              "block" : false,
              "new_url" : "http://127.0.0.1/discord_typing_indicator",
              // this will set headers, but only if they're not set by something later
              "headers" : {
                  "authorization" : "" 
              }
          }
      }

      return {
          "block" : false,
      }

    }



    // replaces all XMLHttpRequest with our own wrapper, 
    // this has access to all requests when .open is called
    function hookXHR( onOpenCallback ) {

        const origXHR = window.XMLHttpRequest;

        window.XMLHttpRequest_OLD = origXHR;

        window.XMLHttpRequest = function() {

          const xhr = new origXHR();

          xhr.open = (method, url) => {

              const INST = onOpenCallback( xhr, method, url );
              var new_url = url;

              if( INST.new_url ) {
                  new_url = INST.new_url;
              }


              if ( INST.block ) {
                  return;
              }


              console.log('Connection just opened to:', url);
              origXHR.prototype.open.call(xhr, method, new_url);


              if( INST.headers ) {

                  for (const headerName in INST.headers)
                  {
                      const headerValue = INST.headers[headerName];

                      xhr.setRequestHeader(headerName, headerValue);
                  }
              }
          }

          return xhr;
        };
    }



    console.log("Hooking XHR");

    hookXHR( onXHROpen );


})();
