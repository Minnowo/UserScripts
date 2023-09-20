// ==UserScript==
// @name        Extra Element Controls
// @namespace   Violentmonkey Scripts
// @match       *://app.element.io/*
// @grant       none
// @version     1.0
// @author      Minno
// @description 19/09/2023, 21:59:16
// ==/UserScript==


(function() {
    'use strict';


    function dragElement(elmnt) {
      const DRAG_FIX = "_dragheader";
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + DRAG_FIX)) {
        document.getElementById(elmnt.id + DRAG_FIX).onmousedown = dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if((elmnt.offsetTop - pos2) >= 0) {
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if((elmnt.offsetLeft - pos1) >= 0){
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }


    document.__toggle_massive_dm_call_window = function toggle_massive_dm_call_window() {

        for(var a of document.getElementsByClassName("mx_LegacyCallViewForRoom_ResizeWrapper")) {

            const currentVisibility = a.style.visibility;

            if (currentVisibility === 'hidden') {
              a.style.visibility = 'visible';
              a.style.position = 'relative';
            } else {
              a.style.visibility = 'hidden';
              a.style.position = 'fixed';
            }

        }

    };


    const HTML = `
        <style>
          .fillxy {
            width: 100%;
            height: 100%;
          }
        </style>

        <details style="background-color: inherit; color: inherit">
          <summary>Plugins</summary>

          <div style="background-color: inherit; color: inherit">
            <table style="width: 100%; height: 100%;">
              <tr>
                <td colspan="3"><div id="my_wife_is_cute_dragheader">Click here to move</div></td>
              </tr>
              <tr>
                <td><button id="toggle_call_window_bs" class="fillxy">Toggle Massive Call Thing</button></td>
              </tr>

            </table>


          </div>

        </details>
    `;


    const container = document.createElement('div');
    container.id = "my_wife_is_cute";
    container.style = "position: absolute; z-index: 100000; background-color: inherit; color: inherit;";
    container.style.top = "50vh";
    container.style.left = "0px";


    container.innerHTML = HTML;
    document.body.appendChild(container);


    document.getElementById("toggle_call_window_bs").addEventListener('click', document.__toggle_massive_dm_call_window);




    dragElement(container);


})();