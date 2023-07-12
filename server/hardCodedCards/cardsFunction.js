const { Card } = require("../models/Card");
const hardCodeJSON = require("./arrayOfCards.json");

const cardsFunction = async () => {
  const allCards = await Card.find({});
  if (allCards.length <= 0) {
    Card.create(hardCodeJSON);
  }
};

cardsFunction();
