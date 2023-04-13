const success = function (data) {
  console.log(data.coords.latitude)
  console.log(data.coords.longitude)

}
const error = function (e) {
  console.error("ERROR", e)
}

navigator.geolocation.getCurrentPosition(success, error);
 
 async function getWeather(){
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=41.716667&lon=&units=metric&appid=06ecae34019f389faf0e8d8036fb3987`;
     let weather = await fetch(url);
     let data = await weather.json()
      console.log(data)
      createWeather(data)
      return data
} catch(error) {
      console.log(error)
    }
}
getWeather()
   
  async function getIp(){
    try {
      let url =  `https://geo.ipify.org/api/v2/country?apiKey=at_aofU8DTNSJ6dYZECBE5iMoeOLObOz`
      let weather = await fetch(url);
     let ipCity = await weather.json()
    return ipCity.location.region
    } catch(error) {
      console.log(error)
    }
  }
  async function getWeatherLocation(){
    try{
      const weatherData= await getWeather()
      createWeather(weatherData)
    }catch (eror){
      console.log(eror)
      const location = await getCity(await getIp ())
      console.log(location)
      createWeather(location)
    }
  }
 async function getCity(city) {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=06ecae34019f389faf0e8d8036fb3987`
    );
    let data = await response.json();
    return data;
  }
  getWeatherLocation()
  let change = document.querySelector(".main__info__change")
  let mainInfo = document.querySelector(".main__info")
  let mainInput = document.querySelector(".main__input")
  let input = document.querySelector("input")
  let mainFind = document.querySelector(".main__find")
  let mainEror = document.querySelector(".main__eror")
  let tryAgainBtn = document.querySelector(".main__try")
  change.addEventListener("click", (e) => {
    mainInfo.style.display = "none"
    mainInput.style.display = "flex"
  })

  mainFind.addEventListener("click", async (e) => {
   let city = input.value.toLowerCase();
   console.log(e.target.value)
    let weatherData = await getCity(city);
    createWeather(weatherData)
    mainInput.style.display = "none"
    mainInfo.style.display = "flex"
    if (!weatherData.main) { // проверяем наличие данных в объекте weatherData
      mainEror.style.display = "flex";
      mainInput.style.display = "none";
    } else {
      createWeather(weatherData);
      mainInput.style.display = "none";
      mainInfo.style.display = "flex";
      mainEror.style.display = "none";
    }
  } )
  tryAgainBtn.addEventListener("click", (e) => {
    mainEror.style.display = "none";
    mainInput.style.display = "flex"
  });

 


// const result = await getWeather()
// console.log(result)
// createWeather(result)
// const resultTwo = await getIp()
// console.log(resultTwo)
// createWeather(resultTwo)
function createWeather(obj){
    let deg = document.querySelector(".main__info__deg")
    deg.innerText = obj.main.temp.toFixed() + "℃";
    let city = document.querySelector(".main__info__windy")
    city.innerText = obj.weather[0].description + " in " + obj.name ;
}
