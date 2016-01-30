//  Here is a custom game object
Card = function (game, x, y, Name, Value, SpecialList) {

    Phaser.Sprite.call(this, game, x, y, 'card');

    this.Name = Name;
    this.Value = Value;

	this.Specials = SpecialList || null;
	this.turning = true;
	this.frontName = 'frontcard_keerlo_himo';


};


Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;


/**
 * Automatically called by World.update
 */
Card.prototype.update = function() {

    //this.angle += this.rotateSpeed;

};
