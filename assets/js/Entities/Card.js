//  Here is a custom game object
Card = function (game, x, y, Name, Value, SpecialList) {

    Phaser.Sprite.call(this, game, x, y, 'card');

    this.Name = Name;
    this.Value = Value;

    this.id = (game.player_cardPack.length + "PLAYER");

	this.Specials = SpecialList || null;
	this.turning = true;
	this.frontName = 'frontcard_keerlo_himo';
	
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
Card.prototype.sendToHand = function(compare_array,game) {

    //this.angle += this.rotateSpeed;
    var len = game.player_cardHand.length;
    var buf = this;

    //1024 / 2, 512 /2, 256 + (5*80)
	var pos = 656 - (len*80);

    if(len < 5){
    	var tween = game.add.tween(this).to({ x: pos, y: 500 },1500,Phaser.Easing.Exponential.Out, true);
    	this.events.onInputDown.removeAll();
		for(var i = 0; i < compare_array.length; i++){
			if(compare_array[i].Name === this.Name){
				game.player_cardPack.splice(i,1);
				game.player_cardHand.push(this);
				break;
			}
		}
		tween.onComplete.add(function(){
			game.setTurning(buf);

			buf.events.onInputDown.add(function(buf){buf.sendToFloor(game.player_cardHand,game);} , game);
		});
		
    }
	
	

};
Card.prototype.sendToFloor = function(compare_array,game) {

	
    //this.angle += this.rotateSpeed;
    var len = game.player_cardFloor.length;
    var buf = this;
//	game.setTurning(buf,'firstImg');
    //1024 / 2, 512 /2, 256 + (5*80)
	var pos = 656 - (len*80);
	console.log(pos);
    if(len < 5){
    	var tween = game.add.tween(this).to({ x: pos, y: 350 },1500,Phaser.Easing.Exponential.Out, true);
    	this.events.onInputDown.removeAll();
		for(var i = 0; i < compare_array.length; i++){
			if(compare_array[i].Name === this.Name){
				game.player_cardHand.splice(i,1);
				game.player_cardFloor.push(this);
				break;
			}
		}
		tween.onComplete.add(function(buf){
		//	game.setTurning(buf);
			buf.events.onInputDown.add(function(buf){buf.sendToHand(game.player_cardFloor,game);} , game);
			
		});
		
    }
	
	

};
