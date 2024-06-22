


const game = (function() {
    const winningCombos = [
        [1, 2, 3], 
        [4, 5, 6], 
        [7, 8, 9], 
        [1, 4, 7], 
        [2, 5, 8], 
        [3, 6, 9], 
        [1, 5, 9], 
        [3, 5, 7], 
    ]
    
    let gameStarted = false
    let roundsCounter = 1

    const gameBoardReset = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let gameBoardArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let gameBoardString = ` ${gameBoardArray[0]} | ${gameBoardArray[1]} | ${gameBoardArray[2]} \n-----------\n ${gameBoardArray[3]} | ${gameBoardArray[4]} | ${gameBoardArray[5]} \n-----------\n ${gameBoardArray[6]} | ${gameBoardArray[7]} | ${gameBoardArray[8]} `

    const playerOne = {
        name: "",
        marker: "X",
        claimedPositions: []
    }

    const playerTwo = {
        name: "",
        marker: "O",
        claimedPositions: []
    }

    let focusedPlayer = playerOne
    let playerTurn = playerOne

    function requestName() {
        let playerNo
        if (focusedPlayer === playerOne) {
            playerNo = 1
        } else if (focusedPlayer === playerTwo) {
            playerNo = 2
        }
        console.log(`Player ${playerNo.toString()}, what is your name?\nType: game.enterName("yourNameHere")`)
    };

    requestName()

    function enterName(name) {
        if (gameStarted === false) {
            if (typeof name !== "string" || name === "" || (playerOne.name || playerTwo.name) === name) {
                console.log("Invalid input! Please enter your name contained in parenthesis.")
                requestName()
            } else {
                focusedPlayer.name = name
                if (focusedPlayer === playerOne) {
                    console.log(`Okay! ${focusedPlayer.name} is player one!`)
                    focusedPlayer = playerTwo
                    requestName()
                } else {
                    console.log(`Okay! ${focusedPlayer.name} is player two!\n The game has begun!`)
                    gameStarted = true
                    console.log(gameBoardString)
                    console.log(`${playerTurn.name}, choose a position between 1-9 with game.claimPos(1-9).`)
                }
            }
        } else {
            console.log("The game has already begun!")
        }
    }

    function gameReset() {
        gameBoardArray = gameBoardReset
        gameBoardString = ` ${gameBoardArray[0]} | ${gameBoardArray[1]} | ${gameBoardArray[2]} \n-----------\n ${gameBoardArray[3]} | ${gameBoardArray[4]} | ${gameBoardArray[5]} \n-----------\n ${gameBoardArray[6]} | ${gameBoardArray[7]} | ${gameBoardArray[8]} `
        playerOne.name = ''
        playerOne.claimedPositions = []
        playerTwo.name = ''
        playerTwo.claimedPositions = []
        focusedPlayer = playerOne
        playerTurn = playerOne
        gameStarted = false
        roundsCounter = 1
        requestName()
    }

    function claimPos(pos) {
        let gameSet = false
        let gameWon = false
        if (gameStarted === true 
            && !playerOne.claimedPositions.includes(pos) 
            && !playerTwo.claimedPositions.includes(pos) 
            && typeof pos === "number" 
            && pos >= 1 && pos <= 9) {

            playerTurn.claimedPositions.push(pos)
            gameBoardArray[pos-1] = playerTurn.marker
            roundsCounter++
            gameBoardString = ` ${gameBoardArray[0]} | ${gameBoardArray[1]} | ${gameBoardArray[2]} \n-----------\n ${gameBoardArray[3]} | ${gameBoardArray[4]} | ${gameBoardArray[5]} \n-----------\n ${gameBoardArray[6]} | ${gameBoardArray[7]} | ${gameBoardArray[8]} `
            console.log(gameBoardString)
            winningCombos.forEach(function(comboToCheck) {
                if (playerTurn.claimedPositions.includes(comboToCheck[0])
                && playerTurn.claimedPositions.includes(comboToCheck[1]) 
                && playerTurn.claimedPositions.includes(comboToCheck[2])) {
                    gameSet = true
                    gameWon = true
                }
            })
            if (roundsCounter === 10) {
                gameSet = true
            }
            if (gameSet === true) {
                if (roundsCounter === 10 && gameWon === false) {
                    console.log("It's a draw!\nNew game!")
                } else {
                    console.log(`Game! ${playerTurn.name} wins!\nNew game!`)
                }
                
                gameReset()
            } else {
                if (playerTurn === playerOne) {
                    console.log(`Okay! ${playerOne.name} claims position ${pos}.\n${playerTwo.name}! Your turn!`)
                    playerTurn = playerTwo
                    
                } else if (playerTurn === playerTwo) {
                    console.log(`Okay! ${playerTwo.name} claims position ${pos}.\n${playerOne.name}! Your turn!`)
                    playerTurn = playerOne
                }
            } 
        } else if (gameStarted === false) {
            console.log("The game hasn't begun yet!")
        } else if (playerOne.claimedPositions.includes(pos) || playerTwo.claimedPositions.includes(pos)) {
            console.log("This position is already claimed!")
        } else {
            console.log("Invalid input! Please enter a number between 1-9")
        }
    }
    return {
        enterName,
        claimPos
    }
})();

// if (arr[1, 2, 3]) {success}

// console.log(" 1 | 2 | 3 \n------------\n 4 | 5 | 6 \n ------------\n 7 | 8 | 9 ")