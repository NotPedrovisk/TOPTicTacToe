console.log("JOE MAMA")
function GameBoard(){
    const columns = 3;
    const rows = 3;
    const board = [];

    for(let i=0; i<columns; i++){
        board[i] = []
        for(let k=0; k<rows; k++){
            board[i].push("x")
        }
    }

    const GetBoard = () => board;

    return GetBoard()
}


function Cell(){
    let value = 0;
    
}

console.log(GameBoard())