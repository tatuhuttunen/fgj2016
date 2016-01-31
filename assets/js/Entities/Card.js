//  Here is a custom game object
Card = function (game, x, y, Name, upper, frontName,backName,id) {

    Phaser.Sprite.call(this, game, x, y, 'card');

    this.Name = Name;
   	this.active = false;
	this.turning = true;

	this.backName = backName || 'card_back';
	this.frontName = frontName;
	this.upper = upper;

	this.id = id || (this.upper.cardPack.length + "PLAYER");
	this.game = game;
	if (Name == 'Stuba') {
		this.health=5;
		this.dmg=5;
	}
	else if (Name == 'Fuksi'){
		this.health=1;
		this.dmg=2;
	}
	else if (Name == 'Teekkari'){
		this.health=3;
		this.dmg=2;
	}
	else if (Name == 'Tuutori'){
		this.health=2;
		this.dmg=2;
	}
	else if (Name == 'FV'){
		this.health=4;
		this.dmg=3;
	}
	else if (Name == 'PJ'){
		this.health=3;
		this.dmg=2;
	}
	else if (Name == 'Kyykkaaja'){
		this.health=2;
		this.dmg=2;
	}
	else if (Name == 'Sammunut'){
		this.health=1;
		this.dmg=0;
	}
	else if (Name == 'N-fuksi'){
		this.health=5;
		this.dmg=4;
	}
	else if (Name == 'Koodari'){
		this.health=3;
		this.dmg=4;
	}
	else if (Name == 'Bussi'){
		this.health=6;
		this.dmg=2;
	}
	else if (Name == 'Ikiteekkari'){
		this.health=7;
		this.dmg=6;
	}
};


Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;


/**
 * Automatically called by World.update
 */
Card.prototype.update = function() {

    //this.angle += this.rotateSpeed;

};
Card.prototype.sendToHand = function(compare_array,game,command,playerName,handlingEvent) {

	this.events.onInputDown.removeAll();
    //this.angle += this.rotateSpeed;
	var len  = 0;
    for(var b = 0; b < 5; b++){
    	if(this.upper.cardHand[b]){

    		len++;
    	}


    }
  
    var buf = this;


    //Check available slot
  
    for(var z = 0; z < 5; z++){

    	if(!this.upper.cardHand[z]){

    		this.upper.cardHand[z] = this;
    	
    		break;
    	}

    }

var xpos = 456 + ((z-1)*80);
var ypos = 0;
	if(playerName && playerName == "host" ){

	    //1024 / 2, 512 /2, 256 + (5*80)
	  	ypos = 100;
	}
	else{

		ypos = 600;

	}


    if(len < 5){
    	var tween = game.add.tween(this).to({ x: xpos, y: ypos },1500,Phaser.Easing.Exponential.Out, true);
    	
		for(var i = 0; i < compare_array.length; i++){
			if(compare_array[i] && compare_array[i].Name === this.Name){
				compare_array[i] = null;
				
				break;
			}
		}
		tween.onComplete.add(function(){
			if(command && command === 'turn'){
				game.setTurning(buf);
			}
			
			if(!handlingEvent){
				game.sendEvent('toHand',buf.id);
			}
		
			buf.events.onInputDown.add(function(buf){buf.sendToFloor(buf.upper.cardHand,game,null,"host");} , game);
		});
		
    }
	
	

};
Card.prototype.selectAndAttack = function(game){


	this.upper.cardSelected = this;


};
Card.prototype.targeted = function(game){

	//resolve attacking	

};
Card.prototype.sendToFloor = function(compare_array,game,command,playerName,handlingEvent) {
	console.log("täs mä");
	this.events.onInputDown.removeAll();
    //this.angle += this.rotateSpeed;
    var len  = 0;
    for(var b = 0; b < 5; b++){
    	if(this.upper.cardFloor[b]){
    		console.log(this.upper.cardFloor[b],"hup");
    		len++;
    	}


    }
    var buf = this;
//	game.setTurning(buf,'firstImg');
    //1024 / 2, 512 /2, 256 + (5*80)
	    for(var z = 0; z < 4; z++){

    	if(!this.upper.cardFloor[z]){
    		this.upper.cardFloor[z] = this;
    		break;
    	}
    	else{
    		console.log(this.upper.cardFloor[z],"kul");
    	}

    }

    //1024 / 2, 512 /2, 256 + (5*80)
	var xpos = 456 + ((z-1)*80);
	var ypos = 0;
	if(playerName && playerName == "host" ){

	    //1024 / 2, 512 /2, 256 + (5*80)
	  	ypos = 275;
	}
	else{

		ypos = 375;

	}


    if(len < 4){
    	var tween = game.add.tween(this).to({ x: xpos, y: ypos },1500,Phaser.Easing.Exponential.Out, true);
    	
		for(var i = 0; i < compare_array.length; i++){
			if(compare_array[i] && compare_array[i].Name === this.Name){
				compare_array[i] = null;
				
				break;
			}
		}
		tween.onComplete.add(function(buf){
		//	game.setTurning(buf);


			if(command && command === 'turn'){
				game.setTurning(buf);
			}

			if(!handlingEvent){
				game.sendEvent('toFloor',buf.id);
			}

			//buf.events.onInputDown.add(function(buf){buf.selectAndAttack(game);} , game);
			//buf.events.onInputDown.add(function(buf){buf.sendToHand(buf.upper.cardFloor,game);} , game);
			
		});
		
    }
	
	

};
