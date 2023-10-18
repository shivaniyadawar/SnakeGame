import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('board')
let snakeSpeed = 1

document.getElementById("startGameButton").addEventListener("click", startGame);
function startGame(){
    const selectedDifficulty = document.getElementById('difficultyInput').value.toLowerCase();
    if (selectedDifficulty !== 'easy' && selectedDifficulty !== 'medium') {
      alert('Please enter a valid difficulty: easy or medium.');
      return
    }

    setDifficulty(selectedDifficulty);
    window.requestAnimationFrame(main);
  }


function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return

  lastRenderTime = currentTime

  update()
  draw() 
}


function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}


  function setDifficulty(difficulty) {
    if (difficulty === 'easy') {
      snakeSpeed = 1; 
    } else if (difficulty === 'medium') {
      snakeSpeed = 3; 
    }
  }

  