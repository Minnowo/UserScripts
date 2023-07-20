javascript:(
    function()
    {
        const WHITELIST = [
            "discord.com",
        ];

        const showAlertWarning = true;
        const url = window.location.hostname;
        const MATCH = RegExp(WHITELIST.join("|")).exec(url);

        if(!MATCH) {
            const ALERT = url + " is not in the Whitelist!";
            console.log(ALERT);
            if(showAlertWarning) {
                window.alert(ALERT);
            }
            return;
        }

        if (document.isAbsoluteModeEnabled === undefined) {
            document.isAbsoluteModeEnabled = false;
            document.stopPropagation = function stopPropagation(e) {
                e.stopPropagation()
            }
        }

        var eventsToStop = [
            'contextmenu',
            // 'mouseup',
        ];

        function absoluteMode()
        {
            if(document.isAbsoluteModeEnabled) {
                eventsToStop.forEach(
                function(event) {
                    console.log("Enabling " + event);
                    document.removeEventListener(event, document.stopPropagation, true);
                }
                );
            } else {
                eventsToStop.forEach(
                function(event) {
                    console.log("Disabling " + event);
                    document.addEventListener(event, document.stopPropagation, true);
                }
                );
            }

            document.isAbsoluteModeEnabled = !document.isAbsoluteModeEnabled;
        }

        var text;

        if (document.isAbsoluteModeEnabled) {
            text = "Turn OFF Absolute Right Click Mode?";
        } else {
            text = "Turn ON Absolute Right Click Mode?";
        }

        if (confirm(text)) { absoluteMode(); }
    }()
);
