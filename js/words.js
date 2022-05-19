const wordsAM = [
  "Tomato",
  "Butter",
  "Plates",
  "Coffee",
  "Cereal",
  "Apples",
  "Banana",
  "Orange",
  "Bottle",
];

const wordsPM = ["Eating", "Dining", "Fruits", "Teabag", "Lemons", "Buffet"];

const startDate = new Date("2022-05-17");
const today = new Date();
const gameId = today.getDate() - startDate.getDate();
const gameDaySession = today.getHours();
const currentWord = gameDaySession < 12 ? wordsAM[gameId] : wordsPM[gameId];

export { currentWord, gameId, gameDaySession };
