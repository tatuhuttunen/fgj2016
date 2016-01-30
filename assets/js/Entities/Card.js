//  Here is a custom game object
Card = function (game, x, y, Name, Value, SpecialList) {

    Phaser.Sprite.call(this, game, x, y, 'card');

    this.Name = Name;
    this.Value = Value;

	this.Specials = SpecialList || null;
	this.turning = true;



};


Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;


/**
 * Automatically called by World.update
 */
Card.prototype.update = function() {

    //this.angle += this.rotateSpeed;

};
Card.prototype.setTurning = function(){

	BasicGame.add.tween(this).to({ scale: 0},2000,Phaser.Easing.Linear.None, true);
}
Card.prototype.cardTurn = function(){
		

		if(this.turning){
			if(this.scale.x > 0){
			this.scale.x -= 0.1;

			}
			if(this.scale.x === 0){
				this.turning = false;
			}
		}
		else{
			if(this.scale.x < 1){
				BasicGame.changeImg(this,'frontcard_keerlo_himo');
				this.scale.x += 0.1;
			
			}
			if(this.scale.x === 1){
				this.turning = false;
			}
		}



};
		