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
//   function calculateSolarPanelCount(roofArea, panelEfficiency) {
//     // Assuming roofArea is in square meters and panelEfficiency is a decimal (e.g., 0.18 for 18% efficiency)
//     let totalPanelArea = parseFloat(roofArea) * panelEfficiency; // Adjusted roof area based on panel efficiency
//     let panelArea = 5; // Average area of a standard solar panel in square meters (adjust as needed)
//     let panelCount = Math.ceil(totalPanelArea / panelArea); // Round up to ensure full coverage
//     if(panelCount!=NaN){
//       return panelCount;
//     }
   
// }

function calculateSolarPanels(monthlyusage) {
  let yearlyusage= monthlyusage*12;
  return Math.floor((yearlyusage/1.6)/320);
}
function capacityofsolarpanel(monthlyusage){
  return Math.floor(monthlyusage/120);
}
function calculatingcost(capacity, numberofpanels){
  if(capacity>10){
    return (470000*numberofpanels);
  }
  return solarSystemCosts[capacity-1]*numberofpanels;
}
function finalcostaftermaintainance(temptime, totalcost){
  // Taking 2500 for maintainance cost for simplicity here
  let costoffinal= (temptime*(totalcost))+ (temptime*2500);
  return costoffinal;
}
async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.render('tempresult');
    // this tempresult is the new home page
});
app.get('/form', (req, res)=>{
    res.render('form');
});
app.get('/temp', (req, res)=>{
  res.render('tempresult');
})
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
});
app.get('/solarcal', (req, res)=>{
  res.render('solarcalform', {indianStates});
});
app.post('/solarcal', (req, res)=>{
  let solardata= req.body;
  console.log(solardata);
  let numberofpanels= calculateSolarPanels(parseInt(solardata.requiredusage));
  let capacityofeachpanel= capacityofsolarpanel(parseInt(solardata.requiredusage));
  let costofinstallation= calculatingcost(capacityofeachpanel, numberofpanels);
  let monthlycost= parseInt(solardata.bill);
  let timeinmonths= (costofinstallation/monthlycost).toFixed(2);
  let timeinyears= timeinmonths/12;
  res.render('solarcalculated', {numberofpanels, capacityofeachpanel, costofinstallation, timeinyears});
})
app.listen(3000, ()=>{
    console.log('App is listening to port 3000');
});

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry"
];
const solarSystemCosts=[
  65000,
  105000,
  150000,
  185000,
  230000,
  285000,
  315000,
  405000,
  450000
];