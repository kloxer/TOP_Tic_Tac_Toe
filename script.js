function gamePiece(){
    let gamePieceValue = 0; //0 = None, X=Player1, O=Player2

    const getGamePieceF = () => gamePieceValue;

    const setGamePieceF = (val) => gamePieceValue = val;
    return {getGamePieceF, setGamePieceF};
}

function gameBoard(){
    const rows = 3;
    const columns = 3;
    const arraySize = 3;
    let board = new Array(arraySize);

    //Initiliaze an empty board(3x3 grid)
    const newBoard = function(){
        for (let i = 0; i < rows; i++) {
            board[i] = new Array(arraySize);
            for (let j = 0; j < columns; j++) {
                board[i][j] = gamePiece();
            }
        }
    }
    newBoard();
    

    const getBoard = () => board;

    //Checks that it is a valid position on the board
    const checkValidPosition = function(position){
        const regex = /^[0-3],[0-3]$/;
        let positionSplit = position.split(",");
        //Check if positionSplit > 2 array or our input isnt vlaid
        if (positionSplit.length > 2 || !(regex.test(position))){
            return -1 //Not a valid position
        }
        let firstPos = positionSplit[0];
        let secondPos = positionSplit[1];

        if (board[firstPos][secondPos].getGamePieceF() != 0){
            return -1
        }

        return 0; //is valid
    }
    //Player can put a marker on the board

    //Must be a spot that is equal to 0(TO BE IMPLEMENTED)
    const makeChoice = function(position, player){

        splitArray = position.split(",");
        i = splitArray[0];
        j = splitArray[1];
        console.log(i);
        console.log(j);
        board[i][j].setGamePieceF(player);
        console.log(board[i][j].getGamePieceF());
    }

    //Just for our console.log
    function printBoard(){
        for (let i = 0; i < rows; i++) {
            let str = "";
                for (let j = 0; j < columns; j++) {
                    str = str  + board[i][j].getGamePieceF();
            }
            console.log(str);
        }
    }
    return {printBoard, getBoard, makeChoice, checkValidPosition ,newBoard};

}

function playTicTacToe(){
    const board = gameBoard();
    let moves = 0; //Will be used to check for a tie 
    const players=[
        {
            name: "Player1",
            token: "X",
            wins: 0
        },
        {
            name: "Player2",
            token: "O",
            wins:0
        }
    ];
    let activePlayer = players[0];
    
    //Create an empty grid visually
    const display = displayBoard();
    display.createGrid();

    //Switch current player
    const switchPlayerTurn = () => {
        activePlayer = activePlayer == players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>
    {
        board.printBoard();
    };
    
    const gameTied = () => {
        board.newBoard();
        moves=0; //Reset moves for the new board     
    }

    //Need to check the winconditoon
    const checkWinConditon = function(){
        board.printBoard();
        getb = board.getBoard();

        let diagonal = ""
        let vertical = ""
        let winCondition1 = "XXX";
        let winCondition2 = "OOO";
        //Check horizontal and vertical win condition
        for (let i = 0; i < 3; i++) {
            horizontal = "";
            vertical  = "";
            for (let j = 0; j < 3; j++) {
                horizontal = horizontal + getb[i][j].getGamePieceF();
                vertical = vertical + getb[j][i].getGamePieceF();
                console.log(getb[i][j].getGamePieceF());
            }
            if (horizontal  == winCondition1 || horizontal == winCondition2){
                return true
            }
            if (vertical  == winCondition1 || vertical == winCondition2){
                return true
            }
            
        }

        //Check diagonal win conditions
        for (let i = 0; i < 3; i++) {
            diagonal = diagonal + getb[i][i].getGamePieceF();

            if (diagonal  == winCondition1 || diagonal == winCondition2){
                return true
            }
            
        }
        diagonal = ""; //Reset diagonal 

        let r = 2;//To check the diagonal in the reverse
        //Check diagonal(reversed) win conditions
        for (let i = 0; i > 0; i--) {
            diagonal = diagonal + getb[i][r].getGamePieceF();

            if (diagonal  == winCondition1 || diagonal == winCondition2){
                return true
            }
            r = r -1;
            
        }
        

        return false

    };
    const setFlag = (val) => flag=val;
    let flag = false;
    const playRound = function(){
        if (flag == true){
            return
        }
        currCell = display.getCurrentCell();
        console.log(currCell);
        //Active player should decide what position to put it in
        //Token already decided for active player,
        //When finished, active player should switch
        let positionFromActive = currCell;
        console.log(positionFromActive);
        if (board.checkValidPosition(currCell) == -1){ //Check if valid position before doing anything else
            return;
        }

        display.placeMarker(currCell, activePlayer.token); //Put a marker on display
 

        board.makeChoice(positionFromActive, activePlayer.token);
        moves++;// increase 1 for each move made
        if (checkWinConditon() == true){
            display.displayMessage(activePlayer.name + " is the winner!");
            flag= true;
           
            activePlayer.wins = activePlayer.wins + 1
            display.setScore(players[0].wins,players[1].wins);

            console.log(activePlayer.name + " wins: " + activePlayer.wins);

            // board.newBoard(); //Reset the board
            // display.resetGrid(); //Reset the grid
            // moves=0; //reset moves to 0
        }
        //Check if there is a tie if 9 moves have been made
        else if (moves == 9){
            flag= true;
            display.displayMessage("Game tied, no winner");
            // gameTied();
            // display.resetGrid();

        }

        switchPlayerTurn(); //Switch the player
        printNewRound(); //Print the board

        

    };

    const resetGame = function(){
        display.displayMessage("");
        moves= 0;
        board.newBoard(); //Reset the board
        display.resetGrid(); //Reset the grid
        flag=false;
    }

    const setNames = function(name1, name2){

        players[0].name = name1;
        players[1].name = name2;
        display.setDisplayNames(name1,name2); //Call the displayboard to visualize the names
    };

    const getNames = () => {
        return [
            players[0].name,
            players[1].name
        ];
    };

    return {playRound, getActivePlayer, checkWinConditon, setFlag, resetGame ,setNames, getNames};



}

// r = gameBoard();
// x = gamePiece();
// x.setGamePieceF(5);
// console.log(x.getGamePieceF());
// console.log(r.makeChoice("0,0","X"));
// r.printBoard();
function displayBoard(){

    const gameDiv= document.querySelector(".game");
    let currentCell = "";

    const getCurrentCell = () => currentCell;

    const createGrid = function(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("button");
                cell.setAttribute("class","cell");
                cell.setAttribute("id", i + "," + j);   
                cell.addEventListener("click", function(){
                    currentCell =  i + "," + j;
                    y.playRound();  //On a click, play a round

                });
                gameDiv.appendChild(cell); 

            }
        }

    };

    const placeMarker =function(position, marker){
        const cell = document.getElementById(position);
        cell.textContent = marker;
    };

    const resetGrid = function(){

        const cell_array = document.querySelectorAll(".cell");
        cell_array.forEach(cell => {
            cell.textContent = "";
        });
                
    };

    const setDisplayNames = function(name1,name2){
        const displayName1 = document.querySelector("#user1");
        displayName1.textContent = name1;
        const displayName2 = document.querySelector("#user2");
        displayName2.textContent = name2;

    }

    const setScore = function(score1, score2){
        const score1div = document.querySelector(".score1");
        const score2div = document.querySelector(".score2");
        score1div.textContent = score1;
        score2div.textContent = score2;
    }


    const displayMessage = function(msg){
        const text = document.querySelector(".message");
        text.textContent = msg;
    };
    
    return {createGrid, placeMarker, getCurrentCell, resetGrid, displayMessage, setDisplayNames, setScore};
}   


y = playTicTacToe();

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function(){
    y.resetGame();
    console.log("hi");
});


const updateButton = document.getElementById("updateDetails");
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("favDialog");

const firstname = favDialog.querySelector("#firstName");
const secondname = favDialog.querySelector("#secondName");

const confirmBtn = favDialog.querySelector("#confirmBtn");

function openCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}

// Update button opens a modal dialog
updateButton.addEventListener("click", () => {
    
  dialog.showModal();
  openCheck(dialog);
});

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
  dialog.close("animalNotChosen");
  openCheck(dialog);
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    y.setNames(firstname.value,secondname.value);
    dialog.close();
  });