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
        name,value
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
        return player
    } else {
        console.log("cell taken already")
        return 0
    }
}

const GameController = (function(){
    const player1 = makePlayer("player 1", 1);
    const player2 = makePlayer("player 2", 2);
   


    let turn = 1
    let curPlayer = 1
  
    return{
        turnChecker(){
            return turn
        },
        nextTurn(){
            if(turn ===1){
                turn = 2;
                curPlayer = 2;
            }
            else{
                turn = 1;
                curPlayer = 1;
            };
        },
        getCurrentPlayer(){
            return curPlayer;
        },
        
        checkForWin(){
            const board = gameBoard.getBoard();

            function checkWinner(cellValue){
                if(cellValue == 1){
                    return (player1.name)
                    
                }
                if(cellValue == 2){
                    return player2.name
                }
            }
            
            //check for row win, or column win after that, while checking if cell is not empty
            for(let row = 0; row < 3; row++){
                if((board[row][0].getValue() == board[row][1].getValue() &&
                 board[row][0].getValue() == board[row][2].getValue()) &&
                (board[row][0].getValue() != 0)){
                    console.log(checkWinner(board[row][0].getValue()))
                 }
                }

            for(let column = 0; column < 3; column++){
                if((board[0][column].getValue() == board[1][column].getValue() &&
                 board[0][column].getValue() == board[2][column].getValue()) &&
                (board[0][column].getValue() != 0)){
                    console.log(checkWinner(board[0][column].getValue()))}
                }


            //checks for diagonal win or anti diagonal win
            if((board[0][0].getValue() == board[1][1].getValue() &&
                board[0][0].getValue() == board[2][2].getValue()) &&
                (board[0][0].getValue() != 0)){
                    console.log(checkWinner(board[0][0].getValue()))
            }

            if((board[0][2].getValue() == board[1][1].getValue() &&
                board[0][2].getValue() == board[2][0].getValue()) &&
                (board[0][2].getValue() != 0)){
                    console.log(checkWinner(board[0][2].getValue()))
                }
            
            }

            
        }

    }
    

)();
   

const drawBoard = (function(){
    const gameWindow = document.getElementById("gameWindow");
    const board = gameBoard.getBoard();
        
        return{
            draw(){
                //creates rows in DOM
                for (let i = 0; i < board.length; i++) {
                    let rowGame = document.createElement("div");
                    rowGame.classList.add("rows")
                    gameWindow.appendChild(rowGame);
                    //creates cells in row
                    for(let k = 0; k < board[i].length; k++){
                        let cell = board[i][k].getValue();
                        let cellGame = document.createElement("div");
                        cellGame.classList.add("cell");

                        //lets user click button only once, then stops it from clicking again until reset
                        cellGame.addEventListener("click", ()=>{
                            
                            cellGame.textContent = markCell(i,k);
                        }, {once: true})
                        cellGame.textContent = cell;
                        rowGame.appendChild(cellGame)
                        
                    }
                
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
    
const game = document.getElementById("game");
const resetBtn = document.createElement("button");
resetBtn.addEventListener("click", ()=>resetBoard.reset());
resetBtn.textContent = "Reset"
document.body.appendChild(resetBtn)

drawBoard.draw();


