const gameBoard = (function(){
    const columns = 3;
    const rows = 3;
    const board = [];

    //draws board in board array
    for(let i=0; i<columns; i++){
        board[i] = []
        for(let k=0; k<rows; k++){
            board[i].push("x")
        }
    }

    return {
        getBoard(){
            return board
        }
    }
})();


function Cell(){
    let value = 0;
    
}

console.log(gameBoard.getBoard())