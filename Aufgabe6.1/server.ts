import * as http from "http";

namespace Server {
    const hostname: string = "127.0.0.1";
    const port: number = 3000;

    const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*");

        console.log(request.headers.host)
        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

        switch (url.pathname) {
            case "/":
                response.write("Server has been reached");
                break;
            case "/convertDate":
                let date: string = url.searchParams.get("date");

                console.log(date);
                response.write("Datum:" + date);
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
