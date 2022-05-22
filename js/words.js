const wordsAM = [
  "cookie",
  "peanut",
  "noodle",
  "kimchi",
  "cherry",
  "melons",
  "carrot",
  "potato",
  "lemons",
  "waffle",
  "almond",
  "onions",
  "ginger",
  "toasts",
  "tomato",
  "butter",
  "plates",
  "coffee",
  "cereal",
  "apples",
  "banana",
  "orange",
  "bottle",
  "shrimp",
  "prawns",
  "yogurt",
  "peeler",
  "pomelo",
  "lychee",
  "longan",
  "fruits",
  "celery",
  "teabag",
  "fennel",
  "buffet",
  "eating",
  "dining",
  "grapes",
];

const wordsPM = ["Eating", "Dining", "Fruits", "Teabag", "Lemons", "Buffet"];

const startDate = new Date("2022-05-18");
const today = new Date();
const gameId = today.getDate() - startDate.getDate();
const gameDaySession = today.getHours();
const currentWord = gameDaySession < 12 ? wordsAM[gameId] : wordsPM[gameId];

export { currentWord, gameId, gameDaySession };
