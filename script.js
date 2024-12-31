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
            name: "Jon",
            token: "X",
            wins: 0
        },
        {
            name: "Cece",
            token: "O",
            wins:0
        }
    ];
    let activePlayer = players[0];

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
        alert("we reached a tie, no winner");
        board.newBoard();
        moves=0; //Reset moves for the new board     
    }

    const playRound = function(){
        //Active player should decide what position to put it in
        //Token already decided for active player,
        //When finished, active player should switch
        let positionFromActive = prompt(activePlayer.name + " Enter a valid position(0,0 to 2,2)");
        console.log(positionFromActive);
        while (board.checkValidPosition(positionFromActive) == -1) {
            console.log("not a valid position");
            positionFromActive = prompt("That was not a valid position, enter a valid position(0,0 to 2,2)");
        }
        board.makeChoice(positionFromActive, activePlayer.token);
        moves++;// increase 1 for each move made
        if (checkWinConditon() == true){
            alert("we have a winner");
            board.newBoard(); //Reset the board
            activePlayer.wins = activePlayer.wins + 1
            console.log(activePlayer.name + " wins: " + activePlayer.wins);
        }
        //Check if there is a tie if 9 moves have been made
        else if (moves == 9){
            gameTied();
        }

        switchPlayerTurn(); //Switch the player
        printNewRound(); //Print the board

        

    }

    //Need to check the winconditoon
    const checkWinConditon = function(){
        board.printBoard();
        getb = board.getBoard();

        let diagonal = ""
        let vertical = ""
        let winCondition1 = "XXX";
        let winCondition2 = "YYY";
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

    return {playRound, getActivePlayer, checkWinConditon};



}

// r = gameBoard();
// x = gamePiece();
// x.setGamePieceF(5);
// console.log(x.getGamePieceF());
// console.log(r.makeChoice("0,0","X"));
// r.printBoard();

y = playTicTacToe();
y.playRound();
console.log(y.checkWinConditon());
