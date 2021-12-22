"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const hostname = "127.0.0.1"; //localhost
const port = 3000; //Port, auf dem der Server laufen soll
console.log("Server an");
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/":
            response.write("Server erreichbar");
            break;
        case "/convertDate":
            let date = url.searchParams.get("date");
            console.log(date);
            const dateArray = date.split("-", 3);
            let dateYear = dateArray[0];
            let dateMonth = dateArray[1];
            let dateDay = dateArray[2];
            response.write("Du hast den Tag: " + dateDay + " Monat: " + dateMonth + " Jahr: " + dateYear + " angegeben");
            break;
        default:
            response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
//# sourceMappingURL=Server.js.map