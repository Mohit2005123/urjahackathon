const express= require('express');
const app= express();
const mongoose= require('mongoose');
const electricitydata= require('./models/schema.js');
const path= require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY= "AIzaSyCmMlc1Sinq96_wAMM7AR9UFWKRnJRdNRM";
const MONGO_URL = "mongodb://127.0.0.1:27017/Electricity";
const genAI = new GoogleGenerativeAI(API_KEY);
async function run(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.render('home');
});
app.get('/form', (req, res)=>{
    res.render('form');
});
app.post('/submit', async(req, res)=>{
    let obj= req.body;
    let string= JSON.stringify(obj);
    console.log(string); 
    let prompt= `${string} this is my monthly  electricity consumption bill and my location and city analyse this and tell me what do you infer from this and give benefits of using a solar panel as well`;
    let text= await run(prompt);
    console.log(text);
    res.render('result', {obj: obj, text:text});
});
app.get('/api/data/:chat', async(req, res)=>{
  let query= req.params;
  let prompt= query.chat;
  let answer=  await run(prompt);
  res.json(answer);
})
app.listen(3000, ()=>{
    console.log('App is listening to port 3000');
});