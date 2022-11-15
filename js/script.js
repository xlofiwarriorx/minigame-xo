"use strict"; //строгий режим

let brickItems = document.querySelectorAll(".items__brick"); //Клеточки
let itemsWrapper = document.querySelector(".items"); //Обёртка клеточек
let restartButton = document.querySelector(".restart-button"); //Кнопка New Game
let winCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]; //Победные сочетания ходов

let player = "cross"; //Текущий игрок
let countSteps = 0; //Количество ходов
let gameOver = false; //Индикатор конца игры
let crossSteps = []; // Совершённые ходы Крестика
let zeroSteps = []; // Совершённые ходы Нолика

restartButton.addEventListener("click", clearField);
itemsWrapper.addEventListener("click", pushOnBrick);

function pushOnBrick(event) {
  let target = event.target;
  if (
    player == "cross" &&
    !gameOver &&
    !crossSteps.includes(Number(target.dataset.brick)) &&
    !zeroSteps.includes(Number(target.dataset.brick))
  ) {
    target.innerHTML = "X";
    crossSteps.push(Number(target.dataset.brick));
    countSteps++;
    checkEnd(crossSteps);
    player = "zero";
  } else if (
    player == "zero" &&
    !gameOver &&
    !crossSteps.includes(Number(target.dataset.brick)) &&
    !zeroSteps.includes(Number(target.dataset.brick))
  ) {
    target.innerHTML = "0";
    zeroSteps.push(Number(target.dataset.brick));
    countSteps++;
    checkEnd(zeroSteps);
    player = "cross";
  }
}

function clearField() {
  for (let i = 0; i < brickItems.length; i++) {
    brickItems[i].innerHTML = "";
    brickItems[i].style.background = "black";
  }
  crossSteps = [];
  zeroSteps = [];
  countSteps = 0;
  gameOver = false;
  player = "cross";
}

function checkEnd(data) {
  for (let i = 0; i < winCombinations.length; i++) {
    let countOfWinCombination = 0;
    let winResult = [];
    for (let j = 0; j < data.length; j++) {
      if (winCombinations[i].includes(data[j])) {
        countOfWinCombination++;
        winResult.push(data[j]);
      }
    }
    if (countOfWinCombination === 3) {
      for (let i = 0; i < winResult.length; i++) {
        brickItems[winResult[i]].style.background = "green";
      }
      gameOver = true;
      return;
    } else if (countSteps == 9) {
      gameOver = true;
      return;
    }
  }
}
