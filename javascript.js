


const game = (function() {

    const playerOneTag = document.querySelector(".playerOneTag")
    const playerTwoTag = document.querySelector(".playerTwoTag")
    const promptText = document.querySelector(".promptText")
    const playerOneInput = document.querySelector("#playerOneInput")
    const playerTwoInput = document.querySelector("#playerTwoInput")
    const finalDisplay = document.querySelector(".finalDisplay")
    const boardButtons = document.querySelectorAll(".posButton")
    const startRestartButton = document.querySelector(".startRestart")

    const promptTextStrings = [
        "Missing names!",
        "Game!"
    ]

    const consoleMessages = [
        "Enter a player name with the function game.inputName(playerNo, name)",
        "The game has not begun yet. To begin, enter names for both players using:\n\ngame.inputName(playerNo, name)\n\nWhen both names are entered, do game.startGame() to begin the match.",
        "Match is active! To play, do game.claimPos(positionNumber).\nYou can also do game.startGame() to restart the match.",
        "To learn how to play, enter game.help()"
    ]

    console.log(consoleMessages[3])

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

    let playerTurn = playerOne

    // function requestName() {
    //     let playerNo
    //     if (focusedPlayer === playerOne) {
    //         playerNo = 1
    //     } else if (focusedPlayer === playerTwo) {
    //         playerNo = 2
    //     }
    //     console.log(`Player ${playerNo.toString()}, what is your name?\nType: game.enterName("yourNameHere")`)
    // };

    // requestName()

    function help() {
        if (gameStarted === false) {
            console.log(consoleMessages[1])
        } else if (gameStarted === true) {
            console.log(consoleMessages[2])
        }
    }
    
    function inputName(playerNo, name) {
        if ((playerNo === 1 || playerNo === 2) && typeof name === "string" && name.length >= 1 && name.length <= 12) {
            if (playerNo === 1) {
                playerOneInput.value = name
                console.log(`Player one input name set to ${name}.`)
            } else if (playerNo === 2) {
                playerTwoInput.value = name
                console.log(`Player two input name set to ${name}.`)
            }
        } else {
            console.log("Invalid input! Enter 1 or 2 for the player number, and a string between 1 and 12 characters for the name.")
            // console.log(`Missing player name(s)!\nPlayer 1: ${playerOne.name}\nPlayer 2: ${playerTwo.name}`)
        }
    }

    // function enterName(name) {
    //     if (gameStarted === false) {
    //         if (typeof name !== "string" || name === "" || (playerOne.name || playerTwo.name) === name) {
    //             console.log("Invalid input! Please enter your name contained in parenthesis.")
    //             requestName()
    //         } else {
    //             focusedPlayer.name = name
    //             if (focusedPlayer === playerOne) {
    //                 console.log(`Okay! ${focusedPlayer.name} is player one!`)
    //                 focusedPlayer = playerTwo
    //                 requestName()
    //             } else {
    //                 console.log(`Okay! ${focusedPlayer.name} is player two!\n The game has begun!`)
    //                 gameStarted = true
    //                 console.log(gameBoardString)
    //                 console.log(`${playerTurn.name}, choose a position between 1-9 with game.claimPos(1-9).`)
    //             }
    //         }
    //     } else {
    //         console.log("The game has already begun!")
    //     }
    //}  gameStarted, focusedPlayer, requestName() is just a console log

    function gameReset() {
        gameBoardArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        gameBoardString = ` ${gameBoardArray[0]} | ${gameBoardArray[1]} | ${gameBoardArray[2]} \n-----------\n ${gameBoardArray[3]} | ${gameBoardArray[4]} | ${gameBoardArray[5]} \n-----------\n ${gameBoardArray[6]} | ${gameBoardArray[7]} | ${gameBoardArray[8]} `
        boardButtons.forEach(function(button) {
            button.textContent = ''
        })
        playerOne.name = ''
        playerOne.claimedPositions = []
        playerTwo.name = ''
        playerTwo.claimedPositions = []
        playerTurn = playerOne
        gameStarted = false
        gameWon = false
        roundsCounter = 1
        finalDisplay.textContent = ''
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
            boardButtons[pos-1].textContent = `${playerTurn.marker}`
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
                promptText.textContent = promptTextStrings[1]
                if (roundsCounter === 10 && gameWon === false) {
                    console.log("It's a draw!\nNew game!")
                    finalDisplay.textContent = "It's a draw!"
                } else {
                    console.log(`Game! ${playerTurn.name} wins!\nNew game!`)
                    finalDisplay.textContent = `${playerTurn.name} wins!`
                }
                gameStarted = false
                // gameReset()
            } else {
                if (playerTurn === playerOne) {
                    console.log(`Okay! ${playerOne.name} claims position ${pos}.\n${playerTwo.name}! Your turn!`)
                    promptText.textContent = `Okay! ${playerTwo.name}, it's your turn!`
                    playerTurn = playerTwo
                    
                } else if (playerTurn === playerTwo) {
                    console.log(`Okay! ${playerTwo.name} claims position ${pos}.\n${playerOne.name}! Your turn!`)
                    promptText.textContent = `Okay! ${playerOne.name}, it's your turn!`
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

    function startGame() {
        gameReset()
        if (typeof playerOneInput.value === "string" && playerOneInput.value.length >= 1 && playerOneInput.value.length <= 12
            && typeof playerTwoInput.value === "string" && playerTwoInput.value.length >= 1 && playerTwoInput.value.length <= 12) 
            {
                playerOne.name = playerOneInput.value
                playerOneTag.textContent = playerOne.name
                playerTwo.name = playerTwoInput.value
                playerTwoTag.textContent = playerTwo.name
                gameStarted = true
                promptText.textContent = `Okay! ${playerOne.name}, your turn first.`
                console.log(`The game has begun! ${playerOne.name}, it's your turn first!`)
            } else {
                console.log(`Name input(s) missing!\nPlayer 1: ${playerOne.name}\nPlayer 2: ${playerTwo.name}\n\n${consoleMessages[0]}`)
                promptText.textContent = promptTextStrings[0]
            }
    }

    startRestartButton.addEventListener("click", function() {
        startGame()
    })

    boardButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            claimPos(Number(button.id))
            // pos & game status check
        })
    })


    // console function for starting / restarting the game functioning identically to the button.
    

    return {
        startGame,
        inputName,
        claimPos,
        help
    }
    
})();

// if (arr[1, 2, 3]) {success}

// console.log(" 1 | 2 | 3 \n------------\n 4 | 5 | 6 \n ------------\n 7 | 8 | 9 ")