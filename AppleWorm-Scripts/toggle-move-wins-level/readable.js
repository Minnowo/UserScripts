

javascript:(
    function()
    {
        if(Snake.prototype.MOVE_WINS_LEVEL)
        {
            Snake.prototype.move = Snake.prototype.old_move;
            Snake.prototype.MOVE_WINS_LEVEL = false;
            return;
        }

        if (typeof Snake.prototype.old_move === 'undefined')
        {
            Snake.prototype.old_move = Snake.prototype.move;
        }

        Snake.prototype.MOVE_WINS_LEVEL = true;

        Snake.prototype.move=function()
        {
            this.bWin = true; 
            Preferences.gameMenuChanger.showNextMenu(false);
            Preferences.nextMenu.inProgress = true
        };
    }()
);