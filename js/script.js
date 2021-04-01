var turn = 0
var colMax = 7
var rowMax = 6
var gameArr = []
var player = document.getElementById("player")
console.log(player)
var game = document.getElementById("game")
var p1 = document.getElementById("player1")
var p2 = document.getElementById("player2")

var updateScore = () => {
  turn === 1 
  ? player.innerText = p1.value
  : player.innerText = p2.value
}
var rndPlayer = () => {
  turn = Math.round(Math.random()) + 1
  updateScore()
}
var createGameArr = () => {
  gameArr = []
  for (let i = 0; i < rowMax; i++) {
    gameArr.push([])
    for (let j = 0; j < colMax; j++) {
      let cell = document.createElement("div")
      cell.classList.add("cell")
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
      cell.classList.add("cell")
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
  rndPlayer()
  game.style.display = "grid"
  p1.disabled = true
  p2.disabled = true
}
var restartGame = () => {
  location.reload()
}

var placeToken = (e) => {
  let block = e.target
  let col = parseInt(block.attributes.col.value)
  let row = parseInt(block.attributes.row.value)
  turn === 1 
  ? (
    block.classList.add("yellow"),
    block.classList.remove("empty"),
    gameArr[row][col] = turn,
    turn = 2
    )
  : (
    block.classList.add("red"),
    block.classList.remove("empty"),
    gameArr[row][col] = turn,
    turn = 1
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

createGameArr()

var horCheck = () => {
  let horY = 0
  let horR = 0
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < colMax; j++) {
      if (gameArr[i][j] === 1) {
        horY += 1
        horR = 0
      }
      else if (gameArr[i][j] === 2) {
        horR += 1
        horY = 0
      }
      else {
        horR = 0
        horY = 0
      }
      if (horY === 4) {
        alert("player1 win")
        game.removeEventListener("click", placeToken)
        break
      }
      else if (horR === 4) {
        alert("player2 win")
        game.removeEventListener("click", placeToken)
        break
      }
    }
    horY = 0
    horR = 0
  }
}

var verCheck = () => {
  let verY
  let verR
  for (let j = 0; j < colMax; j++) {
    for (let i = 0; i < rowMax; i++) {
      if (gameArr[i][j] === 1) {
        verY += 1
        verR = 0
      }
      else if (gameArr[i][j] === 2) {
        verR += 1
        verY = 0
      }
      else {
        verY = 0
        verR = 0
      }
      if (verY === 4) {
        alert("player1 win")
        game.removeEventListener("click", placeToken)
        break
      }
      else if (verR === 4) {
        alert("player2 win")
        game.removeEventListener("click", placeToken)
        break
      }
    }
    console.log(verY + " " +verR);
    verY = 0
    verR = 0
  }
}


var digCheck = () => {
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < colMax; j++) {
      if (i >= 3 && j >= 3) {
        if (gameArr[i][j] === 1 && gameArr[i-1][j-1] === 1 && gameArr[i-2][j-2] === 1 && gameArr[i-3][j-3] === 1) {
          alert("player1 win")
          game.removeEventListener("click", placeToken)
          break
        }
        else if (gameArr[i][j] === 2 && gameArr[i-1][j-1] === 2 && gameArr[i-2][j-2] === 2 && gameArr[i-3][j-3] === 2) {
          alert("player2 win")
          game.removeEventListener("click", placeToken)
          break
        }
      }
      if (i >= 3 && j <= colMax-2) {
        if (gameArr[i][j] === 1 && gameArr[i-1][j+1] === 1 && gameArr[i-2][j+2] === 1 && gameArr[i-3][j+3] === 1) {
          alert("player1 win")
          game.removeEventListener("click", placeToken)
          break
        }
        else if (gameArr[i][j] === 2 && gameArr[i-1][j+1] === 2 && gameArr[i-2][j+2] === 2 && gameArr[i-3][j+3] === 2) {
          alert("player2 win")
          game.removeEventListener("click", placeToken)
          break
        }
      }
      else {
      }
    }
  }
}