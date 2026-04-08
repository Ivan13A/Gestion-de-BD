import { connectionTournament } from "../services/mongo.service.js"

export const getEventoModel = async() =>{
    const connection = await connectionTournament();
    const result = await connection.collection("evento").find({}).toArray();
    return result;
}

export const postEventoModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const connection = await connectionTournament();
    const tournament = connection.collection("evento")
    const result = await tournament.insertOne(json)
    return result;
}

export const postEventoModelMultiple = async (json) =>{
    const connection = await connectionTournament();
    const tournament = connection.collection("evento")
    const result = await tournament.insertMany(json)
    return result;
}

export default {
    getEventoModel,
    postEventoModelUnico,
    postEventoModelMultiple
}