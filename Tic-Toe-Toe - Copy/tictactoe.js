//This variable keeps track of whose turn it is.
let activePlayer = "X";
//This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

//This function is for placing an x or o in a square
function placeXOrO(squareNumber) {
  if (!selectedSquares.some((element) => element.includes(squareNumber))) {
    let select = document.getElementById(squareNumber);

    if (activePlayer === "X") {
      //If activePlayer is equal to 'X', the x.png is placed in HTml
      select.style.backgroundImage = 'url("../face-smile-regular-full.svg" )';
      //Active player may only be 'X' or 'O' so, if not 'X' it must be 'O'
    } else {
      //This acticePlayer is equal to'O', o.png is placed in HTML.
      select.style.backgroundImage =
        'url("../face-laugh-squint-regular-full.svg") ';
    }

    function checkWinConditions() {
      if (arrayIncludes("0x", "1x", "2x")) {
        drawWinLine(50, 100, 558, 100);
      } else if (arrayIncludes("3x", "4x", "5x")) {
        drawWinLine(50, 304, 558, 304);
      } else if (arrayIncludes("6x", "7x", "8x")) {
        drawWinLine(50, 508, 558, 508);
      } else if (arrayIncludes("0x", "3x", "6x")) {
        drawWinLine(100, 50, 100, 558);
      } else if (arrayIncludes("1x", "4x", "7x")) {
        drawWinLine(304, 50, 304, 558);
      } else if (arrayIncludes("2x", "5x", "8x")) {
        drawWinLine(508, 50, 508, 558);
      } else if (arrayIncludes("6x", "4x", "2x")) {
        drawWinLine(100, 508, 510, 90);
      } else if (arrayIncludes("0x", "4x", "8x")) {
        drawWinLine(100, 100, 520, 520);
      } else if (arrayIncludes("00", "10", "20")) {
        drawWinLine(50, 100, 558, 100);
      } else if (arrayIncludes("30", "40", "50")) {
        drawWinLine(50, 304, 558, 304);
      } else if (arrayIncludes("60", "70", "80")) {
        drawWinLine(50, 508, 558, 508);
      } else if (arrayIncludes("00", "30", "60")) {
        drawWinLine(100, 50, 100, 558);
      } else if (arrayIncludes("10", "40", "70")) {
        drawWinLine(304, 50, 304, 558);
      } else if (arrayIncludes("20", "50", "80")) {
        drawWinLine(508, 50, 508, 558);
      } else if (arrayIncludes("60", "40", "20")) {
        drawWinLine(100, 508, 510, 90);
      } else if (arrayIncludes("00", "40", "80")) {
        drawWinLine(100, 100, 520, 520);
      } else if (selectedSquares.length >= 9) {
        audio("../826418__emaavigne__little-glitchy-melody-g-major.mp3");
        setTimeout(function () {
          resetGame();
        }, 500);
      }

      function arrayIncludes(squareA, squareB, squareC) {
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);

        if (a === true && b === true && c === true) {
          return true;
        }
      }
    }
    //squareNumber and activePlayer are added to array.
    selectedSquares.push(squareNumber + activePlayer);
    checkWinConditions();

    if (activePlayer === "X") {
      activePlayer = "O";
    } else {
      activePlayer = "X";
    }
    audio("../826602__floomatic__duuwip.wav");
    if (activePlayer === "O") {
      disableClick();
      setTimeout(function () {
        computersTurn();
      }, 1000);
    }
    return true;
  }

  function computersTurn() {
    let success = false;
    let pickASquare;
    while (!success) {
      pickASquare = String(Math.floor(Math.random() * 9));
      if (placeXOrO(pickASquare)) {
        placeXOrO(pickASquare);
        success = true;
      }
    }
  }
}
function disableClick() {
  document.body.style.pointerEvents = "none";
  setTimeout(function () {
    document.body.style.pointerEvents = "auto";
  }, 1000);
}

function audio(audioURL) {
  let audio = new Audio(audioURL);
  audio.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
  const canvas = document.getElementById("win-lines");
  const c = canvas.getContext("2d");
  let x1 = coordX1,
    y1 = coordY1,
    x2 = coordX2,
    y2 = coordY2,
    x = x1,
    y = y1;

  function animateLineDrawing() {
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 820, 820);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    c.strokeStyle = "rgba(57, 10, 101, 0.8)";
    c.stroke();

    if (x1 <= x2 && y1 <= y2) {
      if (x < x2) {
        x += 10;
      }
      if (y < y2) {
        y += 10;
      }
      if (x >= x2 && y >= y2) {
        cancelAnimationFrame(animationLoop);
      }
    }
    if (x1 <= x2 && y1 >= y2) {
      if (x < x2) {
        x += 10;
      }
      if (y > y2) {
        y -= 10;
      }
      if (x >= x2 && y <= y2) {
        cancelAnimationFrame(animationLoop);
      }
    }
  }

  function clear() {
    const animationLoop = requestAnimationFrame(clear);
    c.clearRect(0, 0, 820, 820);
    cancelAnimationFrame(animationLoop);
  }
  disableClick();
  audio("../826405__riippumattog__evil-laugh-2.wav");
  animateLineDrawing();
  setTimeout(function () {
    clear();
    resetGame();
  }, 1000);
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    let square = document.getElementById(String(i));
    square.style.backgroundImage = " ";
  }

  selectedSquares = [];
}
