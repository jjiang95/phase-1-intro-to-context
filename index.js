// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents:[],
        timeOutEvents:[],
    }
}

function createEmployeeRecords(array) {
    let newArrayOfRecords = array.map(record => createEmployeeRecord(record));
    return newArrayOfRecords;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let stringHour = dateStamp.substring(11);
    let hour = parseInt(stringHour, 10);
    let date = dateStamp.substring(0, 10);
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: `${date}`
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let stringHour = dateStamp.substring(11);
    let hour = parseInt(stringHour, 10);
    let date = dateStamp.substring(0, 10);
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: `${date}`
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateOfForm) {
    let shiftStartObj = employeeRecord.timeInEvents.find(obj => obj.date === dateOfForm);
    let shiftEndObj = employeeRecord.timeOutEvents.find(obj => obj.date === dateOfForm);
    let timeIn = shiftStartObj.hour;
    let timeOut = shiftEndObj.hour;
    return (timeOut/100) - (timeIn/100);
}

function wagesEarnedOnDate(employeeRecord, dateOfForm) {
    let hours = hoursWorkedOnDate(employeeRecord, dateOfForm);
    return hours * (employeeRecord.payPerHour);
}

function allWagesFor(employeeRecord) {
    let shiftDates = []
    employeeRecord.timeInEvents.forEach(shift => {
        shiftDates.push(shift.date);
    })
    let wages = shiftDates.map(date => wagesEarnedOnDate(employeeRecord, date));
    let sumOfWages = 0;
    wages.forEach(wage => {
        sumOfWages += wage;
    });
    return sumOfWages;
}

function calculatePayroll(array) {
    let allWagesOwed = array.map(record => allWagesFor(record));
    let sumOfAllWagesOwed = 0;
    allWagesOwed.forEach(wage => {
        sumOfAllWagesOwed += wage;
    });
    return sumOfAllWagesOwed;
}