/* eslint-disable require-jsdoc */

format = (x) => JSON.stringify(x);

function field(rowsCount, colsCount, mines) {
  const rows = [];

  // put mines in field. If no mine, start with zero
  for (let i = 0; i < rowsCount; i++) {
    rows[i] = [];
    for (let j = 0; j < colsCount; j++) {
      if (mines.map(format).includes('[' + i + ',' + j + ']')) {
        rows[i][j] = '*';
      } else {
        rows[i][j] = 0;
      }
    }
  }

  // * * *    (i-1,j-1)  (i-1, j)  (i-1, j+1)
  // * ? *    (i,j-1)       ?      (i,   j+1)
  // * * *    (i+1, j-1) (i+1, j)  (i+1, j+1)

  // sum numbers now that mines are there
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < colsCount; j++) {
      if (rows[i][j] != '*') {
        if (rows[i - 1] !== undefined &&
          rows[i - 1][j - 1] === '*') rows[i][j]++;
        if (rows[i - 1] !== undefined &&
          rows[i - 1][j] === '*') rows[i][j]++;
        if (rows[i - 1] !== undefined &&
          rows[i - 1][j + 1] === '*') rows[i][j]++;

        if (rows[i][j - 1] === '*') rows[i][j]++;
        if (rows[i][j + 1] === '*') rows[i][j]++;

        if (rows[i + 1] !== undefined &&
          rows[i + 1][j - 1] === '*') rows[i][j]++;
        if (rows[i + 1] !== undefined &&
          rows[i + 1][j] === '*') rows[i][j]++;
        if (rows[i + 1] !== undefined &&
          rows[i + 1][j + 1] === '*') rows[i][j]++;
      }
    }
  }

  return rows;
}

function clicou(event) {
  if (event.target.textContent === '*') {
    for (element of document.querySelectorAll('span')) {
      element.setAttribute('class', '');
    }
    alert('perdeu playboy!');
    window.location.reload();
  } else {
    event.target.childNodes[0].setAttribute('class', '');
  }
}

function drawTable(rows) {
  const table = document.getElementById('field');
  for (const row of rows) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (const col of row) {
      const td = document.createElement('td');
      const span = document.createElement('span');
      span.textContent = col;
      span.setAttribute('class', 'invisible');
      td.appendChild(span);
      tr.appendChild(td);
      td.addEventListener('click', clicou);
    }
  }
}

function randomMines(quantity, cols, rows) {
  mines = [];
  for (let i = 0; i < quantity; i++) {
    const positionRow = parseInt(Math.random() * rows);
    const positionCol = parseInt(Math.random() * cols);
    mines.push([positionRow, positionCol]);
  }
  return mines;
}

let mines = randomMines(10, 8, 8);
const myField = field(8, 8, mines);
drawTable(myField);


