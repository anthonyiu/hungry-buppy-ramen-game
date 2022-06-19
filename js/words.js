const words = [
  "salmon sushi",
  "ramen",
  "candy",
  "muesli",
  "orange",
  "salami",
  "pawpaw",
  "cereal",
  "cashew",
  "garlic",
  "noodle",
  "cheese",
  "fennel",
  "nougat",
  "apple",
  "radish",
  "longan",
  "walnut",
  "brasil",
  "butter",
  "bagel",
  "ginger",
  "carrot",
  "potato chips",
  "bread",
  "fillet",
  "yogurt",
  "bacon",
  "sesame",
  "chocolate cake",
  "sundae",
  "teabag",
  "panini",
  "papaya",
  "peanut",
  "turkey",
  "turbot",
  "coffee",
  "celery",
  "pomelo",
  "cherry",
  "chives",
  "whisky",
  "acorn",
  "curry chicken",
  "kimchi",
  "pepper",
  "muffin",
  "tomato",
  "quinoa",
  "waffle",
  "almond",
  "gingerbread",
  "banana",
  "salmon",
  "shrimp",
  "nugget",
  "oyster",
  "mussel",
  "hotdog",
  "tomyum",
  "cocoa",
  "lychee",
  "cookie",
  "potato",
  "raisin",
  "apple pie",
];

const currentWord = () => {
  const startDate = new Date("2022-06-19");
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
