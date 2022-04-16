const Player = function(player,mark){

    return{
        name:player,
        mark
    }
}



const board=(function(){
    // board
    let board=[];
    createBoardList();
    function createBoardList(){
        let num=0;
        for(let i=0;i<3;i++){
            board[i]=[];
            for(let j=0;j<3;j++){
                board[i].push(num++)
            }
        }
    }

    // winner
    let winner=null;
    // scores
    let scores={
        'X': -10,
        'O': 10,
        'tie':0
    }

    let mode='ai'

    // elements
    const whoseTurn=document.querySelector('.playerTurn');
    const container=document.querySelector('.container');

    // set height and width of the contaienr the same
    window.addEventListener('load',()=>{
        container.style.height=`${container.offsetWidth}px`;
    })

    // whose turn
    let whichPlayerTurn='Player 1';

    // create two player
    const player1= Player('Player 1','X');
    const player2= Player('Player 2','O'); 

    // catch space for user input
    const spaces=document.querySelectorAll('.playerArea');

    for(let i=0;i<spaces.length;i++){
        spaces[i].id= i;

        // bind event
        spaces[i].addEventListener('click',fillInput,{once:true})
    }

    let spaceLast=9;
    function fillInput(){
        if(whichPlayerTurn=='Player 1'){
            
            this.textContent=player1.mark;
            findInBoardAndAdd(+this.id,player1.mark)
            whichPlayerTurn='Player 2';
            spaceLast--;
            if(checkWin()!='X' || checkWin()!='O'){
                if(spaceLast!==0){
                    console.log(spaceLast+' spaces last')
                    bestAiMove();
                }
            }
        }else{
            this.textContent=player2.mark;
            findInBoardAndAdd(+this.id,player2.mark)
            whichPlayerTurn='Player 1';
            spaceLast--;
            
        }

        if(checkWin()=='X') winner='Player 1';
        else if(checkWin()=='O') winner='Player 2';
        
        if(whoseTurn.textContent=='Player 1' || whoseTurn.textContent=='Player 2'){
            whoseTurn.textContent= whichPlayerTurn;
        }

        if(winner!=null){
            spaces.forEach((space)=>{
                space.removeEventListener('click',fillInput)
            })
            whoseTurn.textContent=`${winner} wins`;
            setTimeout(()=>{
                window.addEventListener('click',restartTheGame,{once:true})
            },100)
        }else if(spaceLast==0){
            whoseTurn.textContent=`It is draw`
            setTimeout(()=>{
                window.addEventListener('click',restartTheGame,{once:true})
            },100)
        }
        
    }

    function findInBoardAndAdd(num,mark){
        let outterIndex=board.findIndex(list=>list.includes(num));
        let innerIndex=board[outterIndex].findIndex(number=>number==num);
        board[outterIndex][innerIndex]=mark;

    }

    function checkWin(){
        for(let i=0;i<3;i++){
            // check rows
            if(check3InRow(board[i][0],board[i][1],board[i][2])){
                return board[i][0];
            }
            // check columns
            if(check3InRow(board[0][i],board[1][i],board[2][i])){
                return board[0][i];
            }
        }
        // check diagonals
        if(check3InRow(board[0][0],board[1][1],board[2][2])){
            return board[0][0];
        }
        if(check3InRow(board[0][2],board[1][1],board[2][0])){
            return board[0][2];
        }
    }

    function check3InRow(first,second,third){
        return first==second && second==third;
    }

    function restartTheGame(){
        winner=null;
        spaceLast=9;
        createBoardList()
        setTimeout(() => {
            spaces.forEach((space)=>{
                space.textContent=''
                space.addEventListener('click',fillInput,{once:true});
                space.style.color='#03e9f4';
            })
        }, 100);
        whoseTurn.textContent='Player 1'
        whichPlayerTurn='Player 1'
    }

    

    function bestAiMove(){
        let bestScore=-Infinity
        let bestMove;
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board.length;j++){
                if(board[i][j]!='X' && board[i][j]!='O'){
                    let previousNum=board[i][j];
                    board[i][j]='O';
                    let score = minimax(board,spaceLast,false)
                    board[i][j]=previousNum;
                    if(score>bestScore){
                        bestScore=score;
                        bestMove=board[i][j];
                    }
                }
            }
        }
        document.getElementById(bestMove).click();
    }

    
    
    function minimax(board, depth, isMaximizing){
        if(checkWin()=='X' || checkWin()=='O'){
            return scores[checkWin()];
        }else if(depth==1){
            return scores['tie'];
        }
        if(isMaximizing){
            let bestScore=-Infinity;
            for(let i=0;i<board.length;i++){
                for(let j=0;j<board.length;j++){
                    if(board[i][j]!='X' && board[i][j]!='O'){
                        let previousNum=board[i][j];
                        board[i][j]='O';
                        let score = minimax(board,depth-1,false)
                        board[i][j]=previousNum;
                        bestScore=Math.max(bestScore,score);
                    }
                }
            }
            return bestScore;
        }else{
            let bestScore=+Infinity;
            for(let i=0;i<board.length;i++){
                for(let j=0;j<board.length;j++){
                    if(board[i][j]!='X' && board[i][j]!='O'){
                        let previousNum=board[i][j];
                        board[i][j]='X';
                        let score = minimax(board,depth-1,true)
                        board[i][j]=previousNum;
                        bestScore=Math.min(bestScore,score);
                    }
                }
            }
            return bestScore;
        }
    }
})();