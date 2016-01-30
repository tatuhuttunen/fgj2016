//  Here is a custom game object
Player = function (game, x, y, Name) {

   // Phaser.Sprite.call(this, game, x, y, 'card');
    this.Name = Name;
    this.cardPack =  new Array();
    

    this.cardHand = new Array();
   

    this.cardFloor = new Array();
  
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

