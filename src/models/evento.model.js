import { ObjectId } from "mongodb";
import { connectionTournament } from "../services/mongo.service.js"
import { EVENTO_COLECCTION } from "../constans/evento.const.js";

const getColeccion = async ()=>{
    const connection = await connectionTournament();
    const result = await connection.collection("evento").find({}).toArray();
}
export const getEventoModel = async() =>{
    const connection = await connectionTournament();
    const evento = await connection.collection(EVENTO_COLECCTION);
    return evento;
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

export const deleteEvento = async (id)=>{
    const id_mongo = new ObjectId(id);
    const eliminacion = (await getColeccion()).deleteOne(
        {
            _id: id_mongo
        }
    )
    return eliminacion;
}
export default {
    getEventoModel,
    postEventoModelUnico,
    postEventoModelMultiple,
    deleteEvento
}