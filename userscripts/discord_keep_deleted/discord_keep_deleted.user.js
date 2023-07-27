// ==UserScript==
// @name          Discord Keep Deleted Messages (Bad)
// @description   Keeps deleted messages, from the current channel until you switch channels or refresh
// @match         *://discordapp.com/*
// @match         *://discord.com/*
// @compatible    Chrome + Violentmonkey
// @license       GPLv3
// ==/UserScript==

(function(){
  'use strict';

    function isChatDelete(node) {
            const messageId = node.id.split("-").pop();
            const messageContent = document.querySelector(`#message-content-${messageId}`);

            if (messageContent) {
                const popup = messageContent?.closest(`[class^="focusLock"]`) ?? null;

                if (!popup) {
                    return false;
                }
            }

            if (node.querySelector(`[class^="progressContainer"]`) !== null) {
                return false;
            }

            return true;
    }



    function onMutation( mutations ) {

        var chatList = null;

        mutations.forEach(function (mutation) {

            mutation.removedNodes.forEach(function (removed_node) {

                const SKIP = (removed_node.tagName !== "LI") || !removed_node.id || removed_node.querySelector('[class*="isSending-"]');

                if( SKIP ) {
                    return;
                }

                if (!isChatDelete(removed_node)) {
                    return;
                }

                if(!chatList) {
                    chatList = document.querySelector('ol[data-list-id="chat-messages"]');
                }

                if(chatList) {

                    const referenceNode = chatList.children[chatList.children.length - 1];

                    if(referenceNode) {

                        removed_node.style.background = "rgb(128, 32, 32)";

                        chatList.insertBefore(removed_node, referenceNode);
                    }
                }
            });
        });



    }

    var observing, observer, prev_ele;

    function init(observerInit) {

        observerInit = {
            childList: true,
            subtree: true
        };

        setInterval(function (ele) {

            if (location.pathname.substr(0, 10) === "/channels/") {

                if (prev_ele) {

                    if (!(document.body.contains(prev_ele))) {

                        observing = false;
                        prev_ele = false;
                    }
                }

                if (!observing && (ele = document.querySelector('ol[data-list-id="chat-messages"]'))) {

                    observing = true;
                    prev_ele = ele;

                    console.log('Observing is true.');

                    if (!observer) {

                        observer = new MutationObserver(onMutation);
                    }

                    observer.observe(ele, observerInit);
                }
            } else if (observing) {

                console.log('Observer disconnect!');
                observer.disconnect();
                observing = false;
            }
        }, 5000);
    }

    init(); // Start the whole script


})();
