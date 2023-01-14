

javascript:(
    function()
    {
        if(Eyes.SET_EYES_DEAD)
        {
            Eyes.setEyes = Eyes.old_setEyes;
            Eyes.setDead = Eyes.old_setDead;
            Eyes.SET_EYES_DEAD = false;
            Eyes.setDead(false);
            return;
        }

        if (typeof Eyes.old_setEyes === 'undefined')
        {
            Eyes.old_setEyes = Eyes.setEyes;
        }

        if (typeof Eyes.old_setDead === 'undefined')
        {
            Eyes.old_setDead = Eyes.setDead;
        }

        Eyes.SET_EYES_DEAD = true;

        Eyes.setDead = function(a)
        {
            this.old_setDead(true);
        };

        Eyes.setEyes = function(a) 
        {
            this.setDead(true);
        };

        Eyes.setDead(true);
    }()
);