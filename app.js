const tempLoad=()=>{
    let logo=document.querySelector('.logo');
    setTimeout(() => {
        logo.innerHTML=`<i class="fas fa-cloud-sun-rain"></i>`;
    },1000);
    setTimeout(() => {
        logo.innerHTML=`<i class="fas fa-cloud-sun"></i>`;
    },2000);
    setTimeout(() => {
        logo.innerHTML=`<i class="fas fa-cloud-moon-rain"></i>`;
    }, 3000);
}
tempLoad();
setInterval(tempLoad,3000);
const plus=document.querySelector('.button');
const add=document.getElementById('add');
const overlay=document.querySelector('.overlay');
plus.addEventListener("click",function(){
overlay.classList.add('overlay-open');
})

let divNum=0;
const generate_weather=async()=>{
   
    divNum++;
    const div = document.createElement('div');
    const grid=document.querySelector('#grid');
    div.innerHTML=`
    
    <div class="weather">
    <div class="city-tab` + divNum +`" id="rem">
    <div class="flex_outer">
    <div class="flex_inner">
    <h1><span class="temperature"></span><button class="temp_but" id="cel">°C</button>|<button class="temp_but" id="fahr">°F</button></h1>
    <div class="p_and_h">
        <h3>Pressure :<span class="pressure"></span></h3>
        <h3>Humidity :<span class="humidity"></span></h3>
    </div>
    </div>
     <div class="city">
        <h1>City :<span class="name_city"></span></h1>
        <h3>Latitude :<span class="Lat"></span></h3>
        <h3>Longitude :<span class="Lon"></span></h3>
     </div>
    </div>
    <div class="temp_range">
      <h3>Temp-Max :<span class="max"></span></h3>
      <h3>Temp-Min :<span class="min"></span></h3>
      <button class="minus" id="minus"><i class="far fa-minus-square"></i></button>
    </div>
  </div>
</div>
    `;
    grid.appendChild(div);
    overlay.classList.remove('overlay-open');
    const value=document.querySelector('#input').value;
    const temperature=document.querySelector('.city-tab' + divNum + ' .temperature');
    const cel=document.querySelector('.city-tab' + divNum + ' #cel');
    const fahr=document.querySelector('.city-tab' + divNum + ' #fahr');
    const pressure=document.querySelector('.city-tab' + divNum + ' .pressure');
    const humidity=document.querySelector('.city-tab' + divNum + ' .humidity');
    const Name_of_City=document.querySelector('.city-tab' + divNum + ' .name_city');
    const Lat=document.querySelector('.city-tab' + divNum + ' .Lat');
    const Lon=document.querySelector('.city-tab' + divNum + ' .Lon');   
    const max=document.querySelector('.city-tab' + divNum + ' .max');
    const min=document.querySelector('.city-tab' + divNum + ' .min');
    const minus=document.querySelector('.city-tab' + divNum + ' #minus');

    minus.addEventListener("click",function(e){
        minus.parentNode.parentNode.parentNode.remove();
    })
    const res=await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${value}&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0bfba44c7amshb8daa103d3abf2ep1b1261jsn8235e55c88ba",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    }).catch((err) => {
        console.log(`the error is ${err}`);      
    });

    const data=await res.json();
    /* console.log(data.list[0]); */
    Name_of_City.innerHTML=`${data.list[0].name}`;
    Lat.innerHTML=`${Math.round(data.list[0].coord.lat)}`;
    Lon.innerHTML=`${Math.round(data.list[0].coord.lon)}`;
    humidity.innerHTML=`${data.list[0].main.humidity}`;
    pressure.innerHTML=`${data.list[0].main.pressure}`;
    temperature.innerHTML=`${Math.round(data.list[0].main.temp-273.15)}`;
    max.innerHTML=`${Math.round(data.list[0].main.temp_max-273.15)}`;
    min.innerHTML=`${Math.round(data.list[0].main.temp_min-273.15)}`;


    cel.addEventListener("click",function(){
        temperature.innerHTML=`${Math.round(data.list[0].main.temp-273.15)}`;
        cel.style.color=`tomato`;
        fahr.style.color=`black`;
    })
    fahr.addEventListener("click",function(){
        let val=Math.round(data.list[0].main.temp-273.15);
        temperature.innerHTML=`${Math.round((val*9/5)+32)}`;
        fahr.style.color=`tomato`;
        cel.style.color=`black`;
    })
}
add.addEventListener("click",generate_weather);
