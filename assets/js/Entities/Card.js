//  Here is a custom game object
Card = function (game, x, y, Name, upper, frontName,backName,id) {

    Phaser.Sprite.call(this, game, x, y, 'card');

    this.Name = Name;
   	this.active = false;
	this.turning = true;

	this.backName = backName || 'card_back';
	this.frontName = frontName;
	this.upper = upper;

	this.id = id || this.upper.cardPack.length + "PLAYER");
	this.game = game;
};


Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;


/**
 * Automatically called by World.update
 */
Card.prototype.update = function() {

    //this.angle += this.rotateSpeed;

};
Card.prototype.sendToHand = function(compare_array,game,command) {


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
if(this.Name.indexOf("Player") > -1){

    //1024 / 2, 512 /2, 256 + (5*80)
  	ypos = 600;
}
else{

	ypos = 100;

}


    if(len < 5){
    	var tween = game.add.tween(this).to({ x: xpos, y: ypos },1500,Phaser.Easing.Exponential.Out, true);
    	this.events.onInputDown.removeAll();
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
			
			game.sendEvent('toHand',buf.id);
			buf.events.onInputDown.add(function(buf){buf.sendToFloor(buf.upper.cardHand,game);} , game);
		});
		
    }
	
	

};
Card.prototype.selectAndAttack = function(game){


	this.upper.cardSelected = this;


};
Card.prototype.targeted = function(game){

	//resolve attacking	

};
Card.prototype.sendToFloor = function(compare_array,game,command) {

	
    //this.angle += this.rotateSpeed;
    var len  = 0;
    for(var b = 0; b < 5; b++){
    	if(this.upper.cardFloor[b]){

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

    }

    //1024 / 2, 512 /2, 256 + (5*80)
	var xpos = 456 + ((z-1)*80);
	var ypos = 0;
	if(this.Name.indexOf("Player") > -1){

	    //1024 / 2, 512 /2, 256 + (5*80)
	  	ypos = 350;
	}
	else{

		ypos = 250;

	}


    if(len < 4){
    	var tween = game.add.tween(this).to({ x: xpos, y: ypos },1500,Phaser.Easing.Exponential.Out, true);
    	this.events.onInputDown.removeAll();
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
			buf.events.onInputDown.add(function(buf){buf.selectAndAttack(game);} , game);
			//buf.events.onInputDown.add(function(buf){buf.sendToHand(buf.upper.cardFloor,game);} , game);
			
		});
		
    }
	
	

};
