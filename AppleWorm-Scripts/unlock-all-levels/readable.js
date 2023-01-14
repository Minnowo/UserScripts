

javascript:(
    function()
    {
        Preferences.curLevel = 1;
        Preferences.gameMenuChanger.showGame();
        Preferences.levelsCompleted = 31;

        for(var i = 0; i <= 31; i += 1)
        {
            Preferences.levelResults[i] = 2;
            Preferences.saveResults();
            Preferences.updateResults();
            Preferences.gameMenuChanger.showMenu();
        }

    }()
);