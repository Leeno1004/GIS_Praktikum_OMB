"use strict";
var testNamespace;
(function (testNamespace) {
    window.addEventListener("load", init);
    let inputInterpret;
    let inputPrice;
    let inputDate;
    let inputTime;
    let enterButton;
    let displayTable;
    let events = [];
    function init(_event) {
        inputInterpret = document.querySelector("#input-interpret");
        inputPrice = document.querySelector("#input-price");
        inputDate = document.querySelector("#input-date");
        inputTime = document.querySelector("#input-time");
        enterButton = document.querySelector("#input-enter");
        enterButton.addEventListener("click", mybuttonHandler);
        displayTable = document.querySelector("#display");
        updateTableFromLocalStorage();
    }
    function mybuttonHandler() {
        updateSingle();
    }
    function updateSingle() {
        let inputHours = +inputTime.value.split(":")[0];
        let inputMinutes = +inputTime.value.split(":")[1];
        let inputEventData = {
            interpret: inputInterpret.value,
            price: +inputPrice.value,
            date: new Date(inputDate.value),
            time: { hours: inputHours, minutes: inputMinutes }
        };
        events.push(inputEventData);
        console.log(events);
        let row = displayTable.insertRow();
        insertDataInRow(row, inputEventData);
        updateLocalStorage();
    }
    function updateLocalStorage() {
        localStorage.setItem("events", JSON.stringify(events));
    }
    function updateTableFromLocalStorage() {
        let eventsString = localStorage.getItem("events");
        if (!eventsString) {
            return;
        }
        events = JSON.parse(eventsString);
        for (let index = 0; index < events.length; index++) {
            let row = displayTable.insertRow();
            events[index].date = new Date(events[index].date);
            insertDataInRow(row, events[index]);
        }
    }
    function insertDataInRow(_row, _data) {
        let interpretCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let dateCell = document.createElement("td");
        let timeCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        interpretCell.innerHTML = _data.interpret;
        priceCell.innerHTML = _data.price.toString();
        dateCell.innerHTML = _data.date.toDateString();
        timeCell.innerHTML = _data.time.hours + ":" + _data.time.minutes;
        _row.appendChild(interpretCell);
        _row.appendChild(priceCell);
        _row.appendChild(dateCell);
        _row.appendChild(timeCell);
    }
})(testNamespace || (testNamespace = {}));
//# sourceMappingURL=Eventtabelle.js.map