const playField = document.getElementById('play-field');
// const [width, height] = [playField.width, playField.height];

const PLAYFIELD_SIZE = 3;

// const cellWidth = width / PLAYFIELD_SIZE;
// const cellHeight = height / PLAYFIELD_SIZE;

// const row = playField.insertRow(-1);
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1);
// cell1.innerHTML = "NEW CELL1";
// cell2.innerHTML = "NEW CELL2";

const drawGameField = () => {
  for (let i = 0, id = 0; i < PLAYFIELD_SIZE; i += 1) {
    const row = playField.insertRow(-1);
    for (let j = 0; j < PLAYFIELD_SIZE; j += 1) {
      const cell = row.insertCell(j);
      cell.setAttribute('class', 'cell');
      cell.setAttribute('id', id);
      cell.innerHTML = '';
      id += 1;
    }
  }
};

// const cells = document.getElementsByClassName('cell');

// Array.from(cells).forEach((cell) => {
//   cell.addEventListener('click', (test) => {
//     console.log(test);
//     cell.setAttribute('class', 'cell cell--x');
//   });
// });

class Player {
  constructor(name, typeOfCell) {
    this.name = name;
    this.typeOfCell = typeOfCell;
  }

  // drawCell() {
  //   switch (this.typeOfCell) {
  //     case 'x':
  //       return 'cell--disable cell--x';
  //     case 'o':
  //       return 'cell--disable cell--o';
  //     default:
  //       return 'cell';
  //   }
  // }

  static draw(step) {
    switch (step) {
      case 0:
        return 'cell--disable cell--x';
      case 1:
        return 'cell--disable cell--o';
      default:
        return 'cell';
    }
  }
}

let steps = 0;
const player1 = new Player('Player 1', 'cell--x');
const player2 = new Player('Player 2', 'cell--o');

const gameStart = () => {
  const cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach((cell) => {
    cell.addEventListener('click', () => {
      // const typeOfCell = steps % 2 === 0 ? player1.drawCell() : player2.drawCell();
      // cell.setAttribute('class', typeOfCell);
      // cell.setAttribute('class', player.step.drawCell());
      const whoseStep = steps % 2;
      cell.setAttribute('class', Player.draw(whoseStep));
      steps += 1;

      // if (steps >= PLAYFIELD_SIZE * 2 - 1) {
      //   checkForWin(whoseStep) === true ?
      // }
    });
  });
};

// const checkForWin = (whoseStep) => {
//   switch(whoseStep)
// };


drawGameField();
gameStart();

// test.onclick = function () {
//   for (const x of theText) {
//     x.classList.toggle('colorized');
//   }
// };

// const tealToggle = ({ target }) => console.log(target);

// test.onclick = tealToggle;

// test.onclick((event) => {
//   console.log(event);
// });

// canvas.onclick = (event) => {
//   if (event.region) {
//     console.log(`You clicked ${event.region}`);
//   }
// };

// for (let i = 0, size = cellWidth; i < GAME_FIELD_SZIE - 1; i += 1) {
//   ctx.strokeStyle = '#808080';
//   ctx.lineWidth = 5;
//   ctx.beginPath();
//   ctx.moveTo(size, 0);
//   ctx.lineTo(size, height);
//   ctx.stroke();
//   size += cellWidth;
// }

// for (let i = 0, size = cellHeight; i < GAME_FIELD_SZIE - 1; i += 1) {
//   ctx.strokeStyle = '#808080';
//   ctx.lineWidth = 5;
//   ctx.beginPath();
//   ctx.moveTo(0, size);
//   ctx.lineTo(width, size);
//   ctx.stroke();
//   size += cellHeight;
// }
