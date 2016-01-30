BasicGame.Setup = function (game) {
  this.createGameButton = null;
  this.joinGameButton = null;
};

BasicGame.Setup.prototype = {
  create: function () {
    this.createGameButton = this.add.button(
      this.world.centerX - 95,
      400,
      'frontcard_keerlo_himo',
      this.createGame,
      this,
      2,
      1,
      0
    );

    this.joinGameButton = this.add.button(
      this.world.centerX + 95,
      400,
      'frontcard_keerlo_himo',
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
  createGame: function () {
    var setupInstance = this;
    var sessionId = 'ABCDE';
    BasicGame.sessionId = sessionId;
    BasicGame.playerId = 'host';
    console.log(API_URL);
    $.ajax({
      type: "POST",
      url: API_URL + '?action=creategame',
      data: {
        "sessionId": sessionId
      },
      success: function(data){
        console.log(data);
        setupInstance.startGame();
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
        if (data === 'error')
        {
          setupInstance.joinGame();
        }
        else
        {
          setupInstance.startGame();
        }
      },
    });
  }
};
