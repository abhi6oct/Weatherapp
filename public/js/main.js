const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')

const city_name = document.getElementById('city_name')
const day = document.getElementById('day')
const today_date = document.getElementById('today_date')

const temp_real_val = document.getElementById('temp_real_val')
const temp_status =document.getElementById('temp_status')

const datahide = document.querySelector('.middle_layer')

const getInfo = async(event) => {
    event.preventDefault();
    let cityval = cityName.value;
    if(cityval === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add('data_hide')
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=cb13fd114c1f02ba3ac94491a66b3fcf`;
            const response = await fetch(url)
            const data = await response.json();
            const arrdata = [data];

            datahide.classList.remove('data_hide')
            
            city_name.innerText = `${arrdata[0].name},${arrdata[0].sys.country}`;
            const tempval = arrdata[0].main.temp;
            temp_real_val.innerText = tempval;
            const tempMood = arrdata[0].weather[0].main;

            // condition to check sunny aur cloudy
            if(tempval< 5){
                temp_status.innerHTML = "<i class='fa fa-temperature-low' style='color: #eccc68'>"
            }else if(tempMood === "Clear"){
                temp_status.innerHTML = "<i class='fa fa-sun' style='color: #eccc68'>"
            }else if(tempMood === "Cloud"){
                temp_status.innerHTML = "<i class='fa fa-cloud' style='color: #f1f2f6'>"
            }else if(tempMood === "Rain"){
                temp_status.innerHTML = "<i class='fa fa-cloud-rain' style='color: #a4b0be'>"
            }else{
                temp_status.innerHTML = "<i class='fa fa-sun' style='color: #eccc68'>"
            }
        }catch{
            city_name.innerText = `Plz Enter The City Name Properly`;
            datahide.classList.add('data_hide')
        }
    }
}

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tueday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thurday";
    weekday[5] = "Friday";
    weekday[6] = "Satday";

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime = () => {
    var now = new Date();
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var curmonth = month[now.getMonth()];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let perios = "AM";

    if(hours>11)
    {
        perios="PM";
        if(hours > 12) hours -=12;
    }
    if(mins<10)
    {
        mins = "0" + mins;
    }

    return `${curmonth} ${date} | ${hours}:${mins}  ${perios}`;
}

day.innerText = getCurrentDay();
today_date.innerText = getCurrentTime();
submitBtn.addEventListener('click', getInfo);
