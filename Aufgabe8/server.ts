import * as http from "http";
import * as mongo from "mongodb";
import { MongoClient, ObjectId } from "mongodb";


export namespace EventTabelle {

    const hostname: string = "127.0.0.1";
    const port: number = 8100;
    const mongoUrl: string = "mongodb://localhost:27017";
    let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl);

    interface KonzertEvent {
        interpret: string;
        price: number;
    }

    interface MongoKonzertEvent {
        _id: ObjectId;
        interpret: string;
        price: number;
    }

    async function dbFind(db: string, collection: string, response: http.ServerResponse): Promise<void> {

        mongoClient.connect();


        let result = await mongoClient
            .db(db)
            .collection(collection)
            .find()
            .toArray();

        response.setHeader("Content-Type", "application/json");
        console.log(JSON.stringify(result))
        response.write(JSON.stringify(result));
    }

    async function dbAddOrEdit(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {

        let jsonString: string = "";


        request.on("data", (event) => {

            jsonString += event;

        });

        request.on("end", async () => {

            let inputEvent: KonzertEvent = JSON.parse(jsonString);
            let mongoKonzertEvent: MongoKonzertEvent = {
                _id: new ObjectId(), interpret: inputEvent.interpret, price: inputEvent.price
            };

            console.log("incomingevent: ", jsonString);


            await writeEventToDB(mongoKonzertEvent);


        });
    }


    async function writeEventToDB(event: MongoKonzertEvent): Promise<void> {
        await mongoClient.connect();

        await mongoClient.db("db").collection("Events").insertOne(
            event
        );


        await mongoClient.close();
    }

    const server: http.Server = http.createServer();
    server.addListener("request", handleRequest);


    async function handleRequest(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
        response.statusCode = 200;

        response.setHeader("content-type", "text/html; charset=utf-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

        switch (url.pathname) {
            case "/concertEvents": {
                switch (request.method) {
                    case "GET":
                        await dbFind(
                            "db",
                            "Events",
                            response
                        );
                        break;
                    case "POST":
                        await dbAddOrEdit(request, response);
                        break;
                }
                break;
            }
            default:
                response.statusCode = 404;
        }
        response.end();
    }


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

}
