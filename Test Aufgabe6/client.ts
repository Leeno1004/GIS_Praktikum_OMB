namespace Client {
    console.log("Client on");
    const url: string = "http://127.0.0.1:3000";
    const path: string = "/convertDate";
    const eingabe: HTMLFormElement = <HTMLFormElement>document.getElementById("myForm");
    const übergabeButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("übergabe");
    übergabeButton.addEventListener("click", function (evt: Event) {
        evt.preventDefault();
        sendForm();
    });
    async function sendForm(): Promise<void> {
        let formData: FormData = new FormData(<HTMLFormElement>eingabe);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let urlWithQuery: string = url + path + "?" + query.toString();

        let response: Response = await fetch(urlWithQuery);
        let responseText: string = await response.text();
        console.log(responseText);
        let textAusgabe: HTMLElement = document.createElement("p");
        textAusgabe.textContent = responseText;
        eingabe.appendChild(textAusgabe);
    }
}
