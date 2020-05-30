document.addEventListener('DOMContentLoaded', function(){
  // dom refs
  let body = document.querySelector('body');
  let wireBox = document.getElementById('wirebox');
  let resetBtn = document.getElementById('reset');
  let timer = document.getElementById('timer');

  // game logic variables
  const STARTING_TIME = 30;
  let remainingTime = 0;
  let gameOver = true;
  let countDown = null; //will hold countdown interval

  let wiresToCut = [];

  let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false,
  };

  // event listeners
  resetBtn.addEventListener('click', reset);
  wireBox.addEventListener('click', wireClick);
  
  function reset(){
    timer.classList.remove('green');
    body.classList.remove('flat');
    for (let wire in wireState){
      wireState[wire] = false;
    }
    wiresToCut = [];

    for (let i = 0; i < wireBox.children.length; i++){
      let color = wireBox.children[i].id;
      wireBox.children[i].src = 'img/uncut-' + color + '-wire.png';
    }

    init();
  };

  function init(){
    remainingTime = STARTING_TIME;
    gameOver = false;
    console.log('init');
    // loop over wires
    for (const color in wireState){
      let randomNum = Math.random();
      if (randomNum > 0.5){
        wiresToCut.push(color);
      }
    }
    // debug
    console.log(wiresToCut);
    countDown = setInterval(updateClock, 1000);
    resetBtn.disabled = true;
  }

  function wireClick(e){
    console.log("You clicked " + e.target.id)
    let color = e.target.id;
    // IF the game is not over and the wire has not been cut
    console.log('you clicked ' + e.target.id);
    if (!gameOver && !wireState[color]) {
        e.target.src = "img/cut-" + color + '-wire.png';
        wireState[color] = true;
        let wireIndex = wiresToCut.indexOf(color);
        // If the wire has an index, it needs to be cut!
        if (wiresToCut > -1){
          console.log('correct');
          wiresToCut.splice(wireIndex, 1);
          if (wiresToCut.length < 1) {
            endGame(true);
          }
        } else {
          console.log('bad news');
          endGame(false);
        }
      }
  }

  function updateClock() {
    // console.log('clock updating');
    remainingTime--
    timer.textContent = '00:00:' + remainingTime;
    if (remainingTime <= 0) {
      endGame(false);
    }
  }

  function endGame(win) {
    console.log('win is ' + win);

    clearInterval(countDown)
    gameOver = true;
    resetBtn.disabled = false;
    if (win) {
      timer.classList.add('green');
    } else {
      body.classList.add('flat');
    }
  }

});


