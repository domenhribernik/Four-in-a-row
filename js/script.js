var turn = 0
var colMax = 7
var rowMax = 6 + 1
var moves = colMax * (rowMax-1)
console.log(moves);
var gameArr = []
const player = document.getElementById("player")
console.log(player)
var game = document.getElementById("game")
const display = document.getElementById("game-display")
const p1 = document.getElementById("player1")
const p2 = document.getElementById("player2")
const p1Coin = document.getElementById("p1-coin")
const p2Coin = document.getElementById("p2-coin")
const turnText = document.getElementById("turn-text")
const gameBtn = document.getElementById("game-btn")
var gameOverBool = false
var color = 0

var updateScore = () => {
  turn==1&&gameBtn.value!=="New Game"?(player.innerText=p1.value,p1Coin.classList.add("glow-coin"), p2Coin.classList.remove("glow-coin")):
  turn==2&&gameBtn.value!=="New Game"?(player.innerText=p2.value, p2Coin.classList.add("glow-coin"), p1Coin.classList.remove("glow-coin")): 
  (p2Coin.classList.remove("glow-coin"), p1Coin.classList.remove("glow-coin"))
  

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
  moves===0?gameOver(null, [], true):null
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
      gameArr[i].push(0)
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
  moves -= 1
  let block = e.target
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

var gameOver = (p, winArr, draw) => {
  draw?turnText.innerText="Draw!":turnText.innerText=`${p} wins!`
  gameBtn.value="New Game"
  player.style.display="none"
  document.getElementById("game").childNodes.forEach(e => e.classList.add("dark-coin"))
  winArr.forEach(e => document.getElementById("game").childNodes[e[0]*7 + e[1]].classList.remove("dark-coin"))
  winArr.forEach(e => document.getElementById("game").childNodes[e[0]*7 + e[1]].classList.add("glow-coin"))
  game.removeEventListener("click", placeToken)
  gameOverBool = true
  game.childNodes.forEach(e => {
    e.classList.remove("yellow-turn")
    e.classList.remove("red-turn")
  })
}
//bw or glow??
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
      if (horY === 4  && winArrY[0][0] == winArrY[3][0]) {
        gameOver(p1.value, winArrY, false)
        break
      }
      else if (horR === 4  && winArrR[0][0] == winArrR[3][0]) {
        gameOver(p2.value, winArrR, false)
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
        gameOver(p1.value, winArrY, false)
        break
      }
      else if (verR === 4) {
        gameOver(p2.value, winArrR, false)
        break
      }
    }
  }
}


var digCheck = () => {
  var winArrY = []
  var winArrR = []
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < colMax; j++) {
      if (i >= 3 && j >= 3) {
        if (gameArr[i][j] === 1 && gameArr[i-1][j-1] === 1 && gameArr[i-2][j-2] === 1 && gameArr[i-3][j-3] === 1) {
          winArrY.push([i, j], [i-1, j-1], [i-2, j-2], [i-3, j-3])
          gameOver(p1.value, winArrY, false)
          break
        }
        else if (gameArr[i][j] === 2 && gameArr[i-1][j-1] === 2 && gameArr[i-2][j-2] === 2 && gameArr[i-3][j-3] === 2) {
          winArrR.push([i, j], [i-1, j-1], [i-2, j-2], [i-3, j-3])
          gameOver(p2.value, winArrR, false)
          break
        }
      }
      if (i >= 3 && j <= colMax-2) {
        if (gameArr[i][j] === 1 && gameArr[i-1][j+1] === 1 && gameArr[i-2][j+2] === 1 && gameArr[i-3][j+3] === 1) {
          winArrY.push([i, j], [i-1, j+1], [i-2, j+2], [i-3, j+3])
          gameOver(p1.value, winArrY, false)
          break
        }
        else if (gameArr[i][j] === 2 && gameArr[i-1][j+1] === 2 && gameArr[i-2][j+2] === 2 && gameArr[i-3][j+3] === 2) {
          winArrR.push([i, j], [i-1, j+1], [i-2, j+2], [i-3, j+3])
          gameOver(p2.value, winArrR, false)
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