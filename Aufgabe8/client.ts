

const inputIntpret: HTMLInputElement = <HTMLInputElement>document.getElementById("interpretInput");
const inputPrice: HTMLInputElement = <HTMLInputElement>document.getElementById("priceInput");
const output: HTMLElement = <HTMLElement>document.getElementById("output");
const myButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("enterButton");
myButton.addEventListener("click", mybuttonHandler);


window.addEventListener("load", init);


async function init(_event: Event): Promise<void> {
    console.log("Says: ", await get());
    generateHTML(await get());

}


interface KonzertEvent {
    interpret: string;
    price: number;
}

function mybuttonHandler(): void {
    let interpretValue: string = inputIntpret.value;
    let priceValue: number = Number(inputPrice.value);
    const newDelete: HTMLButtonElement = document.createElement("button");
    newDelete.textContent = "Delete Event";
    newDelete.style.color = "red";
    newDelete.className = "deleteButton";
    newDelete.type = "submit";
    newDelete.addEventListener("click", deleteButtonHandler);

    const newInterpretElement: HTMLTableCellElement = document.createElement("td");
    newInterpretElement.textContent = interpretValue;
    const newPriceElement: HTMLTableCellElement = document.createElement("td");
    newPriceElement.textContent = String(priceValue);
    const newReihe: HTMLTableRowElement = document.createElement("tr");

    output.appendChild(newReihe);
    newReihe.appendChild(newInterpretElement);
    newReihe.appendChild(newPriceElement);
    newReihe.appendChild(newDelete);

    function deleteButtonHandler(): void {
        newReihe.removeChild(newInterpretElement);
        newReihe.removeChild(newPriceElement);
        newReihe.removeChild(newDelete);
    }

    let konzertEvent: KonzertEvent = {
        interpret: interpretValue,
        price: priceValue
    };
    post(konzertEvent);
}

async function post(konzertEvent: KonzertEvent): Promise<void> {
    console.log(konzertEvent);
    await fetch("http://localhost:8100/concertEvents", {
        method: "POST",
        body: JSON.stringify(konzertEvent)
    });
}



async function get(): Promise<KonzertEvent[]> {

    let response: Response = await fetch("http://localhost:8100/concertEvents", {
        method: "GET"
    });

    let responseText: string = await response.text();

    let konzertEvents: KonzertEvent[] = JSON.parse(responseText);

    return konzertEvents;
}

function generateHTML(events: KonzertEvent[]) {
    events.forEach(event => {
        let interpretValue: string = event.interpret;
        let priceValue: number = Number(event.price);
        const newDelete: HTMLButtonElement = document.createElement("button");
        newDelete.textContent = "Delete Event";
        newDelete.style.color = "red";
        newDelete.className = "deleteButton";
        newDelete.type = "submit";
        newDelete.addEventListener("click", deleteButtonHandler);

        function deleteButtonHandler(): void {
            newReihe.removeChild(newInterpretElement);
            newReihe.removeChild(newPriceElement);
            newReihe.removeChild(newDelete);
        }

        const newInterpretElement: HTMLTableCellElement = document.createElement("td");
        newInterpretElement.textContent = interpretValue;
        const newPriceElement: HTMLTableCellElement = document.createElement("td");
        newPriceElement.textContent = String(priceValue);
        const newReihe: HTMLTableRowElement = document.createElement("tr");

        output.appendChild(newReihe);
        newReihe.appendChild(newInterpretElement);
        newReihe.appendChild(newPriceElement);
        newReihe.appendChild(newDelete);

    });
}




