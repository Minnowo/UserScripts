var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(g, b, a) {
    g != Array.prototype && g != Object.prototype && (g[b] = a.value)
};
$jscomp.getGlobal = function(g) {
    return "undefined" != typeof window && window === g ? g : "undefined" != typeof global && null != global ? global : g
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(g, b, a, c) {
    if (b) {
        a = $jscomp.global;
        g = g.split(".");
        for (c = 0; c < g.length - 1; c++) {
            var d = g[c];
            d in a || (a[d] = {});
            a = a[d]
        }
        g = g[g.length - 1];
        c = a[g];
        b = b(c);
        b != c && null != b && $jscomp.defineProperty(a, g, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.underscoreProtoCanBeSet = function() {
    var g = {
            a: !0
        },
        b = {};
    try {
        return b.__proto__ = g, b.a
    } catch (a) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(g, b) {
    g.__proto__ = b;
    if (g.__proto__ !== b) throw new TypeError(g + " is not extensible");
    return g
} : null;
$jscomp.polyfill("Object.setPrototypeOf", function(g) {
    return g || $jscomp.setPrototypeOf
}, "es6", "es5");
var SoundController = function() {
    function g() {}
    g.musicPlay = function() {
        var b = (new createjs.PlayPropsConfig).set({
            interrupt: createjs.Sound.INTERRUPT_ANY,
            loop: -1,
            volume: 1
        });
        Preferences.bMusicOff || (null == this.music ? this.music = createjs.Sound.play("TMusic", b) : this.music.paused = !1)
    };
    g.musicStop = function() {
        this.music && (this.music.paused = !0)
    };
    g.resumeAudioContext = function() {
        try {
            createjs.WebAudioPlugin.context && "suspended" === createjs.WebAudioPlugin.context.state && createjs.WebAudioPlugin.context.resume()
        } catch (b) {
            console.error("There was an error while trying to resume the SoundJS Web Audio context..."),
                console.error(b)
        }
    };
    g.music = null;
    return g
}();
var __extends = this && this.__extends || function() {
        var g = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(b, a) {
            b.__proto__ = a
        } || function(b, a) {
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
        };
        return function(b, a) {
            function c() {
                this.constructor = b
            }
            g(b, a);
            b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
        }
    }(),
    GameMenuChanger = function(g) {
        function b() {
            var a = g.call(this) || this;
            a.inNextMenu = !1;
            a.levelMC = new createjs.Container;
            a.inProgress = !1;
            a.restartAnim = new lib.RestartAnim;
            for (var b =
                    LevelPart.SNAKE_BODY_START; b < LevelPart.SNAKE_BODY_START + 9; b++) LevelPart.savedSnakeParts.push(new SnakePart(-1, -1, b, !1));
            a.allFon = Preferences.fon;
            Preferences.inGameMenu = new InGameMenu;
            Preferences.mainMenu = new MainMenu;
            a.mainMenu = Preferences.mainMenu;
            a.game = new Game;
            a.nextMenu = new NextMenu;
            Preferences.prepareMC(a.nextMenu);
            a.mainMenu.x = 20;
            a.mainMenu.y = -60;
            Preferences.inGameMenu.x = 395;
            Preferences.inGameMenu.y = 240;
            a.GMC = new lib.GameMenuChanger;
            Preferences.prepareMC(a.GMC);
            a.GMC.gotoAndStop("menu");
            a.addChild(a.GMC);
            b = a.GMC.gm;
            a.GNM = a.GMC.mm;
            var d = a.GNM.mm1;
            Preferences.prepareMC(a.GNM);
            a.nexLevelMC = a.GNM.nm1;
            Preferences.prepareMC(b);
            Preferences.prepareMC(d);
            Preferences.prepareMC(a.nexLevelMC);
            a.restartAnim.stop();
            a.restartAnim.visible = !1;
            b.addChild(Preferences.mainMenu);
            d.addChild(a.levelMC);
            Preferences.stage3.addChild(a.restartAnim);
            d.addChild(a.nextMenu);
            Preferences.gameLink = a.game;
            Preferences.gameMenuChanger = a;
            a.nextMenu.visible = !1;
            return a
        }
        __extends(b, g);
        b.prototype.init = function(a) {
            this.parent.addChild(Preferences.inGameMenu);
            Preferences.inGameMenu.gotoAndStop(7);
            Preferences.mainMenu.init()
        };
        b.prototype.showGame = function(a) {
            void 0 === a && (a = !1);
            this.inProgress || (a ? (Preferences.SHOW_FAIL_MENU || Preferences.inGameMenu.stopRestartEff(), Preferences.lossCount++, 3 <= Preferences.lossCount && Preferences.inGameMenu.startWalkEffect(), this.inProgress = !0, this.nextMenu.hide(!0), this.restartAnim.gotoAndStop(0), Preferences.playTo(this.restartAnim, "visible", this.onRestartMiddle), this.restartAnim.visible = !0) : ("menu" == this.GMC.currentLabel ?
                (Preferences.inGameMenu.gameView(), "menu" == this.GNM.currentLabel && (this.GNM.stop(), this.GNM.gotoAndStop("game"), this.nextMenu.gotoAndStop("hide")), this.nextMenu.hide(), Preferences.playTo(this.GMC, "game", this.gameShown), this.inProgress = !0, this.game.fromMenu(this.levelMC, null, Preferences.curLevel, 0)) : ("game" == this.GNM.currentLabel && (Preferences.playTo(this.GNM, "nextLevel", this.nextLevelShown), this.nextMenu.hide(), this.inProgress = !0, 31 == Preferences.curLevel && Preferences.inGameMenu.show31level()), this.game.fromMenu(null,
                    this.nexLevelMC, 0, Preferences.curLevel)), Preferences.bSoundOff || createjs.Sound.play("TVzhuh")), Preferences.inGameMenu.setLevelNum(), this.setProperFon())
        };
        b.prototype.onRestartMiddle = function() {
            Preferences.gameMenuChanger.game.fromMenu(Preferences.gameMenuChanger.levelMC, null, Preferences.curLevel, 0);
            Preferences.playTo(Preferences.gameMenuChanger.restartAnim, "invisible", Preferences.gameMenuChanger.onRestartEnd)
        };
        b.prototype.onRestartEnd = function() {
            Preferences.gameMenuChanger.inProgress = !1;
            Preferences.stopEx(Preferences.gameMenuChanger.restartAnim);
            Preferences.gameMenuChanger.restartAnim.visible = !1
        };
        b.prototype.gameShown = function() {
            Preferences.gameMenuChanger.inProgress = !1
        };
        b.prototype.nextLevelShown = function() {
            Preferences.gameMenuChanger.inProgress = !1;
            Preferences.stopEx(Preferences.gameMenuChanger.GNM);
            Preferences.gameMenuChanger.GNM.gotoAndStop("game");
            Preferences.gameMenuChanger.game.swaplevel(Preferences.gameMenuChanger.levelMC);
            Preferences.gameMenuChanger.nextMenu.visible = !1
        };
        b.prototype.showMenu = function() {
            this.inProgress || (Preferences.inGameMenu.stopRestartEff(),
                Preferences.inGameMenu.stopWalkEffect(), Preferences.lossCount = 0, Preferences.bSoundOff || createjs.Sound.play("TVzhuh"), Preferences.playTo(this.GMC, "menu"), this.mainMenu.setUpButtons(), Preferences.inGameMenu.menuView(), this.nextMenu.hide(), this.setProperFon())
        };
        b.prototype.showNextMenu = function(a) {
            a || (Preferences.levelResults[Preferences.curLevel] = 2, Preferences.saveResults(), Preferences.updateResults());
            !a || Preferences.SHOW_FAIL_MENU ? (this.nextMenu.setState(Preferences.curLevel, a), this.nextMenu.visible = !0) : Preferences.inGameMenu.startRestartEff()
        };
        b.prototype.setProperFon = function(a) {
            void 0 === a && (a = !1);
            a ? this.allFon.gotoAndStop(Preferences.needFonFrame) : Preferences.needFonFrame == this.allFon.totalFrames - 1 ? this.allFon.currentFrame != Preferences.needFonFrame && this.allFon.play() : this.allFon.gotoAndStop(Preferences.needFonFrame)
        };
        return b
    }(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var InGameMenu = function(g) {
    function b() {
        var a = g.call(this) || this;
        a.onAdded(null);
        return a
    }
    __extends(b, g);
    b.prototype.onAdded = function(a) {
        Preferences.inGameMenu = this;
        this.igMenu = new lib.InGameMenu;
        this.addChild(this.igMenu);
        Preferences.prepareMC(this.igMenu);
        this.igMenu.gotoAndStop("menu");
        this.butRestart = this.igMenu.brestart;
        this.setUpButton(this.butRestart, 0);
        this.butRestart.addEventListener("click", this.onRestart);
        this.butMenu = this.igMenu.bmen;
        this.butMenu.addEventListener("click", this.onMenu);
        this.setUpButton(this.butMenu, 0);
        this.butSound = this.igMenu.bsound;
        this.butSound.addEventListener("click", this.onSound);
        a = this.butSound.inner;
        this.restartEffect = this.igMenu.needRestartEffect;
        this.restartEffect.gotoAndStop(0);
        Preferences.bSoundOff ? a.gotoAndStop(1) : a.gotoAndStop(0);
        this.setUpButton(this.butSound, 0);
        this.butMusic = this.igMenu.bmusic;
        this.butMusic.addEventListener("click", this.onMusic);
        a = this.butMusic.inner;
        Preferences.bMusicOff ? a.gotoAndStop(1) : a.gotoAndStop(0);
        this.setUpButton(this.butMusic,
            0);
        this.setUpButton(this.igMenu.lbut, !1);
        this.igMenu.lbut.addEventListener("mousedown", this.onlbut);
        this.igMenu.lbut.addEventListener("pressup", this.onlbutUp);
        this.setUpButton(this.igMenu.ubut, !1);
        this.igMenu.ubut.addEventListener("mousedown", this.onubut);
        this.igMenu.ubut.addEventListener("pressup", this.onubutUp);
        this.setUpButton(this.igMenu.rbut, !1);
        this.igMenu.rbut.addEventListener("mousedown", this.onrbut);
        this.igMenu.rbut.addEventListener("pressup", this.onrbutUp);
        this.setUpButton(this.igMenu.dbut,
            !1);
        this.igMenu.dbut.addEventListener("mousedown", this.ondbut);
        this.igMenu.dbut.addEventListener("pressup", this.ondbutUp);
        0 == createjs.Touch.isSupported() && (this.igMenu.lbut.visible = !1, this.igMenu.ubut.visible = !1, this.igMenu.rbut.visible = !1, this.igMenu.dbut.visible = !1)
    };
    b.prototype.onlbut = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_LEFT;
        Preferences.lvlLink && Preferences.lvlLink.KeyDown(a)
    };
    b.prototype.onubut = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_UP;
        Preferences.lvlLink && Preferences.lvlLink.KeyDown(a)
    };
    b.prototype.onrbut = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_RIGHT;
        Preferences.lvlLink && Preferences.lvlLink.KeyDown(a)
    };
    b.prototype.ondbut = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_DOWN;
        Preferences.lvlLink && Preferences.lvlLink.KeyDown(a)
    };
    b.prototype.onlbutUp = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_LEFT;
        Preferences.lvlLink && Preferences.lvlLink.KeyUp(a)
    };
    b.prototype.onubutUp = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_UP;
        Preferences.lvlLink && Preferences.lvlLink.KeyUp(a)
    };
    b.prototype.onrbutUp = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_RIGHT;
        Preferences.lvlLink && Preferences.lvlLink.KeyUp(a)
    };
    b.prototype.ondbutUp = function() {
        var a = [];
        a.keyCode = Preferences.KEYCODE_DOWN;
        Preferences.lvlLink && Preferences.lvlLink.KeyUp(a)
    };
    b.prototype.setUpButton = function(a, b, d) {
        void 0 === d && (d = !0);
        a && (a.stop(), a.autoReset = !1, a.nm = this, a.mouseChildren = !1, a.param = b, Preferences.setUpButton(a), d && a.cache(-48, -48, 95, 95))
    };
    b.prototype.onMusic = function(a) {
        a.preventDefault();
        a.stopPropagation();
        Preferences.bMusicOff = !Preferences.bMusicOff;
        a = Preferences.inGameMenu.butMusic.inner;
        Preferences.inGameMenu.butMusic.uncache();
        Preferences.bMusicOff ? (a.gotoAndStop(1), SoundController.musicStop()) : (a.gotoAndStop(0), SoundController.musicPlay());
        Preferences.inGameMenu.butMusic.cache(-48, -48, 95, 95)
    };
    b.prototype.onSound = function(a) {
        a.preventDefault();
        a.stopPropagation();
        Preferences.bSoundOff = !Preferences.bSoundOff;
        a = Preferences.inGameMenu.butSound.inner;
        Preferences.inGameMenu.butSound.uncache();
        Preferences.bSoundOff ?
            a.gotoAndStop(1) : a.gotoAndStop(0);
        Preferences.inGameMenu.butSound.cache(-48, -48, 95, 95)
    };
    b.prototype.onMenu = function(a) {
        a.preventDefault();
        a.stopPropagation();
        Preferences.gameMenuChanger.showMenu()
    };
    b.prototype.onRestart = function(a) {
        a.preventDefault();
        a.stopPropagation();
        Preferences.bSoundOff || createjs.Sound.play("TRestart");
        Preferences.gameMenuChanger.showGame(!0)
    };
    b.prototype.startRestartEff = function() {
        Preferences.inGameMenu.restartEffect.play()
    };
    b.prototype.stopRestartEff = function() {
        Preferences.inGameMenu.restartEffect.gotoAndStop(0)
    };
    b.prototype.startWalkEffect = function() {};
    b.prototype.stopWalkEffect = function() {};
    b.prototype.setLevelNum = function() {
        var a = Preferences.inGameMenu.igMenu.levelnum;
        a = a.inner;
        a.cacheCanvas && a.uncache();
        a.gotoAndStop(Preferences.curLevel - 1);
        a.cache(-22, -15, 45, 40)
    };
    b.prototype.gameView = function() {
        Preferences.playTo(Preferences.inGameMenu.igMenu, "game2", this.gameShowed)
    };
    b.prototype.menuView = function() {
        "level31" == Preferences.inGameMenu.igMenu.currentLabel ? Preferences.playTo(Preferences.inGameMenu.igMenu,
            Preferences.inGameMenu.igMenu.totalFrames - 1, this.menuAfter31) : Preferences.playTo(Preferences.inGameMenu.igMenu, "menu")
    };
    b.prototype.show31level = function() {
        Preferences.inGameMenu.igMenu.gotoAndStop("game2");
        Preferences.playTo(Preferences.inGameMenu.igMenu, "level31")
    };
    b.prototype.menuAfter31 = function() {
        Preferences.inGameMenu.igMenu.gotoAndStop("menu")
    };
    b.prototype.gameShowed = function() {
        Preferences.inGameMenu.igMenu.gotoAndStop("game")
    };
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var NextMenu = function(g) {
    function b() {
        var a = g.call(this) || this;
        a.star = null;
        a.inProgress = !1;
        a.reasonOfHide = 0;
        a.isPlaying = !1;
        a.nm = new lib.NextMenu;
        a.menu = a.nm;
        Preferences.prepareMC(a.nm);
        Preferences.nextMenu = a;
        a.addChild(a.nm);
        a.nextBut = a.menu.nBut;
        a.retryBut = a.menu.rBut;
        a.moreBut = a.menu.mrBut;
        a.menuBut = a.menu.mBut;
        a.nextBut && (a.nextBut.cache(-33, -33, 67, 70), Preferences.setUpButton(a.nextBut));
        a.retryBut && (a.retryBut.cache(-33, -33, 67, 70), Preferences.setUpButton(a.retryBut));
        a.moreBut && (a.moreBut.cache(-33,
            -33, 67, 70), Preferences.setUpButton(a.moreBut));
        a.menuBut && (a.menuBut.cache(-33, -33, 67, 70), Preferences.setUpButton(a.menuBut));
        a.nm.instance.cache(-5, -5, 190, 81);
        a.nm.instance_1.cache(-292, -167, 523, 333);
        return a
    }
    __extends(b, g);
    b.prototype.setState = function(a, b) {
        this.needPosition = "show";
        this.bIsFail = b;
        this.reasonOfHide = 0;
        if (!this.inProgress && "show" != this.currentLabel) {
            this.inProgress = !0;
            this.representedLevel = a;
            var c;
            b ? this.menu.gotoAndStop(1) : this.menu.gotoAndStop(0);
            if (c = this.menu.cifry) c.cacheCanvas &&
                c.uncache(), c.gotoAndStop(a - 1), c.cache(-25, -15, 50, 35);
            this.removeEventListener("tick", this.checkForEndHide);
            this.removeEventListener("tick", this.checkForShow);
            this.nextBut && this.nextBut.removeEventListener("click", this.onNext);
            this.retryBut && this.retryBut.removeEventListener("click", this.onRetry);
            this.moreBut && this.moreBut.removeEventListener("click", this.onMore);
            this.menuBut && this.menuBut.removeEventListener("click", this.onMenu);
            this.nextBut && (this.nextBut.cacheCanvas && this.nextBut.uncache(), this.nextBut.gotoAndStop(0),
                b || 29 != this.representedLevel || 0 != Preferences.levelResults[30] ? (this.nextBut.addEventListener("click", this.onNext), this.nextBut.getChildAt(0).gotoAndStop(0)) : this.nextBut.getChildAt(0).gotoAndStop(1), this.nextBut.cache(-33, -33, 67, 70));
            this.retryBut && (this.retryBut.gotoAndStop(0), this.retryBut.addEventListener("click", this.onRetry));
            this.moreBut && (this.moreBut.gotoAndStop(0), this.moreBut.addEventListener("click", this.onMore));
            this.menuBut && (this.menuBut.gotoAndStop(0), this.menuBut.addEventListener("click",
                this.onMenu));
            this.addEventListener("tick", this.checkForShow);
            this.nm.play()
        }
    };
    b.prototype.checkForShow = function(a) {
        "show" == Preferences.nextMenu.nm.currentLabel && (Preferences.nextMenu.removeEventListener("tick", Preferences.nextMenu.checkForShow), Preferences.nextMenu.inProgress = !1, Preferences.nextMenu.star && Preferences.nextMenu.star.play(), Preferences.nextMenu.nm.stop(), "hide" == Preferences.nextMenu.needPosition ? Preferences.nextMenu.hide() : Preferences.bSoundOff || createjs.Sound.play("TPortal_2"))
    };
    b.prototype.onNext =
        function(a) {
            if (Preferences.SPONSOR_MODE || 0 != Preferences.levelResults[Preferences.nextMenu.representedLevel + 1]) parent && parent.cmgGameEvent && parent.cmgGameEvent("start", Preferences.curLevel.toString()), Preferences.nextMenu.needPosition = "hide", Preferences.nextMenu.inProgress && (Preferences.nextMenu.reasonOfHide = 1), Preferences.nextMenu.inProgress || "hide" == Preferences.nextMenu.nm.currentLabel || (Preferences.nextMenu.inProgress = !0, Preferences.nextMenu.nm.play(), Preferences.nextMenu.addEventListener("tick",
                Preferences.nextMenu.checkForEndHide), Preferences.curLevel++, Preferences.gameMenuChanger.showGame())
        };
    b.prototype.onRetry = function(a) {
        Preferences.nextMenu.needPosition = "hide";
        Preferences.nextMenu.inProgress && (Preferences.nextMenu.reasonOfHide = 2);
        Preferences.nextMenu.inProgress || "hide" == Preferences.nextMenu.nm.currentLabel || (Preferences.nextMenu.inProgress = !0, Preferences.nextMenu.nm.play(), Preferences.nextMenu.addEventListener("tick", Preferences.nextMenu.checkForEndHide), Preferences.bSoundOff || createjs.Sound.play("TRestart"),
            Preferences.gameMenuChanger.showGame(!0))
    };
    b.prototype.onMore = function(a) {};
    b.prototype.onMenu = function(a) {
        Preferences.nextMenu.needPosition = "hide";
        Preferences.nextMenu.inProgress && (Preferences.nextMenu.reasonOfHide = 3);
        Preferences.nextMenu.inProgress || "hide" == Preferences.nextMenu.nm.currentLabel || (Preferences.nextMenu.inProgress = !0, Preferences.nextMenu.nm.play(), Preferences.nextMenu.addEventListener("tick", Preferences.nextMenu.checkForEndHide), Preferences.gameMenuChanger.showMenu())
    };
    b.prototype.checkForEndHide =
        function(a) {
            if ("hide" == Preferences.nextMenu.nm.currentLabel)
                if (Preferences.nextMenu.inProgress = !1, Preferences.nextMenu.nm.stop(), Preferences.nextMenu.removeEventListener("tick", Preferences.nextMenu.checkForEndHide), "show" == Preferences.nextMenu.needPosition) Preferences.nextMenu.setState(Preferences.curLevel, Preferences.nextMenu.bIsFail);
                else switch (Preferences.nextMenu.reasonOfHide) {
                    case 1:
                        Preferences.curLevel++;
                        Preferences.gameMenuChanger.showGame();
                        break;
                    case 2:
                        Preferences.gameMenuChanger.showGame(!0);
                        break;
                    case 3:
                        Preferences.gameMenuChanger.showMenu()
                }
        };
    b.prototype.hide = function(a) {
        void 0 === a && (a = !1);
        Preferences.nextMenu.needPosition = "hide";
        a ? (Preferences.nextMenu.nm.gotoAndStop("hide"), Preferences.nextMenu.inProgress = !1) : Preferences.nextMenu.inProgress || "hide" == Preferences.nextMenu.nm.currentLabel || (Preferences.nextMenu.inProgress = !0, Preferences.nextMenu.nm.play(), Preferences.nextMenu.addEventListener("tick", Preferences.nextMenu.checkForEndHide))
    };
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var MainMenu = function(g) {
    function b() {
        var a = g.call(this) || this;
        a.inProgress = !1;
        a.mainmenu = new lib.MainMenu;
        return a
    }
    __extends(b, g);
    b.prototype.unlockAllLevels = function() {
        Preferences.unlockAllLevels();
        this.setUpButtons()
    };
    b.prototype.init = function() {
        Preferences.mainMenu = this;
        this.mainmenu.x = 300;
        this.mainmenu.y = 300;
        this.mainmenu.stop();
        this.autoReset = this.mainmenu.autoReset = !1;
        this.addChild(this.mainmenu);
        var a = this.mainmenu.mmenu;
        Preferences.curLevel = 1;
        Preferences.loadResults();
        this.addEventListener("tick",
            this.onTick);
        this.curList = 0;
        this.lList1 = this.mainmenu.levelslist1;
        this.lList2 = this.mainmenu.levelslist2;
        this.gBut1 = this.lList1.butt;
        this.gBut1.addEventListener("click", this.onLeft);
        this.setUpButton(this.gBut1, 0, !1);
        this.gBut1.cache(-50, -110, 200, 220);
        this.gBut2 = this.lList2.butt;
        this.gBut2.addEventListener("click", this.onRight);
        this.setUpButton(this.gBut2, 0, !1);
        this.gBut2.cache(-105, -80, 210, 160);
        this.setUpButtons();
        this.buttonPlay = a.butPlay;
        this.buttonPlay.autoReset = !1;
        this.buttonPlay.addEventListener("click",
            this.onRight);
        this.setUpButton(this.buttonPlay, 0, !1);
        this.buttonPlay.cache(-64, -44, 128, 88);
        this.onRight(null)
    };
    b.prototype.onTick = function(a) {
        Preferences.mainMenu.mainmenu.currentLabel == Preferences.mainMenu.needFrameName && (Preferences.mainMenu.mainmenu.stop(), Preferences.mainMenu.needFrameName = "")
    };
    b.prototype.setUpButtons = function() {
        var a;
        var b = this.lList1.levelbuttons;
        for (var d = 1; 15 >= d; d++)
            if (a = b["b" + d]) a.uniqNum = d, this.SetUpLevelButton(a), this.setUpButton(a, 0);
        b = this.lList2.levelbuttons;
        for (d =
            1; 15 >= d; d++)
            if (a = b["b" + d]) a.uniqNum = 15 + d, this.SetUpLevelButton(a), this.setUpButton(a, 0)
    };
    b.prototype.setUpButton = function(a, b, d) {
        void 0 === d && (d = !0);
        a && (a.stop(), a.autoReset = !1, a.nm = this, a.mouseChildren = !1, a.param = b, Preferences.setUpButton(a), d && a.cache(-39, -39, 80, 90))
    };
    b.prototype.SetUpLevelButton = function(a) {
        a.autoReset = !1;
        a.inner.autoReset = !1;
        var b = a.inner;
        0 == Preferences.levelResults[a.uniqNum] && (30 == a.uniqNum ? b.gotoAndStop(5) : b.gotoAndStop(2));
        1 == Preferences.levelResults[a.uniqNum] && b.gotoAndStop(1);
        (Preferences.SPONSOR_MODE || 2 == Preferences.levelResults[a.uniqNum]) && b.gotoAndStop(0);
        (Preferences.SPONSOR_MODE || 0 != Preferences.levelResults[a.uniqNum]) && (b = b.num) && b.gotoAndStop(a.uniqNum - 1);
        0 != Preferences.levelResults[a.uniqNum] || Preferences.SPONSOR_MODE ? a.addEventListener("click", this.onLevel) : a.removeEventListener("click", this.onLevel)
    };
    b.prototype.cacheAll = function() {
        this.lList1.cacheCanvas || this.lList1.cache(-291, -122, 630, 348);
        this.lList2.cacheCanvas || this.lList2.cache(-424, -122, 763, 348);
        Preferences.mainMenu.mainmenu.mmenu.cacheCanvas ||
            Preferences.mainMenu.mainmenu.mmenu.cache(-424, -122, 763, 348)
    };
    b.prototype.onRight = function(a) {
        if ("levels2" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.onLeft(a);
        else {
            if ("start" == Preferences.mainMenu.mainmenu.currentLabel) parent && parent.cmgGameEvent && parent.cmgGameEvent("start"), Preferences.mainMenu.needFrameName = "mainmenu";
            else if ("mainmenu" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.needFrameName = "levels1";
            else if ("levels1" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.needFrameName =
                "levels2";
            else if ("levels1right" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.needFrameName = "levels2", Preferences.mainMenu.mainmenu.gotoAndStop("levels1");
            else if ("mainmenuright" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.needFrameName = "levels1", Preferences.mainMenu.mainmenu.gotoAndStop("mainmenu");
            else return;
            Preferences.mainMenu.mainmenu.play();
            Preferences.mainMenu.inProgress = !0;
            Preferences.bSoundOff || createjs.Sound.play("TVzhuh");
            1 == Preferences.mainMenu.curList ?
                Preferences.mainMenu.curList = 2 : 2 == Preferences.mainMenu.curList && (Preferences.mainMenu.curList = 1)
        }
    };
    b.prototype.onLeft = function(a) {
        if ("levels1" == Preferences.mainMenu.mainmenu.currentLabel || "levels1right" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.needFrameName = "mainmenuright";
        else if ("levels2" == Preferences.mainMenu.mainmenu.currentLabel) Preferences.mainMenu.needFrameName = "levels1right";
        else return;
        Preferences.mainMenu.inProgress = !0;
        1 == Preferences.mainMenu.curList ? Preferences.mainMenu.curList =
            0 : 0 == Preferences.mainMenu.curList && (Preferences.mainMenu.curList = 1);
        Preferences.bSoundOff || createjs.Sound.play("TVzhuh");
        "levels1" == Preferences.mainMenu.mainmenu.currentLabel ? Preferences.mainMenu.mainmenu.gotoAndPlay("levels1right") : Preferences.mainMenu.mainmenu.play()
    };
    b.prototype.onLevel = function(a) {
        Preferences.curLevel = a.currentTarget.uniqNum;
        parent && parent.cmgGameEvent && parent.cmgGameEvent("start", Preferences.curLevel.toString());
        Preferences.gameMenuChanger.showGame()
    };
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var Eyes = function(g) {
    function b() {
        return g.call(this) || this
    }
    __extends(b, g);
    b.setLookTo = function(a, b) {
        this.lookTo.x = a;
        this.lookTo.y = b
    };
    b.lookDown = function() {
        this.lookTo.x = this.zr1.x;
        this.lookTo.y = this.zr1.y + 50;
        this.lookTo = this.zr1.localToGlobal(this.lookTo.x, this.lookTo.y)
    };
    b.setRelativeLookTo = function(a, b) {
        this.lookTo.x = this.origPoint.x;
        this.lookTo.y = this.origPoint.y;
        this.lookTo = this.zr1.localToGlobal(this.lookTo.x, this.lookTo.y);
        this.lookTo.x += a;
        this.lookTo.y += b
    };
    b.setEyes = function(a) {
        (this.needOpen =
            a) ? ("end" != this.ey1.currentLabel && Preferences.playTo(this.ey1, "end"), "end" != this.ey2.currentLabel && Preferences.playTo(this.ey2, "end")) : ("start" != this.ey1.currentLabel && Preferences.reversePlayTo(this.ey1, "start"), "start" != this.ey2.currentLabel && Preferences.reversePlayTo(this.ey2, "start"))
    };
    b.setZr = function(a) {
        if (-1 != b.lookTo.x) {
            b.zrCurPos = this.zr1.globalToLocal(b.lookTo.x, b.lookTo.y);
            b.zrCurPos.x -= b.GEOM_X;
            b.zrCurPos.y -= b.GEOM_Y;
            var c = Math.atan2(b.zrCurPos.y, b.zrCurPos.x);
            var d = Math.cos(c) * b.MAX_ZRACH_OFFSET;
            c = Math.sin(c) * b.MAX_ZRACH_OFFSET
        } else d = b.origPoint.x, c = b.origPoint.y;
        d > a.x && (a.x = Preferences.ChangeNumberWithCap(a.x, b.ZRACH_SPEED, d));
        d < a.x && (a.x = Preferences.ChangeNumberWithCap(a.x, -b.ZRACH_SPEED, d));
        c > a.y && (a.y = Preferences.ChangeNumberWithCap(a.y, b.ZRACH_SPEED, c));
        c < a.y && (a.y = Preferences.ChangeNumberWithCap(a.y, -b.ZRACH_SPEED, c))
    };
    b.setMc = function(a) {
        this.onRemoved(null);
        this.ey1 = a.y1;
        this.ey2 = a.y2;
        this.ey1.autoReset = !1;
        this.ey2.autoReset = !1;
        this.zr1 = this.ey1.zr;
        this.zr2 = this.ey2.zr;
        this.zr1.autoReset = !1;
        this.zr2.autoReset = !1;
        this.origPoint.x = this.zr1.x;
        this.origPoint.y = this.zr1.y;
        this.ey1.gotoAndStop(this.needFrame);
        this.ey2.gotoAndStop(this.needFrame);
        this.setEyes(this.needOpen);
        this.zrCurPos.x != 2 * this.MAX_ZRACH_OFFSET && (this.zr1.x = this.zrCurPos.x, this.zr1.y = this.zrCurPos.y, this.zr2.x = this.zrCurPos.x, this.zr2.y = this.zrCurPos.y);
        this.setZr(this.zr1);
        this.setZr(this.zr2);
        this.isDead ? (this.zr1.gotoAndStop(1), this.zr2.gotoAndStop(1)) : (this.zr1.gotoAndStop(0), this.zr2.gotoAndStop(0));
        0 == this.mc.hasEventListener("tick") &&
            this.mc.addEventListener("tick", this.onFrame)
    };
    b.onFrame = function(a) {
        b.setZr(b.zr1);
        b.setZr(b.zr2)
    };
    b.onRemoved = function(a) {
        this.ey1 && (this.needFrame = this.ey1.currentFrame, this.ey1.stop(), this.ey2.stop(), this.zrCurPos.x = this.zr1.x, this.zrCurPos.y = this.zr1.y)
    };
    b.setDead = function(a) {
        (this.isDead = a) ? (this.zr1.gotoAndStop(1), this.zr2.gotoAndStop(1)) : (this.zr1.gotoAndStop(0), this.zr2.gotoAndStop(0))
    };
    b.MAX_ZRACH_OFFSET = 3.5;
    b.ZRACH_SPEED = 1;
    b.origPoint = new createjs.Point;
    b.lookTo = new createjs.Point(-1, -1);
    b.zrCurPos = new createjs.Point(2 * b.MAX_ZRACH_OFFSET, 2 * b.MAX_ZRACH_OFFSET);
    b.needFrame = 1;
    b.needOpen = !1;
    b.mc = new createjs.Container;
    b.isDead = !1;
    b.GEOM_X = 1.45;
    b.GEOM_Y = -.5;
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var Game = function(g) {
    function b() {
        var a = g.call(this) || this;
        a.curLevelNum = 0;
        a.nextLevelNum = 0;
        a.onAdded(null);
        return a
    }
    __extends(b, g);
    b.prototype.startLevel = function() {
        this.levelCur && (this.levelCur.parent.removeChild(this.levelCur), this.levelCur.deinit(), this.levelCur = null);
        this.levelNext && (this.levelNext.parent.removeChild(this.levelNext), this.levelNext.deinit(), this.levelNext = null);
        this.levelLeyerCur && (this.levelCur = new Level(this.curLevelNum), this.levelLeyerCur.addChild(this.levelCur), Preferences.lvlLink =
            this.levelCur, this.levelCur.init());
        this.levelLeyerNext && (this.levelNext = new Level(this.nextLevelNum), this.levelLeyerNext.addChild(this.levelNext), this.levelNext.init(), Preferences.lvlLink = this.levelNext)
    };
    b.prototype.endLevel = function(a) {
        a || Preferences.gameMenuChanger.showNextMenu(!a)
    };
    b.prototype.onAdded = function(a) {};
    b.prototype.onRemove = function(a) {};
    b.prototype.restartLevel = function() {
        parent && parent.cmgGameEvent && parent.cmgGameEvent("replay", Preferences.curLevel.toString());
        Preferences.bSoundOff ||
            createjs.Sound.play("TRestart");
        Preferences.gameMenuChanger.showGame(!0)
    };
    b.prototype.fromMenu = function(a, b, d, f) {
        this.curLevelNum = d;
        this.nextLevelNum = f;
        this.levelLeyerCur = a;
        this.levelLeyerNext = b;
        this.startLevel()
    };
    b.prototype.swaplevel = function(a) {
        this.levelNext && (this.levelCur && (this.levelCur.parent.removeChild(this.levelCur), this.levelCur.deinit(), this.levelCur = null), this.levelCur = this.levelNext, a.addChild(this.levelCur), this.levelNext = null, this.levelLeyerCur = a, this.levelLeyerNext = null)
    };
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var Dumper = function() {
        function g() {}
        g.dump = function(b, a) {
            void 0 === a && (a = !1);
            var c = !1,
                d = !1;
            if (b.cacheCanvas || a) c = !0;
            for (a = 0; a < b.numChildren; a++) b.children[a].children ? this.dump(b.children[a], c) || (d = !0) : b.children[a].visible && (d = !0);
            if (d && !c && b.visible) {
                c = b.parent;
                d = b.visible;
                a = b.constructor.name ? b.constructor.name : "unknown";
                a += b.name ? "(" + b.name + ")" : "";
                for (a += "."; c;) c.visible || (d = !1), a += c.constructor.name, a += c.name ? "(" + c.name + ")" : "", a += ".", c = c.parent;
                d && console.log(a)
            }
            return !0
        };
        return g
    }(),
    Level = function(g) {
        function b(a) {
            var b =
                g.call(this) || this;
            b.isSnakeOnTale = !0;
            b.levels = [];
            b.bFon = new createjs.Container;
            b.fFon = new createjs.Container;
            b.fFonItems = new createjs.Container;
            b.mFon = new createjs.Container;
            b.mFonInner = new createjs.Container;
            b.lvlParts = [];
            b.goalsTaken = 0;
            b.moveSnake = 0;
            b.nSkipFrames = 0;
            b.blockActions = !1;
            b.nButtonPressCountL = 0;
            b.nButtonPressCountR = 0;
            b.nButtonPressCountU = 0;
            b.nButtonPressCountD = 0;
            b.wnd = window;
            b.lvlNum = a;
            return b
        }
        __extends(b, g);
        b.prototype.init = function() {
            if (31 == this.lvlNum) this.lvl31 = new Win31, this.lvl31.stop(),
                this.lvl31.init(), this.addChild(this.lvl31);
            else {
                var a = Preferences.getLevelConfigFromXml(this.lvlNum);
                if (!a) throw Error("\u0423\u0440\u043e\u0432\u0435\u043d\u044c " + this.lvlNum + " \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d");
                var b;
                this.snake && this.removeChild(this.snake);
                this.snake = new Snake(this, !1);
                this.bFon.name = "bFon";
                this.mFon.name = "mFon";
                this.fFonItems.name = "fFonItems";
                this.fFon.name = "fFon";
                this.addChild(this.bFon);
                this.addChild(this.mFon);
                this.addChild(this.fFonItems);
                this.addChild(this.fFon);
                var d;
                lib["bLevel" + this.lvlNum.toString()] && (d = b = new(lib["bLevel" + this.lvlNum.toString()]), d.cache(0, 0, 800, 600), this.bFon.addChild(d));
                for (var f = Preferences.CELL_NUM_X - 1; 0 <= f; f--)
                    for (var e = Preferences.CELL_NUM_Y - 1; 0 <= e; e--) a[f][e] && (b = LevelPart.Create(f, e, a[f][e], !1), this.lvlParts.push(b), a[f][e] < LevelPart.SNAKE_BODY_END ? this.snake.addPart(b) : (b.mInner && this.mFon.addChild(b.mInner), b.bInner && this.mFon.addChild(b.bInner), b.fInner && this.fFonItems.addChild(b.fInner)));
                lib["fLevel" + this.lvlNum.toString()] &&
                    (d = b = new(lib["fLevel" + this.lvlNum.toString()]), d.cache(0, 0, 800, 600), this.fFon.addChild(d));
                lib["mLevel" + this.lvlNum.toString()] && (this.mFonInner = b = new(lib["mLevel" + this.lvlNum.toString()]), d && (this.mFonInner.cache(0, 0, 800, 600), this.mFon.addChild(this.mFonInner)));
                this.addChildAt(this.snake, this.getChildIndex(this.fFon));
                this.snake.build(!1);
                this.snake.SetLastMoveDir();
                this.snake.checkHeadForWallAhead(!1) ? SnakePart.setNextHeadAnim(SnakePart.headHit, !1, !0, !0) : this.snake.checkHeadForFruitAround(!0,
                    !1, !1);
                this.addEventListener("tick", this.onFrame);
                if (this.wnd.parent)
                    for (; this.wnd.parent != this.wnd;) this.wnd = this.wnd.parent;
                this.wnd.document.onkeydown = this.KeyDown;
                this.wnd.document.onkeyup = this.KeyUp;
                Eyes.setDead(!1)
            }
        };
        b.prototype.KeyUp = function(a) {
            var b = Preferences.lvlLink;
            switch (a.keyCode) {
                case Preferences.KEYCODE_R:
                    0 == Preferences.nextMenu.inProgress && Preferences.gameMenuChanger.showGame(!0)
            }
            switch (a.keyCode) {
                case Preferences.KEYCODE_LEFT:
                case Preferences.KEYCODE_A:
                    b.moveSnake &= ~Snake.MOVE_LEFT;
                    b.nButtonPressCountL = 0;
                    break;
                case Preferences.KEYCODE_RIGHT:
                case Preferences.KEYCODE_D:
                    b.moveSnake &= ~Snake.MOVE_RIGHT;
                    b.nButtonPressCountR = 0;
                    break;
                case Preferences.KEYCODE_UP:
                case Preferences.KEYCODE_W:
                    b.moveSnake &= ~Snake.MOVE_UP;
                    b.nButtonPressCountU = 0;
                    break;
                case Preferences.KEYCODE_DOWN:
                case Preferences.KEYCODE_S:
                    b.moveSnake &= ~Snake.MOVE_DOWN, b.nButtonPressCountD = 0
            }
        };
        b.prototype.KeyDown = function(a) {
            var b = Preferences.lvlLink;
            switch (a.keyCode) {
                case Preferences.KEYCODE_LEFT:
                case Preferences.KEYCODE_A:
                    b.moveSnake =
                        Snake.MOVE_LEFT;
                    b.nButtonPressCountL++;
                    break;
                case Preferences.KEYCODE_RIGHT:
                case Preferences.KEYCODE_D:
                    b.moveSnake = Snake.MOVE_RIGHT;
                    b.nButtonPressCountR++;
                    break;
                case Preferences.KEYCODE_UP:
                case Preferences.KEYCODE_W:
                    b.moveSnake = Snake.MOVE_UP;
                    b.nButtonPressCountU++;
                    break;
                case Preferences.KEYCODE_DOWN:
                case Preferences.KEYCODE_S:
                    b.moveSnake = Snake.MOVE_DOWN, b.nButtonPressCountD++
            }
            a = a || b.wnd.event;
            a.preventDefault && a.preventDefault();
            a.returnValue = !1
        };
        b.prototype.onFrame = function(a) {
            a = Preferences.CELL_NUM_Y *
                Preferences.CELL_SIZE;
            var b = Preferences.CELL_NUM_Y * Preferences.CELL_SIZE,
                d = 3,
                f = null,
                e = Preferences.lvlLink,
                g = !1,
                h = Preferences.CELL_NUM_Y * Preferences.CELL_SIZE;
            if (!e.blockActions) {
                e.isSnakeOnTale = !0;
                for (var m = 0; m < e.lvlParts.length; m++)
                    if (!(e.lvlParts[m].type >= LevelPart.SNAKE_BODY_END && e.lvlParts[m].type != LevelPart.BLOCK_MOVABLE)) {
                        var k = e.lvlParts[m];
                        var n = Preferences.CELL_NUM_Y + 1;
                        if (k.type == LevelPart.BLOCK_MOVABLE) {
                            if (!k.onGameTick()) {
                                e.lvlParts.splice(m, 1);
                                m--;
                                (void 0).removeFromLvl();
                                continue
                            }
                            if (k.isMoving ||
                                k.isFalling) g = !0
                        }
                        for (var l = 0; l < e.lvlParts.length; l++) {
                            if (k.type == LevelPart.SNAKE_BODY_START)
                                if (e.lvlParts[l].type == LevelPart.BLOCK_GOAL) {
                                    var p = Math.sqrt(Math.pow(Math.abs(e.lvlParts[l].i - k.i), 2) + Math.pow(Math.abs(e.lvlParts[l].j - k.j), 2));
                                    if (d > p) {
                                        d = p;
                                        var q = e.lvlParts[l]
                                    }
                                } else e.lvlParts[l].type == LevelPart.BLOCK_SPIKES && 1 == Math.abs(e.lvlParts[l].i - k.i) + Math.abs(e.lvlParts[l].j - k.j) && (f = e.lvlParts[l]);
                            if (k.type == LevelPart.BLOCK_MOVABLE) {
                                if (!(e.lvlParts[l].type == LevelPart.BLOCK_SPIKES || e.lvlParts[l].j <=
                                        k.j)) {
                                    if (e.snake.bSnakeMoving && e.lvlParts[l].type < LevelPart.SNAKE_BODY_END && e.lvlParts[l].nextI == k.i && e.lvlParts[l].nextJ == k.j + 1) {
                                        n = k.j;
                                        break
                                    }
                                    e.lvlParts[l].i == k.i && n > e.lvlParts[l].j - 1 && (n = e.lvlParts[l].j - 1)
                                }
                            } else e.lvlParts[l].i != k.i || e.lvlParts[l].type < LevelPart.SNAKE_BODY_END || (k.type == LevelPart.SNAKE_BODY_START && b > (e.lvlParts[l].j - k.j - 1) * Preferences.CELL_SIZE && (b = (e.lvlParts[l].j - k.j - 1) * Preferences.CELL_SIZE), k.j < e.lvlParts[l].j && (e.lvlParts[l].type == LevelPart.BLOCK_SPIKES ? h >= (e.lvlParts[l].j -
                                k.j - 1) * Preferences.CELL_SIZE && (h = (e.lvlParts[l].j - k.j - 1) * Preferences.CELL_SIZE) : a >= (e.lvlParts[l].j - k.j - 1) * Preferences.CELL_SIZE && (a = (e.lvlParts[l].j - k.j - 1) * Preferences.CELL_SIZE)), k.j + 1 != e.lvlParts[l].j || e.snake.isTail(k) || (e.isSnakeOnTale = !1))
                        }
                        k.type == LevelPart.BLOCK_MOVABLE && n != k.j && (k.fall(n), g = !0)
                    } a && (h != Preferences.CELL_NUM_Y * Preferences.CELL_SIZE && (0 == h && (e.snake.onSpikes(), a = h + Preferences.CELL_SIZE), h != Preferences.CELL_NUM_Y * Preferences.CELL_SIZE && h < a && (e.snake.onSpikes(), a = h + Preferences.CELL_SIZE)),
                    e.snake.startFall(a));
                2.82842712474619 >= d ? (Eyes.setLookTo(q.x + 25, q.y + 25), Eyes.setEyes(!0)) : f ? (Eyes.setLookTo(f.x + 25, f.y + 25), Eyes.setEyes(!0)) : (Eyes.setLookTo(-1, -1), Eyes.setEyes(!1));
                if (0 == e.nSkipFrames) {
                    if (e.moveSnake) switch (e.nSkipFrames = Preferences.STEP_TIMEOUT, e.snake.move(e.moveSnake, e.isSnakeOnTale), e.moveSnake) {
                        case e.KEYCODE_LEFT:
                            2 <= e.nButtonPressCountL && (e.moveSnake &= ~Snake.MOVE_LEFT);
                            break;
                        case e.KEYCODE_RIGHT:
                            2 <= e.nButtonPressCountR && (e.moveSnake &= ~Snake.MOVE_RIGHT);
                            break;
                        case e.KEYCODE_UP:
                            2 <=
                                e.nButtonPressCountU && (e.moveSnake &= ~Snake.MOVE_UP);
                            break;
                        case e.KEYCODE_DOWN:
                            2 <= e.nButtonPressCountD && (e.moveSnake &= ~Snake.MOVE_DOWN)
                    }
                } else e.snake.bSnakeMoving || e.snake.bSnakeJumping || e.snake.bSnakeFalling || e.nSkipFrames--;
                g || e.snake.bSnakeMoving || e.snake.bSnakeFalling || e.snake.bSnakeJumping || e.checkForNoMove();
                e.snake.checkFall();
                e.snake.checkMove()
            }
        };
        b.prototype.checkForNoMove = function() {
            var a = 4,
                b = this.snake.snakeParts[0].i,
                d = this.snake.snakeParts[0].j,
                f = !1;
            this.snake.bIsSnakeVertical && this.isSnakeOnTale &&
                (f = !0, a--);
            this.lvlParts.forEach(function(c, g, h) {
                c.type != LevelPart.BLOCK_SPIKES && c.type != LevelPart.BLOCK_MOVABLE && c.type != LevelPart.BLOCK_GOAL && c.type != LevelPart.BLOCK_END && (f && 0 == b - c.i && 1 == d - c.j || 1 != Math.abs(c.i - b) && 1 != Math.abs(c.j - d) || 0 != Math.abs(c.i - b) && 0 != Math.abs(c.j - d) || a--)
            });
            0 == a && this.fail(!1)
        };
        b.prototype.deinit = function() {
            this.lvl31 && this.lvl31.deinit();
            this.removeEventListener("tick", this.onFrame);
            this.wnd.document.onkeydown = null;
            this.wnd.document.onkeyup = null
        };
        b.prototype.getBlockType =
            function(a, b) {
                for (var c = 0, f = this.lvlParts; c < f.length; c++) {
                    var e = f[c];
                    if (e.i == a && e.j == b) return e.type
                }
                return 0
            };
        b.prototype.getBlock = function(a, b) {
            for (var c = 0, f = this.lvlParts; c < f.length; c++) {
                var e = f[c];
                if (e.i == a && e.j == b) return e
            }
            return null
        };
        b.prototype.addPart = function(a) {
            this.lvlParts.push(a)
        };
        b.prototype.removeGoal = function(a, b) {
            for (var c = 0; c < this.lvlParts.length; c++)
                if (this.lvlParts[c].type == LevelPart.BLOCK_GOAL && this.lvlParts[c].i == a && this.lvlParts[c].j == b) {
                    this.lvlParts[c].removeFromLvl();
                    this.lvlParts.splice(c,
                        1);
                    this.goalsTaken++;
                    break
                }
        };
        b.prototype.win = function() {
            Preferences.inGameMenu.stopWalkEffect();
            Preferences.lossCount = 0;
            this.blockActions = !0;
            Preferences.gameLink.endLevel(!0)
        };
        b.prototype.fail = function(a) {
            void 0 === a && (a = !0);
            a && Eyes.setDead(!0);
            this.blockActions = !0;
            Preferences.gameLink.endLevel(!1)
        };
        b.prototype.moveMovable = function(a, b, d) {
            var c = b,
                e = d;
            switch (a) {
                case Snake.MOVE_LEFT:
                    c--;
                    break;
                case Snake.MOVE_RIGHT:
                    c++;
                    break;
                case Snake.MOVE_UP:
                    e--;
                    break;
                case Snake.MOVE_DOWN:
                    e++
            }
            if ((a = this.getBlock(b,
                    d)) && (a.isFalling || a.isMoving)) return !1;
            a = this.getBlock(c, e);
            if (null != a && 0 != a.type && a.type != LevelPart.BLOCK_SPIKES) return !1;
            for (var g = 0, h = this.lvlParts; g < h.length; g++) {
                var m = h[g];
                if (m.i == b && m.j == d && m.type == LevelPart.BLOCK_MOVABLE) {
                    a = m;
                    break
                }
            }
            a.move(c, e);
            return !0
        };
        b.cellToCoord = function(a, b) {
            return new createjs.Point(Preferences.FIRST_CELL_OFFSET_X + a * Preferences.CELL_SIZE, Preferences.FIRST_CELL_OFFSET_Y + b * Preferences.CELL_SIZE)
        };
        b.getCellRect = function(a, b) {
            return new createjs.Rectangle(Preferences.FIRST_CELL_OFFSET_X +
                a * Preferences.CELL_SIZE, Preferences.FIRST_CELL_OFFSET_Y + b * Preferences.CELL_SIZE, Preferences.CELL_SIZE, Preferences.CELL_SIZE)
        };
        b.coordToCell = function(a, b) {
            a = new createjs.Point(Math.floor((a - Preferences.FIRST_CELL_OFFSET_X) / Preferences.CELL_SIZE), Math.floor((b - Preferences.FIRST_CELL_OFFSET_Y) / Preferences.CELL_SIZE));
            if (a.x >= Preferences.CELL_NUM_X || a.y >= Preferences.CELL_NUM_Y || 0 > a.x || 0 > a.y) a.x = -1, a.y = -1;
            return a
        };
        b.prototype.isGoalAround = function(a, b) {
            for (var c = 0; c < this.lvlParts.length; c++)
                for (var f = -1; 1 >= f; f++)
                    for (var e = -1; 1 >= e; e++)
                        if (0 != Math.abs(f) - Math.abs(e) && this.lvlParts[c].type == LevelPart.BLOCK_GOAL && this.lvlParts[c].i + f == a && this.lvlParts[c].j + e == b) return !0;
            return !1
        };
        b.prototype.needMovingOn = function(a, b, d) {
            a = 0;
            var c = !1;
            if (0 > b || 0 > d || b >= Preferences.CELL_NUM_X || d >= Preferences.CELL_NUM_Y) return LevelPart.BLOCK_NORMAL;
            for (var e = 0, g = this.lvlParts; e < g.length; e++) {
                var h = g[e];
                if (h.i == b && h.j == d)
                    if (h.type == LevelPart.BLOCK_SPIKES)
                        if (c = !0, a) {
                            a = LevelPart.BLOCK_ON_SPYKES;
                            break
                        } else a = LevelPart.BLOCK_SPIKES;
                else if (0 != h.type) {
                    if (c) {
                        a = LevelPart.BLOCK_ON_SPYKES;
                        break
                    }
                    a = h.type
                }
            }
            return a
        };
        b.prototype.changeZForMovable = function(a, b) {
            if (b) this.mFon.getChildIndex(this.mFonInner) > this.mFon.getChildIndex(a.bInner) && this.mFon.setChildIndex(a.bInner, this.mFon.numChildren - 1), this.mFon.getChildIndex(this.mFonInner) < this.mFon.getChildIndex(a.mInner) && this.mFon.setChildIndex(a.mInner, 0);
            else {
                this.mFon.getChildIndex(this.mFonInner) < this.mFon.getChildIndex(a.bInner) && this.mFon.setChildIndex(this.mFonInner, this.mFon.numChildren -
                    1);
                this.Rearrange(a);
                b = this.mFon.getChildIndex(a.mInner);
                for (var c = 0; c < this.lvlParts.length; c++)
                    if (null != this.lvlParts[c] && this.lvlParts[c].mInner && this.lvlParts[c] != a) {
                        var f = this.mFon.getChildIndex(this.lvlParts[c].mInner);
                        (a.i < this.lvlParts[c].i && b < f || a.i > this.lvlParts[c].i && b > f) && this.mFon.setChildIndex(a.mInner, f);
                        null != this.lvlParts[c].bInner && (f = this.mFon.getChildIndex(this.lvlParts[c].bInner), (a.i < this.lvlParts[c].i && b < f || a.i > this.lvlParts[c].i && b > f) && this.mFon.setChildIndex(a.mInner, f))
                    } b =
                    this.mFon.getChildIndex(a.bInner);
                for (c = 0; c < this.lvlParts.length; c++) null != this.lvlParts[c] && null != this.lvlParts[c].bInner && this.lvlParts[c] != a && (f = this.mFon.getChildIndex(this.lvlParts[c].bInner), (a.i < this.lvlParts[c].i && b < f || a.i > this.lvlParts[c].i && b > f) && this.mFon.setChildIndex(a.bInner, f), null != this.lvlParts[c].mInner && (f = this.mFon.getChildIndex(this.lvlParts[c].mInner), (a.i < this.lvlParts[c].i && b < f || a.i > this.lvlParts[c].i && b > f) && this.mFon.setChildIndex(a.bInner, f)))
            }
        };
        b.prototype.Rearrange = function(a) {
            var b =
                this.mFon.getChildIndex(a.mInner);
            for (var d = 0; d < this.lvlParts.length; d++)
                if (null != this.lvlParts[d] && null != this.lvlParts[d].mInner && this.lvlParts[d].i == a.i) {
                    var f = this.mFon.getChildIndex(this.lvlParts[d].mInner);
                    (a.j < this.lvlParts[d].j && b < f || a.j > this.lvlParts[d].j && b > f) && this.mFon.setChildIndex(a.mInner, f);
                    null != this.lvlParts[d].bInner && (f = this.mFon.getChildIndex(this.lvlParts[d].bInner), (a.j < this.lvlParts[d].j && b < f || a.j > this.lvlParts[d].j && b > f) && this.mFon.setChildIndex(a.mInner, f))
                } b = this.mFon.getChildIndex(a.bInner);
            for (d = 0; d < this.lvlParts.length; d++) null != this.lvlParts[d] && null != this.lvlParts[d].bInner && this.lvlParts[d].i == a.i && (f = this.mFon.getChildIndex(this.lvlParts[d].bInner), (a.j < this.lvlParts[d].j && b < f || a.j > this.lvlParts[d].j && b > f) && this.mFon.setChildIndex(a.bInner, f), null != this.lvlParts[d].mInner && (f = this.mFon.getChildIndex(this.lvlParts[d].mInner), (a.j < this.lvlParts[d].j && b < f || a.j > this.lvlParts[d].j && b > f) && this.mFon.setChildIndex(a.bInner, f)))
        };
        return b
    }(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var LevelPart = function(g) {
    function b(a, c, d, f) {
        var e = g.call(this) || this;
        e.i = -1;
        e.j = -1;
        e.type = 0;
        e.isMoving = !1;
        e.isFalling = !1;
        e.bInner = null;
        e.fInner = null;
        e.mInner = null;
        e.needPlayFall = !1;
        e.i = a;
        e.j = c;
        e.type = d;
        c = Level.getCellRect(a, c);
        e.x = c.x;
        e.y = c.y;
        switch (d) {
            case b.SNAKE_BODY_START:
                return;
            case b.BLOCK_NORMAL:
                e.fInner = f ? new lib.BlockNormal : new createjs.MovieClip;
                break;
            case b.BLOCK_MOVABLE:
                e.fInner = new lib.fBlockMovable;
                e.fInner.cache(5, 5, 45, 45);
                e.bInner = new lib.bBlockMovable;
                e.bInner.cache(-10, 0, 15, 50);
                e.mInner = new lib.mBox;
                e.mInner.cache(-10, -10, 60, 60);
                break;
            case b.BLOCK_SPIKES:
                e.fInner = new createjs.MovieClip;
                break;
            case b.BLOCK_GOAL:
                e.bInner = new lib.bBlockGoal;
                e.bInner.gotoAndStop(0);
                e.bInner.getChildAt(0).cache(-5, -20.5, 10, 41);
                e.fInner = new lib.fBlockGoal;
                e.fInner.gotoAndStop(0);
                e.fInner.getChildAt(0).cache(-25, -25, 50, 50);
                e.mInner = new lib.mFrukt;
                e.mInner.gotoAndStop(0);
                for (a = 0; a < e.mInner.numChildren; a++) e.mInner.getChildAt(a).cache(-29, -25, 60, 60);
                break;
            case b.BLOCK_END:
                e.bInner = new lib.bBlockEnd;
                e.fInner = new lib.fBlockEnd;
                e.fInner.gotoAndPlay(0);
                e.fInner.inner.inner.play();
                break;
            default:
                return
        }
        e.bInner && (Preferences.prepareMC(e.bInner), e.bInner.x = c.x, e.bInner.y = c.y, e.bInner.name = "bpart" + d);
        e.mInner && (Preferences.prepareMC(e.mInner), e.mInner.x = c.x, e.mInner.y = c.y, e.mInner.name = "mpart" + d);
        Preferences.prepareMC(e.fInner);
        d == b.BLOCK_END && (e.fInner.play(), e.fInner.gotoAndPlay(0), e.fInner.inner.inner.play());
        e.fInner.x = c.x;
        e.fInner.y = c.y;
        e.fInner.name = "fpart" + d;
        return e
    }
    __extends(b, g);
    b.Create =
        function(a, c, d, f) {
            void 0 === f && (f = !0);
            return d < b.SNAKE_BODY_END ? (f = b.savedSnakeParts[d], f.setParams(a, c, d, !1), f) : new b(a, c, d, f)
        };
    b.prototype.removeFromLvl = function() {
        this.type < b.SNAKE_BODY_END || (this.type == b.BLOCK_GOAL ? (this.fInner && Preferences.playToEndThenRemove(this.fInner), this.bInner && Preferences.playToEndThenRemove(this.bInner), this.mInner && Preferences.playToEndThenRemove(this.mInner)) : (this.bInner && this.bInner.parent.removeChild(this.bInner), this.fInner && this.fInner.parent.removeChild(this.fInner),
            this.mInner && this.mInner.parent && this.mInner.parent.removeChild(this.mInner)))
    };
    b.prototype.playAll = function() {
        this.fInner && this.fInner.play();
        this.bInner && this.bInner.play();
        this.mInner && this.mInner.play()
    };
    b.prototype.onGameTick = function() {
        !this.isFalling && this.needPlayFall && (this.needPlayFall = !1, Preferences.bSoundOff || createjs.Sound.play("RockFall"));
        if (this.isMoving && !createjs.Tween.hasActiveTweens(this.fInner)) {
            if (this.isMoving = !1, this.fInner.x < 2 * -Preferences.CELL_SIZE || this.fInner.x > 800 + 2 * Preferences.CELL_SIZE ||
                this.fInner.y < 2 * -Preferences.CELL_SIZE || this.fInner.y > 600 + 2 * Preferences.CELL_SIZE) return this.fInner && (this.fInner.visible = !1), this.bInner && (this.bInner.visible = !1), this.mInner && (this.mInner.visible = !1), !1
        } else this.isFalling && (this.needPlayFall = !1, this.bInner && (this.bInner.y = Preferences.ChangeNumberWithCap(this.bInner.y, this.m_nCurSpeed, this.m_nFallTo)), this.fInner && (this.fInner.y = Preferences.ChangeNumberWithCap(this.fInner.y, this.m_nCurSpeed, this.m_nFallTo)), this.mInner && (this.mInner.y = Preferences.ChangeNumberWithCap(this.mInner.y,
            this.m_nCurSpeed, this.m_nFallTo)), this.m_nCurSpeed += Preferences.SNAKE_FALL_ACELERATION, this.fInner.y == this.m_nFallTo && (this.needPlayFall = !0, this.isFalling = !1, Preferences.lvlLink && Preferences.lvlLink.Rearrange(this)), this.fInner.x < 2 * -Preferences.CELL_SIZE || this.fInner.x > 800 + 2 * Preferences.CELL_SIZE || this.fInner.y < 2 * -Preferences.CELL_SIZE || this.fInner.y > 600 + 2 * Preferences.CELL_SIZE) && (this.needPlayFall && (Preferences.bSoundOff || createjs.Sound.play("RockFall")), this.needPlayFall = !1, this.fInner && (this.fInner.visible = !1), this.bInner && (this.bInner.visible = !1), this.mInner && (this.mInner.visible = !1));
        return !0
    };
    b.prototype.move = function(a, b) {
        if (!(this.isMoving && createjs.Tween.hasActiveTweens(this.fInner) || this.isFalling)) {
            if (1 < Math.abs(a - this.i) || 1 < Math.abs(b - this.j) || 1 != Math.abs(a - this.i) && 1 != Math.abs(b - this.j)) throw Error("\u041f\u043e\u043f\u044b\u0442\u043a\u0430 \u0441\u0434\u0432\u0438\u043d\u0443\u0442\u044c \u0431\u043b\u043e\u043a \u043d\u0430 \u043d\u0435\u0441\u0432\u044f\u0437\u0430\u043d\u043d\u0443\u044e \u043a\u043b\u0435\u0442\u043a\u0443 di:" +
                (a - this.i) + " dj: " + (b - this.j));
            this.bInner && (createjs.Tween.get(this.bInner, {
                override: !0,
                useTicks: !0,
                onChange: this.positionChanged,
                onComplete: this.moveComplete
            }).to({
                x: this.bInner.x + (a - this.i) * Preferences.CELL_SIZE,
                y: this.bInner.y + (b - this.j) * Preferences.CELL_SIZE
            }, 9), this.m_TweeningFrames = 0);
            this.mInner && createjs.Tween.get(this.mInner, {
                override: !0,
                useTicks: !0
            }).to({
                x: this.mInner.x + (a - this.i) * Preferences.CELL_SIZE,
                y: this.mInner.y + (b - this.j) * Preferences.CELL_SIZE
            }, 9);
            createjs.Tween.get(this.fInner, {
                override: !0,
                useTicks: !0
            }).to({
                x: this.fInner.x + (a - this.i) * Preferences.CELL_SIZE,
                y: this.fInner.y + (b - this.j) * Preferences.CELL_SIZE
            }, 9);
            this.i = a;
            this.j = b;
            this.isMoving = !0;
            Preferences.lvlLink && Preferences.lvlLink.Rearrange(this)
        }
    };
    b.prototype.moveComplete = function(a) {
        Preferences.lvlLink && Preferences.lvlLink.changeZForMovable(a.currentTarget.target.parent, !1)
    };
    b.prototype.positionChanged = function(a) {
        this.m_TweeningFrames++;
        5 == this.m_TweeningFrames && this.bInner.x < this.i * Preferences.CELL_SIZE && Preferences.lvlLink &&
            Preferences.lvlLink.changeZForMovable(a.currentTarget.target.parent, !0)
    };
    b.prototype.fall = function(a) {
        this.isMoving || this.isFalling || (this.isFalling = !0, this.m_nCurSpeed = Preferences.SNAKE_FALL_START_SPEED, this.m_nFallTo = Level.cellToCoord(0, a).y, this.j = a)
    };
    b.SNAKE_BODY_START = 1;
    b.SNAKE_BODY_END = 100;
    b.BLOCK_SPIKES = 101;
    b.BLOCK_MOVABLE = 102;
    b.BLOCK_NORMAL = 103;
    b.BLOCK_GOAL = 104;
    b.BLOCK_END = 105;
    b.BLOCK_ON_SPYKES = 999;
    b.savedSnakeParts = [];
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var Snake = function(g) {
    function b(a, b) {
        var c = g.call(this) || this;
        c.snakeParts = [];
        c.savedParts = [];
        c.bWin = !1;
        c.winStep = 0;
        c.numOfHideSegments = 0;
        c.bFail = !1;
        c.m_bOnSpikes = !1;
        c.bBuilded = !1;
        c.bSnakeMoving = !1;
        c.bSnakeFalling = !1;
        c.bSnakeJumping = !1;
        c.bGoalTaken = !1;
        c.lastAnimMovingDir = 0;
        c.maxJ = -1;
        c.minJ = Preferences.CELL_NUM_Y + 1;
        c.topBlock = null;
        SnakePart.mcHeadinHead && Preferences.stopEx(SnakePart.mcHeadinHead);
        SnakePart.mcHeadinHeadNext && Preferences.stopEx(SnakePart.mcHeadinHead);
        SnakePart.mcHeadContainer = null;
        SnakePart.mcHeadinHead = null;
        SnakePart.mcHeadinHeadNext = null;
        Preferences.prepareMC(SnakePart.headStatic);
        Preferences.prepareMC(SnakePart.headOpen);
        Preferences.prepareMC(SnakePart.headEat);
        Preferences.prepareMC(SnakePart.headLoss);
        Preferences.prepareMC(SnakePart.headHit);
        Preferences.prepareMC(SnakePart.headEatHit);
        SnakePart.headStatic.gotoAndStop(0);
        SnakePart.headOpen.gotoAndStop(0);
        SnakePart.headEat.gotoAndStop(0);
        SnakePart.headLoss.gotoAndStop(0);
        SnakePart.headHit.gotoAndStop(0);
        SnakePart.headEatHit.gotoAndStop(0);
        SnakePart.headStatic.parent && SnakePart.headStatic.parent.removeChild(SnakePart.headStatic);
        SnakePart.headOpen.parent && SnakePart.headOpen.parent.removeChild(SnakePart.headOpen);
        SnakePart.headEat.parent && SnakePart.headEat.parent.removeChild(SnakePart.headEat);
        SnakePart.headLoss.parent && SnakePart.headLoss.parent.removeChild(SnakePart.headLoss);
        SnakePart.headHit.parent && SnakePart.headHit.parent.removeChild(SnakePart.headHit);
        SnakePart.headEatHit.parent && SnakePart.headEatHit.parent.removeChild(SnakePart.headEatHit);
        SnakePart.headStatic.x = 74.5;
        SnakePart.headOpen.x = 74.5;
        SnakePart.headEat.x = 74.5;
        SnakePart.headLoss.x = 74.5;
        SnakePart.headHit.x = 74.5;
        SnakePart.headEatHit.x = 74.5;
        SnakePart.headStatic.y = 50;
        SnakePart.headOpen.y = 50;
        SnakePart.headEat.y = 50;
        SnakePart.headLoss.y = 50;
        SnakePart.headHit.y = 50;
        SnakePart.headEatHit.y = 50;
        SnakePart.staticHeadMask = SnakePart.headStatic.mask111;
        SnakePart.staticHeadMask && (SnakePart.staticHeadMask.gotoAndStop(0), SnakePart.staticHeadMask.autoReset = !1);
        c.movingOnPlace = b;
        c.lvlLink = a;
        return c
    }
    __extends(b, g);
    b.prototype.addPart = function(a) {
        for (var b = 0, d = this.snakeParts; b < d.length; b++)
            if (d[b].type == a.type) throw Error("\u041f\u043e\u0432\u0442\u043e\u0440\u043d\u043e\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u0435\u0433\u043c\u0435\u043d\u0442\u0430 \u0441 \u043e\u0434\u0438\u043d\u0430\u043a\u043e\u0432\u044b\u043c\u0438 \u0438\u043d\u0434\u0435\u043a\u0441\u0430\u043c\u0438");
        this.snakeParts.push(a);
        this.snakeParts.sort(function(a, b) {
            return a.type - b.type
        });
        this.addChild(a)
    };
    b.prototype.build = function(a, c) {
        void 0 === c && (c = !1);
        this.bIsSnakeVertical = !0;
        if (0 != this.snakeParts.length)
            if (a || 1 != this.snakeParts.length) {
                if (2 <= this.snakeParts.length) {
                    var d = this.snakeParts[0];
                    d.nextOffX = 0;
                    d.nextOffY = 0;
                    var f = this.snakeParts[1];
                    this.setChildIndex(f, 1);
                    this.setChildIndex(d, 0);
                    d.i < f.i && (a || (d.createLine(!1, !0, !1, !1, !0), this.lastAnimMovingDir = b.MOVE_LEFT), f.nextOffX = d.nextOffX - 2, f.nextOffY = d.nextOffY, f.createLine(!1, !0, !0, 2 == this.snakeParts.length, !1, !c && 3 == this.snakeParts.length,
                        c, d.bReversedCorner, !d.bCorner), this.bIsSnakeVertical = !1);
                    d.i > f.i && (a || (d.createLine(!1, !1, !1, !1, !0), this.lastAnimMovingDir = b.MOVE_RIGHT), f.nextOffX = d.nextOffX + 2, f.nextOffY = d.nextOffY, f.createLine(!1, !1, !0, 2 == this.snakeParts.length, !1, !c && 3 == this.snakeParts.length, c, d.bReversedCorner, !d.bCorner), this.bIsSnakeVertical = !1);
                    d.j < f.j && (a || (d.createLine(!0, !0, !1, !1, !0), this.lastAnimMovingDir = b.MOVE_UP), f.nextOffX = d.nextOffX, f.nextOffY = d.nextOffY - 2, f.createLine(!0, !0, !0, 2 == this.snakeParts.length, !1, !c &&
                        3 == this.snakeParts.length, c, d.bReversedCorner, !d.bCorner));
                    d.j > f.j && (a || (d.createLine(!0, !1, !1, !1, !0), this.lastAnimMovingDir = b.MOVE_DOWN), f.nextOffX = d.nextOffX, f.nextOffY = d.nextOffY + 2, f.createLine(!0, !1, !0, 2 == this.snakeParts.length, !1, !c && 3 == this.snakeParts.length, c, d.bReversedCorner, !d.bCorner));
                    this.movingOnPlace && (f.playGraph(), d.playGraph());
                    d = f
                }
                a = d.bVertical;
                for (var e = 2; e < this.snakeParts.length; e++) f = this.snakeParts[e], this.setChildIndex(f, this.snakeParts.length - e - 1), d.i < f.i && (a && d.createCorner(d.bReverse,
                    !0, !0, d.bOdd, !1, !c && e == this.snakeParts.length - 1), f.nextOffX = d.nextOffX - 2, f.nextOffY = d.nextOffY, f.createLine(!1, !0, !d.bOdd, e == this.snakeParts.length - 1, !1, !c && e == this.snakeParts.length - 2, c, d.bReversedCorner, !d.bCorner), this.bIsSnakeVertical = !1), d.i > f.i && (a && d.createCorner(d.bReverse, !1, !0, d.bOdd, !1, !c && e == this.snakeParts.length - 1), f.nextOffX = d.nextOffX + 2, f.nextOffY = d.nextOffY, f.createLine(!1, !1, !d.bOdd, e == this.snakeParts.length - 1, !1, !c && e == this.snakeParts.length - 2, c, d.bReversedCorner, !d.bCorner), this.bIsSnakeVertical = !1), d.j < f.j && (a || d.createCorner(!0, d.bReverse, !1, d.bOdd, !1, !c && e == this.snakeParts.length - 1), f.nextOffX = d.nextOffX, f.nextOffY = d.nextOffY - 2, f.createLine(!0, !0, !d.bOdd, e == this.snakeParts.length - 1, !1, !c && e == this.snakeParts.length - 2, c, d.bReversedCorner, !d.bCorner)), d.j > f.j && (a || d.createCorner(!1, d.bReverse, !1, d.bOdd, !1, !c && e == this.snakeParts.length - 1), f.nextOffX = d.nextOffX, f.nextOffY = d.nextOffY + 2, f.createLine(!0, !1, !d.bOdd, e == this.snakeParts.length - 1, !1, !c && e == this.snakeParts.length - 2, c, d.bReversedCorner,
                    !d.bCorner)), a = d.bVertical, d = f;
                for (e = 0; e < this.snakeParts.length; e++) this.snakeParts[e].x -= this.snakeParts[e].neddOffX, this.snakeParts[e].y -= this.snakeParts[e].neddOffY, this.snakeParts[e].x += this.snakeParts[e].nextOffX, this.snakeParts[e].y += this.snakeParts[e].nextOffY, this.snakeParts[e].neddOffX = this.snakeParts[e].nextOffX, this.snakeParts[e].neddOffY = this.snakeParts[e].nextOffY;
                this.bSnakeMoving = this.movingOnPlace
            } else f = this.snakeParts[0], f.createLine(!1, !1, !1, !1, !0)
    };
    b.prototype.startFall = function(a) {
        if (!(this.bSnakeMoving ||
                this.bSnakeFalling || this.bSnakeJumping || this.bGoalTaken)) {
            this.m_nCurSpeed = Preferences.SNAKE_FALL_START_SPEED;
            this.m_nFallTo = this.y + a;
            this.bSnakeFalling = !0;
            var b = this.checkHeadForWallAhead(!0);
            b && SnakePart.setNextHeadAnim(SnakePart.headHit, !1, !0);
            a == Preferences.CELL_SIZE && (a = this.checkHeadForFruitAround(!1, !1, !0), !b && a ? SnakePart.setNextHeadAnim(SnakePart.headOpen, !1, !1, !0) : b || SnakePart.setNextHeadAnim(SnakePart.headStatic, !1, !1, !0))
        }
    };
    b.prototype.checkFall = function() {
        if (this.bSnakeFalling) {
            var a =
                50 * Math.floor(this.y / 50);
            this.y = Preferences.ChangeNumberWithCap(this.y, this.m_nCurSpeed, this.m_nFallTo);
            if (50 * Math.floor(this.y / 50) != a) {
                a = 0;
                for (var b = this.snakeParts; a < b.length; a++) b[a].j++;
                b = this.m_nFallTo == this.y;
                (a = this.checkHeadForWallAhead(!b)) && SnakePart.setNextHeadAnim(SnakePart.headHit, !1, !0, !b);
                if (50 >= this.m_nFallTo - this.y && !b || !a && b) {
                    var d = this.checkHeadForFruitAround(!1, !1, !b);
                    a || (d ? SnakePart.setNextHeadAnim(SnakePart.headOpen, !1, !1, !b) : SnakePart.setNextHeadAnim(SnakePart.headStatic, !1,
                        !1, !b))
                }
            }
            this.m_nCurSpeed += Preferences.SNAKE_FALL_ACELERATION;
            if (this.y == this.m_nFallTo) {
                this.build(!1);
                this.bSnakeFalling = !1;
                Preferences.bSoundOff || createjs.Sound.play("TFall");
                this.getBounds();
                Preferences.bSoundOff || createjs.Sound.play("TDead");
                if (600 < this.topBlock.y + this.y) {
                    this.visible = !1;
                    Preferences.gameMenuChanger.showGame(!0);
                    return
                }
                if (this.m_bOnSpikes) {
                    Preferences.lvlLink.fail();
                    return
                }
            }
        }
        this.bSnakeJumping && !createjs.Tween.hasActiveTweens(this) && (this.bSnakeJumping = !1)
    };
    b.prototype.onSpikes =
        function() {
            this.bSnakeFalling || this.bSnakeMoving || (this.m_bOnSpikes = !0)
        };
    b.prototype.move = function(a, c) {
        void 0 === c && (c = !1);
        var d = this.snakeParts[0],
            f = d.i,
            e = d.j,
            g = f,
            h = e,
            m = a != this.lastAnimMovingDir,
            k = !1,
            n = !1,
            l = !1;
        if (!(this.bSnakeMoving || this.bSnakeFalling || this.bSnakeJumping)) {
            switch (a) {
                case b.MOVE_LEFT:
                    g--;
                    break;
                case b.MOVE_RIGHT:
                    g++;
                    break;
                case b.MOVE_UP:
                    h--;
                    var p = Preferences.lvlLink.needMovingOn(a, g, h);
                    if (this.bIsSnakeVertical && c) {
                        p != LevelPart.BLOCK_MOVABLE && (createjs.Tween.get(this, {
                            override: !0,
                            onComplete: this.JumpFinished
                        }).to({
                            y: this.y - Preferences.CELL_SIZE / 5
                        }, 100), this.bSnakeJumping = !0, Preferences.bSoundOff || createjs.Sound.play("TJump"));
                        return
                    }
                    break;
                case b.MOVE_DOWN:
                    h++;
                    break;
                default:
                    return
            }
            if (!this.bWin) switch (p = Preferences.lvlLink.needMovingOn(a, g, h), p) {
                case LevelPart.BLOCK_GOAL:
                    this.bGoalTaken = !0;
                    break;
                case LevelPart.BLOCK_SPIKES:
                    Preferences.bSoundOff || createjs.Sound.play("TDead");
                    this.bFail = !0;
                    break;
                case LevelPart.BLOCK_END:
                    this.bWin = !0;
                    Preferences.bSoundOff ? Preferences.gameMenuChanger.showNextMenu(!1) :
                        (createjs.Sound.play("TPortal_1").on("complete", this.onEndSoundComplete), Preferences.nextMenu.inProgress = !0);
                    SnakePart.staticHeadMask && SnakePart.staticHeadMask.play();
                    this.snakeParts[0].setMask(1);
                    break;
                case LevelPart.BLOCK_ON_SPYKES:
                case LevelPart.BLOCK_MOVABLE:
                    m && Preferences.lvlLink.getBlockType(f + (g - f), e + (h - e)) == LevelPart.BLOCK_MOVABLE && (k = !0);
                    if (!Preferences.lvlLink.moveMovable(a, g, h)) return;
                    n = !0;
                    k && (Preferences.bSoundOff || createjs.Sound.play("TRock"), SnakePart.setNextHeadAnim(SnakePart.headHit,
                        !1, !0));
                    p == LevelPart.BLOCK_ON_SPYKES && (Preferences.bSoundOff || createjs.Sound.play("TDead"), this.bFail = !0);
                    break;
                case 0:
                    break;
                default:
                    return
            }
            d.nextI = g;
            d.nextJ = h;
            this.bGoalTaken && (this.build(!1, !0), Preferences.lvlLink.removeGoal(g, h));
            k || (!this.bGoalTaken || Preferences.lvlLink.getBlockType(g + (g - f), h + (h - e)) != LevelPart.BLOCK_NORMAL && Preferences.lvlLink.getBlockType(g + (g - f), h + (h - e)) != LevelPart.BLOCK_MOVABLE ? Preferences.lvlLink.getBlockType(g + g - f, h + h - e) == LevelPart.BLOCK_NORMAL || Preferences.lvlLink.getBlockType(g +
                    g - f, h + h - e) == LevelPart.BLOCK_MOVABLE ? SnakePart.setNextHeadAnim(SnakePart.headHit) : this.bGoalTaken ? SnakePart.setNextHeadAnim(SnakePart.headEat) : this.checkHeadForFruitAround(!1, !0, !1) ? (l = !0, SnakePart.setNextHeadAnim(SnakePart.headOpen)) : SnakePart.setNextHeadAnim(SnakePart.headStatic) : SnakePart.setNextHeadAnim(SnakePart.headEatHit), n ? Preferences.bSoundOff || createjs.Sound.play("TRock") : this.bGoalTaken ? Preferences.bSoundOff || createjs.Sound.play("TEat") : l ? Preferences.bSoundOff || createjs.Sound.play("TOpen") :
                Preferences.bSoundOff || createjs.Sound.play("Tsound"));
            this.bSnakeMoving = !0;
            this.lastAnimMovingDir = a;
            d.bCorner && d.bReverse || !d.bCorner && d.bVertical ? a == b.MOVE_LEFT ? d.createCorner(d.bToTop, !0, !1, !1, !0) : a == b.MOVE_RIGHT ? d.createCorner(d.bToTop, !1, !1, !1, !0) : a == b.MOVE_UP ? d.createLine(!0, !0, !1, !1, !0) : d.createLine(!0, !1, !1, !1, !0) : a == b.MOVE_UP ? d.createCorner(!0, d.bToLelt, !0, !1, !0) : a == b.MOVE_DOWN ? d.createCorner(!1, d.bToLelt, !0, !1, !0) : a == b.MOVE_LEFT ? d.createLine(!1, !0, !1, !1, !0) : d.createLine(!1, !1, !1, !1, !0);
            for (a =
                0; a < this.snakeParts.length; a++) this.snakeParts[a].startAnimationMoving(g, h)
        }
    };
    b.prototype.onEndSoundComplete = function(a) {
        Preferences.nextMenu.inProgress = !1;
        Preferences.gameMenuChanger.showNextMenu(!1)
    };
    b.prototype.JumpFinished = function() {
        this.bSnakeJumping = !0;
        createjs.Tween.get(Preferences.lvlLink.snake, {
            override: !0
        }).to({
            y: Preferences.lvlLink.snake.y + Preferences.CELL_SIZE / 5
        }, 100)
    };
    b.prototype.checkHeadForWallAhead = function(a) {
        void 0 === a && (a = !0);
        var c = this.snakeParts[0],
            d = 0,
            f = 0;
        if (this.lastAnimMovingDir ==
            b.MOVE_UP) {
            if (a) return !1;
            f--
        }
        this.lastAnimMovingDir == b.MOVE_LEFT ? (d--, a && f++) : this.lastAnimMovingDir == b.MOVE_RIGHT ? (d++, a && f++) : this.lastAnimMovingDir == b.MOVE_DOWN && (a ? f += 2 : f++);
        return Preferences.lvlLink.getBlockType(c.i + d, c.j + f) == LevelPart.BLOCK_NORMAL || Preferences.lvlLink.getBlockType(c.i + d, c.j + f) == LevelPart.BLOCK_MOVABLE ? !0 : !1
    };
    b.prototype.checkHeadForFruitAround = function(a, b, d) {
        if (Preferences.lvlLink) {
            var c = this.snakeParts[0];
            if (c) {
                if (!b && Preferences.lvlLink.isGoalAround(c.i, c.j + (d ? 1 : 0)) || b &&
                    Preferences.lvlLink.isGoalAround(c.nextI, c.nextJ)) return a && c.setFirstHeadAnim(SnakePart.headOpen), !0;
                a && c.setFirstHeadAnim(SnakePart.headStatic)
            }
        }
        return !1
    };
    b.prototype.isTail = function(a) {
        return a == this.snakeParts[this.snakeParts.length - 1] ? !0 : !1
    };
    b.prototype.setMaskOnWin = function() {
        this.bWin && 0 == this.numOfHideSegments ? this.winStep ? 4 == this.snakeParts[0].inn.currentFrame && this.snakeParts[0].setMask(2, !0) : this.snakeParts[0].setMask(1) : this.bWin && this.snakeParts[this.numOfHideSegments] && this.snakeParts[this.numOfHideSegments].setMask(1)
    };
    b.prototype.checkMove = function() {
        this.setMaskOnWin();
        if (this.bSnakeMoving) {
            this.bSnakeMoving = this.movingOnPlace;
            for (var a = 0, b = this.snakeParts; a < b.length; a++) {
                var d = b[a];
                d.j < this.minJ ? (this.minJ = d.j, this.topBlock = d) : d.j > this.maxJ && (this.maxJ = d.j);
                d.isStopped() || (this.bSnakeMoving = !0)
            }
            if (!this.bSnakeMoving) {
                a = this.snakeParts[0];
                b = this.snakeParts[this.snakeParts.length - 1];
                var f = this.snakeParts[this.snakeParts.length - 2];
                if (0 == this.bGoalTaken) {
                    b.nextI = f.i;
                    b.nextJ = f.j;
                    b.stopAnimationMoving();
                    f.nextI = a.i;
                    f.nextJ = a.j;
                    f.stopAnimationMoving();
                    this.snakeParts.splice(this.snakeParts.length - 2, 1);
                    f.type = 2;
                    for (var e = 0, g = this.snakeParts; e < g.length; e++) d = g[e], d.type >= f.type && d.type != b.type && d.type++;
                    this.snakeParts.splice(1, 0, f)
                } else {
                    b = this.snakeParts[this.snakeParts.length - 1];
                    d = b.i;
                    f = b.j;
                    for (e = this.snakeParts.length - 2; 0 <= e; e--) this.snakeParts[e + 1].nextI = this.snakeParts[e].i, this.snakeParts[e + 1].nextJ = this.snakeParts[e].j, this.snakeParts[e + 1].stopAnimationMoving();
                    this.newBlock = LevelPart.Create(d, f, b.type +
                        1);
                    this.newBlock.x -= this.x;
                    this.newBlock.y -= this.y;
                    this.addChild(this.newBlock);
                    this.newBlock.createLine(b.bVertical, b.bReverse, !b.bOdd, !0, !1, !1, !1);
                    this.setChildIndex(this.newBlock, 0);
                    Preferences.lvlLink.addPart(this.newBlock);
                    this.bGoalTaken = !1;
                    this.snakeParts.push(this.newBlock)
                }
                a.stopAnimationMoving();
                a = this.checkHeadForWallAhead(!1);
                b = this.checkHeadForFruitAround(!1, !1, !1);
                a ? SnakePart.setNextHeadAnim(SnakePart.headHit) : b ? SnakePart.setNextHeadAnim(SnakePart.headOpen) : SnakePart.setNextHeadAnim(SnakePart.headStatic);
                this.build(!1);
                if (this.bWin)
                    if (this.numOfHideSegments == this.snakeParts.length) this.lvlLink.win();
                    else
                        for (this.move(this.lastAnimMovingDir), this.setMaskOnWin(), 0 == this.numOfHideSegments && 0 == this.winStep ? (a = this.snakeParts[this.numOfHideSegments], this.winStep++, a && a.setMask(2)) : (0 == this.numOfHideSegments && this.snakeParts[0].setMask(2), this.winStep = 0, this.numOfHideSegments++, this.setMaskOnWin(), e = this.numOfHideSegments, e < this.snakeParts.length && this.snakeParts[e].setMask(2)), e = 0; e < this.snakeParts.length; e++) this.snakeParts[e].visible =
                            e < this.numOfHideSegments ? !1 : !0;
                else this.bFail && Preferences.lvlLink.fail()
            }
        }
    };
    b.prototype.SetLastMoveDir = function() {
        var a = this.snakeParts[0],
            c = this.snakeParts[1];
        1 == a.i - c.i ? this.lastAnimMovingDir = b.MOVE_RIGHT : -1 == a.i - c.i ? this.lastAnimMovingDir = b.MOVE_LEFT : 1 == a.j - c.j ? this.lastAnimMovingDir = b.MOVE_DOWN : -1 == a.i - c.i && (this.lastAnimMovingDir = b.MOVE_UP)
    };
    b.MOVE_UP = 1;
    b.MOVE_DOWN = 2;
    b.MOVE_LEFT = 4;
    b.MOVE_RIGHT = 8;
    return b
}(createjs.MovieClip);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var SnakePart = function(g) {
    function b(a, c, d, f) {
        a = g.call(this, a, c, d, f) || this;
        a.partNum = 0;
        a.bReverse = !1;
        a.bVertical = !1;
        a.bOdd = !1;
        a.bCorner = !1;
        a.bToTop = !1;
        a.bToLelt = !1;
        a.bIsHead = !1;
        a.bIsTail = !1;
        a.bIsPretail = !1;
        a.bIsAnimMoving = !1;
        a.neddOffX = 0;
        a.neddOffY = 0;
        a.nextOffX = 0;
        a.nextOffY = 0;
        a.mcLine1 = new lib.line2;
        a.mcLine2 = new lib.line1;
        a.mcCorner1 = new lib.ugol2;
        a.mcCorner2 = new lib.ugol1;
        a.mcCorner1_2 = new lib.ugol2_2;
        a.mcCorner2_2 = new lib.ugol1_2;
        a.mcLine2.name = "line1";
        a.mcLine1.name = "line2";
        a.mcCorner1.name = "ugol2";
        a.mcCorner2.name = "ugol1";
        a.mcCorner1_2.name = "ugol2_2";
        a.mcCorner2_2.name = "ugol2_1";
        a.mcTail1 = new lib.hvost2;
        a.mcTail2 = new lib.hvost1;
        a.mcTail1Corner = new lib.hvost2_corner;
        a.mcTail2Corner = new lib.hvost1_corner;
        a.mcTail1Corner2 = new lib.hvost2_corner2;
        a.mcTail2Corner2 = new lib.hvost1_corner2;
        a.mcLineTail1 = new lib.line2hvost;
        a.mcLineTail2 = new lib.line1hvost;
        a.mcHeadLine = new lib.golova;
        a.mcHeadCorner = new lib.golova_u2;
        a.mcHeadCorner2 = new lib.golova_u2_2;
        a.mcCornerTail1 = new lib.ugol2hvost;
        a.mcCornerTail2 =
            new lib.ugol1hvost;
        a.mcCornerTail1_2 = new lib.ugol2hvost_2;
        a.mcCornerTail2_2 = new lib.ugol1hvost_2;
        a.mcTail1OnGrow = new lib.line2hvost_OnGrow;
        a.mcTail2OnGrow = new lib.line1hvost_OnGrow;
        a.mcTail1.name = "hvost2";
        a.mcTail2.name = "hvost1";
        a.mcTail1Corner.name = "hvost2_corner";
        a.mcTail2Corner.name = "hvost1_corner";
        a.mcTail1Corner2.name = "hvost2_corner2";
        a.mcTail2Corner2.name = "hvost1_corner2";
        a.mcLineTail1.name = "line2hvost";
        a.mcLineTail2.name = "line1hvost";
        a.mcHeadLine.name = "golova";
        a.mcHeadCorner.name = "golova_u2";
        a.mcHeadCorner2.name = "golova_u2_2";
        a.mcCornerTail1.name = "ugol2hvost";
        a.mcCornerTail2.name = "ugol1hvost";
        a.mcCornerTail1_2.name = "ugol2hvost_2";
        a.mcCornerTail2_2.name = "ugol1hvost_2";
        a.mcTail1OnGrow.name = "line2hvost_OnGrow";
        a.mcTail2OnGrow.name = "line1hvost_OnGrow";
        a.prepareMC(a.mcLine1);
        a.prepareMC(a.mcLine2);
        a.prepareMC(a.mcCorner1);
        a.prepareMC(a.mcCorner2);
        a.prepareMC(a.mcCorner1_2);
        a.prepareMC(a.mcCorner2_2);
        a.prepareMC(a.mcTail1);
        a.prepareMC(a.mcTail2);
        a.prepareMC(a.mcTail1Corner);
        a.prepareMC(a.mcTail2Corner);
        a.prepareMC(a.mcTail1Corner2);
        a.prepareMC(a.mcTail2Corner2);
        a.prepareMC(a.mcHeadLine);
        a.prepareMC(a.mcHeadCorner);
        a.prepareMC(a.mcHeadCorner2);
        a.prepareMC(a.mcLineTail1);
        a.prepareMC(a.mcLineTail2);
        a.prepareMC(a.mcCornerTail1);
        a.prepareMC(a.mcCornerTail2);
        a.prepareMC(a.mcCornerTail1_2);
        a.prepareMC(a.mcCornerTail2_2);
        a.prepareMC(a.mcTail1OnGrow);
        a.prepareMC(a.mcTail2OnGrow);
        b.mcHeadContainer = a.mcHeadLine.eblo;
        Preferences.prepareMC(b.mcHeadContainer);
        b.mcHeadContainer = b.mcHeadContainer.eblo;
        Preferences.prepareMC(b.mcHeadContainer);
        return a
    }
    __extends(b, g);
    b.prototype.setParams = function(a, c, d, f) {
        this.i = a;
        this.j = c;
        this.type = d;
        a = Level.getCellRect(a, c);
        this.x = a.x;
        this.y = a.y;
        this.visible = !0;
        this.resetMCProp(this.mcLine1);
        this.resetMCProp(this.mcLine2);
        this.resetMCProp(this.mcCorner1);
        this.resetMCProp(this.mcCorner2);
        this.resetMCProp(this.mcCorner1_2);
        this.resetMCProp(this.mcCorner2_2);
        this.resetMCProp(this.mcTail1);
        this.resetMCProp(this.mcTail2);
        this.resetMCProp(this.mcTail1Corner);
        this.resetMCProp(this.mcTail2Corner);
        this.resetMCProp(this.mcTail1Corner2);
        this.resetMCProp(this.mcTail2Corner2);
        this.resetMCProp(this.mcHeadLine);
        this.resetMCProp(this.mcHeadCorner);
        this.resetMCProp(this.mcHeadCorner2);
        this.resetMCProp(this.mcLineTail1);
        this.resetMCProp(this.mcLineTail2);
        this.resetMCProp(this.mcCornerTail1);
        this.resetMCProp(this.mcCornerTail2);
        this.resetMCProp(this.mcCornerTail1_2);
        this.resetMCProp(this.mcCornerTail2_2);
        this.resetMCProp(this.mcTail1OnGrow);
        this.resetMCProp(this.mcTail2OnGrow);
        this.bIsAnimMoving = this.bIsPretail = this.bIsTail = this.bIsHead =
            this.bToLelt = this.bToTop = this.bCorner = this.bOdd = this.bVertical = this.bReverse = !1;
        this.nextOffY = this.nextOffX = this.neddOffY = this.neddOffX = 0;
        this.isFalling = !1;
        b.mcHeadinHeadNext = null;
        this.isMoving = !1
    };
    b.prototype.prepareMC = function(a) {
        a.gotoAndStop(0);
        a.autoReset = !1;
        a.visible = !1;
        this.addChild(a)
    };
    b.prototype.resetMCProp = function(a) {
        a.scaleX = .5;
        a.scaleY = .5;
        a.x = 0;
        a.y = 0;
        a.rotation = 0;
        a.gotoAndStop(0);
        this.addChild(a);
        a.visible = !1;
        var b = a.mask111;
        if (b) {
            Preferences.prepareMC(b);
            a.maskArray = [];
            for (var d = 0; d <
                b.totalFrames; d++) {
                b.gotoAndStop(d);
                var f = b.getChildAt(0);
                a.maskArray[d] = f;
                a.addChild(f);
                f.visible = !1;
                a.eblo || (f.x = 25, f.y = 25, f.scaleX = .5, f.scaleY = .5);
                f.svdX = f.x;
                f.svdY = f.y;
                f.svdRot = f.rotation;
                f.svdScale = f.scaleX
            }
            a.mask111 = null;
            a.removeChild(b)
        }
        if (a.maskArray)
            for (a.eblo ? (a.eblo.mask = a.maskArray[0], a.mask = null) : a.mask = a.maskArray[0], b = 0; b < a.maskArray.length; b++) a.maskArray[b].x = a.maskArray[b].svdX, a.maskArray[b].y = a.maskArray[b].svdY, a.maskArray[b].rotation = a.maskArray[b].svdRot, a.maskArray[b].scaleX =
                a.maskArray[b].svdScale, a.maskArray[b].scaleY = a.maskArray[b].svdScale
    };
    b.prototype.resetMC = function(a) {
        a.scaleX = .5;
        a.scaleY = .5;
        a.x = 0;
        a.y = 0;
        a.rotation = 0;
        a.gotoAndStop(0);
        a.visible = !0;
        if (this.bl = a.blk) this.bl = this.bl.getChildAt(0);
        this.bl && (this.bl.scaleY = 1, this.bl.y = 0, this.bl.gotoAndStop(0));
        if (this.bl2 = a.blk2) this.bl2 = this.bl2.getChildAt(0);
        this.bl2 && (this.bl2.scaleY = 1, this.bl2.y = 0, this.bl2.gotoAndStop(0));
        var b = a.mask111;
        if (b) {
            Preferences.prepareMC(b);
            a.maskArray = [];
            for (var d = 0; d < b.totalFrames; d++) {
                b.gotoAndStop(d);
                var f = b.getChildAt(0);
                a.maskArray[d] = f;
                a.addChild(f);
                f.visible = !1;
                a.eblo || (f.x = 25, f.y = 25, f.scaleX = .5, f.scaleY = .5)
            }
            a.mask111 = null;
            a.removeChild(b)
        }
        a.maskArray && (a.eblo ? a.eblo.mask = a.maskArray[0] : a.mask = a.maskArray[0])
    };
    b.prototype.setMask = function(a, b) {
        void 0 === b && (b = !1);
        this.inn.maskArray && (a >= this.inn.maskArray.length && (a = this.inn.maskArray.length - 1), this.inn.eblo ? b ? (this.inn.maskArray[a].rotation = this.inn.rotation, this.inn.maskArray[a].x = 25, this.inn.maskArray[a].y = 25, this.inn.maskArray[a].scaleX =
            .5, this.inn.maskArray[a].scaleY = .5, this.inn.mask = this.inn.maskArray[a]) : this.inn.eblo.mask = this.inn.maskArray[a] : (this.inn.maskArray[a].rotation = this.inn.rotation, this.inn.mask = this.inn.maskArray[a]))
    };
    b.prototype.createLine = function(a, c, d, f, e, g, h, m, k) {
        void 0 === f && (f = !1);
        void 0 === e && (e = !1);
        void 0 === g && (g = !1);
        void 0 === h && (h = !1);
        void 0 === m && (m = !1);
        void 0 === k && (k = !0);
        null != this.inn && (this.inn.visible = !1, this.inn.stop());
        this.bl2 = this.bl = null;
        f ? this.inn = d ? h ? this.mcTail2OnGrow : k ? this.mcTail2 : m ? this.mcTail2Corner :
            this.mcTail2Corner2 : h ? this.mcTail1OnGrow : k ? this.mcTail1 : m ? this.mcTail1Corner : this.mcTail1Corner2 : e ? (this.inn = this.mcHeadLine, b.mcHeadContainer = this.inn.eblo, b.mcHeadContainer = b.mcHeadContainer.eblo, b.curHead = b.HEAD_1, b.mcHeadContainer && (b.mcHeadContainer.scaleX = 1, b.mcHeadContainer.scaleY = 1, b.mcHeadContainer.y = 0, b.mcHeadContainer.x = 0, b.mcHeadinHead && (b.mcHeadContainer.addChild(b.mcHeadinHead), b.mcHeadinHead.puzo111.visible = !0))) : this.inn = g ? d ? this.mcLineTail2 : this.mcLineTail1 : d ? this.mcLine2 : this.mcLine1;
        this.resetMC(this.inn);
        !a && c && (this.bl && (this.bl.scaleY = -1, this.bl.y = 2 * Preferences.CELL_SIZE), this.bl2 && (this.bl2.scaleY = -1, this.bl2.y = 2 * Preferences.CELL_SIZE), this.inn.rotation = 180, this.inn.x = Preferences.CELL_SIZE, this.inn.y = Preferences.CELL_SIZE);
        a && !c && (this.inn.rotation = 90, this.inn.x = Preferences.CELL_SIZE, this.bl && (this.bl.scaleY = -1, this.bl.y = 2 * Preferences.CELL_SIZE), this.bl2 && (this.bl2.scaleY = -1, this.bl2.y = 2 * Preferences.CELL_SIZE));
        a && c && (this.inn.rotation = -90, this.inn.y = Preferences.CELL_SIZE);
        this.bCorner = !1;
        this.bReverse = c;
        this.bVertical = a;
        this.bOdd = d;
        this.bIsTail = f;
        this.bIsHead = e;
        this.bIsPretail = g;
        this.bReversedCorner = !1;
        this.tailAnimOnGrow(!1);
        this.bToTop = this.bVertical && this.bReverse;
        this.bToLelt = !this.bVertical && this.bReverse
    };
    b.prototype.createCorner = function(a, c, d, f, e, g) {
        void 0 === e && (e = !1);
        void 0 === g && (g = !1);
        null != this.inn && (this.inn.visible = !1, this.inn.stop());
        this.bl2 = this.bl = null;
        e ? (a && !c && d || a && c && !d || !a && c && d || !a && !c && !d ? (this.bReversedCorner = !1, this.inn = this.mcHeadCorner2,
                b.curHead = b.HEAD_2) : (this.bReversedCorner = !0, this.inn = this.mcHeadCorner, b.curHead = b.HEAD_3), b.mcHeadContainer = this.inn.eblo, b.mcHeadContainer = b.mcHeadContainer.eblo, b.mcHeadContainer && (b.mcHeadContainer.scaleX = 1, b.mcHeadContainer.scaleY = 1, b.mcHeadContainer.y = 0, b.mcHeadContainer.x = 0), b.mcHeadinHead && (b.mcHeadContainer.addChild(b.mcHeadinHead), b.mcHeadinHead.puzo111.visible = !1)) : g ? a && !c && d || a && c && !d || !a && c && d || !a && !c && !d ? (this.bReversedCorner = !1, this.inn = f ? this.mcCornerTail2_2 : this.mcCornerTail1_2) :
            (this.bReversedCorner = !0, this.inn = f ? this.mcCornerTail2 : this.mcCornerTail1) : a && !c && d || a && c && !d || !a && c && d || !a && !c && !d ? (this.bReversedCorner = !1, this.inn = f ? this.mcCorner2_2 : this.mcCorner1_2) : (this.bReversedCorner = !0, this.inn = f ? this.mcCorner2 : this.mcCorner1);
        this.resetMC(this.inn);
        !a || c || d || (this.bl && this.bl.gotoAndStop(0), this.bl2 && this.bl2.gotoAndStop(0));
        a || c || !d || (this.inn.rotation = 90, this.inn.x = Preferences.CELL_SIZE, this.bl && this.bl.gotoAndStop(3), this.bl2 && this.bl2.gotoAndStop(3));
        a || !c || d || (this.bl &&
            this.bl.gotoAndStop(1), this.bl2 && this.bl2.gotoAndStop(1), this.inn.rotation = 180, this.inn.x = Preferences.CELL_SIZE, this.inn.y = Preferences.CELL_SIZE);
        a && c && d && (this.inn.rotation = -90, this.inn.y = Preferences.CELL_SIZE, this.bl && this.bl.gotoAndStop(2), this.bl2 && this.bl2.gotoAndStop(2));
        a || c || d || (e && b.mcHeadContainer && (b.mcHeadContainer.scaleY = -1, b.mcHeadContainer.y = 2 * Preferences.CELL_SIZE), this.bl && this.bl.gotoAndStop(3), this.bl2 && this.bl2.gotoAndStop(3), this.inn.scaleY = -this.inn.scaleY, this.inn.y = Preferences.CELL_SIZE);
        a && c && !d && (e && b.mcHeadContainer && (b.mcHeadContainer.scaleY = -1, b.mcHeadContainer.y = 2 * Preferences.CELL_SIZE), this.bl && this.bl.gotoAndStop(2), this.bl2 && this.bl2.gotoAndStop(2), this.inn.scaleX = -this.inn.scaleX, this.inn.x = Preferences.CELL_SIZE);
        a && !c && d && (this.bl && this.bl.gotoAndStop(1), this.bl2 && this.bl2.gotoAndStop(1), e && b.mcHeadContainer && (b.mcHeadContainer.scaleY = -1, b.mcHeadContainer.y = 2 * Preferences.CELL_SIZE), this.inn.scaleX = -this.inn.scaleX, this.inn.rotation = 90, this.inn.x = Preferences.CELL_SIZE, this.inn.y =
            Preferences.CELL_SIZE);
        !a && c && d && (e && b.mcHeadContainer && (b.mcHeadContainer.scaleY = -1, b.mcHeadContainer.y = 2 * Preferences.CELL_SIZE), this.inn.scaleX = -this.inn.scaleX, this.inn.rotation = -90);
        this.bCorner = !0;
        this.bToLelt = c;
        this.bToTop = a;
        this.bOdd = f;
        this.bReverse = d;
        this.bIsHead = e;
        this.bIsPretail = g;
        this.bVertical = !d
    };
    b.prototype.changeOdd = function() {
        this.bIsHead || this.bIsTail || (this.bOdd = !this.bOdd, this.bCorner ? this.createCorner(this.bToTop, this.bToLelt, this.bReverse, !this.bOdd, this.bIsHead, this.bIsPretail) :
            this.createLine(this.bVertical, this.bReverse, !this.bOdd, this.bIsTail, this.bIsHead, this.bIsPretail))
    };
    b.prototype.playGraph = function() {
        this.inn && this.inn.gotoAndPlay(0)
    };
    b.prototype.tailAnimOnGrow = function(a) {
        if (this.bIsPretail && !this.bCorner) {
            var b = this.inn.inner;
            a ? b.gotoAndPlay(0) : b.gotoAndStop(0)
        }
    };
    b.prototype.setFirstHeadAnim = function(a) {
        if (!this.bIsHead) throw Error("setFirstHeadAnim. \u041d\u0435 \u0433\u043e\u043b\u043e\u0432\u0430!");
        b.mcHeadContainer = this.inn.eblo;
        Preferences.prepareMC(b.mcHeadContainer);
        b.mcHeadContainer = b.mcHeadContainer.eblo;
        Preferences.prepareMC(b.mcHeadContainer);
        b.mcHeadinHead = a;
        b.mcHeadinHead.puzo111.visible = this.bCorner || this.bReversedCorner ? !1 : !0;
        b.mcHeadContainer.addChild(b.mcHeadinHead);
        b.mcHeadinHead.gotoAndStop(b.mcHeadinHead.totalFrames - 1);
        Eyes.setMc(b.mcHeadinHead.glaza)
    };
    b.setNextHeadAnim = function(a, c, d, f) {
        void 0 === c && (c = !1);
        void 0 === d && (d = !1);
        void 0 === f && (f = !1);
        var e = c || d;
        if (!c) {
            if (f && b.mcHeadinHead == b.headHit) return;
            if (b.mcHeadinHead == a) {
                d && b.mcHeadinHead == b.headHit &&
                    (b.mcHeadinHead.gotoAndStop(b.mcHeadinHead.totalFrames - 1), Preferences.stopEx(b.mcHeadinHead));
                return
            }
            if (b.mcHeadinHead == b.headHit) e = !0;
            else if (b.mcHeadinHead == b.headStatic) e = !0;
            else if (b.mcHeadinHead == b.headOpen)
                if (c = !1, 9 <= b.headOpen.currentFrame && (c = !0), a == b.headHit ? a = b.headEatHit : a == b.headStatic ? c ? a = b.headLoss : b.mcHeadinHeadNext = b.headLoss : c || (b.mcHeadinHeadNext = a), c) e = !0;
                else return;
            else if (b.mcHeadinHead == b.headEatHit) {
                if (a == b.headHit) return;
                if (b.mcHeadinHead.currentFrame == b.mcHeadinHead.totalFrames -
                    1) e = !0;
                else {
                    a != b.headHit && (b.mcHeadinHeadNext = a);
                    return
                }
            } else b.mcHeadinHead == b.headEat && a != b.headStatic && (e = !0);
            b.mcHeadinHeadNext = a
        }
        null == b.mcHeadinHead ? (b.mcHeadinHead = a, b.mcHeadinHead.gotoAndStop(0), b.mcHeadContainer.addChild(b.mcHeadinHead), d ? (b.mcHeadinHead.gotoAndStop(b.mcHeadinHead.totalFrames - 1), Preferences.stopEx(b.mcHeadinHead)) : Preferences.playTo(b.mcHeadinHead, b.mcHeadinHead.totalFrames - 1, this.onHeadAnimEnd)) : e && (b.mcHeadinHeadNext = null, Preferences.stopEx(b.mcHeadinHead), Eyes.onRemoved(null),
            b.mcHeadContainer.removeChild(b.mcHeadinHead), b.mcHeadinHead = a, b.mcHeadinHead.gotoAndStop(0), b.mcHeadContainer.addChild(b.mcHeadinHead), Eyes.setMc(b.mcHeadinHead.glaza), d ? (b.mcHeadinHead.gotoAndStop(b.mcHeadinHead.totalFrames - 1), Preferences.stopEx(b.mcHeadinHead)) : Preferences.playTo(b.mcHeadinHead, b.mcHeadinHead.totalFrames - 1, this.onHeadAnimEnd));
        b.mcHeadinHead.puzo111.visible = b.curHead != b.HEAD_1 ? !1 : !0;
        b.mcHeadinHead == b.headEat && Eyes.setEyes(!0)
    };
    b.onHeadAnimEnd = function() {
        Preferences.stopEx(b.mcHeadinHead);
        b.mcHeadinHead.gotoAndStop(0);
        switch (b.mcHeadinHead) {
            case b.headStatic:
                b.mcHeadinHeadNext && (b.setNextHeadAnim(b.mcHeadinHeadNext, !0), b.mcHeadinHeadNext = null);
                break;
            case b.headOpen:
                b.mcHeadinHeadNext ? (b.setNextHeadAnim(b.mcHeadinHeadNext, !0), b.mcHeadinHeadNext = null) : b.headOpen.gotoAndStop(b.headOpen.totalFrames - 1);
                break;
            case b.headEat:
                b.mcHeadinHeadNext ? (b.setNextHeadAnim(b.mcHeadinHeadNext, !0), b.mcHeadinHeadNext = null) : b.setNextHeadAnim(b.headStatic, !0);
                break;
            case b.headLoss:
                b.mcHeadinHeadNext ? (b.setNextHeadAnim(b.mcHeadinHeadNext,
                    !0), b.mcHeadinHeadNext = null) : b.setNextHeadAnim(b.headStatic, !0);
                break;
            case b.headHit:
                b.mcHeadinHeadNext ? (b.setNextHeadAnim(b.mcHeadinHeadNext, !0), b.mcHeadinHeadNext = null) : b.headHit.gotoAndStop(b.headHit.totalFrames - 1);
                break;
            case b.headEatHit:
                b.mcHeadinHeadNext ? (b.setNextHeadAnim(b.mcHeadinHeadNext, !0), b.mcHeadinHeadNext = null) : b.headEatHit.gotoAndStop(b.headEatHit.totalFrames - 1)
        }
    };
    b.prototype.isStopped = function() {
        if (null == this.parent) return !0;
        if (this.isMoving || this.bIsAnimMoving && this.inn.currentFrame !=
            this.inn.totalFrames - 1) return !1;
        this.bIsAnimMoving = !1;
        return !0
    };
    b.prototype.startAnimationMoving = function(a, b) {
        this.bIsAnimMoving = !0;
        this.playGraph()
    };
    b.prototype.stopAnimationMoving = function() {
        this.x += (this.nextI - this.i) * Preferences.CELL_SIZE;
        this.y += (this.nextJ - this.j) * Preferences.CELL_SIZE;
        this.i = this.nextI;
        this.j = this.nextJ;
        this.inn && this.inn.gotoAndStop(0);
        this.bIsPretail && this.tailAnimOnGrow(!1)
    };
    b.headStatic = new lib.StaticEbl;
    b.headOpen = new lib.OpenEbl;
    b.headEat = new lib.EatEbl;
    b.headLoss = new lib.LossEbl;
    b.headHit = new lib.HitEbl;
    b.headEatHit = new lib.EatHitEbl;
    b.HEAD_1 = 1;
    b.HEAD_2 = 2;
    b.HEAD_3 = 3;
    return b
}(LevelPart);
__extends = this && this.__extends || function() {
    var g = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(b, a) {
        b.__proto__ = a
    } || function(b, a) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
    };
    return function(b, a) {
        function c() {
            this.constructor = b
        }
        g(b, a);
        b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c)
    }
}();
var win31instance, Win31 = function(g) {
    function b() {
        var a = g.call(this) || this;
        a.win31 = new lib.Win31;
        a.KEYCODE_ENTER = 13;
        a.KEYCODE_SPACE = 32;
        a.KEYCODE_UP = 38;
        a.KEYCODE_LEFT = 37;
        a.KEYCODE_RIGHT = 39;
        a.KEYCODE_W = 87;
        a.KEYCODE_A = 65;
        a.KEYCODE_D = 68;
        a.win31.autoReset = !1;
        a.win31.stop();
        win31instance = a;
        a.addChild(a.win31);
        return a
    }
    __extends(b, g);
    b.prototype.init = function() {
        document.onkeydown = this.onKey
    };
    b.prototype.onKey = function(a) {
        a || (a = window.event);
        switch (a.keyCode) {
            case Preferences.KEYCODE_UP:
            case Preferences.KEYCODE_LEFT:
            case Preferences.KEYCODE_RIGHT:
            case Preferences.KEYCODE_W:
            case Preferences.KEYCODE_A:
            case Preferences.KEYCODE_D:
            case Preferences.KEYCODE_UP:
                win31instance.win31.currentFrame !=
                    win31instance.win31.totalFrames - 1 && (0 == win31instance.win31.currentFrame ? Preferences.playTo(win31instance.win31, 19) : 57 <= win31instance.win31.currentFrame ? Preferences.playTo(win31instance.win31, win31instance.win31.totalFrames - 1) : 19 <= win31instance.win31.currentFrame && Preferences.playTo(win31instance.win31, 57))
        }
    };
    b.prototype.deinit = function() {
        document.onkeydown = null
    };
    return b
}(createjs.MovieClip);