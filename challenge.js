/*
*--Add the additional functionality--*

Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always
save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score
of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google
to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them
is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// set variables
var scores, roundScore, activePlayer, gamePlaying;

init();
// value will be stored when function completes
var lastDice;

// get the element of the selected class and listen for click event
document.querySelector('.btn-roll').addEventListener('click', function () {
   if (gamePlaying) {
      // get a random number
      dice = Math.floor(Math.random() * 6) + 1;
      // display the result
      var diceDOM = document.querySelector('.dice')
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      if (dice === 6 && lastDice === 6) {
         //Player looses score
         scores[activePlayer] = 0;
         document.querySelector('#score-' + activePlayer).textContent = '0';
         nextPlayer();
      } // update the round score IF the rolled number was NOT a 1
      else if (dice !== 1) {
         //add the score
         roundScore += dice;
         document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
         //go to next player
         nextPlayer();
      }
      // set to the value of the current dice value, which will be stored as the previous dice value when the function runs again
      lastDice = dice;
   }

});

// get the element of the selected class and listen for click event
document.querySelector('.btn-hold').addEventListener('click', function () {
   if (gamePlaying) {
      // add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;
      // update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.score-to-win').value;
      var winningScore;

      // Undefined, 0, null or "" are COERCED to false
      // Anything else is COERCED to true
      if (input) {
         winningScore = input;
      } else {
         winningScore = 100;
      }


      // check if player won the game
      if (scores[activePlayer] >= winningScore) {
         document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
         document.querySelector('.dice').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         gamePlaying = false;
      } else {
         // next player
         nextPlayer();
      }
   }
});

function nextPlayer() {
   // go to next player
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;

   // reset current score
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   // toggle active class each time a 1 is rolled
   document.querySelector('.player-0-panel').classList.toggle('active')
   document.querySelector('.player-1-panel').classList.toggle('active')

   // reset dice display style
   document.querySelector('.dice').style.display = 'none';
}

// reset game parameters
document.querySelector('.btn-new').addEventListener('click', init);

// initialize game parameters
function init() {
   scores = [0, 0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;

   // get the element of the selected class and set display to none
   document.querySelector('.dice').style.display = 'none';

   // get elements by id, set text content to zero
   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   // get elements by id, set text content to player names
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   // get elements by id and remove class
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');

};