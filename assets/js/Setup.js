BasicGame.Setup = function (game) {
  this.createGameButton = null;
  this.joinGameButton = null;
};

BasicGame.Setup.prototype = {
  create: function () {
    this.createGameButton = this.add.button(
      this.world.centerX - 220,
      350,
      'host',
      this.createGame,
      this,
      2,
      1,
      0
    );

    this.joinGameButton = this.add.button(
      this.world.centerX + 50,
      350,
      'join',
      this.joinGame,
      this,
      2,
      1,
      0
    );

  },
  update: function () {

    //  Do some nice funky main menu effect here

  },
  startGame: function (pointer) {
    //  And start the actual game
    this.state.start('MainMenu');

  },
  lobby: function (pointer) {
    //  And start the actual game
    this.state.start('Lobby');

  },
  generateSessionId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXY0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  createGame: function () {
    var setupInstance = this;
    var sessionId = this.generateSessionId();
    BasicGame.sessionId = sessionId;
    BasicGame.playerId = 'host';
    $.ajax({
      type: "POST",
      url: API_URL + '?action=creategame',
      data: {
        "sessionId": sessionId
      },
      success: function(data){
        setupInstance.lobby();
      },
    });
  },
  joinGame: function () {
    var setupInstance = this;
    var sessionId = prompt('Which game do you which to join?');
    BasicGame.sessionId = sessionId;
    BasicGame.playerId = 'guest';
    $.ajax({
      type: "POST",
      url: API_URL + '?action=joingame',
      data: {
        "sessionId": sessionId
      },
      success: function(data){
        if (data === 'error') {
          alert('Game not available!');
        }
        else {
          setupInstance.startGame();
        }
      },
    });
  }
};
