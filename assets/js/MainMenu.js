/*
var eventJSON = {
	playerId: '',
	sessionId: '',
	data: {

		eventType: '',
		eventInfo:'',
		cardid: ''
	}
}*/






BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
  	this.sessionId = null;
  	this.turn = 0;

};

BasicGame.MainMenu.prototype = {





	players: new Array(),

	findCardById: function(playerData , cardId){

		for(var i = 0;i < playerData.cardPack.length; i++){
				if(playerData.cardPack[i].id === cardId){
					return playerData.cardPack[i];
				}

			}
			for(i = 0;i < playerData.cardHand.length; i++){
				if(playerData.cardHand[i].id === cardId){
					return playerData.cardHand[i];
				}
			}
			for(i = 0;i < playerData.cardFloor.length; i++){
				if(playerData.cardFloor[i].id === cardId){
					return playerData.cardFloor[i];
				}
			}

		

	

	},
	endTurn: function(playerData){

		//player[0]
		this.players[0].cardSelected = null;

		for(var i = 0; i < 4; i++){

			this.players[1].cardFloor[i].events.onInputDown.removeAll();
			this.players[1].cardFloor[i].events.onInputDown.add(function(buf){buf.Targeted(game);} , game);

		}
	},
	startTurn: function(playerData){
		for(var i = 0; i < 4; i++){

			this.players[0].cardFloor[i].events.onInputDown.removeAll();
			this.players[0].cardFloor[i].events.onInputDown.add(function(buf){buf.selectAndAttack(game);} , game);

		}
	},
	getEvent: function(jsonData){


		var parsedData = JSON.parse(jsonData);


		if(!parsedData) return;

		
		if(playerId === BasicGame.playerId){
			
			if(parsedData.eventType === 'toHand'){
				var card = findCardById(this.players[0] , parsedData.cardId);
				if(parsedData.eventInfo === 'fromFloor'){
					card.sendToHand(this.players[0].cardFloor,this);
				}
				else if(parsedData.eventInfo === 'fromPack'){
					card.sendToHand(this.players[0].cardFloor,this,'turn');
				}
			}
			else if(parsedData.eventType === 'toFloor'){

				var card = findCardById(this.players[0] , parsedData.cardId);
				
				card.sendToFloor(this.players[0].cardHand,this);
				
				

			}
			else if(parsedData.eventType === 'endTurn'){



			}
			else if(parsedData.eventType === 'attackTo'){



			}


		}
		else{
			if(parsedData.eventType === 'toHand'){
				var card = findCardById(this.players[1] , parsedData.cardId);
				if(parsedData.eventInfo === 'fromFloor'){
					card.sendToHand(this.players[1].cardFloor,this);
				}
				else if(parsedData.eventInfo === 'fromPack'){
					card.sendToHand(this.players[1].cardFloor,this);
				}
			}
			else if(parsedData.eventType === 'toFloor'){

				var card = findCardById(this.players[1] , parsedData.cardId);
				
				card.sendToFloor(this.players[1].cardHand,this,'turn');

			}
			else if(parsedData.eventType === 'endTurn'){



			}
			else if(parsedData.eventType === 'attackTo'){



			}
		}


		
		


	},
	sendEvent: function(type){

		if(type === 'toHand'){

		}
		else if(type === 'toFloor'){

		}
		else if(type === 'endTurn'){

		}
		else if(type === 'attackTo'){
			
		}



	},
	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');
		//this.players.splice(0,this.players.length);
		this.players.push(new Player(this,0,0,'Player'));
		this.players.push(new Player(this,0,0,'Opponent'));
		var game = this;

		for(var i = 0; i < 50; i++){



			var buf = new Card(this,900, 300,"Player " + i ,this.players[0],'card_front');
			buf.inputEnabled = true;
			buf.anchor.set(0.5);
			buf.events.onInputDown.add(function(buf){buf.sendToHand(game.players[0].cardPack,this,'turn');} , this);
			this.players[0].cardPack.push(buf);
		}

		for(var i = 0; i < 50; i++){



			var buf = new Card(this,100, 300,"Opponent " + i ,this.players[1],'card_front');
			buf.inputEnabled = true;
			buf.anchor.set(0.5);
			//buf.events.onInputDown.add(function(buf){buf.sendToHand(game.players[1].cardPack,this,'turn');} , this);
			
			this.players[1].cardPack.push(buf);
		}

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		/*for(var i = 0; i < 5; i++){


			var buf = new Card(this,300+ (i*100), 0,"Stuba " + i ,1);
			buf.inputEnabled = true;
			buf.anchor.set(0.5);
			buf.events.onInputDown.add(function(buf){this.setTurning(buf);} , this);
			this.cardList.push(buf );

		}

		for(var i = 0; i < 5; i++){

			var buf = new Card(this,300+ (i*100), 500,"Stuba " + (i+5),1);
			buf.inputEnabled = true;
			buf.anchor.set(0.5);
			buf.events.onInputDown.add(function(buf){this.setTurning(buf);} , this);
			this.cardList.push(buf );

		}



*/
		for(var i = 0; i < 50; i++)
			{
				this.add.existing(this.players[0].cardPack[i]);
				this.add.existing(this.players[1].cardPack[i]);
			}
	},

	changeImg: function(obj,textureName){


		if(obj){
			obj.loadTexture(textureName,0,false);
		}

	},
	setTurning: function(buf,command){

		var tween = this.add.tween(buf.scale).to({ x: 0},500,Phaser.Easing.Exponential.Out, true);
		var game = this;
		var buf = buf;
		if(command === 'firstImg'){

			if(buf.key !== 'card'){
				game.changeImg(buf,'card');
			}
			else{
				game.changeImg(buf,buf.frontName);

			}
		}
		tween.onComplete.add(function(){

			if(command !== 'firstImg'){
				if(buf.key !== 'card'){
				game.changeImg(buf,'card');
				}
				else{
					game.changeImg(buf,buf.frontName);

				}
			}

			game.add.tween(buf.scale).to({ x: 1},500,Phaser.Easing.Exponential.Out, true);

		})
	},
	update: function () {

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}


};
