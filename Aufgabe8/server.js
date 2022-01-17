"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTabelle = void 0;
const http = require("http");
const mongo = require("mongodb");
const mongodb_1 = require("mongodb");
var EventTabelle;
(function (EventTabelle) {
    const hostname = "127.0.0.1";
    const port = 8100;
    const mongoUrl = "mongodb://localhost:27017";
    let mongoClient = new mongo.MongoClient(mongoUrl);
    async function dbFind(db, collection, response) {
        mongoClient.connect();
        let result = await mongoClient
            .db(db)
            .collection(collection)
            .find()
            .toArray();
        response.setHeader("Content-Type", "application/json");
        console.log(JSON.stringify(result));
        response.write(JSON.stringify(result));
    }
    async function dbAddOrEdit(request, response) {
        let jsonString = "";
        request.on("data", (event) => {
            jsonString += event;
        });
        request.on("end", async () => {
            let inputEvent = JSON.parse(jsonString);
            let mongoKonzertEvent = {
                _id: new mongodb_1.ObjectId(), interpret: inputEvent.interpret, price: inputEvent.price
            };
            console.log("incomingevent: ", jsonString);
            await writeEventToDB(mongoKonzertEvent);
        });
    }
    async function writeEventToDB(event) {
        await mongoClient.connect();
        await mongoClient.db("db").collection("Events").replaceOne({
            _id: event._id
        }, event);
        await mongoClient.close();
    }
    const server = http.createServer();
    server.addListener("request", handleRequest);
    async function handleRequest(request, response) {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html; charset=utf-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        let url = new URL(request.url || "", `http://${request.headers.host}`);
        switch (url.pathname) {
            case "/concertEvents": {
                switch (request.method) {
                    case "GET":
                        await dbFind("db", "Events", response);
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
})(EventTabelle = exports.EventTabelle || (exports.EventTabelle = {}));
//# sourceMappingURL=server.js.map