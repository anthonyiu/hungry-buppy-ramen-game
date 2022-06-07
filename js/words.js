const words = [
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
  "Eating",
  "Dining",
  "Fruits",
  "Teabag",
  "Lemons",
  "Buffet",
  "celery",
  "teabag",
  "fennel",
  "buffet",
  "eating",
  "dining",
  "grapes",
];

// const wordsPM = [
//   "Eating",
//   "Dining",
//   "Fruits",
//   "Teabag",
//   "Lemons",
//   "Buffet",
//   "celery",
//   "teabag",
//   "fennel",
//   "buffet",
//   "eating",
//   "dining",
//   "grapes",
// ];

const currentWord = () => {
  const startDate = new Date("2022-06-06");
  const today = new Date();
  const gameId = today.getDate() - startDate.getDate();
  const todayWord = words[gameId];
  // const gameDaySession = today.getHours();
  // return gameDaySession < 12 ? wordsAM[gameId] : wordsPM[gameId];
  return {
    today: today,
    gameId: gameId,
    todayWord: todayWord,
  };
};

export { currentWord };
