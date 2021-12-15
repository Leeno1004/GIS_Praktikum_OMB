"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*");
    console.log(request.headers.host);
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/":
            response.write("Server has been reached");
            break;
        case "/convertDate":
            let date = url.searchParams.get("date");
            let month = url.searchParams.get("month");
            let year = url.searchParams.get("year");
            response.write("Day:" + date + "; Month" + month + "; Year" + year);
            break;
        default:
            response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname, () => {
    console.log(`Server at http://${hostname}:${port}`);
});
//# sourceMappingURL=Server.js.map