import { connectionTournament } from "../services/mongo.service.js"
import { EVENTO_COLLECTION } from "../constants/evento.const.js";
import { ObjectId } from "mongodb";

export const getCollection = async () => {
    const connection = await connectionTournament();
    const result = await connection.collection(EVENTO_COLLECTION)
    return result
}

export const getEventoModel = async() => {
    const collection = await getCollection();
    const result = await collection.find({}).toArray();
    return result;
}

export const postEventoModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const result = (await getCollection()).insertOne(json)
    return result;
}

export const postEventoModelMultiple = async (json) =>{
    const result = (await getCollection()).insertMany(json)
    return result;
}
export const SearchEventoModel = async (evento) => {
    const collection = await getCollection();
    const result = await collection.find({ deporte: evento }).toArray();
    return result;
}


//eventos donde la cuota local sea mayor a 2.0
export const eventoCuota = async() => {
    const collection = await getCollection();
    const result = await collection.find({ cuota_local: { $gt: 2.0 } }).toArray();
    return result;
}

export const modificarCuota = async (id, nuevaCuota) => {
    const collection = await getCollection();
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { cuota_visitante: nuevaCuota } }
    );
    return result;
}

export const deleteEvento = async(id) => {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id.id) });
    return result;
}
export const deleteEventoModel = async () => {
    const collection = await getCollection();
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const result = await collection.deleteMany(
        { fecha: 
            { $lt: fechaActual 

            } 
        });
    return {
        msn: "Eventos finalizados eliminados",
        eliminados: result.deletedCount
    };
}

export const promedioCuota = async () => {
    const collection = (await getCollection()); 
    const result = await collection.aggregate([
        {
            $project: {
                deporte: 1,
                fecha: 1,
                cuota_local: 1,
                cuota_visitante: 1,
                promedioCuota: {
                    $round: [
                        {
                            $divide: [
                                { $add: ["$cuota_local", "$cuota_visitante"] },
                                2
                            ]
                        },
                        2 
                    ]
                }
            }
        }
    ]).toArray();
    
    return result;
}

export default {
    getEventoModel,
    postEventoModelUnico,
    postEventoModelMultiple,
    SearchEventoModel,
    eventoCuota,
    modificarCuota,
    deleteEvento,
    deleteEventoModel,
    promedioCuota
}