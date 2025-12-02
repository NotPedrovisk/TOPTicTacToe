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
            value = player
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
    const nxtPlayer = GameController.getNextPlayer();
    const board = gameBoard.getBoard();

   

    if(GameController.getGameOver() == false){
        if(board[x][y].getValue() === 0){
            board[x][y].cellChange(player);
            playerDisp.textContent = `${nxtPlayer}'s Turn`
            GameController.nextTurn();
            GameController.checkForWin();
            return player
        } else {
            console.log("cell taken already");
    }
    }
    
}

const GameController = (function(){
    const player1 = makePlayer("player x", "x");
    const player2 = makePlayer("player o", "o");
    const winDisplay = document.getElementById("winDisplay");
   
    let gameOver = false;


    let curPlayer = "x";
    let nextPlayer = "o"
  
    return{
        getGameOver(){
            return gameOver
        },
        setGameOver(){
            gameOver = true
        },
        cancelGameOver(){
            gameOver = false
        },
        turnChecker(){
            return curPlayer
        },
        nextTurn(){
            if(curPlayer ==="x"){
                curPlayer = "o";
                nextPlayer = "x"
            }
            else{
                curPlayer = "x";
                nextPlayer = "o";
            };
        },
        getCurrentPlayer(){
            return curPlayer;
        },
        getNextPlayer(){
            return nextPlayer
        },
        
        checkForWin(){
            const board = gameBoard.getBoard();

            function checkWinner(cellValue){
                if(cellValue == "x"){
                    return (player1.name)
                    
                }
                if(cellValue == "o"){
                    return player2.name
                }
            }
            
            //check for row win, or column win after that, while checking if cell is not empty
            for(let row = 0; row < 3; row++){
                if((board[row][0].getValue() === board[row][1].getValue() &&
                 board[row][0].getValue() === board[row][2].getValue()) &&
                (board[row][0].getValue() != 0)){
                    playerDisp.textContent = ""
                    winDisplay.textContent = (checkWinner(board[row][0].getValue())) + " wins!";
                    GameController.setGameOver();
                 }
                }

            for(let column = 0; column < 3; column++){
                if((board[0][column].getValue() == board[1][column].getValue() &&
                 board[0][column].getValue() == board[2][column].getValue()) &&
                (board[0][column].getValue() != 0)){
                    playerDisp.textContent = ""
                    winDisplay.textContent = (checkWinner(board[0][column].getValue()))  + " wins!";
                    GameController.setGameOver();
                }
                }


            //checks for diagonal win or anti diagonal win
            if((board[0][0].getValue() == board[1][1].getValue() &&
                board[0][0].getValue() == board[2][2].getValue()) &&
                (board[0][0].getValue() != 0)){
                    playerDisp.textContent = ""
                    winDisplay.textContent = (checkWinner(board[0][0].getValue()))  + " wins!";
                    GameController.setGameOver();
            }

            if((board[0][2].getValue() == board[1][1].getValue() &&
                board[0][2].getValue() == board[2][0].getValue()) &&
                (board[0][2].getValue() != 0)){
                    playerDisp.textContent = ""
                    winDisplay.textContent = (checkWinner(board[0][2].getValue()))  + " wins!";
                    GameController.setGameOver();
                } 

            
            const tieCheck = [];
            for(let rows=0; rows<board.length; rows++){
                for(let cell = 0; cell<board[rows].length; cell++){
                    if (board[rows][cell].getValue() != 0){
                        tieCheck.push(cell);
                    }
                }
            }
            if (tieCheck.length == 9){
                playerDisp.textContent = ""
                winDisplay.textContent = "It's a tie!";
                GameController.setGameOver()
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
                            if(!GameController.getGameOver()){
                                cellGame.textContent = markCell(i,k);
                            }
                            
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
    const winDisplay = document.getElementById("winDisplay");
    const board = gameBoard.getBoard();
    
    return{
        reset(){
                //deletes all children from dom for fresh start
                let rows = Array.from(document.getElementsByClassName("rows"));
                for(domRow of rows){
                    gameWindow.removeChild(domRow);
                }
                
                //resets every cell in the board array
                for (let row of board){
                    for(let cell of row){
                        cell.cellReset();
                        }}
                winDisplay.textContent = ""
               
                //redraws board after everything is reset
                drawBoard.draw();
                GameController.cancelGameOver();
            }
    }
})();
    

const playerDisp = document.getElementById("curPlayer");
playerDisp.textContent = `${GameController.getCurrentPlayer()}'s Turn`
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", ()=>resetBoard.reset());


drawBoard.draw();


