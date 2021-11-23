namespace testNamespace {
    const inputInterpret: HTMLInputElement = <HTMLInputElement>document.getElementById("input-interpret");
    const inputPrice: HTMLInputElement = <HTMLInputElement>document.getElementById("input-price");
    const display: HTMLElement = <HTMLElement>document.querySelector("#display");
    const myButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#etwasMachen");

    myButton.addEventListener("click", mybuttonHandler);

    console.log(inputInterpret);
    console.log(inputPrice);

    let array: number[] = [];
    let arrayString: string = JSON.stringify(array);

    localStorage.setItem("localStorageElement",);

    function mybuttonHandler() {
        let interpretValue = inputInterpret.value;
        let priceValue = inputPrice.value;
        //console.log("button click");
        let arrayFromStorageAsString: string = localStorage.getItem("localStorageElement");
        let numbersArray = JSON.parse(arrayFromStorageAsString);
        console.log(arrayFromStorageAsString);
        console.log(numbersArray);


        //display.textContent = interpretValue + "; " + priceValue;
        let newElement = document.createElement("div");
        newElement.textContent = interpretValue + ";" + priceValue;
        display.appendChild(newElement);
    }

}
