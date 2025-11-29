const gameBoard = (function(){
    const columns = 3;
    const rows = 3;
    const board = [];

    //draws board in board array
    for(let i=0; i<rows; i++){
        board[i] = []
        for(let k=0; k<columns; k++){
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
        cellReset(){
            value = 0;
            return value
        }

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
   

const drawBoard = (function(){
    const gameWindow = document.getElementById("gameWindow");
    const board = gameBoard.getBoard();
        
        return{
            draw(){
                for (let i = 0; i < board.length; i++) {
                let row = board[i].map(cell => cell.getValue());
                let rowGame = document.createElement("div");
                rowGame.classList.add("rows");
                rowGame.textContent = row;
                gameWindow.appendChild(rowGame);
            }
            }, erase(){
                //locates rows, then for every row reset their cells
                let rows = document.getElementsByClassName("rows");
                for(CurRow of rows){
                    for (let i = 0; i < board.length; i++){
                        let row = board[i].map(cell => cell.cellReset());
                        CurRow.textContent = row
                    }
                }

            }

            
            
        }
})();
    


markCell(1,1);
markCell(1,2)
markCell(0,2)
drawBoard.draw();
drawBoard.erase();

