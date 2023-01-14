

javascript:(
    function()
    {
        // do nothing if fly script is enabled
        if(Snake.prototype.FLY_ENABLED)
        {
            return;
        }

        // if no gravity is enabled, disable it 
        if(Snake.prototype.NO_GRAVITY)
        {
            Snake.prototype.startFall = Snake.prototype.old_startFall;
            Snake.prototype.NO_GRAVITY = false;
            return;
        }

        if (typeof Snake.prototype.old_startFall === 'undefined')
        {
            Snake.prototype.old_startFall = Snake.prototype.startFall;
        }

        Snake.prototype.NO_GRAVITY = true;

        Snake.prototype.startFall = function(){};
    }()
);