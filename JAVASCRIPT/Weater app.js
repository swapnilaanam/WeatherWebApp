var data;
var temperature="";
const temp = document.querySelector('.temperature');

var wind="";
const win = document.querySelector('.wind');

var loca="";
const loc = document.querySelector('.location');

var humadity="";
const hum = document.querySelector('.hum');

var cloudcover="";
const cloud = document.querySelector('.cloud');

var time="";
const tim = document.querySelector('.time');

const head = document.querySelector('.header');

function clearData()
{
    head.innerHTML="";
    loc.innerHTML="";
    temp.innerHTML="";
    win.innerHTML="";
    hum.innerHTML="";
    cloud.innerHTML="";
    tim.innerHTML="";
    loca="";
    temperature="";
    wind="";
    humadity="";
    cloudcover="";
    time="";
}

function setData()
{
    var curr = new Date();

    var currDate = curr.getDate() + "-" + curr.getMonth() + "-" + curr.getFullYear();
    var currTime = curr.getHours() + ":" + curr.getMinutes() + ":" + curr.getSeconds();

    head.innerHTML ="Date: " + currDate + "<br><br>" +
                    "Time: "  + currTime;

    loca +=  data.data[0].city_name + ", " + "Bangladesh";
    loc.innerHTML = loca;

    temperature += "Temperature: " + data.data[0].temp + " &#8451;<br><br>" + 
                   "App. Temp: " + data.data[0].app_temp + " &#8451;<br><br>" +
                   "Condition: " + data.data[0].weather.description ;
    temp.innerHTML = temperature; 
    
    wind += "Wind Speed: " + data.data[0].wind_spd + " Km/h <br><br>" + 
            "Wind Direction: " + (data.data[0].wind_cdir_full).toUpperCase() + "<br><br>" +
            "Wind Degree: " + data.data[0].wind_dir + "&deg";
    win.innerHTML = wind;
    
    humadity += "Sunrise: " + ((parseFloat(data.data[0].sunrise)+6)-24) + " A.M <br><br>" +
                "Sunset: " + ((parseFloat(data.data[0].sunset)+6)-12) + " P.M <br><br>" +
                "Pressure: " + data.data[0].pres + " SI <br><br>";
    hum.innerHTML = humadity;

    cloudcover += "Cloud-Cover: " + data.data[0].clouds + "% <br><br>" +
                "UV-Index: " + data.data[0].uv + "<br><br>";
    cloud.innerHTML = cloudcover;

    time += "Observation Time: " + data.data[0].ob_time + "<br><br>" +
            "Timezone: " + data.data[0].timezone;
    tim.innerHTML = time;
}

function getServer()
{
    var server = new XMLHttpRequest();
    server.open("GET",
                "https://api.weatherbit.io/v2.0/current?city=Dhaka,BD&key=8acdbcfd56a94c9ea2a4eaeac0c39c0e",
                true);
    server.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            data = JSON.parse(this.responseText);
            console.log(data);
            clearData();
            setData();
        }
    }
    server.send();
}

function refresher()
{
    getServer();
    setInterval(getServer, 90000);
}

window.addEventListener('load',refresher);
