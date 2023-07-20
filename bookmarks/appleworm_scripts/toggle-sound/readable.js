

javascript:(
    function()
    {
        Preferences.bSoundOff = !Preferences.bSoundOff;

        a = Preferences.inGameMenu.butSound.inner;

        Preferences.inGameMenu.butSound.uncache();

        if (Preferences.bSoundOff)
        {
            a.gotoAndStop(1)
        }
        else 
        {
            a.gotoAndStop(0); 
        }
        Preferences.inGameMenu.butSound.cache(-48,-48,95,95)
    }()
);