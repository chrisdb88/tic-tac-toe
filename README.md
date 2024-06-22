# tic-tac-toe

Create a console tic-tac-toe game.

Store gameboard array into Gameboard object.

Store players in objects.

An object to control the flow of the game.


combinations for win

horizontal
1 2 3
4 5 6
7 8 9

vertical
1 4 7
2 5 8
3 6 9

diagonal
1 5 9
3 5 7

need to check if the claimed positions array of the players includes any of the above combinations.
In order to do so, I could do array.includes 3 times, but this looks very redundant and tedious.
Thinking i could do a loop that checks

Have an upper boolean variable determining if the person has won after an action.
Have a loop for each

