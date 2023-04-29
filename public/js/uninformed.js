"use strict";

// for uninformed.ejs
let board = document.getElementById("board");
let submit = document.querySelector("#buttonSubmit");
let solution = document.querySelector("#solutions");

let ROW;
let COL;

const resetGame = function () {
  solution.innerHTML = "";
  board.innerHTML = "";
  submit.innerHTML = "";
  document.getElementById("rowsInput").value = "";
  document.getElementById("colsInput").value = "";
};

const boardInit = function () {
  debugger;
  let row = Number(document.getElementById("rowsInput").value);
  let col = Number(document.getElementById("colsInput").value);
  resetGame();

  // create board
  if (row <= 0 || col <= 0) {
    resetGame();
    return;
  }
  ROW = row;
  COL = col;
  for (let i = 0; i < row; i++) {
    const tr = board.insertRow();
    for (let j = 0; j < col; j++) {
      const td = tr.insertCell();
      td.className = "cell";
      td.setAttribute("onclick", "placeBomb(this.id)");
      td.setAttribute("id", i + "-" + j);
      tr.appendChild(td);
    }
  }
  const sub = document.getElementById("buttonSubmit");
  if (sub.childElementCount === 0) {
    const btn = document.createElement("button");
    btn.className = "ms-3 btn btn-dark";
    btn.setAttribute("onclick", "sendBoard()");
    btn.innerHTML = "Submit Board";
    sub.appendChild(btn);
  }
};

function placeBomb(id) {
  var box = document.getElementById(id);
  console.log(id);
  if (box.className === "cell") {
    box.className = "bomb";
  } else {
    box.className = "cell";
  }
}

function sendBoard() {
  var arr = new Array(ROW);
  for (let i = 0; i < ROW; i++) arr[i] = new Array(COL);

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (document.getElementById(i + "-" + j).className == "bomb") {
        arr[i][j] = "x";
      } else {
        arr[i][j] = "#";
      }
    }
  }

  console.log(arr);
  callUninformedApi(arr);
}

const callUninformedApi = function (arr) {
  fetch("/uninformed/solution", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arr),
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    getBoards(data);
  });
};

const getBoards = function (data) {
  debugger;
  const solutionPlace = document.querySelector("#solutions");
  const boards = [];
  for (let solution of data) {
    boards.push(parseStringToArray(solution));
  }
  for (let [index, sol] of boards.entries()) {
    const table = createsolutionBoard(sol, index);
    solutionPlace.appendChild(table);
  }
};
const parseStringToArray = function (str) {
  let arr = [];
  let row = [];
  for (let i = 2; i < str.length - 1; i++) {
    if (str[i] == "]" && row) {
      arr.push(row);
      row = [];
    }
    if (str[i] != "[" && str[i] != "]" && str[i] != "," && str[i] != " ") {
      if (str[i] === "*") row.push("f");
      else row.push(str[i]);
    }
  }
  return arr;
};

const createsolutionBoard = function (solution, uniq) {
  let table = document.createElement("table");
  table.className = "solution-table";
  const row = solution.length;
  const col = solution[0].length;
  for (let i = 0; i < row; i++) {
    const tr = table.insertRow();
    for (let j = 0; j < col; j++) {
      if (solution[i][j] == "x") {
        const td = tr.insertCell();
        td.className = "bomb";
        td.setAttribute("id", String(uniq) + i + "_" + j);
        td.innerText = ` `;
        tr.appendChild(td);
      } else if (solution[i][j] == "h" && solution[i][j + 1] == "h") {
        solution[i][j] = "@";
        solution[i][j + 1] = "@";
        const td = tr.insertCell();
        td.className = "dht";
        td.setAttribute("id", String(uniq) + i + "_" + j);
        td.setAttribute("colspan", 2);
        td.innerText = ` `;
        tr.appendChild(td);
      } else if (solution[i][j] == "v" && solution[i + 1][j] == "v") {
        solution[i][j] = "@";
        solution[i + 1][j] = "@";
        const td = tr.insertCell();
        td.className = "dvt";
        td.setAttribute("id", String(uniq) + i + "_" + j);
        td.setAttribute("rowspan", 2);
        td.innerText = ` `;
        tr.appendChild(td);
      } else if (solution[i][j] == "f") {
        solution[i][j] = "@";
        const td = tr.insertCell();
        td.className = "cell";
        td.setAttribute("id", String(uniq) + i + "_" + j);
        td.innerText = ` `;
        tr.appendChild(td);
      }
    }
  }
  return table;
};
