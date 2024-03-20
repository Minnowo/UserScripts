// ==UserScript==
// @name          Discord Request Blocker
// @description   Blocks discord XHR requests
// @match         *://discordapp.com/*
// @match         *://discord.com/*
// @compatible    Chrome + Violentmonkey
// @license       GPLv3
// @run-at        document-start
// @version       1.0
// ==/UserScript==

(function() {
    'use strict';


    function onFetchOpen( url, map ) {

      console.log(`Fetch attempt made to ${url}`);

      // stop error reports
      if( url.endsWith("/web")) {
        return {
              "block" : true
              };
      }

      // block science requests
      if( url.endsWith("/science") ) {
          return {
              "block" : true
              };
      }

      // stop typing indicator
      if( url.endsWith("/typing") ) {
          return {
              "block" : true
              };
      }

      return {
        "block": false,
      };

    }

    // put block rules in this function,
    function onXHROpen( xhr, method, url ) {

      console.log(`XHR attempt made to ${url}`);

      // stop error reports
      if( url.endsWith("/web")) {
        return {
              "block" : true
              };
      }

      // block science requests
      if( url.endsWith("/science") ) {
          return {
              "block" : true
              };
      }

      // stop typing indicator
      if( url.endsWith("/typing") ) {
          return {
              "block" : true
          };
      }

      return {
          "block" : false,
      };

    }

    function hookFetch( onFetchCallback ) {

        if (window.fetch_OLD !== undefined) {

          console.log("Already hooked fetch")

          return;
        }

        console.log("Hooking Fetch");

        const origFetch = window.fetch;

        window.fetch_OLD = origFetch;

        window.fetch = async function(...args) {

            const url = args[0];
            const options = args[1] || {};

            const INST = onFetchCallback( url, options );
            var new_url = url;

            if( INST.new_url ) {
                new_url = INST.new_url;
            }

            if ( INST.block ) {
                // return an uninitialized Error object
                // this has all the properties of the instance, but no stack info
                return Promise.reject(Error);
            }

            console.log('Connection just opened to:', url);

            return origFetch(new_url, options);
        }
    }


    // replaces all XMLHttpRequest with our own wrapper,
    // this has access to all requests when .open is called
    function hookXHR( onOpenCallback ) {

        if (window.XMLHttpRequest_OLD !== undefined) {

          console.log("Already hooked xhr");

          return;
        }

        console.log("Hooking XHR");

        const origXHR = window.XMLHttpRequest;

        window.XMLHttpRequest_OLD = origXHR;

        window.XMLHttpRequest = function() {

          const xhr = new origXHR();

          xhr.open = function(...args) {

              const method = args[0];
              const url = args[1];

              const INST = onOpenCallback( xhr, method, url );

              if( INST.new_url ) {
                  args[1] = INST.new_url;
              }


              if ( INST.block ) {
                  xhr.blk = true;
                  return;
              }

              console.log('Connection just opened to:', args[1]);

              origXHR.prototype.open.call(xhr, ...args);
          }

          // we block this to silence errors throw, which trigger sending error reports
          xhr.setRequestHeader = function(header, value) {

              if (xhr.blk){
                return;
              }

              origXHR.prototype.setRequestHeader.call(xhr, header, value);
          }


          xhr.send = function(...args) {

              if (xhr.blk){
                return;
              }

              origXHR.prototype.send.call(xhr, ...args);
          };

          /*
           * Blocking these functions causes stuff to break
           */
//           xhr.getAllResponseHeaders = function() {

//               if (xhr.blk){
//                 return null;
//               }

//               return origXHR.prototype.getAllResponseHeaders.call(xhr, ...args);
//           }

//           xhr.getResponseHeader = function(headerName) {

//               if (xhr.blk){
//                 return null;
//               }

//               return origXHR.prototype.getResponseHeader.call(xhr, headerName);
//           }

//           xhr.overrideMimeType = function(mimeType) {

//               if (xhr.blk){
//                 return;
//               }

//               origXHR.prototype.overrideMimeType.call(xhr, mimeType);
//           }



          return xhr;
        };
    }


    hookXHR( onXHROpen );

    hookFetch( onFetchOpen );

})();
