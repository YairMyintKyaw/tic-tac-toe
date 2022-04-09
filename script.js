const Player = function(player,mark){
    let position=[];

    function addPosition(place){
        position.push(place);
    }

    function checkWin(){
        console.log(position)
        if(check3InRow(1,2,3) || 
            check3InRow(4,5,6) ||
            check3InRow(7,8,9) ||
            check3InRow(1,4,7) ||
            check3InRow(2,5,8) ||
            check3InRow(3,6,9) ||
            check3InRow(1,5,9) ||
            check3InRow(3,5,7)){
            alert(player+'wins');
        }
    }

    function check3InRow(first,second,third){
        if(position.indexOf(first.toString())!=-1 && 
            position.indexOf(second.toString())!=-1 && 
            position.indexOf(third.toString())!=-1 ){
                return true;
            }else{
                return false;
            }
    }

    return{
        addPosition,
        name:player,
        checkWin,
        mark,
    }
}

const player1= Player('player1','X')
const player2= Player('player2','O')

const board=(function(){
    let whichPlayerTurn='player1'
    // create two player
    

    // catch space for user input
    const spaces=document.querySelectorAll('.playerArea');

    // bind event
    for(let i=0;i<spaces.length;i++){
        spaces[i].id= i+1
        spaces[i].addEventListener('click',fillInput)
        
    }

    function fillInput(){
        if(whichPlayerTurn=='player1'){
            this.textContent=player1.mark;
            player1.addPosition(this.id)
            player1.checkWin()
            
            whichPlayerTurn='player2';
        }else{
            this.textContent=player2.mark;
            player2.addPosition(this.id)
            player2.checkWin()
            
            whichPlayerTurn='player1';
        }
        this.removeEventListener('click',fillInput)
    }

})();