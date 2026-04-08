
import { ObjectId } from "mongodb";
import { connectionTournament } from "../services/mongo.service.js"

export const getUsuarioModel = async() =>{
    const connection = await connectionTournament();
    const result = await connection.collection("usuario").find({}).toArray();
    return result;
}

export const postUsuarioModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const connection = await connectionTournament();
    const tournament = connection.collection("usuario")
    const result = await tournament.insertOne(json)
    return result;
}

export const postUsuarioModelMultiple = async (json) =>{
    const connection = await connectionTournament();
    const tournament = connection.collection("usuario")
    const result = await tournament.insertMany(json)
    return result;
}
export const updateSaldo = async(id, aumento)=>{
    const connection = await connectionTournament();
    const tournament = connection.collection("usuario")
    const result = await tournament.updateOne(
        {_id : new ObjectId(Id)},
        { $inc : { saldo : aumento }}
    )
    return result
}
export default{
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple,
    updateSaldo
}