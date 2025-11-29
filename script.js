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
        }

    }
}

function markCell(x,y){
    const player = GameController.getCurrentPlayer();
    const board = gameBoard.getBoard();

    if(board[x][y].getValue() === 0){
        board[x][y].cellChange(player);
        GameController.nextTurn();
        GameController.checkForWin();
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
        },
        checkForWin(){
            const board = gameBoard.getBoard();
            //checks for row 1 2 3
            if((board[0][0].getValue() == board[0][1].getValue() && board[0][0].getValue() == board[0][2].getValue())
            &&(board[0][0].getValue() != 0 && board[0][1].getValue() != 0 && board[0][2].getValue() != 0)){
                console.log("POOO1")
            }
            else if((board[1][0].getValue() == board[1][1].getValue() && board[1][0].getValue() == board[1][2].getValue())
                &&(board[1][0].getValue() != 0 && board[1][1].getValue() != 0 && board[1][2].getValue() != 0)){
                    console.log("POOO2")
                }
            else if((board[2][0].getValue() == board[2][1].getValue() && board[2][0].getValue() == board[2][2].getValue())
                &&(board[2][0].getValue() != 0 && board[2][1].getValue() != 0 && board[2][2].getValue() != 0)){
                console.log("POOO3")
                }

            
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
            }, 
            //logs on console
            log(){
                for (row of gameBoard.getBoard()){
                    console.log(row.map(cell=>cell.getValue()))
                }
            }

            
            
        }
})();

const resetBoard = (function(){
    const gameWindow = document.getElementById("gameWindow");
    const board = gameBoard.getBoard();
    
    return{
        reset(){
                //deletes all children from dom for fresh start
                let rows = Array.from(document.getElementsByClassName("rows"));
                for(domRow of rows){
                    gameWindow.removeChild(domRow);
                }
                
                //resets every cell in the board array
                for (let i = 0; i < board.length; i++){
                board[i].map(cell => cell.cellReset());
                }
               
                //redraws board after everything is reset
                drawBoard.draw();
            }
    }
})();
    


markCell(2,0);
markCell(0,1);
markCell(2,1);
markCell(0,2);
markCell(2,2);
drawBoard.draw();



