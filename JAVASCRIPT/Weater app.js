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

    loca +=  data.location.name + ", " + data.location.country;
    loc.innerHTML = loca;

    temperature += "Temperature: " + data.current.temperature + " &#8451;<br><br>" + 
                   "Feels Like: " + data.current.feelslike + " &#8451;<br><br>" +
                   "Condition: " + data.current.weather_descriptions[0] ;
    temp.innerHTML = temperature; 
    
    wind += "Wind Speed: " + data.current.wind_speed + " Km/h <br><br>" + 
            "Wind Direction: " + data.current.wind_dir + "<br><br>" +
            "Wind Degree: " + data.current.wind_degree + "&deg";
    win.innerHTML = wind;
    
    humadity += "Humidity: " + data.current.humidity + "% <br><br>" +
                "Pressure: " + data.current.pressure + " SI <br><br>";
    hum.innerHTML = humadity;

    cloudcover += "Cloud-Cover: " + data.current.cloudcover + "% <br><br>" +
                "UV-Index: " + data.current.uv_index + "<br><br>";
    cloud.innerHTML = cloudcover;

    time += "Observation Time: " + data.current.observation_time + "<br><br>" +
            "Day: " + (data.current.is_day).toUpperCase();
    tim.innerHTML = time;
}

function getServer()
{
    var server = new XMLHttpRequest();
    server.open("GET",
                "https://api.weatherstack.com/current?access_key=1381353fb989634d5ada9788e7af9080&query=Dhaka",
                true);
    server.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            data = JSON.parse(this.responseText);
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
