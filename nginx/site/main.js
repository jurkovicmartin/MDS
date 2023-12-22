// Fetch JSON data
fetch('config.json')
  .then(response => response.json())
  .then(playerData => {
    // Loop through playerData and create HTML dynamically
    playerData.forEach(function(playerInfo) {
      var playerHTML = `
        <div class="col-md-6 mb-4">
          <h4>${playerInfo.title}</h4>
          <video id="${playerInfo.id}" class="video-js vjs-default-skin player" preload="auto" width="400" height="264" poster="${playerInfo.poster}" muted="true">
            <source src="${playerInfo.source}" type="application/x-mpegURL">
            Tento prohlížeč nepodporuje přehrávání videa.
          </video>
          <button type="button" class="info">Podrobnosti</button>
        </div>
      `;

      // Append the generated HTML to the container
      document.querySelector('.row').innerHTML += playerHTML;
    });

    // Initialize videojs for each player
    var players = {};
    playerData.forEach(function(playerInfo) {
      players[playerInfo.id] = videojs(playerInfo.id);
    });

    var videoPlayers = document.querySelectorAll('.player');

    // Adding events to players
    videoPlayers.forEach(function(player, index) {
      player.addEventListener('mouseover', function() {
          mouseOver(videoPlayers, index);
      });
      player.addEventListener('mouseout', function() {
          mouseOut(videoPlayers, index);
      });
      player.addEventListener('click', function(){
          onClick(playerData, index);
      });
    });

    var buttons = document.querySelectorAll('.info');

    // Adding event to buttons
    buttons.forEach(function(button, index){
      button.addEventListener('click', function(){
        buttonClick(playerData, index);
      });
    });

  })
  .catch(error => console.error('Error fetching JSON:', error));

// Start stream on mouse hover
function mouseOver(players, index){
  var currentPlayer = players[index].querySelector('video');
  currentPlayer.play();
}

// Pause stream
function mouseOut(players, index){
  var currentPlayer = players[index].querySelector('video');
  currentPlayer.pause();
}

// Calling popup with stream player
function onClick(data, index){
  var modal = new bootstrap.Modal('#playerModal');

  var modalPlayer = inicilizePlayerWithQualities('modalPlayer', data, index);

  var modalTitle = document.getElementById('modalTitle');
  var modalAdress = document.getElementById('modalAdress');

  // Setting window descriptions
  modalTitle.textContent = data[index].title;
  modalAdress.textContent = 'Adresa: ' + data[index].source;

  modal.show();
  
  // Stopping stream after cancelling the window
  modal._element.addEventListener('hidden.bs.modal', function() {
      modalPlayer.pause();
  });
}

// Calling popup with description
function buttonClick(data, index){
  var modal = new bootstrap.Modal('#infoModal');
  var modalInfo = document.getElementById('modalInfo');

  modalInfo.textContent = data[index].info;
  modal.show();
}

// Setting stream players with quality selection
function inicilizePlayerWithQualities(playerID, data, index){

  // Inicilize player
  var player = videojs(playerID, {
    controls: true,
    autoplay: true,
    plugins: {
        videoJsResolutionSwitcher: {
          default: '1000',
          dynamicLabel: true
        }
    }
    }, function () {
    // Add dynamically sources via updateSrc method
      player.updateSrc([
        {
          src: data[index].source,
          type: 'application/x-mpegURL4',
          label: 'auto',
          res: '1000'
        },
        {
          src: data[index].source480,
          type: 'application/x-mpegURL4',
          label: '480',
          res: '480'
        },
        {
          src: data[index].source360,
          type: 'application/x-mpegURL4',
          label: '360',
          res: '360'
        },
        {
          src: data[index].source144,
          type: 'application/x-mpegURL4',
          label: '144',
          res: '144'
        }
    ]);
  });

  return player;
}