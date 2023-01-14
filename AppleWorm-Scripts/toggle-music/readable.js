

javascript:(
    function()
    {
        Preferences.bMusicOff = !Preferences.bMusicOff;

        a = Preferences.inGameMenu.butMusic.inner;
        
        Preferences.inGameMenu.butMusic.uncache();
        
        if(Preferences.bMusicOff)
        {
            a.gotoAndStop(1),SoundController.musicStop();
        }
        else 
        {
            a.gotoAndStop(0),SoundController.musicPlay();
        }
        
        Preferences.inGameMenu.butMusic.cache(-48,-48,95,95);
    }()
);