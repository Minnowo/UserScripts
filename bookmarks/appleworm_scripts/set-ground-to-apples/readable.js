

javascript:(
    function()
    {
        for(var m = 0; m < Preferences.lvlLink.lvlParts.length; m += 1)
        {
            if(Preferences.lvlLink.lvlParts[m].type == 103)
            {
                Preferences.lvlLink.lvlParts[m].type = 104
            }
        }
    }()
);