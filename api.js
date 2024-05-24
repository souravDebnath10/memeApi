// let meme = document.getElementById("meme");
// let title = document.getElementById("title");
// let getMemeBtn = document.getElementById("get-meme-btn");
// //API URL
// let url = " https://meme-api.herokuapp.com/gimme/ ";
// //Array of subreddits of your choice
// let subreddits = ["catmemes", "wholesomemes", "dogmemes", "me_irl"];

// //Function To Get Random Meme
// let getMeme = () => {
//   //Choose a random subreddit from the subreddits array
//   let randomSubreddit =
//     subreddits[Math.floor(Math.random() * subreddits.length)];
//   //Fetch data from the api
//   fetch(url + randomSubreddit)
//     .then((resp) => resp.json())
//     .then((data) => {
//       let memeImg = new Image();
//       //Display meme image and title only after the image loads
//       memeImg.onload = () => {
//         meme.src = data.url;
//         title.innerHTML = data.title;
//       };
//       memeImg.src = data.url;
//     });
// };

// //Call the getMeme() on button click and on window load
// getMemeBtn.addEventListener("click", getMeme);
// window.addEventListener("load", getMeme);

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

const subreddits = ["catmemes"];

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/getMeme",async (req,res) => {
  try{
    const type = subreddits[Math.floor(Math.random()*subreddits.length)];
    const response = await axios.get(`https://meme-api.com/gimme/${type}`);
    const result1 = response.data;
    const result = result1.url;
    const t1 = result1.title;
    //res.send(`<img src=public/${result}>`);
    res.render("index.ejs",{dynamicImg : result, tt : t1});
  }
  catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port,() => {
  console.log("Server is running on port 3000");
});