const words = ["cookie", "peanut", "noodle", "kimchi", "xsafdasf"];

words.forEach((word) => {
  //   let word_id = word;
  const app_id = "c0f7b024";
  const app_key = "3a0084e1865f3fb72defbf0e90044323";
  const lang = "en-gb";
  const fetchURL = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${lang}/${word.toLowerCase()}`;

  fetch(fetchURL, {
    method: "GET", // or 'PUT'
    mode: "no-cors",
    headers: {
      'app_id': app_id,
      'app_key': app_key,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
        response.json();
      }
    })
    .then((data) => {
      console.log(`Valid: ${word.toLowerCase()}`, data);
    })
    .catch((error) => {
      console.log(`Error:`, error);
    });
});

// import requests
// import json
// app_id = "<your_app_id>"
// app_key = "<your_app_key>"
// language = "en-gb"
// word_id = "example"
// url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/" + language + "/" + word_id.lower()
// r = requests.get(url, headers = {
//     "app_id": <your_app_id>, "app_key": <your_app_key>})
