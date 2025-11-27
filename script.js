const gameBoard = (function(){
    const columns = 3;
    const rows = 3;
    const board = [];

    //draws board in board array
    for(let i=0; i<columns; i++){
        board[i] = []
        for(let k=0; k<rows; k++){
            board[i].push(Cell)
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
        }
    }
}

function Cell(){
    let value = 0;
    
}

const GameController = (function(){
    const player1 = makePlayer("player 1", 1);
    const player2 = makePlayer("player 2", 2);

    let turn = 1
  
    return{
        turnChecker(){
            return turn
        },
        nextTurn(){
            if(turn ===1){
                turn = 2;
            }
            else{
                turn = 1
            };
        }
    }
    

})();
   

console.log(gameBoard.getBoard());
console.log(GameController.turnChecker());
GameController.nextTurn();
console.log(GameController.turnChecker());
GameController.nextTurn();
console.log(GameController.turnChecker());
