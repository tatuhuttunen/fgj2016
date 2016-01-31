//  Here is a custom game object
Player = function (game, x, y, Name) {

   // Phaser.Sprite.call(this, game, x, y, 'card');
    this.Name = Name;
    this.cardPack =  new Array();
    

    this.cardHand = new Array();
   

    this.cardFloor = new Array();
    this.cardSelected = null;  
    this.targetCard = null;
	this.game = game;
};


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


/**
 * Automatically called by World.update
 */
Player.prototype.update = function() {

    //this.angle += this.rotateSpeed;

};

