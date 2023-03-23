let Today = new Date()
let curMonth = Today.getMonth()
let curYear = Today.getFullYear()
let Previous = document.getElementById('prev')
let next = document.getElementById('next')
let sel_Month = document.getElementById('month')
let sel_Year = document.getElementById('year')
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let MonthAndYear = document.getElementById("MonthAndYear");

showCalendar(curMonth, curYear);

//prev button click
Previous.addEventListener('click', function () {
    curYear = (curMonth === 0) ? curYear - 1 : curYear;
    curMonth = (curMonth === 0) ? 11 : curMonth - 1;
    showCalendar(curMonth, curYear);
})

//next button click
next.addEventListener('click', function () {
    curYear = (curMonth === 11) ? curYear + 1 : curYear;
    curMonth = (curMonth + 1) % 12;
    showCalendar(curMonth, curYear);
})

//direct jump to other date
function jump() {
    curYear = parseInt(sel_Year.value);
    curMonth = parseInt(sel_Month.value);
    showCalendar(curMonth, curYear);
}

//main fun
function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let t_Body = document.getElementById("cal-body"); // body of the calendar
    // clearing all previous cells
    t_Body.innerHTML = "";
    // filing data about month and in the page via DOM.

    MonthAndYear.innerHTML = months[month] + " " + year;
    sel_Year.value = year;
    sel_Month.value = month;

    // creating all cells
    let date = 1;

    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }
            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === Today.getDate() && year === Today.getFullYear() && month === Today.getMonth()) {
                    cell.classList.add("info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        t_Body.appendChild(row); // appending each row into calendar body.
    }
}

// check how many days in a month 
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}