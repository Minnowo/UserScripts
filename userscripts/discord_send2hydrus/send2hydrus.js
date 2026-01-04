// ==UserScript==
// @name          Send to Hydrus
// @description   Send a Discord file to Hydrus
// @match         *://discordapp.com/*
// @match         *://discord.com/*
// @compatible    Chrome + Violentmonkey
// @grant         GM_registerMenuCommand
// @license       GPLv3
// ==/UserScript==

(function() {
    'use strict';

    const DEST_PAGE_NAME = 'Discord2Hydrus';
    const API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const HYDRUS_API = 'http://127.0.0.1:45869'

    // https://hydrusnetwork.github.io/hydrus/developer_api.html#add_urls_add_url
    function hydrus_add_urls_add_url(payload) {
        return fetch(HYDRUS_API + "/add_urls/add_url", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Hydrus-Client-API-Access-Key": API_KEY
            },
            body: JSON.stringify(payload)
        })
    }
    function send2Hydrus(url) { 

        const payload = {
            "url" : url,
            "destination_page_name" : DEST_PAGE_NAME,
            // "service_keys_to_additional_tags" : {
            //     [TAG_SERVICE_KEY] : [
            //         "discord"
            //     ]
            // },
            "filterable_tags" : [ ]
        };

        return hydrus_add_urls_add_url(payload);
    }


    const CHAT_MESSAGE_CONTAINER_QS = '[data-list-id="chat-messages"]';
    const MESSAGE_LIST_REGEX        = /^chat-messages-\d+-\d+$/;
    function monitorChatMessages() {

        const chatContainer = document.querySelector(CHAT_MESSAGE_CONTAINER_QS);

        if (!chatContainer) {
            console.error("Could not find chat messages container!");
            return;
        }

        const getButton = (imgNode) => {

            const aTag = imgNode.closest('a');
            const redButton = document.createElement('button');
            redButton.innerText = '2Hydrus';
            redButton.style.backgroundColor = 'red';
            redButton.style.position = 'absolute';
            redButton.style.color = 'white';
            redButton.style.zIndex = '100000';
            redButton.style.border = 'none';
            redButton.onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                let safeSrc = aTag.getAttribute('href');
                if (!safeSrc) {
                    safeSrc = imgNode.getAttribute('data-safe-src');
                    if (!safeSrc) {
                        safeSrc = imgNode.getAttribute('src');
                        if (!safeSrc) { 
                            alert("Could not get src."); 
                            return; 
                        } 
                    }
                    safeSrc = safeSrc.replace(/&format=[^&]+/, "")
                        .replace(/&width=\d+/, "")
                        .replace(/&height=\d+/, "");
                }
                send2Hydrus(safeSrc).then((r) => r.status === 200 &&
                    redButton.remove()).catch((err)=>alert(err));
            };
            aTag.insertAdjacentElement('beforebegin', redButton);
        };

        const findImagesInNode = (node) => {
            if (!node || node.nodeType !== Node.ELEMENT_NODE) {
                return [];
            }
            return node.querySelectorAll('[data-role="img"]');
        };

        for(const img of findImagesInNode(chatContainer)){ 
            getButton(img);
        }

        const observer = new MutationObserver((mutationsList) => {

            for (const mutation of mutationsList) {

                if (mutation.type !== 'childList') {
                    continue;
                }

                mutation.addedNodes.forEach((node) => {

                    if (node && node.nodeType !== Node.ELEMENT_NODE && MESSAGE_LIST_REGEX.test(node.id)) {
                        return;
                    }

                    for(const img of findImagesInNode(node)){
                        getButton(img);
                    }
                });
            }
        });

        // Configuration for the observer to watch for added child nodes
        observer.observe(chatContainer, { childList: true, subtree: true });
    }

    function handleURLChange() {
        const currentUrl = window.location.href;

        if (currentUrl !== window.previousUrl) {
            window.previousUrl = currentUrl;
            monitorChatMessages();
        }
    }

    setTimeout(() => {
        console.info("Loaded Send 2 Hydrus");
        handleURLChange();
        window.addEventListener('popstate', handleURLChange);
        setInterval(handleURLChange, 10_000);
    }, 10_000);

})();
