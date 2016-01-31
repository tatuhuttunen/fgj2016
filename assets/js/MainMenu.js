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
	  this.counter = 0;
	  this.limit = 150;
	  this.eventsJSON = null;
    this.latestHandledEvent = null;
  this.availableCards = [
    {
      type: 'Player ',
      image: 'card_front'
    },
    {
      type: 'Stuba',
      image: 'taabo'
    },
    {
      type: 'Fuksi',
      image: 'typera_fuksi'
    },
    {
      type: 'Teekkari',
      image: 'teekkari'
    },
    {
      type: 'Tuutori',
      image: 'tuutori'
    },
    {
      type: 'PJ',
      image: 'pj'
    },
    {
      type: 'Kyykkaaja',
      image: 'kyykkaaja'
    },
    {
      type: 'Sammunut',
      image: 'sammunut_teekkari'
    },
    {
      type: 'N-fuksi',
      image: 'n-fuksi'
    },
    {
      type: 'Koodari',
      image: 'koodari'
    }
  ];
};

BasicGame.MainMenu.prototype = {





	players: new Array(),

	findCardById: function(playerData , cardId){

		for(var i = 0;i < playerData.cardPack.length; i++){
				if(playerData.cardPack[i] && playerData.cardPack[i].id === cardId){
					return playerData.cardPack[i];
				}

			}
			for(i = 0;i < playerData.cardHand.length; i++){
				if(playerData.cardHand[i] && playerData.cardHand[i].id === cardId){
					return playerData.cardHand[i];
				}
			}
			for(i = 0;i < playerData.cardFloor.length; i++){
				if(playerData.cardFloor[i] && playerData.cardFloor[i].id === cardId){
					return playerData.cardFloor[i];
				}
			}





	},
	isTurn: false,
	endTurn: function(){


		this.players[0].cardSelected = null;

		for(var i = 0; i < 4; i++){

			if(this.players[0].cardFloor[i]){
				this.players[0].cardFloor[i].events.onInputDown.removeAll();

			}
		}

		for(var i = 0; i < 5; i++){
			if(this.players[0].cardHand[i]){
				this.players[0].cardHand[i].events.onInputDown.removeAll();
			}
		}

		for(var i = 0; i < 20; i++){
			if(this.players[0].cardPack[i]){
				this.players[0].cardPack[i].events.onInputDown.removeAll();
			}
		}

		this.sendEvent('endTurn');


	},
	startTurn: function(){


		var game = this;


		for(var i = 0; i < 5; i++){
			if(this.players[0].cardHand[i]){

				var buf = this.players[0].cardHand[i];

				//buf.events.onInputDown.add(function(buf){buf.sendToHand(game.players[0].cardPack,this,'turn');} , this);
				buf.inputEnabled = true;
				buf.events.onInputDown.add(function(buf){buf.sendToFloor(game.players[0].cardHand,this,'turn');} , this);
			}
		}

		for(var i = 0; i < 20; i++){
			if(this.players[0].cardPack[i]){

				var buf = this.players[0].cardPack[i];
				buf.inputEnabled = true;
				buf.events.onInputDown.add(function(buf){ buf.sendToHand(game.players[0].cardPack,this,'turn');} , this);
			}
		}
//
		for(var i = 0; i < 4; i++){

			if(this.players[0].cardFloor[i]){
				var buf = this.players[0].cardFloor[i];
				buf.events.onInputDown.removeAll();
				buf.inputEnabled = true;
				buf.events.onInputDown.add(function(buf){buf.selectAndAttack(game);} , this);

			}


		}

		for(var i = 0; i < 4; i++){

			if(this.players[1].cardFloor[i]){
				var buf = this.players[1].cardFloor[i];
				buf.events.onInputDown.removeAll();
				buf.inputEnabled = true;
				buf.events.onInputDown.add(function(buf){buf.targeted(game);} , this);

			}


		}


	},
	
	getEvent: function(parsedData){


		if(!parsedData || !parsedData.data || !parsedData.data.eventType) return;

		if(parsedData.playerId == BasicGame.playerId){

			/*if(parsedData.data.eventType === 'toHand'){
				var card = this.findCardById(this.players[0] , parsedData.data.card_id);
			//	card.sendToHand(this.players[0].cardFloor,this,null,"host");
				if(parsedData.data.eventInfo === 'fromFloor'){

				}
				else if(parsedData.data.eventInfo === 'fromPack'){
					card.sendToHand(this.players[0].cardFloor,this,null,"host",true);
				}
			}
			else if(parsedData.data.eventType === 'toFloor'){

				var card = this.findCardById(this.players[0] , parsedData.data.card_id);

				card.sendToFloor(this.players[0].cardHand,this,null,"host",true);



			}
			else if(parsedData.data.eventType === 'endTurn'){



			}
			else if(parsedData.data.eventType === 'attackTo'){



			}*/


		}
		else{

			if(parsedData.data.eventType === 'gameStart'){


				for(var i = 0; i < parsedData.data.cardPackHost.length; i++){

					this.players[1].cardPack.push(new Card(this,100, 300,parsedData.data.cardPackHost[i].Name ,this.players[1],parsedData.data.cardPackHost[i].frontName,null,parsedData.data.cardPackGuest[i].id));

				}

				for(var i = 0; i < parsedData.data.cardPackGuest.length; i++){

					this.players[0].cardPack.push(new Card(this,900, 300,parsedData.data.cardPackGuest[i].Name ,this.players[0],parsedData.data.cardPackGuest[i].frontName,null,parsedData.data.cardPackGuest[i].id));

				}






				for(var i = 0; i < 20; i++)
				{
					this.add.existing(this.players[0].cardPack[i]);
					this.add.existing(this.players[1].cardPack[i]);
				}

			}
			else if(parsedData.data.eventType === 'toHand'){
				var card = this.findCardById(this.players[1] , parsedData.data.card_id);

				card.sendToHand(this.players[1].cardFloor,this,null,"host",true);
			}
			else if(parsedData.data.eventType === 'toFloor'){

				var card = this.findCardById(this.players[1] , parsedData.data.card_id);

				card.sendToFloor(this.players[1].cardHand,this,'turn',"host",true);

			}
			else if(parsedData.data.eventType === 'endTurn'){

				this.startTurn();

			}
			else if(parsedData.data.eventType === 'attackTo'){



			}
		}






	},
	sendEvent: function(type,addinfo){

		var game = this;
		var guestArray = new Array();
		var hostArray = new Array();

		if(type === 'gameStart'){
			var saveObject = function(Name,frontName,id){

		    this.Name = Name;



			this.frontName = frontName;


			this.id = id;

			};

			for(var i = 0; i < this.players[0].cardPack.length; i++){


					hostArray.push(new saveObject(this.players[0].cardPack[i].Name,this.players[0].cardPack[i].frontName,this.players[0].cardPack[i].id));
				
			}

			for(var i = 0; i < this.players[1].cardPack.length; i++){


					guestArray.push(new saveObject(this.players[1].cardPack[i].Name,this.players[1].cardPack[i].frontName,this.players[1].cardPack[i].id));
				

			}
		}




		if(type === 'gameStart'){
			this.postEvent(



			{
			eventType: type,
			eventInfo: '',
			card_id: addinfo,
			cardPackHost: hostArray,
			cardPackGuest: guestArray

			}


			);
		}

		if(type === 'toHand'){
			this.postEvent(



			{
				eventType: type,
				eventInfo: '',
				card_id: addinfo


			}


			);


		}
		else if(type === 'toFloor'){
			this.postEvent(



			{
				eventType: type,
				eventInfo: '',
				card_id: addinfo


			}


			);
		}
		else if(type === 'endTurn'){
			this.postEvent(



			{
				eventType: type,
				eventInfo: ''


			}


			);
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


		this.background = this.game.add.tileSprite(0, 0, 1024, 720, "background");
		//this.add.sprite(0, 0, 'titlepage');
		//this.players.splice(0,this.players.length);
		this.endTurnButton = this.add.button(
	      this.world.centerX + 300,
	      450,
	      'end',
	      this.endTurn,
	      this,
	      2,
	      1,
	      0
	    );


		this.players.push(new Player(this,0,0,'Player'));
		this.players.push(new Player(this,0,0,'Opponent'));
		var game = this;
    	if(BasicGame.playerId === "host"){


    		for(var i = 0; i < 20; i++){
          nOCards = this.availableCards.length;
          var rand = Math.floor(Math.random() * nOCards)


			var buf = new Card(this,900, 300,this.availableCards[rand].type ,this.players[0],this.availableCards[rand].image);
			buf.inputEnabled = true;
			buf.anchor.set(0.5);
			var text = game.add.text(-10, 25, buf.dmg+"    "+buf.health, {font: "16px Arial", fill: "#000000"});
			if (buf.health != undefined && buf.dmg != undefined ) {
			buf.addChild(text);
			}
			buf.events.onInputDown.add(function(buf){buf.sendToHand(game.players[0].cardPack,this,'turn');} , this);
			this.players[0].cardPack.push(buf);
			}

			for(var i = 0; i < 20; i++){
        nOCards = this.availableCards.length;
        var rand = Math.floor(Math.random() * nOCards)


			var buf = new Card(this,100, 300,this.availableCards[rand].type,this.players[1],this.availableCards[rand].image);
			buf.inputEnabled = true;
			buf.anchor.set(0.5);
			//buf.events.onInputDown.add(function(buf){buf.sendToHand(game.players[1].cardPack,this,'turn');} , this);

			this.players[1].cardPack.push(buf);
			}
			this.sendEvent('gameStart');
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
		if(BasicGame.playerId === "host"){

			for(var i = 0; i < 20; i++)
				{
					this.add.existing(this.players[0].cardPack[i]);
					this.add.existing(this.players[1].cardPack[i]);
				}
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
    this.counter++;
	    if (this.counter >= this.limit)
	    {
	      this.counter = 0;
	      this.getEvents();
	    }
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

  postEvent: function (json) {
    instance = this;
    $.ajax({
      type: "POST",
      url: API_URL + '?action=addevent',
      data: {
        "sessionId": BasicGame.sessionId,
        "playerId": BasicGame.playerId,
        "data": json
      },
      success: function(data){
      },
    });
  },

  fight: function (card1, card2) {
		card1.health -= card2.dmg;
		card2.health -= card1.dmg;
		//return [card1,card2];
	},

  getEvents: function() {
    instance = this;
    $.ajax({
      type: "GET",
      url: API_URL + '?action=getevents' + '&sessionId=' + BasicGame.sessionId,
      success: function(data){
        if (data !== "") {
          //instance.getEvent(data);
          instance.handleEventQueue(data);
        }
      },
    });
  },

  handleEventQueue: function(data) {
    var parsedData = JSON.parse(data);
    if(this.latestHandledEvent === null) {
      this.getEvent(parsedData[0]);

      this.latestHandledEvent = 0;
    }
    var i = this.latestHandledEvent + 1;
    for (i; i < parsedData.length; i++) {
      this.getEvent(parsedData[i]);

      this.latestHandledEvent = i;
    }

  }


};
