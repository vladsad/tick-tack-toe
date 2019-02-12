const canvas = document.getElementById('canvas');
const [width, height] = [canvas.width, canvas.height];
const ctx = canvas.getContext('2d');

const PLAYFIELD_SIZE = 5;

const cellWidth = width / PLAYFIELD_SIZE;
const cellHeight = height / PLAYFIELD_SIZE;

const players = [];
let steps = 0;
const gameCells = [];
let endGame = false;


const drawGameBorder = () => {
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 10;
  ctx.rect(0, 0, width, height);
  ctx.stroke();
};

const checkForWin = (player) => {
  let winCombinationCells = [];

  // verticals
  for (let i = 0; i < PLAYFIELD_SIZE; i += 1) {
    for (let j = 0; j < PLAYFIELD_SIZE; j += 1) {
      if (gameCells[j][i].mark === player.mark) {
        winCombinationCells.push(gameCells[j][i]);
      } else {
        winCombinationCells = [];
        break;
      }
    }
    if (winCombinationCells.length === PLAYFIELD_SIZE) {
      return winCombinationCells;
    }
    winCombinationCells = [];
  }

  // horisontal
  for (let j = 0; j < PLAYFIELD_SIZE; j += 1) {
    for (let i = 0; i < PLAYFIELD_SIZE; i += 1) {
      if (gameCells[j][i].mark === player.mark) {
        winCombinationCells.push(gameCells[j][i]);
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
    if (gameCells[i][i].mark === player.mark) {
      winCombinationCells.push(gameCells[i][i]);
    }
  }
  if (winCombinationCells.length === PLAYFIELD_SIZE) {
    return winCombinationCells;
  }
  winCombinationCells = [];
  for (let i = PLAYFIELD_SIZE - 1, j = 0; i >= 0 && j < PLAYFIELD_SIZE; i -= 1, j += 1) {
    if (gameCells[j][i].mark === player.mark) {
      winCombinationCells.push(gameCells[j][i]);
    }
  }
  if (winCombinationCells.length === PLAYFIELD_SIZE) {
    return winCombinationCells;
  }

  return [];
};

const drawWinCells = (cells) => {
  ctx.lineWidth = 5;
  ctx.fillStyle = '#00ff00';
  ctx.globalCompositeOperation = 'destination-over';
  cells.forEach((cell) => {
    ctx.beginPath();
    ctx.fillRect(cell.x, cell.y, cellWidth, cellHeight);
    ctx.stroke();
  });
};

const drawText = (text) => {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;

  ctx.font = 'bold 60px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
};

class GameCell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setMark(mark) {
    this.mark = mark;
  }

  isMarked() {
    return typeof this.mark !== 'undefined';
  }

  static isClickOnCell(pos, cell) {
    return pos.x > cell.x && pos.x < cell.x + cellWidth
    && pos.y > cell.y && pos.y < cell.y + cellHeight;
  }
}

class Player {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
  }

  static whosStep() {
    const index = steps % players.length;
    return players[index];
  }

  static drawMark(cell, player) {
    const cellCenter = {
      x: cell.x + cellWidth / 2,
      y: cell.y + cellHeight / 2,
    };

    switch (player.mark) {
      case 'tick':
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(cellCenter.x, cellCenter.y);
        ctx.lineTo(cellCenter.x + cellWidth / 4, cellCenter.y + cellHeight / 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellCenter.x, cellCenter.y);
        ctx.lineTo(cellCenter.x - cellWidth / 4, cellCenter.y - cellHeight / 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellCenter.x, cellCenter.y);
        ctx.lineTo(cellCenter.x + cellWidth / 4, cellCenter.y - cellHeight / 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellCenter.x, cellCenter.y);
        ctx.lineTo(cellCenter.x - cellWidth / 4, cellCenter.y + cellHeight / 4);
        ctx.stroke();
        break;
      case 'tack':
        ctx.strokeStyle = '#0000ff';
        ctx.beginPath();
        ctx.arc(cellCenter.x, cellCenter.y, cellWidth / 3, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 5:
        break;
      default:
    }
  }
}

const setPlayers = () => {
  players.push(new Player('PLAYER 1', 'tick'));
  players.push(new Player('PLAYER 2', 'tack'));
};

const drawCells = () => {
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 5;

  for (let j = 0, jGameCells = 0; j < height; j += cellHeight, jGameCells += 1) {
    gameCells[jGameCells] = [];
    for (let i = 0, iGameCells = 0; i < width; i += cellWidth, iGameCells += 1) {
      ctx.rect(i, j, cellWidth, cellHeight);
      ctx.stroke();
      gameCells[jGameCells][iGameCells] = new GameCell(i, j);
    }
  }
};

const runGame = () => {
  canvas.addEventListener('click', (e) => {
    if (endGame !== false) {
      return;
    }

    const pos = {
      x: e.layerX,
      y: e.layerY,
    };

    const player = Player.whosStep();
    const gameCellsflatten = [].concat(...gameCells);

    gameCellsflatten.forEach((cell) => {
      if (GameCell.isClickOnCell(pos, cell)) {
        if (cell.isMarked()) {
          return;
        }
        cell.setMark(player.mark);
        Player.drawMark(cell, player);
        steps += 1;
      }
    });

    if (steps >= PLAYFIELD_SIZE * 2 - 1) {
      const winCells = checkForWin(player);
      if (winCells.length !== 0) {
        endGame = true;
        drawWinCells(winCells);
        drawText(`${player.name} WIN`);
      }
    }

    if (steps === PLAYFIELD_SIZE ** 2 && !endGame) {
      endGame = true;
      drawText('DRAW');
    }
  });
};

drawGameBorder();
drawCells();
setPlayers();
runGame();
