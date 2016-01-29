


BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};
	
BasicGame.MainMenu.prototype = {

	cardList: new Array(),


	

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');
	
		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		for(var i = 0; i < 5; i++){


			var buf = new Card(this,300+ (i*100), 0,"Stuba " + i ,1);
			this.cardList.push(buf );

		}

		for(var i = 0; i < 5; i++){

			var buf = new Card(this,300+ (i*100), 500,"Stuba " + (i+5),1);
			this.cardList.push(buf );

		}

		
		for(var i = 0; i < this.cardList.length; i++)
		{

			console.log(this.cardList[i].Name);
			this.add.existing(this.cardList[i]);
		}

		

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}
		

};
