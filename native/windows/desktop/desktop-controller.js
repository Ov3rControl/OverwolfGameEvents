function registerEvents() {
  console.log("Register Events Fired")
  // general events errors
  overwolf.games.events.onError.addListener(function (info) {
    console.log("Error: " + JSON.stringify(info));
  });

  // "static" data changed (total kills, username, steam-id)
  // This will also be triggered the first time we register
  // for events and will contain all the current information
  overwolf.games.events.onInfoUpdates2.addListener(function (info) {
    console.log("Info UPDATE: " + JSON.stringify(info));
  });

  // an event triggerd
  overwolf.games.events.onNewEvents.addListener(function (info) {
    console.log("EVENT FIRED: " + JSON.stringify(info));
  });
}

function gameLaunched(gameInfoResult) {
  if (!gameInfoResult) {
    return false;
  }

  if (!gameInfoResult.gameInfo) {
    return false;
  }

  if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
    return false;
  }

  if (!gameInfoResult.gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfoResult.gameInfo.id / 10) != 5426) {
    return false;
  }

  overwolf.games.events.getInfo(function (info) {
    console.log(info);
  });
  return true;

}

function gameRunning(gameInfo) {

  if (!gameInfo) {
    return false;
  }

  if (!gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfo.id / 10) != 5426) {
    return false;
  }

  overwolf.games.events.getInfo(function (info) {
    console.log(info);
  });
  return true;

}


(function setFeatures(sec) {
  setInterval(function () {
    overwolf.games.events.getInfo(function (info) {
      fetch('http://192.168.1.101:8080/users/test', {
          method: 'POST',
          body: JSON.stringify({
            title: [info],
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => console.log(json))
      console.log(info);
      overwolf.games.launchers.events.getInfo(10902, function (info) {
        console.log(info)
      })
    });
  }, sec * 500);

})(60);


// Start here
overwolf.games.onGameInfoUpdated.addListener(function (res) {
  if (gameLaunched(res)) {
    registerEvents();
    console.log("Game Launched : " + JSON.stringify(res))
  }
  overwolf.games.events.onInfoUpdates2.addListener(function (info) {
    console.log("Info UPDATE: " + JSON.stringify(info));
  });
  overwolf.games.events.executed.addListener(function (info) {
    console.log('EVENT FIRED: ' + JSON.stringify(info));
  });
  overwolf.games.events.getInfo(function (info) {
    console.log("Deaths: " + info.res.game_info.deaths);
  });
});


overwolf.games.getRunningGameInfo(function (res) {
  if (gameRunning(res)) {
    registerEvents();
  }
  console.log("getRunningGameInfo: " + JSON.stringify(res));
});