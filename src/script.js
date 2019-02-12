const playField = document.getElementById('play-field');
const PLAYFIELD_SIZE = 3;
const gameMatrix = new Array(PLAYFIELD_SIZE);

const drawGameField = () => {
  for (let i = 0; i < PLAYFIELD_SIZE; i += 1) {
    const row = playField.insertRow(-1);
    for (let j = 0; j < PLAYFIELD_SIZE; j += 1) {
      const cell = row.insertCell(j);
      cell.setAttribute('class', 'cell');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-column', j);
      cell.innerHTML = '';
    }
    gameMatrix[i] = new Array(PLAYFIELD_SIZE);
  }
};

const players = [];
let steps = 0;

const whosStep = () => {
  const index = steps % players.length;
  steps += 1;
  return players[index];
};

class Player {
  constructor(name, typeOfCell) {
    this.name = name;
    this.typeOfCell = typeOfCell;
  }

  static drawMark(player, cell) {
    gameMatrix[cell.getAttribute('data-row')][cell.getAttribute('data-column')] = player.typeOfCell;
    return `cell--disable  ${player.typeOfCell}`;
  }

  static checkForWin(player) {
    let winCombinationCells = [];

    // horizontals
    for (let i = 0; i < PLAYFIELD_SIZE; i += 1) {
      for (let j = 0; j < PLAYFIELD_SIZE; j += 1) {
        if (gameMatrix[i][j] === player.typeOfCell) {
          winCombinationCells.push({ row: i, column: j });
        } else {
          winCombinationCells = [];
          break;
        }
      }
      if (winCombinationCells.length === PLAYFIELD_SIZE) {
        return winCombinationCells;
      }
    }

    // verticals
    for (let i = 0; i < PLAYFIELD_SIZE; i += 1) {
      for (let j = 0; j < PLAYFIELD_SIZE; j += 1) {
        if (gameMatrix[j][i] === player.typeOfCell) {
          winCombinationCells.push({ row: j, column: i });
        } else {
          winCombinationCells = [];
          break;
        }
      }
      if (winCombinationCells.length === PLAYFIELD_SIZE) {
        return winCombinationCells;
      }
    }


    // diagonals
    // work nice with only main diagonals ( not even PLAYFIELD_SIZE )
    for (let i = 0; i < PLAYFIELD_SIZE; i += 1) {
      if (gameMatrix[i][i] === player.typeOfCell) {
        winCombinationCells.push({ row: i, column: i });
      }
    }
    if (winCombinationCells.length === PLAYFIELD_SIZE) {
      return winCombinationCells;
    }
    winCombinationCells = [];
    for (let i = PLAYFIELD_SIZE - 1, j = 0; i >= 0 && j < PLAYFIELD_SIZE; i -= 1, j += 1) {
      if (gameMatrix[i][j] === player.typeOfCell) {
        winCombinationCells.push({ row: i, column: j });
      }
    }
    if (winCombinationCells.length === PLAYFIELD_SIZE) {
      return winCombinationCells;
    }

    return [];
  }
}

const player1 = new Player('Player 1', 'cell--x');
players.push(player1);
const player2 = new Player('Player 2', 'cell--o');
players.push(player2);

const gameStart = () => {
  const cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach((cell) => {
    cell.addEventListener('click', () => {
      const player = whosStep();
      cell.setAttribute('class', Player.drawMark(player, cell));
      if (steps >= PLAYFIELD_SIZE * 2 - 1) {
        const winCells = Player.checkForWin(player, cell);
        if (winCells.length !== 0) {
          for (let i = 0; i < winCells.length; i += 1) {
            const winCell = winCells[i];
            document.querySelector(`[data-row="${winCell.row}"][data-column="${winCell.column}"]`).className += ' cell--win';
          }
        }
      }
    });
  });
};

drawGameField();
gameStart();
