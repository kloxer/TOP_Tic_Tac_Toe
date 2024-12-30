function gamePiece(){
    let gamePieceValue = 0; //0 = None, 1=X, 2=O

    const getGamePieceF = () => gamePieceValue++;
    return {getGamePieceF};
}

function gameBoard(){
    const arraySize = 3;
    let array = new Array(arraySize);

    //Initiliaze the Array(3x3 grid)
    for (let i = 0; i < arraySize; i++) {
        array[i] = new Array(arraySize);
        for (let j = 0; j < array.length; j++) {
            array[i][j] = 0;
        }
    }

    function printBoard(){
        for (let i = 0; i < arraySize; i++) {
            for (let j = 0; j < array.length; j++) {
                console.log(array[i][j]);
            }
        }
    }
    return {printBoard};

}
r = gameBoard();
r.printBoard();