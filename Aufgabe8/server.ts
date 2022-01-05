import * as http from "http";
import * as mongo from "mongodb";

const hostname: string = "127.0.0.1";
const port: number = 3000;
const mongoUrl: string = "mongodb://localhost:27017";
let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl);

interface Event {
    _id?: mongo.ObjectId;
    interpret: string;
    price: number;
}

async function dbFind(db: string, collection: string, requestObject: any, response: http.ServerResponse): Promise<void> {
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}

async function dbAddOrEdit(db: string, collection: string, request: http.IncomingMessage): Promise<void> {
    let jsonString: string = "";
    request.on("data", data => {
        jsonString += data;
    });
    request.on("end", async () => {
        await mongoClient.connect();
        console.log(jsonString);
        let event: Event = JSON.parse(jsonString);
        if (event._id && event._id !== undefined) {
            event._id = new mongo.ObjectId(event._id);
            mongoClient.db(db).collection(collection).replaceOne(
                {
                    _id: event._id
                },
                event
            );
        } else {
            event._id = undefined;
            mongoClient.db(db).collection(collection).insertOne(event);
        }
    });
}
async function main(): Promise<void> {
    await mongoClient.connect();
    const db: mongo.Db = mongoClient.db("db");
    const eventCollection: mongo.Collection = db.collection("Events");

    let newEvent: Event = {
        interpret: "Bruno Mars",
        price: 20
    };
    await eventCollection.insertOne(newEvent);
    let events: Event[] = <Event[]>(
        await eventCollection.find({ interpret: "Bruno Mars" }).toArray()
    );
    console.log(events);
    await mongoClient.close();
}

const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

        switch (url.pathname) {
            case "/concertEvents": {
                switch (request.method) {
                    case "GET":
                        await dbFind(
                            "interpret",
                            "price",
                            {
                                interpret: url.searchParams.get("interpret")
                            },
                            response
                        );
                        break;
                    case "POST":
                        await dbAddOrEdit("db", "Events", request);
                        break;
                }
                break;
            }
            default:
                response.statusCode = 404;
        }
        response.end();
    }
);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
