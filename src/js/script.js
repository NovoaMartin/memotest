const $board = document.querySelector("#board");
const $tiles = $board.querySelectorAll(".tile");
const $gameOver = document.querySelector("#gameOver");
let round = 0;
let $firstClicked = null;
setup();

function setup() {
  const colorsBase = ["red", "green", "blue", "yellow", "black", "white"];
  const colors = colorsBase.concat(colorsBase);
  setTiles($tiles, colors);
  eventHandler();
}

function setTiles($tiles, colors) {
  colors = shuffle(colors);
  for (let i = 0; i < $tiles.length; i++) {
    $tiles[i].classList.add(`${colors[i]}`);
  }
}

function shuffle(array) {
  //Fisher-Yates Shuffle algorithm
  //https://bost.ocks.org/mike/shuffle/
  var copy = [],
    n = array.length,
    i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

function eventHandler() {
  $board.onclick = (e) => {
    const $clicked = e.target;
    if ($clicked.classList.contains("tile")) {
      handleClick($clicked);
    }
  };
}

function handleClick($clicked) {
  show($clicked);
  if ($firstClicked === null) {
    $firstClicked = $clicked;
  } else {
    if ($firstClicked === $clicked) {
      return;
    }

    round++;

    if (areEqual($clicked, $firstClicked)) {
      removeTile($clicked);
      removeTile($firstClicked);
    } else {
      hide($clicked);
      hide($firstClicked);
    }
    $firstClicked = null;
  }
}

function show($clicked) {
  $clicked.style.opacity = "1";
}
function hide($clicked) {
  setTimeout(() => {
    $clicked.style.opacity = "0";
  }, 500);
}
function removeTile($tile) {
  setTimeout(() => {
    $tile.parentElement.classList.add("done");
    $tile.remove();
    isOver();
  }, 500);
}

function areEqual($clicked, $firstClicked) {
  return $clicked.className === $firstClicked.className;
}

function isOver() {
  const over = document.querySelectorAll(".tile").length === 0;
  if (over) {
    $gameOver.querySelector("strong").textContent = round;
    $board.style.display = "none";
    $gameOver.style.display = "block";
  }
}
