"use strict";
const inputIntpret = document.getElementById("interpretInput");
const inputPrice = document.getElementById("priceInput");
const output = document.getElementById("output");
const myButton = document.getElementById("enterButton");
myButton.addEventListener("click", mybuttonHandler);
window.addEventListener("load", init);
async function init(_event) {
    console.log("Says: ", await get());
    generateHTML(await get());
}
function mybuttonHandler() {
    let interpretValue = inputIntpret.value;
    let priceValue = Number(inputPrice.value);
    const newDelete = document.createElement("button");
    newDelete.textContent = "Delete Event";
    newDelete.style.color = "red";
    newDelete.className = "deleteButton";
    newDelete.type = "submit";
    newDelete.addEventListener("click", deleteButtonHandler);
    const newInterpretElement = document.createElement("td");
    newInterpretElement.textContent = interpretValue;
    const newPriceElement = document.createElement("td");
    newPriceElement.textContent = String(priceValue);
    const newReihe = document.createElement("tr");
    output.appendChild(newReihe);
    newReihe.appendChild(newInterpretElement);
    newReihe.appendChild(newPriceElement);
    newReihe.appendChild(newDelete);
    function deleteButtonHandler() {
        newReihe.removeChild(newInterpretElement);
        newReihe.removeChild(newPriceElement);
        newReihe.removeChild(newDelete);
    }
    let konzertEvent = {
        interpret: interpretValue,
        price: priceValue
    };
    post(konzertEvent);
}
async function post(konzertEvent) {
    console.log(konzertEvent);
    await fetch("http://localhost:8100/concertEvents", {
        method: "POST",
        body: JSON.stringify(konzertEvent)
    });
}
async function get() {
    let response = await fetch("http://localhost:8100/concertEvents", {
        method: "GET"
    });
    let responseText = await response.text();
    let konzertEvents = JSON.parse(responseText);
    return konzertEvents;
}
function generateHTML(events) {
    events.forEach(event => {
        let interpretValue = event.interpret;
        let priceValue = Number(event.price);
        const newDelete = document.createElement("button");
        newDelete.textContent = "Delete Event";
        newDelete.style.color = "red";
        newDelete.className = "deleteButton";
        newDelete.type = "submit";
        newDelete.addEventListener("click", deleteButtonHandler);
        function deleteButtonHandler() {
            newReihe.removeChild(newInterpretElement);
            newReihe.removeChild(newPriceElement);
            newReihe.removeChild(newDelete);
        }
        const newInterpretElement = document.createElement("td");
        newInterpretElement.textContent = interpretValue;
        const newPriceElement = document.createElement("td");
        newPriceElement.textContent = String(priceValue);
        const newReihe = document.createElement("tr");
        output.appendChild(newReihe);
        newReihe.appendChild(newInterpretElement);
        newReihe.appendChild(newPriceElement);
        newReihe.appendChild(newDelete);
    });
}
//# sourceMappingURL=client.js.map