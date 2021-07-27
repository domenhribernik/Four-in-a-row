var turn = 0
var colMax = 7
var rowMax = 6 + 1
var gameArr = []
const player = document.getElementById("player")
console.log(player)
var game = document.getElementById("game")
const display = document.getElementById("game-display")
const p1 = document.getElementById("player1")
const p2 = document.getElementById("player2")
const turnText = document.getElementById("turn-text")
const gameBtn = document.getElementById("game-btn")
var gameOverBool = false
var color = 0

var updateScore = () => {
  turn === 1 
  ? player.innerText = p1.value
  : player.innerText = p2.value
}
var rndPlayer = () => {
  turn = Math.round(Math.random()) + 1
  updateScore()
}
var createDisplay = () => {
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < colMax; j++) {
      let cell = document.createElement("div")
      cell.classList.add("display-cell")
      color!=0&&i!=0?cell.style.background = `hsl( ${color}, 80%, 67%)`:null
      display.appendChild(cell)
    }
  }
  game = document.createElement("div")
  game.id = "game"
  display.append(game)
  document.getElementById("outer-border").style.display = "inline-block"
  document.querySelector(".top-left-edge").style.display = "inline-block"
  document.querySelector(".bottom-right-edge").style.display = "inline-block"
}

var createGameArr = () => {
  gameArr = []
  for (let i = 0; i < rowMax; i++) {
    gameArr.push([])
    for (let j = 0; j < colMax; j++) {
      let cell = document.createElement("div")
      i == 0 ? cell.classList.add("first-row") : null 
      turn == 1 ? cell.classList.add("yellow-turn") : turn == 2 ? cell.classList.add("red-turn") : null
      cell.setAttribute("row", i)
      cell.setAttribute("col", j)
      game.appendChild(cell)
      gameArr[i].push(0)
      
    }
  }
  game.addEventListener("click", placeToken)
}
var updateGame = () => {
  game.innerHTML = ""
  for (let i = 0; i < rowMax; i++) {
    gameArr.push([])
    for (let j = 0; j < colMax; j++) {
      let cell = document.createElement("div")
      i == 0 ? cell.classList.add("first-row") : null
      turn == 1 && gameOverBool !== true ? cell.classList.add("yellow-turn") : turn == 2  && gameOverBool !== true ? cell.classList.add("red-turn") : null
      switch (gameArr[i][j]) {
        case 1:
          cell.classList.add("yellow")
          break;
        case 2:
          cell.classList.add("red")
          break;
        default:
          break;
      }
      cell.setAttribute("row", i)
      cell.setAttribute("col", j)
      game.appendChild(cell)
      gameArr[i].push(6)
    }
  }
}
var showGame = () => {
  if (turn !== 0) {
    restartGame()
  }
  gameBtn.value="Restart"
  turnText.innerText="'s turn"
  p1.value==""?p1.value="Player 1":null
  p2.value==""?p2.value="Player 2":null
  rndPlayer()
  createDisplay()
  createGameArr()
  p1.disabled = true
  p2.disabled = true
}
var restartGame = () => {
  location.reload()
}

var placeToken = (e) => {
  let block = e.target
  console.log(e.target);
  let col = parseInt(block.attributes.col.value)
  let row = parseInt(block.attributes.row.value)
  if (row==0&&gameArr[1][col]!==0) {}
  else if (gameArr[row][col] == 0) {
    turn === 1 
    ? (
      block.classList.add("yellow"),
      block.classList.remove("empty"),
      gameArr[row][col] = turn,
      turn = 2,
      updateGame()
      )
    : (
      block.classList.add("red"),
      block.classList.remove("empty"),
      gameArr[row][col] = turn,
      turn = 1,
      updateGame()
      ) 
    let i1 = setInterval(() => {
      if (row < rowMax) {
        if (gameArr[row+1][col] === 0) {
          gameArr[row][col] = 0
          row += 1;
          gameArr[row][col] = turn === 1 ? 2 : 1
          updateGame()
          console.log(row);
        }
        else if (gameArr[row+1][col] !== 0) {
          clearInterval(i1)
          horCheck()
          verCheck()
          digCheck()
          updateScore()
        }
      }
    }, 100)
  }
}

var gameOver = p => {
  gameBtn.value="New Game"
  turnText.innerText=`${p} wins!`
  player.style.display="none"
  game.removeEventListener("click", placeToken)
  gameOverBool = true
  updateGame()
}
//make a glow effect for wining circles
//make it responsive
//make the text glow on turn

var horCheck = () => {
  let horY = 0
  let horR = 0
  var winArrY = []
  var winArrR = []
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < colMax; j++) {
      if (gameArr[i][j] === 1) {
        horY += 1
        horR = 0
        winArrY.push([i, j])
        winArrR = []
      }
      else if (gameArr[i][j] === 2) {
        horR += 1
        horY = 0
        winArrY = []
        winArrR.push([i, j])
      }
      else {
        horR = 0
        horY = 0
        winArrY = []
        winArrR = []
      }
      if (horY === 4) {
        gameOver(p1.value)
        console.log(winArrY);
        break
      }
      else if (horR === 4) {
        gameOver(p2.value)
        console.log(winArrR);
        break
      }
    }
  }
}

var verCheck = () => {
  let verY
  let verR
  var winArrY = []
  var winArrR = []
  for (let j = 0; j < colMax; j++) {
    for (let i = 0; i < rowMax; i++) {
      if (gameArr[i][j] === 1) {
        verY += 1
        verR = 0
        winArrY.push([i, j])
        winArrR = []
      }
      else if (gameArr[i][j] === 2) {
        verR += 1
        verY = 0
        winArrY = []
        winArrR.push([i, j])
      }
      else {
        verY = 0
        verR = 0
        winArrY = []
        winArrR = []
      }
      if (verY === 4) {
        gameOver(p1.value)
        console.log(winArrY);
        break
      }
      else if (verR === 4) {
        gameOver(p2.value)
        console.log(winArrR);
        break
      }
    }
    console.log(verY + " " +verR);
  }
}


var digCheck = () => {
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < colMax; j++) {
      if (i >= 3 && j >= 3) {
        if (gameArr[i][j] === 1 && gameArr[i-1][j-1] === 1 && gameArr[i-2][j-2] === 1 && gameArr[i-3][j-3] === 1) {
          gameOver(p1.value)
          break
        }
        else if (gameArr[i][j] === 2 && gameArr[i-1][j-1] === 2 && gameArr[i-2][j-2] === 2 && gameArr[i-3][j-3] === 2) {
          gameOver(p2.value)
          break
        }
      }
      if (i >= 3 && j <= colMax-2) {
        if (gameArr[i][j] === 1 && gameArr[i-1][j+1] === 1 && gameArr[i-2][j+2] === 1 && gameArr[i-3][j+3] === 1) {
          gameOver(p1.value)
          break
        }
        else if (gameArr[i][j] === 2 && gameArr[i-1][j+1] === 2 && gameArr[i-2][j+2] === 2 && gameArr[i-3][j+3] === 2) {
          gameOver(p2.value)
          break
        }
      }
      else {
      }
    }
  }
}

var setColor = e => {
  color = e.value
  document.getElementById("outer-border").style.background = `linear-gradient(-40.4deg, hsl( ${color}, 39%, 39%) 50%, hsl( ${color}, 53%, 58%) 50%)`
  document.querySelectorAll("#game-display > div.display-cell:nth-child(n+8)").forEach(el => el.style.background = `hsl( ${color}, 80%, 67%)`)
  document.querySelector(".top-left-edge").style.borderBottom = `20px solid hsl( ${color}, 53%, 58%)`
  document.querySelector(".bottom-right-edge").style.borderLeft = `20px solid hsl( ${color}, 39%, 39%)`
}