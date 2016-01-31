
BasicGame.Lobby = function (game) {
  this.interval = 0;
  this.limit = 150;
};

BasicGame.Lobby.prototype = {
  create: function () {
    this.background = this.game.add.tileSprite(0, 0, 1024, 720, "background");
    this.add.text(
      this.world.centerX - 200,
      80,
      'Waiting for opponent',
      {
        "font": '50px Calibri',
        "fill": '#cc0000'
      });

    this.add.text(
      this.world.centerX - 85,
      this.world.centerY - 20,
      'ID:' + BasicGame.sessionId,
      {
        "font": '50px Calibri',
        "fill": '#cc0000'
      });
     var wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
     wKey.onDown.addOnce(function () {this.state.start('MainMenu')}, this);
  },

  update: function () {
    this.interval++;
    if(this.interval >= this.limit) {
      this.interval = 0;
      this.poll();
    }
  },

  poll: function() {
    lobby = this;
    $.ajax({
      type: "GET",
      url: API_URL + '?action=getoccupied' + '&sessionId=' + BasicGame.sessionId,
      success: function(data){
        if (data === 'occupied') {
          lobby.state.start('MainMenu');
        }
      },
    });
  }

};
