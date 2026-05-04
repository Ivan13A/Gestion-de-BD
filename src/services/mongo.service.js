import { MongoClient } from "mongodb";
import { getEnv } from "../config/default.js";
const client = new MongoClient(`${getEnv("mongoUrl")}`);

export const connectionTournament = async() => {
    try{
        await client.connect()
        return client.db("test")
    }
    catch(ex){
        console.error(ex)
    }
}