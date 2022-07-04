   const Gameboard = (() => {
       const gameContainer = document.querySelector('.gameContainer');
       const squaresArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
       let squaresNodList = document.querySelectorAll('.square');
       const twoPlayersButton = document.querySelector('#two-players-button');
       const onePlayerButton = document.querySelector('#one-player-button');
       const oneUserForm = document.querySelector('#one-user-form');
       const twoUsersForm = document.querySelector('#two-users-form');
       const winnersDisplayScreen = document.querySelector('.display-screen');
       const oneOkButton = document.querySelector('.ok-button-one');
       const twoOkButton = document.querySelector('.ok-button-two');
       const quitButton = document.querySelector('.quit-button');
       const buttonPlayAgain = document.querySelector('.play-again');
       const winnerAnounce = document.querySelector('.anounce-winner');
       let playerOne = document.querySelector('#player-one');
       let playerTwo = document.querySelector('#player-two');
       const blackMask = document.querySelector('.black-mask');
       const winDislplayScreen = document.querySelector('.win-display-screen');
       //  let actualPlayer = 1;
       let playerMark;
       let numberOfEmptyCells = 9


       let numberOfSquares = 9;
       let gameBoard = [];

       for (let i = 0; i < numberOfSquares; i += 1) {
           element = document.createElement('div');
           var element;
           element.setAttribute('class', `square ${squaresArray[i]}`);
           gameContainer.appendChild(element);
           gameBoard.push(document.querySelector(`.${squaresArray[i]}`));

       }

       function playSound() {
           let audioToPlay = new Audio();
           audioToPlay.src = "play.wav";
           return audioToPlay.play();
       }

       function alertSound() {
           let audioToPlay = new Audio();
           audioToPlay.src = "alert.wav";
           return audioToPlay.play();
       }

       function createGameBoard() {

           squaresNodList.forEach((square, index) => {
               square.style.gridArea = squaresArray[index];
           })


       };

       function clearNode(node) {
           node.innerHTML = '';
       }

       function displayForm(form) {
           form.style.display = 'block';
       }

       function displayFlex(form) {
           form.style.display = 'flex';
       }

       function closeForm(form) {
           form.style.display = 'none';
       }

       function checkEnd() {
           numberOfEmptyCells -= 1;
           if (numberOfEmptyCells == 0) {
               const waitingTime = setTimeout(displayDraw, 20);
               setTimeout(alertSound, 20);
               numberOfEmptyCells = 9;

               // cleargameBoard();

           }


       }

       function displayTwoPlayersFormOnly() {

           cleargameBoard();
           displayForm(twoUsersForm)
       }

       function putInScreen(text) {
           winnersDisplayScreen.innerHTML = text;
       }

       function cleargameBoard() {
           gameBoard.forEach((element) => {
               element.style.display = 'none'
           })
       }

       function resetgameBoard() {
           gameBoard.forEach((element) => {
               element.style.display = 'flex';
           })
       }

       function displayOnePlayerFormOnly() {

           cleargameBoard();
           displayForm(oneUserForm);
       }

       function clearPlays() {
           gameBoard.forEach((node) => {
               clearNode(node);
           })
       }

       function displayControler() {
           twoPlayersButton.addEventListener('click', () => {
               displayTwoPlayersFormOnly();
               closeForm(twoPlayersButton);
               closeForm(onePlayerButton);
               putInScreen('Enter your Names ');

           });

           onePlayerButton.addEventListener('click', () => {
               displayOnePlayerFormOnly();
               closeForm(twoPlayersButton);
               closeForm(onePlayerButton);
               putInScreen('Enter your Name');

           });
           oneOkButton.addEventListener('click', () => {
               closeForm(oneUserForm);
               resetgameBoard();
               clearPlays();
               displayForm(quitButton);
               // alert(playerName.value);
               putInScreen('Play Game');
           });
           twoOkButton.addEventListener('click', () => {
               closeForm(twoUsersForm);
               resetgameBoard();
               clearPlays();
               displayForm(quitButton);
               if (playerMark == undefined) {
                   putInScreen(`${playerOne.value.toUpperCase()} turn`);
               } else {
                   if (playerMark == 'X') {
                       putInScreen(`${playerOne.value.toUpperCase()} turn`);
                   } else {
                       putInScreen(`${playerTwo.value.toUpperCase()} turn`);
                   }
               }
               playGame();


           })
           quitButton.addEventListener('click', () => {
               resetgameBoard();
               closeForm(quitButton);
               displayForm(twoPlayersButton);
               displayForm(onePlayerButton);
               populategameBoard();
               putInScreen('Select players');
               closeForm(blackMask);
               closeForm(winDislplayScreen);
               numberOfEmptyCells = 9;

           })
           buttonPlayAgain.addEventListener('click', () => {
               resetgameBoard();
               closeForm(quitButton);
               clearPlays();
               closeForm(blackMask);
               closeForm(winDislplayScreen);
               displayForm(quitButton);
               numberOfEmptyCells = 9;

           })
           window.addEventListener('load', () => {
               let loadStatus = true;
               if (loadStatus) {
                   populategameBoard();
                   loadStatus = false;
               } else {
                   return
               };
               putInScreen('Select players');
           })

           function populategameBoard() {
               const lettersContainer = ['t', 'i', 'c', 't', 'a', 'c', 't', 'o', 'e'];
               gameBoard.forEach((element, index) => {

                   element.innerHTML = lettersContainer[index];
               })
           }

       }

       //  playing

       /// gettind plays ----------------------------------------
       function joinStrings() {
           const nArguments = arguments.length;
           let result = '';
           for (let i = 0; i < nArguments; i += 1) {
               result += arguments[i];
           }
           return result;
       }

       function getPlays() {
           const rowStart = [0, 3, 6];
           const columnStart = [0, 1, 2];
           //  const diagStart = [0, 2];
           let rowPlays = [];
           let columnPlays = [];
           let diagPlays = [];
           const gameBoardContents = [];
           gameBoard.forEach((element) => { //
               gameBoardContents.push(element.innerHTML);
           })
           rowStart.forEach((element) => {
               rowPlays.push(joinStrings(gameBoardContents[element], gameBoardContents[element + 1], gameBoardContents[element + 2]));
           })
           columnStart.forEach((element) => {
               columnPlays.push(joinStrings(gameBoardContents[element], gameBoardContents[element + 3], gameBoardContents[element + 6]));

           })
           diagPlays.push(joinStrings(gameBoardContents[0], gameBoardContents[4], gameBoardContents[8]));
           diagPlays.push(joinStrings(gameBoardContents[2], gameBoardContents[4], gameBoardContents[6]));

           return {
               rowPlays,
               columnPlays,
               diagPlays
           }
       }
       //---------------- end of getting plays
       // checking a winned game 

       function checkWin() {
           let winningPlay = false;
           getPlays().rowPlays.forEach((play) => {
               if (play == 'OOO' || play == 'XXX') {
                   winningPlay = true;
               }
           })

           getPlays().columnPlays.forEach((play) => {
               if (play == 'OOO' || play == 'XXX') {
                   winningPlay = true;
               }
           })

           getPlays().diagPlays.forEach((play) => {
               if (play == 'OOO' || play == 'XXX') {
                   winningPlay = true;
               }
           })
           return winningPlay;
       }


       //------------------identifying the winning cells direction 

       function checkWinDirection() {
           let winDirection;
           getPlays().rowPlays.forEach((play) => {
               if (play == 'OOO' || play == 'XXX') {
                   winDirection = 'row';
               }
           })

           getPlays().columnPlays.forEach((play) => {
               if (play == 'OOO' || play == 'XXX') {
                   winDirection = 'column';
               }
           })

           getPlays().diagPlays.forEach((play) => {
               if (play == 'OOO' || play == 'XXX') {
                   winDirection = 'diag';
               }
           })
           return winDirection;
       }
       //------------------------ end of winning cells direction function

       // --------------- a function to get winner  when a win occure. 

       function checkWinner() {
           let winner;
           if (checkWin()) {
               switch (checkWinDirection()) {
                   case 'diag':
                       if (getPlays().diagPlays.includes('XXX')) {
                           winner = playerOne.value.toUpperCase();
                       } else {
                           winner = playerTwo.value.toUpperCase();
                       }
                       break;
                   case 'row':
                       if (getPlays().rowPlays.includes('XXX')) {
                           winner = playerOne.value.toUpperCase();
                       } else {
                           winner = playerTwo.value.toUpperCase();
                       }
                       break;
                   case 'column':
                       if (getPlays().columnPlays.includes('XXX')) {
                           winner = playerOne.value.toUpperCase();
                       } else {
                           winner = playerTwo.value.toUpperCase();
                       }
                       break;

               }
           }
           return winner;
       }
       //------------------------ end of getting winner function 

       // target winning cells  and -----------------
       function checkWiningPlayIndexs() {

           let playIndex;
           let cellsIndex;
           switch (checkWinDirection()) {
               case 'diag':
                   if (checkWinner() == playerOne.value.toUpperCase()) {
                       playIndex = getPlays().diagPlays.indexOf('XXX');
                       if (playIndex == 0) {
                           cellsIndex = [0, 4, 8];
                       } else {
                           cellsIndex = [2, 4, 6];
                       }
                   } else {
                       playIndex = getPlays().diagPlays.indexOf('OOO');
                       if (playIndex == 0) {
                           cellsIndex = [0, 4, 8];
                       } else {
                           cellsIndex = [2, 4, 6];
                       }
                   }
                   break;
               case 'row':
                   if (checkWinner() == playerOne.value.toUpperCase()) {
                       playIndex = getPlays().rowPlays.indexOf('XXX');
                       if (playIndex == 0) {
                           cellsIndex = [0, 1, 2];
                       } else if (playIndex == 1) {
                           cellsIndex = [3, 4, 5];
                       } else {
                           cellsIndex = [6, 7, 8];
                       }
                   } else {
                       playIndex = getPlays().diagPlays.indexOf('OOO');
                       if (playIndex == 0) {
                           cellsIndex = [0, 1, 2];
                       } else if (playIndex == 1) {
                           cellsIndex = [3, 4, 5];
                       } else {
                           cellsIndex = [6, 7, 8];
                       }
                   }
                   break;
               case 'column':
                   if (checkWinner() == playerOne.value.toUpperCase()) {
                       playIndex = getPlays().columnPlays.indexOf('XXX');
                       if (playIndex == 0) {
                           cellsIndex = [0, 3, 6];
                       } else if (playIndex == 1) {
                           cellsIndex = [1, 4, 7];
                       } else {
                           cellsIndex = [2, 5, 8];
                       }
                   } else {
                       playIndex = getPlays().diagPlays.indexOf('OOO');
                       if (playIndex == 0) {
                           cellsIndex = [0, 3, 6];
                       } else if (playIndex == 1) {
                           cellsIndex = [1, 4, 7];
                       } else {
                           cellsIndex = [2, 5, 8];
                       }
                   }
                   break;
           }
           return cellsIndex;

       }
       //----------------- end of the function that return winning cell indexs */

       // display winner and display draw functions 

       function displayWinner() {

           let winner = checkWinner();
           winnerAnounce.innerHTML = `${winner} Wins`;
           displayForm(blackMask);
           displayFlex(winDislplayScreen);
           alertSound();
       }

       function displayDraw() {
           winnerAnounce.innerHTML = `Draw !!!! `;
           displayForm(blackMask);
           displayFlex(winDislplayScreen);
       }

       //------------------- end ------------
       //----------- function to manage displaying wins and draws
       function playGame() {

           gameBoard.forEach((element) => {


               element.addEventListener('click', () => {

                   if (element.innerHTML == '') {
                       if (playerMark === undefined) {
                           playerMark = 'X';
                           playSound();
                       }
                       element.innerHTML = playerMark;

                       if (playerMark == 'X') {
                           putInScreen(`${playerTwo.value.toUpperCase()} turn`);
                           playerMark = 'O';
                           playSound();
                       } else {
                           putInScreen(`${playerOne.value.toUpperCase()} turn`)
                           playerMark = 'X';
                           playSound();

                       }
                       checkEnd();
                       checkWin();

                       function myalert() {
                           if (checkWin()) {

                               setTimeout(displayWinner, 100);
                           }
                       }
                       myalert();

                   }
               })

           })

       }

       return {
           createGameBoard,
           displayControler,
           gameBoard
       }
   })();

   /********************  handle play  ************************** */

   const Player = (name) => {
       return { name };
   };
   const Gamehandler = (() => {




       return {
           //  joinStrings,
           //  getPlays
           // rowPlays,
           //  columnPlays,
           // diagPlays
       }

   })();
   Gameboard.createGameBoard();

   Gameboard.displayControler();