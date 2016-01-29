//  Here is a custom game object
Card = function (game, x, y, Name, Value) {

    Phaser.Sprite.call(this, game, x, y, 'star');

    this.Name = Name;
    this.Value = Value;

};


Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;

/**
 * Automatically called by World.update
 */
Card.prototype.update = function() {

    //this.angle += this.rotateSpeed;

};