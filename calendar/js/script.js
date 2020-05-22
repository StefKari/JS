
const calendar_element = document.querySelector('.calendar');
const selected_date_element = document.querySelector('.selected-date');
const dates_element = document.querySelector('.dates');
const mth_element = document.querySelector('.mth');
const next_mth_element = document.querySelector('.next-mth');
const prev_mth_element = document.querySelector('.prev-mth');
const days_element = document.querySelector('.days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

var selectedDate = date;
var selectedDay = day;
var selectedMonth = month;
var selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

insertDates();

// events listeners
calendar_element.addEventListener('click', toggleCalendar);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// function


function toggleCalendar(e) {
    dates_element.classList.add('active');
}

function goToNextMonth(e) {
    month++;
    if(month > 11) {
      month = 0;
      year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    insertDates();
}

function goToPrevMonth(e) {
    month--;
    if(month < 0) {
      month = 11;
      year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    insertDates();
}

function insertDates(e) {
  days_element.innerHTML = '';
  var number_days = 31;

  switch(month) {
    case 0 :
      number_days = 31;
    break;
    case 1 :
      number_days = 28;
    break;
    case 2 :
      number_days = 31;
    break;
    case 3 :
      number_days = 30;
    break;
    case 4 :
      number_days = 31;
    break;
    case 5 :
      number_days = 30;
    break;
    case 6 :
      number_days = 31;
    break;
    case 7 :
      number_days = 31;
    break;
    case 8 :
      number_days = 30;
    break;
    case 9 :
      number_days = 31;
    break;
    case 10 :
      number_days = 30;
    break;
    case 11 :
      number_days = 31;
    break;
  }

  for(let i = 0; i < number_days; i++) {
    const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

    if(i == 5 || i == 6 || i == 12 || i == 13 || i == 19 || i == 20 || i == 26 || i == 27) {
      day_element.classList.add('weekend');
    }

    if(selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
      day_element.classList.add('selected');
    }

    day_element.addEventListener('click', function() {
      selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1))
      selectedDay = (i + 1);
      selectedMonth = month;
      selectedYear = year;

      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;

      insertDates();

    });

    days_element.appendChild(day_element);
  }


}

// pomocna funkcija
function formatDate(d) {
    var day = d.getDate();
    if(day < 10){
      day = '0' + day;
    }

    var month = d.getMonth() + 1;
    if(month < 10) {
      month = '0' + month;
    }

    var year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;

}
