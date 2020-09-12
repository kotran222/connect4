// Connect 4 JS

//Selectors

let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.turns');
const reset = document.querySelector('.reset');
const duel = document.querySelector('.duel');
const computer = document.querySelector('.computer');

////////////////////////////////////////////////////////////////////////////////
//Dual Player Mode
duel.addEventListener('click', ()=>{
    for(let i= 0; i < tableCell.length; i++){
        tableCell[i].addEventListener('click', (e) =>{
            console.log('${e.target.parentElement.rowIndex}, ${e.target.cellIndex}');
        })
    }

    while(!player1){
        let player1 = prompt('Player One: Enter your name. You will be RED.');
    }
    player1Color = 'red';

    while(!player2){
        let player2 = prompt('Player Two: Enter your name. You will be BLUE.');
    }
    player2Color = 'blue';

    let currentPlayer = 1;
    playerTurn.textContent = player1 + ' turn!';

    Array.prototype.forEach.call(tableCell, (cell) =>{
        cell.addEventListener('click', changeColor);
        cell.style.backgroundColor = 'white';
    });

    // Players adding chips function
    function changeColor(e){
        let column = e.target.cellIndex;
        let row = [];

        for(let i=5; i > -1; i--){
            if(tableRow[i].children[column].style.backgroundColor == 'white'){
                row.push(tableRow[i].children[column]);
                if(currentPlayer === 1){
                    row[0].style.backgroundColor = player1Color;
                    if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
                        playerTurn.textContent = player1 + ' wins!';
                        playerTurn.style.color = player1Color;
                        return(alert(player1 + ' is the winner!'));
                    }else if(drawCheck()){
                        playerTurn.textContent = 'Game is a DRAW!';
                        return alert('DRAW');
                    }else{
                        playerTurn.textContent = player2 + ' turn!';
                        return currentPlayer = 2;
                    }
                }else{
                    row[0].style.backgroundColor = player2Color;
                    playerTurn.textContent = player1 + ' turn!'
                    if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
                        playerTurn.textContent = player2 + ' wins!';
                        playerTurn.style.color = player2Color;
                        return(alert(player2 + ' is the winner!'));
                    }else if(drawCheck()){
                        playerTurn.textContent = 'Game is a DRAW!';
                        return alert('DRAW');
                    }else{
                        playerTurn.textContent = player1 + ' turn!';
                        return currentPlayer = 1;
                    }
                }
            }
        }
    }

    function colorMatchCheck(one, two, three, four){
        return(one == two && one === three && one === four && one !== 'white');
    }

    function horizontalCheck(){
        for(let row = 0; row < tableRow.length; row++){
            for(let col = 0; col < 4; col++){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row].children[col+1].style.backgroundColor, 
                    tableRow[row].children[col+2].style.backgroundColor,
                    tableRow[row].children[col+3].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }

    function verticalCheck(){
        for(let col = 0; col < 7; col++){
            for(let row = 0; row < 3; row++){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row+1].children[col].style.backgroundColor, 
                    tableRow[row+2].children[col].style.backgroundColor,
                    tableRow[row+3].children[col].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }

    function diagonalCheck1(){
        for(let col = 0; col < 4; col++){
            for(let row=0; row < 3; row++){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row+1].children[col+1].style.backgroundColor, 
                    tableRow[row+2].children[col+2].style.backgroundColor,
                    tableRow[row+3].children[col+3].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }
    
    function diagonalCheck2(){
        for(let col = 0; col < 4; col++){
            for(let row=5; row > 2; row--){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row-1].children[col+1].style.backgroundColor, 
                    tableRow[row-2].children[col+2].style.backgroundColor,
                    tableRow[row-3].children[col+3].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }

    function drawCheck(){
        let fullSlot = [];
        for(let i = 0; i <tableCell.length; i++){
            if(tableCell[i].style.backgroundColor !== 'white'){
                fullSlot.push(tableCell[i]);
            }
        }
        if(fullSlot.length === tableCell.length){
            return true;
        }
    }

    reset.addEventListener('click', ()=>{
        tableSlot.forEach(slot =>{
            slot.style.backgroundColor = 'white';
        });
        playerTurn.style.color = 'black';
        return (currentPlayer === 1 ? playerTurn.textContent = player1 + ' turn' : playerTurn.textContent = player2 + ' turn')
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //AI Mode

computer.addEventListener('click', ()=>{
    let gameBoard; 
    const humanPlayer = 'red';
    let humanPlayerScore = 0;
    const computer = 'blue'; 

    const slots = document.querySelectorAll('.slot');

    // let currentPlayer = 1;

    startGame();

    function startGame() {
        document.querySelector(".endgame").style.display = "none";
        gameBoard = Array.from(Array(42).keys());
        // Array.prototype.forEach.call(tableCell, (cell) =>{
        //     // cell.addEventListener('click', changeColor);
        //     cell.addEventListener('click', turnClick, false);
        //     cell.style.backgroundColor = 'white';
        // });
        for (let i = 0; i < slots.length; i++) {
            slots[i].style.backgroundColor = 'white';
            slots[i].addEventListener('click', turnClick, false);
        }
    }

    function turnClick(space) {
        let column = space.target.cellIndex;
        // if (typeof gameBoard[column] == 'number') {
        turn(column, humanPlayer);

        if (!checkWin(humanPlayer) && !checkTie()) turn(bestSpot(), computer);
        // }
    }
    
    function turn(spaceId, player) {
        let row = [];
        for(let i=5; i > -1; i--){
            if(tableRow[i].children[spaceId].style.backgroundColor == 'white'){
                row.push(tableRow[i].children[spaceId]);
                row[0].style.backgroundColor = player;
            }
        }

        let gameWon = checkWin(player);
        if(gameWon){
            gameOver(gameWon);
        }
    }

    function checkWin(player) {
        let gameWon = null;

        if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
            gameWon = {player: player};
            if(player === humanPlayer){
                humanPlayerScore++;
            }
        }
        return gameWon;
    }

    function gameOver(gameWon) {
        for (let i = 0; i < slots.length; i++) {
            slots[i].removeEventListener('click', turnClick, false);
        }
        declareWinner(gameWon.player == humanPlayer ? "You win!" : "You lose.");
    }

    function declareWinner(who) {
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerText = who;
    }

    function emptySpaces() {
        // return gameBoard.filter(s => typeof s == 'number');
        let emptySlot = [];
        for (let i = 0; i < slots.length; i++) {
            if(slots[i].style.backgroundColor == 'white'){
                emptySlot.push(i);
            }
        }

        // for(let i = 0; i <tableCell.length; i++){
        //     if(tableCell[i].style.backgroundColor !== 'white'){
        //         fullSlot.push(tableCell[i]);
        //     }
        // }
        // if(fullSlot.length === tableCell.length){
        //     return true;
        // }
        return emptySlot;
    }

    function bestSpot() {
        return minimax(gameBoard, computer).index;
    }

    function checkTie(){
        // let fullSlot = [];
        // for(let i = 0; i <tableCell.length; i++){
        //     if(tableCell[i].style.backgroundColor !== 'white'){
        //         fullSlot.push(tableCell[i]);
        //     }
        // }
        // if(fullSlot.length === tableCell.length){
        //     return true;
        // }

        if (emptySpaces().length == 0) {
            for (let i = 0; i < slots.length; i++) {
                slots[i].style.backgroundColor = "#B3E5FC";
                slots[i].removeEventListener('click', turnClick, false);
            }
            declareWinner("Tie Game!")
            return true;
        }
        return false;
    }

    function minimax(newBoard, player) {
        let availSpots = emptySpaces();

        // console.log(availSpots);
    
        // console.log(checkWin(humanPlayer));
        if (checkWin(humanPlayer)) {
            return {score: -10};
        } else if (checkWin(computer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }

        let moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
            
            
            if (player == computer) {
                let result = minimax(newBoard, humanPlayer);
                move.score = result.score;
            } else {
                let result = minimax(newBoard, computer);
                move.score = result.score;
            }
    
            newBoard[availSpots[i]] = move.index;

            console.log(newBoard[availSpots[i]]);
    
            moves.push(move);
        }
    
        let bestMove;
        if(player === computer) {
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    
        return moves[bestMove];
    }

    // // Players adding chips function
    // function changeColor(e){
    //     let column = e.target.cellIndex;
    //     let row = [];
    
    //     for(let i=5; i > -1; i--){
    //         if(tableRow[i].children[column].style.backgroundColor == 'white'){
    //             row.push(tableRow[i].children[column]);
    //             if(currentPlayer === 1){
    //                 row[0].style.backgroundColor = humanPlayer;
    //                 if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
    //                     playerTurn.textContent = player1 + ' wins!';
    //                     playerTurn.style.color = humanPlayer;
    //                     return(alert(player1 + ' is the winner!'));
    //                 }else if(drawCheck()){
    //                     playerTurn.textContent = 'Game is a DRAW!';
    //                     return alert('DRAW');
    //                 }else{
    //                     playerTurn.textContent = player2 + ' turn!';
    //                     return currentPlayer = 2;
    //                 }
    //             }else{
    //                 row[0].style.backgroundColor = computer;
    //                 playerTurn.textContent = player1 + ' turn!'
    //                 if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
    //                     playerTurn.textContent = player2 + ' wins!';
    //                     playerTurn.style.color = computer;
    //                     return(alert(player2 + ' is the winner!'));
    //                 }else if(drawCheck()){
    //                     playerTurn.textContent = 'Game is a DRAW!';
    //                     return alert('DRAW');
    //                 }else{
    //                     playerTurn.textContent = player1 + ' turn!';
    //                     return currentPlayer = 1;
    //                 }
    //             }
    //         }
    //     }
    // }


    
    function colorMatchCheck(one, two, three, four){
        return(one == two && one === three && one === four && one !== 'white');
    }

    function horizontalCheck(){
        for(let row = 0; row < tableRow.length; row++){
            for(let col = 0; col < 4; col++){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row].children[col+1].style.backgroundColor, 
                    tableRow[row].children[col+2].style.backgroundColor,
                    tableRow[row].children[col+3].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }
    
    function verticalCheck(){
        for(let col = 0; col < 7; col++){
            for(let row = 0; row < 3; row++){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row+1].children[col].style.backgroundColor, 
                    tableRow[row+2].children[col].style.backgroundColor,
                    tableRow[row+3].children[col].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }

    function diagonalCheck1(){
        for(let col = 0; col < 4; col++){
            for(let row=0; row < 3; row++){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row+1].children[col+1].style.backgroundColor, 
                    tableRow[row+2].children[col+2].style.backgroundColor,
                    tableRow[row+3].children[col+3].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }
        
    function diagonalCheck2(){
        for(let col = 0; col < 4; col++){
            for(let row=5; row > 2; row--){
                if(colorMatchCheck(
                    tableRow[row].children[col].style.backgroundColor, 
                    tableRow[row-1].children[col+1].style.backgroundColor, 
                    tableRow[row-2].children[col+2].style.backgroundColor,
                    tableRow[row-3].children[col+3].style.backgroundColor)){
                        return true;
                    }
            }
        }
    }




});





