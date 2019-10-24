//Variables//icons array

const icons = [
  "fas fa-cat",
  "fas fa-cat",
  "fas fa-carrot",
  "fas fa-carrot",
  "fas fa-car-side",
  "fas fa-car-side",
  "fas fa-dog",
  "fas fa-dog",
  "fas fa-heart",
  "fas fa-heart",
  "fas fa-cloud",
  "fas fa-cloud",
  "fas fa-tree",
  "fas fa-tree",
  "fab fa-earlybirds",
  "fab fa-earlybirds"
];

let deck = document.querySelector(".deck");
let restart = document.querySelector(".restart");
const moves = document.querySelector(".moves");
const starsArr = ["fa fa-star", "fa fa-star", "fa fa-star"];
const stars = document.querySelector(".stars");
let openedCards = [];
let matchedCards = [];

shuffle(icons);

//////Start the game for the first time
init();

//Initialize the game
function init() {
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    deck.appendChild(card);

    //Add click Event
    click(card);
  }
}

//Click Event
function click(card) {
  //Card Click Event

  card.addEventListener("click", function showCard() {
    if (openedCards.length === 1) {
      const currentCard = this;
      const previousCard = openedCards[0];

      card.classList.add("open", "show", "disable");
      openedCards.push(currentCard);
      //compare cards
      compare(currentCard, previousCard);
    } else {
      card.classList.add("open", "show", "disable");
      openedCards.push(this);
    }
  });
}

//Compare cards
function compare(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);

    openedCards.length = 0;

    //Game over
    setTimeout(function() {
      isOver();
    }, 1000);
  } else {
    currentCard.classList.add("fail");
    previousCard.classList.add("fail");

    setTimeout(function() {
      currentCard.classList.remove("open", "show", "fail", "disable");
      previousCard.classList.remove("open", "show", "fail", "disable");
    }, 500);

    openedCards.length = 0;
  }
  movesCount();
}

//Restart click event
restart.addEventListener("click", function() {
  //delete all cards
  deck.innerHTML = "";
  //init to create new cards
  shuffle(icons);
  init();
  //reset variables
  moves.innerHTML = `0 Moves`;
  movesCounter = 0;
  openedCards.length = 0;
  matchedCards.length = 0;
});

//Shuffle Cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Add Moves
let movesCounter = 0;

function movesCount() {
  movesCounter++;
  if (movesCounter === 1) {
    moves.innerHTML = `${movesCounter} Move`;
  } else {
    moves.innerHTML = `${movesCounter} Moves`;
  }
  rating();
}

//Rating

function rating() {
  if (movesCounter <= 15) {
    stars.innerHTML =
      '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
  } else if (movesCounter > 15 && movesCounter <= 20) {
    stars.innerHTML =
      '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> ';
  } else {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
  }
}

//Game Over pop-up

function isOver() {
  if (matchedCards.length === icons.length) {
    JSalert();
  }
}

function JSalert() {
  Swal.fire("Congrats!", "You win!", "success");
}
