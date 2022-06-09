const words = [
  "cookie",
  "peanut butter",
  "noodle",
  "kimchi noodle",
  "cherry",
  "melons",
  "carrot cake",
  "potato chips",
  "sour lemons",
  "waffle",
  "almond",
  "onions",
  "ginger",
  "toasts",
  "tomato sauce",
  "unsalted butter",
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
  const startDate = new Date("2022-06-03");
  startDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameId = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

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
