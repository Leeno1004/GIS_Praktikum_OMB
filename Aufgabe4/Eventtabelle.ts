namespace testNamespace {

    window.addEventListener("load", init);


    let inputInterpret: HTMLInputElement;
    let inputPrice: HTMLInputElement;
    let inputDate: HTMLInputElement;
    let inputTime: HTMLInputElement;

    let enterButton: HTMLButtonElement;

    let displayTable: HTMLTableElement;

    let events: EventData[] = [];

    interface EventData {
        interpret: string,
        price: number,
        date: Date,
        time: Time
    }

    interface Time {
        hours: number,
        minutes: number
    }

    interface EventDataRow {
        event: EventData,
        row: HTMLTableRowElement
    }

    function init(_event: Event): void {

        inputInterpret = <HTMLInputElement>document.querySelector("#input-interpret");
        inputPrice = <HTMLInputElement>document.querySelector("#input-price");
        inputDate = <HTMLInputElement>document.querySelector("#input-date");
        inputTime = <HTMLInputElement>document.querySelector("#input-time");

        enterButton = <HTMLButtonElement>document.querySelector("#input-enter");
        enterButton.addEventListener("click", mybuttonHandler);


        displayTable = <HTMLTableElement>document.querySelector("#display");

        updateTableFromLocalStorage();
    }


    function mybuttonHandler() {
        updateSingle();
    }

    function updateSingle(): void {

        let inputHours: number = +inputTime.value.split(":")[0];
        let inputMinutes: number = +inputTime.value.split(":")[1];

        let inputEventData: EventData = {
            interpret: inputInterpret.value,
            price: +inputPrice.value,
            date: new Date(inputDate.value),
            time: { hours: inputHours, minutes: inputMinutes }
        };

        events.push(inputEventData);

        console.log(events);


        let row: HTMLTableRowElement = displayTable.insertRow();
        insertDataInRow(row, inputEventData);


        updateLocalStorage();
    }

    function updateLocalStorage(): void {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function updateTableFromLocalStorage(): void {

        let eventsString: string = localStorage.getItem("events");
        if (!eventsString) {
            return;
        }
        events = <EventData[]>JSON.parse(eventsString);

        for (let index: number = 0; index < events.length; index++) {

            let row: HTMLTableRowElement = displayTable.insertRow();

            events[index].date = new Date(events[index].date);


            insertDataInRow(row, events[index]);
        }
    }

    function insertDataInRow(_row: HTMLTableRowElement, _data: EventData): void {

        let interpretCell: HTMLTableCellElement = document.createElement("td");
        let priceCell: HTMLTableCellElement = document.createElement("td");
        let dateCell: HTMLTableCellElement = document.createElement("td");
        let timeCell: HTMLTableCellElement = document.createElement("td");
        let deleteButton: HTMLButtonElement = document.createElement("button");

        let eventDataRow: EventDataRow = { event: _data, row: _row }
        deleteButton.addEventListener("click", onDeleteButton.bind(eventDataRow));

        interpretCell.innerHTML = _data.interpret;
        priceCell.innerHTML = _data.price.toString();
        dateCell.innerHTML = _data.date.toDateString();
        timeCell.innerHTML = _data.time.hours + ":" + _data.time.minutes;
        deleteButton.innerHTML = "delete";

        _row.appendChild(interpretCell);
        _row.appendChild(priceCell);
        _row.appendChild(dateCell);
        _row.appendChild(timeCell);
        _row.appendChild(deleteButton);
    }

    function onDeleteButton(this: EventDataRow, _event: MouseEvent): void {

        displayTable.deleteRow(this.row.rowIndex);

        events = events.filter(event => event !== this.event);

        updateLocalStorage();
    }
}
