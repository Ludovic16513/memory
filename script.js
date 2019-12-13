/**
 * Method that shuffle an array
 * @param {Array<*>} array
 * @return {Array<string>}
 */
const shuffleArray = array => {
  const result = [...array] // Copy the original array to a new one
  const arraySize = result.length;
  const numberOfDraw = 100;

  for(let i=0; i<numberOfDraw; i++){
    const randomIndex = Math.floor(Math.random() * Math.floor(arraySize));
    const randomElement = result[randomIndex];
    result.splice(randomIndex, 1); // Remove random element from array
    result.push(randomElement);		// And put it at the end of the array
  }

  return result;
}

/**
 * Memory Game Class
 * Author: blabla...
 * Github: ....
 */
class MemoryGame {

  /**
   * Default class constructor (method launched when class is instantiated)
   */
  constructor() {}

  /**
   * Reset all variable to default value
   */
  resetGame() {
    this.scoreDivElement = document.getElementById('score');
    this.cardDivElements = document.getElementsByClassName('carte');

    this.cardImageSources = this._getCardImageSources();
    this.cardImageSources = shuffleArray(this.cardImageSources);
    this._resetAllCardsImageSource();

    this.findedCardIndexes = []; // Store all finded card
    this.firstFlippedCardIndex = null; // currentFlippedCard = null when no card has been flipped
    this.disableClickOnCard = false; // Allow player to click on card

    this._addCardClickEventListeners();
  }

  /**
   * Returns all card image sources.
   * @private
   * @return {Array<string>}
   */
  _getCardImageSources() {
    let result = [];
    for (let i = 1; i < 7; i++) {
      result.push(`carte${i}.png`);
    }
    result.push(...result); // Duplicate card array
    return result;
  }

  /**
   * Set default back image to all cards
   * @private
   */
  _resetAllCardsImageSource() {
    for (let i = 0; i < this.cardDivElements.length; i++) {
      this._resetCardElement(i)
    }
  }

  /**
   * Set default back image on specified card
   * @private
   * @param {number} cardIndex
   */
  _resetCardElement(cardIndex) {
    const cardDivElement = this.cardDivElements[cardIndex];
    cardDivElement.src = 'doscarte.png';
  }

  /**
   * Add click events to card div elements
   * @param {Array<object>} cardDivElements
   * @private
   */
  _addCardClickEventListeners() {
    const numberOfCards = this.cardDivElements.length;
    for (let i = 0; i < numberOfCards; i++) {
      const cardDivElement = this.cardDivElements[i];
      cardDivElement.addEventListener('click', () => {
        this._cardClickedEvent(i)
      });
    }
  }

  /**
   * Event called when a card is clicked.
   * @param {number} cardIndex
   * @private
   */
  _cardClickedEvent(cardIndex){
    const cardDivElement = this.cardDivElements[cardIndex];

    // If click on card is disable
    if (this.disableClickOnCard === true) {
      return;
    }

    // When no card has been flipped (first click on a card)
    if (this.firstFlippedCardIndex === null) {
      cardDivElement.src = this.cardImageSources[cardIndex];
      this.firstFlippedCardIndex = cardIndex;
    }

    // When a first card has already been flipped and player click on OTHER card
    if (
      this.firstFlippedCardIndex !== -1 &&
      this._isCardFlipped(cardIndex) === false
    ) {
      this.disableClickOnCard = true; // Freeze player to avoid click on third card
      cardDivElement.src = this.cardImageSources[cardIndex];
      setTimeout(() => {
        const secondFlippedCardIndex = cardIndex;
        this._turnEnded(this.firstFlippedCardIndex, secondFlippedCardIndex);
      }, 1000)
    }
  }

  /**
   * Check if player win the turn or not.
   * If the player win : store finded Cards and launch a new turn
   * If the player find all cards : launch a new game (reset the game)
   * If the player lose : restore the two flipped cards and launch a new turn
   * @param {number} firstCardIndex
   * @param {number} secondCardIndex
   * @private
   */
  _turnEnded(firstCardIndex, secondCardIndex)
  {
    const firstCardImageSource = this.cardImageSources[firstCardIndex];
    const secondCardImageSource = this.cardImageSources[secondCardIndex];

    // Check if player win the turn
    if (firstCardImageSource === secondCardImageSource) {
      this.findedCardIndexes.push(firstCardIndex);
      this.findedCardIndexes.push(secondCardIndex);

      // If all card has been finded
      const numberOfCards = this.cardImageSources.length;
      const numberOfCardFinded = this.findedCardIndexes.length;
      if (numberOfCardFinded === numberOfCards) {
        setTimeout(() => {
          alert('BRAVO ! PARTIE TERMINEE !');
          this.resetGame();
        }, 1000)
      } else {
        alert('Bien joué !');
        this.firstFlippedCardIndex = null;
        this.disableClickOnCard = false;	// Allow player to click on card
      }
    } else {
      this._resetCardElement(firstCardIndex);
      this._resetCardElement(secondCardIndex);
      this.firstFlippedCardIndex = null;
      this.disableClickOnCard = false;	// Allow player to click on card
    }
  }

  /**
   * Return if card is flipped or not
   * @param {number} cardIndex
   * @private
   * @return {boolean}
   */
  _isCardFlipped(cardIndex) {
    // If latest card clicked corresponding to specified cardIndex
    if (this.firstFlippedCardIndex === cardIndex) {
      return true;
    }

    // If clicked card is already found
    if (this.findedCardIndexes.includes(cardIndex)) {
      return true;
    }

    return false;
  }

} // End of MemoryGame class

const memoryGame = new MemoryGame();
memoryGame.resetGame(); // Launch the game
