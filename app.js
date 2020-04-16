/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the
next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// set variables
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;


// get the element of the selected class and set display to none
document.querySelector('.dice').style.display = 'none';

//get elements by Id, set text content to zero
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// get the element of the selected class and listen for click event
document.querySelector('.btn-roll').addEventListener('click', function () {
   // get a random number
   dice = Math.floor(Math.random() * 6) + 1;
   // display the result
   var diceDOM = document.querySelector('.dice')
   diceDOM.style.display = 'block';
   diceDOM.src = 'dice-' + dice + '.png';

   // update the round score IF the rolled number was NOT a 1
   if (dice !== 1) {
      //add the score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
   } else {
      //go to next player
      nextPlayer();
   }
});

// get the element of the selected class and listen for click event
document.querySelector('.btn-hold').addEventListener('click', function () {
   // add CURRENT score to GLOBAL score
   scores[activePlayer] += roundScore;
   // update the UI
   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   // check if player won the game
   if (scores[activePlayer] >= 10) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
   } else {
      //next player
      nextPlayer();
   }
});

function nextPlayer() {
   //go to next player
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;

   //reset current score
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   //toggle active class each time a 1 is rolled
   document.querySelector('.player-0-panel').classList.toggle('active')
   document.querySelector('.player-1-panel').classList.toggle('active')

   //reset dice display style
   document.querySelector('.dice').style.display = 'none';
}