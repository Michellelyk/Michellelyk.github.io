const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
    //if lockBoard = True, skip this function
    if (lockBoard) return;
    //if double click on a card, skip this function (not a match!)
    if (this === firstCard) return;

    //list to keep track of the 1st & 2nd opened card.
    this.classList.add("flip");

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : flipCardsBack();
}

//if match, prevent them from being clicked again.
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}
//if not a match
function flipCardsBack() {
    //lock the board so that user can't click on
    //any other card before the 2 cards are flipped back.
    lockBoard = true;

    //set a time for how long it takes for the card to flip back.
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//immediately invoked function-shuffle cards before player selects 1st card.
(function shuffle() {
    cards.forEach(card => {
        //assign each card to a random no. btwn 1-11
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(memcard => memcard.addEventListener("click", flipCard));

