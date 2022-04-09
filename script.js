const Player = function(player,mark){
    let position=[];

    function addPosition(place){
        position.push(place);
    }

    return{
        addPosition,
        position,
        name:player,
        mark
    }
}



const board=(function(){
    // whose turn
    let whichPlayerTurn='Player 1';
    const whoseTurn=document.querySelector('.playerTurn')
    // create two player
    const player1= Player('Player 1','X');
    const player2= Player('Player 2','O'); 

    // catch space for user input
    const spaces=document.querySelectorAll('.playerArea');

    // bind event
    for(let i=0;i<spaces.length;i++){
        spaces[i].id= i+1
        spaces[i].addEventListener('click',fillInput)
    }

    function fillInput(){
        whoseTurn.textContent= whichPlayerTurn=='Player 1'? 'Player 2': 'Player 1';
        if(whichPlayerTurn=='Player 1'){
            this.textContent=player1.mark;
            player1.addPosition(this.id)
            checkWin.call(player1);
            whichPlayerTurn='Player 2';
        }else{
            this.textContent=player2.mark;
            player2.addPosition(this.id)
            checkWin.call(player2)
            whichPlayerTurn='Player 1';
        }
        this.removeEventListener('click',fillInput)
    }




    function checkWin(){
        if(check3InRow(1,2,3,this) || 
            check3InRow(4,5,6,this) ||
            check3InRow(7,8,9,this) ||
            check3InRow(1,4,7,this) ||
            check3InRow(2,5,8,this) ||
            check3InRow(3,6,9,this) ||
            check3InRow(1,5,9,this) ||
            check3InRow(3,5,7,this)) {
            spaces.forEach((space)=>{
                space.removeEventListener('click',fillInput)
            })
            whoseTurn.textContent=`${this.name} wins`
            setTimeout(()=>{
                window.addEventListener('click',restartTheGame)
            },100)
        }else if(player1.position.length==5){
            whoseTurn.textContent=`It is draw`
            setTimeout(()=>{
                window.addEventListener('click',restartTheGame)
            },100)
        }
    }

    function restartTheGame(){
        setTimeout(() => {
            spaces.forEach((space)=>{
                space.textContent=''
                space.addEventListener('click',fillInput);
                space.style.color='#03e9f4';
            })
        }, 100);
        whoseTurn.textContent='Player 1'
        whichPlayerTurn='Player 1'
        player1.position.length=0;
        player2.position.length=0;
        window.removeEventListener('click',restartTheGame)
    }

    function check3InRow(first,second,third,scope){
        if(scope.position.indexOf(first.toString())!=-1 && 
            scope.position.indexOf(second.toString())!=-1 && 
            scope.position.indexOf(third.toString())!=-1 ){
                let list=[first,second,third]
                list.forEach((item)=>{
                    spaces[item-1].style.color='yellow'
                })
                return true;
            }else{
                return false;
            }
    }
})();