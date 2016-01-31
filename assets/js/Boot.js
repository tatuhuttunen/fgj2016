var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 2048, 1536);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        //this.load.image('preloaderBar', 'images/preloadr_bar.png');


        //Card backs
        this.load.image('card', 'assets/card_back.png');

        //Card fronts
        this.load.image('card_front', 'assets/cardFronts/card_front.png');
        this.load.image('frontcard_keerlo_himo', 'assets/cardFronts/keerlo_himo.png');
        this.load.image('2_2kg', 'assets/cardFronts/2_2kg.png');
        this.load.image('2_6kg', 'assets/cardFronts/2_6kg.png');
        this.load.image('koodari', 'assets/cardFronts/koodari.png');
        this.load.image('kyykkaaja', 'assets/cardFronts/kyykkaaja.png');
        this.load.image('n-fuksi', 'assets/cardFronts/n-fuksi.png');
        this.load.image('pj', 'assets/cardFronts/pj.png');
        this.load.image('sammunut_teekkari', 'assets/cardFronts/sammunut_teekkari.png');
        this.load.image('taabo', 'assets/cardFronts/taabo.png');
        this.load.image('teekkari', 'assets/cardFronts/teekkari.png');
        this.load.image('tuutori', 'assets/cardFronts/tuutori.png');
        this.load.image('typera_fuksi', 'assets/cardFronts/typera_fuksi.png');

		//Menu buttons
		this.load.image('host', 'assets/spritesheets/host_game.png');
		this.load.image('join', 'assets/spritesheets/join_game.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
