// ==UserScript==
// @name          Allow Right Click Discord
// @description   Force Enable Right Click
// @match         *://discordapp.com/*
// @match         *://discord.com/*
// @compatible    Chrome + Violentmonkey
// @grant         GM_registerMenuCommand
// @license       GPLv3
// ==/UserScript==

(function() {
    'use strict';

    var isAbsoluteModeEnabled = false;
    var eventsToStop = [
        'contextmenu',
    ];


    function stopPropagation(e) {
        e.stopPropagation()
    }


    function absoluteMode()
    {
        if(isAbsoluteModeEnabled) {
            eventsToStop.forEach(
              function(event) {
                  console.log("Enabling " + event);
                  document.removeEventListener(event, stopPropagation, true);
              }
            );
        } else {
            eventsToStop.forEach(
              function(event) {
                  console.log("Disabling " + event);
                  document.addEventListener(event, stopPropagation, true);
              }
            );
        }


        isAbsoluteModeEnabled = !isAbsoluteModeEnabled;
    }

    absoluteMode();


    function enableCommandMenu() {
          var commandMenu = true;
          try {
              if (typeof(GM_registerMenuCommand) == undefined) {
                  return;
              } else {
                  if (commandMenu == true ) {
                      GM_registerMenuCommand('Toggle Right Click Mode', function() {

                          var text;

                          if (isAbsoluteModeEnabled) {
                              text = "Turn OFF Absolute Right Click Mode?";
                          } else {
                              text = "Turn ON Absolute Right Click Mode?";
                          }

                          return confirm(text) == true ? absoluteMode() : null;
                      });

                  }
              }
          }
          catch(err) {
              console.log(err);
          }
      }
    enableCommandMenu();

})();