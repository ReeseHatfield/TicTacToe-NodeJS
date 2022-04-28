let theBoard = {
    positions: [[0,1,2],[3,4,5],[6,7,8]],
    printBoard (){
      for(let i = 0; i < this.positions.length; i++){
        console.log(this.positions[i]);
      }
    }
  };
  
  function playerFactory(name, symbol){
    return {
      name,
      symbol
    }
  };

 const p1 = playerFactory('Joe', 'X');
 const p2 = playerFactory('Bob', 'O');
 let currentPlayer = p1;
 theBoard.printBoard();


 const ps = require("prompt-sync");
 //use of prompt sync module;
 let prompt = ps();
 
 let hasEnded = false;
 
while(hasEnded === false){
  //outer loops handles all game logic
  let input = prompt(`${currentPlayer.name}, where would you like to move? `)
  
  while(true){
    //inner loop validates user input
    if(validateInput(input,theBoard)){
      updateBoard(input, theBoard, currentPlayer);
      theBoard.printBoard();
      break;
      
    }
    else{
      console.log('Invalid move. Try again');
      input = prompt(`${currentPlayer.name}, where would you like to move? `);
      theBoard.printBoard();
    }
  }

  hasEnded = checkForGameOver(theBoard, currentPlayer);
  //switch players
  if(currentPlayer === p1){
    currentPlayer = p2;
  }
  else{
    currentPlayer = p1;
  }

  
}
console.log('The game has ended. Thank you for playing!');

function validateInput(input, theBoard){
  //return true if the input is valid, false if its not

  //1. input must be a number
  //2. input must be between 0 and 8
  //3. space must be valid
  if(input >= 0 && input <= 8){
    let x = getX(input);
    let y = input % 3;
    if(typeof (theBoard.positions[x][y]) === 'number'){
      return true;
    }
    else{
      console.log('The other player has already claimed this space!');
      return false;

    }
  }
  else{
    console.log('That is not a valid number on the board');
    return false;
  }
}

function getX(input){
  if(input >= 0 && input <= 2){
    return 0;
  }
  else if(input >= 3 && input <= 5){
    return 1;
  }
  else {
    return 2
  }
}

function updateBoard(input, theBoard, currentPlayer){
  let x = getX(input);
  let y = input % 3;
  theBoard.positions[x][y] = currentPlayer.symbol;

}

function checkForGameOver(theBoard, currentPlayer){
  //return false if no wins are detected
  //return true if a win is detected and log the winner
  //return true if a tie is detected and log it as a tie;

  //first, check for horizontal TTT
  for(let i = 0; i < theBoard.positions.length; i++){
    if (theBoard.positions[i][0] == theBoard.positions[i][1] && theBoard.positions[i][1] == theBoard.positions[i][2]) {
      //return theBoard.positions[i][0];
      console.log(`${currentPlayer.name} has won the game!`);
      return true;
    }
  }
  //Now, check for a vertical TTT
  for (let i = 0; i < theBoard.positions.length; i++) {
  
    if (theBoard.positions[0][i] == theBoard.positions[1][i] && theBoard.positions[1][i] == theBoard.positions[2][i]) {
      //return theBoard.positions[0][i];
      console.log(`${currentPlayer.name} has won the game!`);
      return true;
    }
  }

  // This checks for a diagonal TTT, upper left, middle, lower right
  if (theBoard.positions[0][0] == theBoard.positions[1][1] && theBoard.positions[1][1] == theBoard.positions[2][2]) {
    //return theBoard.positions[1][1];
    console.log(`${currentPlayer.name} has won the game!`);
    return true;
  }

  // This checks for a diagonal TTT, lower left, middle, upper right
  if (theBoard.positions[2][0] == theBoard.positions[1][1] && theBoard.positions[1][1] == theBoard.positions[0][2]) {
    console.log(`${currentPlayer.name} has won the game!`);
    return true;
  }

  //now check for a Tie last
  let tie = true;
    for (let i = 0; i < theBoard.positions.length; i++) {
      for (let j = 0; j < theBoard.positions[i].length; j++) {
        if (theBoard.positions[i][j] != 'X' && theBoard.positions[i][j] != 'O') {
          tie = false;
        }
      }
    }

    if (tie) {
      console.log('The game has ended in a tie!')
      return true;
    }

return false;
}
