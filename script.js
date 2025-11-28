const gameBoard = (function(){
    const columns = 3;
    const rows = 3;
    const board = [];

    //draws board in board array
    for(let i=0; i<columns; i++){
        board[i] = []
        for(let k=0; k<rows; k++){
            board[i].push(Cell())
        }
    }

    return {
        getBoard(){
            return board
        }
    }
})();


function makePlayer(name, value){
    return{
        getPlayerInfo(){
            return{name, value}
        },value
    }
}


function Cell(){
    let value = 0;
    return{
        cellChange(player){
            value = player.value
        },
        getValue(){
            return value
        },

    }
    
}

function markCell(x,y){
    const player = GameController.getCurrentPlayer();
    const board = gameBoard.getBoard();

    if(board[x][y].getValue() === 0){
        board[x][y].cellChange(player);
        GameController.nextTurn();
    } else {
        console.log("cell taken already")
    }
}

const GameController = (function(){
    const player1 = makePlayer("player 1", 1);
    const player2 = makePlayer("player 2", 2);

    let turn = 1
    let curPlayer = player1
  
    return{
        turnChecker(){
            return turn
        },
        nextTurn(){
            if(turn ===1){
                turn = 2;
                curPlayer = player2;
            }
            else{
                turn = 1;
                curPlayer = player1;
            };
        },
        getCurrentPlayer(){
            return curPlayer;
        }

    }
    

})();
   

function printBoard() {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
        let row = board[i].map(cell => cell.getValue());
        console.log(row);
    }
}

markCell(1,1);
markCell(1,2)
printBoard();
markCell(1,1)