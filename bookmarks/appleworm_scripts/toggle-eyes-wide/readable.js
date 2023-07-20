

javascript:(
    function()
    {
        if(Eyes.SET_EYES_WIDE)
        {
            Eyes.setEyes = Eyes.old_setEyes;
            Eyes.SET_EYES_WIDE = false;
            return;
        }

        if (typeof Eyes.old_setEyes === 'undefined')
        {
            Eyes.old_setEyes = Eyes.setEyes;
        }

        Eyes.SET_EYES_WIDE = true;

        Eyes.setEyes = function(a) 
        {
            this.old_setEyes(true);
        };
    }()
);