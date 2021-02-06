/* Global Variables */
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = ',us&appid=932c995e7a84e179178cca3fc9b238e5';
const celsius = '&units=metric';
//Select html elements to use later
const zipCodeInput = document.querySelector('#zip');
const generateButton = document.querySelector('#generate');
const date_ = document.querySelector('#date_');
const temp_ = document.querySelector('#temp_');
const feels_ = document.querySelector('#feels_');

date_.style.display = 'none';
temp_.style.display = 'none';
feels_.style.display = 'none';

// Create a new date instance dynamically with JS
let d = new Date();
//function to do when 'Generate' button is clicked
generateButton.addEventListener('click', performAction);
function performAction(e){
   const zipCode = zipCodeInput.value;
   if(zipCode == ''){
     e.preventDefault();
     alert('Please enter your zip code in order to get current temprature');
   }else{
     getFromAPI(baseUrl, zipCode, apiKey, celsius)
     .then((data)=>{
       try{
         console.log(data);
         document.getElementById('temp').innerHTML = data.main.temp;
         temp_.style.display = 'block';
         document.getElementById('date').innerHTML = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
         date_.style.display = 'block';
         document.getElementById('feels').innerHTML = data.main.feels_like;
         feels_.style.display = 'block';
         }catch(error){
         console.log('error', error);
       }
     })
   }
}
//Get the current weather from openweathermap.org
const getFromAPI = async (baseUrl, zipCode, appId, celsius)=>{
  const response = await fetch (baseUrl+ zipCode+ appId+ celsius);
  try{
    //Converts JSON data into JavaScript Object.
    const data = response.json();
    console.log(data);
    return data;
  }catch(error){
    console.log('error', error);
  }
}
