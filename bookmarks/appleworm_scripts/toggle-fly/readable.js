

javascript:(
    function()
    {
        if(Snake.prototype.FLY_ENABLED)
        {
            Snake.prototype.startFall = Snake.prototype.old_startFall;
            Snake.prototype.move = Snake.prototype.old_move;
            Snake.prototype.FLY_ENABLED = false;
            Snake.prototype.NO_GRAVITY = false;
            return;
        }

        if (typeof Snake.prototype.old_startFall === 'undefined')
        {
            Snake.prototype.old_startFall = Snake.prototype.startFall;
        }

        if (typeof Snake.prototype.old_move === 'undefined')
        {
            Snake.prototype.old_move = Snake.prototype.move;
        }

        Snake.prototype.FLY_ENABLED = true;

        // no gravity
        Snake.prototype.startFall = function(){};

        Snake.prototype.move = function(a, c) 
        {
            // the second param being false disables the 'jump' on tail check
            this.old_move(a, false);
        }
    }()
);