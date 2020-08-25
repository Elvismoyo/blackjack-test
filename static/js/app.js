// Challenge 1: Age in Days
// years of the user * 365

ageinDays = () => {

    var birthYear = prompt('What year were you born?');
    var ageinD = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageinD + ' days old')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

reset = () => {
    document.getElementById('ageInDays').remove();
}
// Challenge 2: Doggo generator
generateCat = () => {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://api.thedogapi.com/api/images/get?format=src&type=gif&size=small";
    image.style.height = '250px';
    image.style.width = '250px';
    div.appendChild(image);

}
//Challenge 3: Rock, Paper, Scissors

rpsGame = (choice) => {

    var humanChoice, botChoice;
    humanChoice = choice.id;
    botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    results = decideWinner(humanChoice, botChoice);
    fMessage = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, fMessage);

    console.log(results);


}
decideWinner = (human, bot) => {

    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    }
    var humanScore = rpsDatabase[human][bot];
    var botScore = rpsDatabase[bot][human];

    return [humanScore, botScore];
}

finalMessage = ([humanScore, botScore]) => {

    if (humanScore == 0)
        return { 'message': 'You lost!', 'color': 'red' };
    else if (humanScore == 0.5)
        return { 'message': 'You tied!', 'color': 'magenta' };
    else
        return { 'message': 'You won!', 'color': 'green' };

}

rpsFrontEnd = (human, bot, finalMessage) => {
    console.log(human);
    console.log(bot);
    var hImage = document.getElementById(human).src;
    var bImage = document.getElementById(bot).src;


    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    console.log(hImage);

    var hDiv = document.createElement('div');
    var bDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    console.log(finalMessage['color']);

    //Those quotation marks are highly important, otherwise it will not work
    hDiv.innerHTML = "<img src='" + hImage + "' height='200px' width='250px' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    bDiv.innerHTML = "<img src='" + bImage + "' height='200px' width='250px' style='box-shadow: 0px 10px 50px rgba(243, 38, 23, 1);'>"
    document.getElementById('flex-box-rps-div').appendChild(hDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(bDiv);




}

// Challenge 4: Change the Color of All Buttons

var btns = document.getElementsByTagName('button');

var copyBtns = [];

for (let i=0; i < btns.length; i++){
    copyBtns.push(btns[i].classList[1]);
}



const btnsColorChange = (e) =>{
   
    if(e.value=="green"){
        btnsGreen();
        return;
    }
    if(e.value=="red"){
        btnsRed();
        return;
    }
    if(e.value=="reset"){
        btnsReset();
        return;
    }
    if(e.value=="random"){
        btnsRandom();
        return;
    }
}
const btnsGreen = () =>{
    for (let i=0; i < btns.length; i++){
        btns[i].classList.remove(btns[i].classList[1]);    
        btns[i].classList.add('btn-success');
    }
}
const btnsRed = () =>{
    for (let i=0; i < btns.length; i++){
        btns[i].classList.remove(btns[i].classList[1]);    
        btns[i].classList.add('btn-danger');
    }
}
const btnsRandom = () =>{
    let colors = ['btn-primary','btn-danger','btn-success', 'btn-warning'];
    
    for(let i=0; i<btns.length; i++){
        btns[i].classList.remove(btns[i].classList[1]);
        let x = Math.floor(Math.random() * 4)
        btns[i].classList.add(colors[x]);
    }

}

const btnsReset = () =>{
    for(let i=0; i<btns.length; i++){
        btns[i].classList.remove(btns[i].classList[1]);   
        btns[i].classList.add(copyBtns[i]);
    }
}

//Challenge 5

//Arrow functions should be placed before they are called later on

let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
}
console.log(blackJackGame['you']['div']);

//Access tokens easily
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const CARDS = blackJackGame['cards'];


let hitSound = new Audio('static/sounds/swish.m4a');
let winSound = new Audio('static/sounds/cash.mp3');
let loseSound = new Audio('static/sounds/aww.mp3');
const startGame = () =>{
    blackJackHit(YOU);
}
const blackJackHit = (currentPlay) =>{
    let cardImg = document.createElement('img');
    let randomCard = CARDS[Math.floor(Math.random() * 13)];
    
    cardImg.src = 'static/cardsPics/'+randomCard+'.png';
    document.querySelector(currentPlay['div']).appendChild(cardImg);
    hitSound.play();
    updateScore(randomCard, currentPlay)
}

const blackJackDeal = () =>{
    document.getElementById('blackjack-deal-btn').disabled = true;
    document.querySelector('#blackjack-hit-btn').disabled = false;
    document.querySelector('#blackjack-stand-btn').disabled = false;
    let playerImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
   
    for(let i=0;i<playerImages.length;i++){
        playerImages[i].remove();
    }
    for(let i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    console.log(playerImages[0]);

    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector(YOU['scoreSpan']).innerText = 0;
    document.querySelector(DEALER['scoreSpan']).innerText = 0;
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
    document.querySelector('#blackjack-result').style.color = 'black';
   
}
const updateScore = (card, currentPlay) =>{
    let cardValue = parseInt(card);
    if(card == 'A'){
        if(currentPlay['score'] + 11 > 21)
        cardValue = 1;
        else
        cardValue = 11;
    }
    
    else if(isNaN(cardValue))
    cardValue = 10;
    

    
    currentPlay['score'] += cardValue;
    
    document.querySelector(currentPlay['scoreSpan']).textContent = currentPlay['score'];
    if(currentPlay['score'] > 21){
        document.querySelector(currentPlay['scoreSpan']).textContent = 'BUST!';
        document.querySelector(currentPlay['scoreSpan']).style.color = 'black';
        
    }
}

const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
}

    const dealerBot = async () =>{
    document.getElementById('blackjack-deal-btn').disabled = false;
    document.querySelector('#blackjack-hit-btn').disabled = true;
    document.querySelector('#blackjack-stand-btn').disabled = true;
    
    
  
        
        while(DEALER['score'] < 14){
            blackJackHit(DEALER);
            await sleep(500);
        }

    
    decideWinnerBlackJack();
    showResult(decideWinnerBlackJack());
    
}
const decideWinnerBlackJack = () =>{
    let winner = 0;
     if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            console.log('YOU WIN!!!');
            winner = YOU;
        } else if(YOU['score'] < DEALER['score']){
         console.log('YOU LOSE!!!');
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            console.log('YOU DREW!!!!');
        }
     } else if(YOU['score'] > 21 && DEALER['score'] <= 21){
         console.log('YOU LOST!!!');
         winner = DEALER;
     } else if(YOU['score'] > 21 && DEALER['score'] > 21){
         console.log('YOU DREW!!!');
     }
     return winner;
}
var wins=0, losses=0, draws=0;
const showResult = (winner) =>{
    let message ='', mColor = '';
    

    if(winner === YOU){
        message = 'YOU WON!!!';
        mColor = 'green';
        winSound.play();
        document.getElementById('wins-blackjack').textContent = ++wins;
    } else if(winner === DEALER){
        message = 'YOU LOSE...';
        mColor = 'red';
        loseSound.play();
        document.getElementById('losses-blackjack').textContent = ++losses;
    } else {
        message = 'YOU DREW';
        mColor = '#efcc00';
        loseSound.play();
        document.getElementById('draws-blackjack').textContent = ++draws;
        
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = mColor;
}
document.getElementById('blackjack-deal-btn').disabled = true;
document.querySelector('#blackjack-hit-btn').addEventListener('click', startGame)
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerBot)
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackJackDeal)

/*Normal functions can normally be placed everywhere and it will still be called
regardless of where it is*/
