
let button = document.querySelector(".button");
let inputDate = document.querySelector("#inputDate");
let output = document.querySelector(".output");

button.addEventListener("click", function (e) {
    
    let inputDateValue = inputDate.value;
    if (inputDateValue !== "") {
        let dateList = inputDateValue.split("-");
        let date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        };

        if (checkPalindrome(date)) {
            output.innerText = `Congrats,your birthday is palindrome.`;
        }
        else {
            let [count,next]= nextPalindromeDate(date);
            let [ctr,prev]=prevPalindrome(date);

            output.innerText = `The next palindrome date is on ${next.day}-${next.month}-${next.year}.You missed it by ${count} days.
            Your previous palindrome date is on ${prev.day}-${prev.month}-${prev.year}.You missed it by ${ctr} days ` ;


        }
    }


})
function reverseStr(str) {
    let listOfString = str.split("");
    let reverseStringList = listOfString.reverse();
    let reverseString = reverseStringList.join("");
    return reverseString;

}

function palindrome(str) {
    return str == reverseStr(str);
}

function date2String(date) {

    let dateString = { day: "", month: "", year: "" };

    if (date.day < 10) {
        dateString.day = "0" + date.day;
    }
    else {
        dateString.day = "" + date.day;

    }
    if (date.month < 10) {
        dateString.month = "0" + date.month;
    }
    else {
        dateString.month = "" + date.month;

    }

    dateString.year = "" + date.year;



    return dateString;



}



function getAllDateFormat(date) {

    let dateObject = date2String(date);
    let ddmmyyyy = dateObject.day + dateObject.month + dateObject.year;
    let mmddyyyy = dateObject.month + dateObject.day + dateObject.year;
    let yyyymmdd = dateObject.year + dateObject.month + dateObject.day;
    let ddmmyy = dateObject.day + dateObject.month + dateObject.year.slice(-2);
    let mmddyy = dateObject.month + dateObject.day + dateObject.year.slice(-2);
    let yymmdd = dateObject.year.slice(-2) + dateObject.month + dateObject.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}



function checkPalindrome(date) {
    let dateFormatList = getAllDateFormat(date);
    let ispalindrome = false;
    for (let i = 0; i < dateFormatList.length; i++) {
        if (palindrome(dateFormatList[i])) {
            ispalindrome = true;
            break;
        }
    }
    return ispalindrome;

}


function leapYear(date) {
    if (date % 400 === 0) {
        return true;
    }
    if (date % 100 === 0) {
        return false;
    }
    if (date % 4 === 0) {
        return true;
    }
    return false;

}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        //check for leap year
        if (leapYear(date)) {
            if (day > 29) {
                day = 1;
                month++;
            }

        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };


}

function nextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let ctr = 0;
    while (true) {
        ctr++;
        if (checkPalindrome(nextDate)) {
            break;
        }

        nextDate = getNextDate(nextDate);

    }
    return [ctr,nextDate];

}

function getPrevDate(date) {
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let day = date.day-1;
    let month = date.month;
    let year = date.year;

    //02-05-2021
    if (day < daysInMonth[month - 1]) {

        if(day<=1 && month<=1){
            month=12;
            day=31;
            year--;
        }
        if (day < 1) {
            day = daysInMonth[month - 2];
            month--;
        }
     

        if (month < 1) {
            month = 12;
            year--;
            day = 31;
        }
    }
    return {
        day: day,
        month: month,
        year: year
    };

}



function prevPalindrome(date) {
    let prevDate = getPrevDate(date);
    let count = 0;

    while (true) {
        count++;
        if (checkPalindrome(prevDate)) {
            break;
        }


        prevDate = getPrevDate(prevDate);

    }
    return [count, prevDate]
}


