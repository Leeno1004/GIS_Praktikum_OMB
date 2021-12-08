import * as http from "http"


namespace Server1 {
    const hostname: string = "127.0.0.1";
    const port: number = 3000;

    const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*");


        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

        switch (url.pathname) {
            case "/":
                response.write("Server has been reached");
                break;
            case "/convertDate":
                let date: string = url.searchParams.get("date");
                let month: string = url.searchParams.get("month");
                let year: string = url.searchParams.get("year");
                response.write("Day:" + date + "; Month" + month + "; Year" + year);
                break;

            default:
                response.statusCode = 404;
        }
        response.end();
    }

    );
    server.listen(port, hostname, () => {
        console.log(`Server at http://${hostname}:${port}`);
    });

}
