import { connectionTournament } from "../services/mongo.service.js";
import { ObjectId } from "mongodb";

export const getApuestaModel = async () => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").find({}).toArray();
    return result;
}

export const getApuestaPorUsuarioModel = async (usuarioId) => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").find({ "usuario_id": usuarioId }).toArray();
    return result;
}

export const getApuestaPorEventoModel = async (eventoId) => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").find({ "evento_id": eventoId }).toArray();
    return result;
}

export const postApuestaModel = async (apuestaData) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");
    
    /*const posibleGanancia = apuestaData.monto_apostado * apuestaData.cuota_seleccionada;*/
    
    
    
    const result = await apuestaCollection.insertMany(apuestaData);
    return result;
}

export const actualizarEstadoApuestaModel = async (apuestaId, nuevoEstado) => {
   const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");

    const respuesta = await  apuestaCollection.updateOne(
        {_id : new ObjectId( apuestaId ) },
        { $set : {estado : nuevoEstado } }
    )
    return respuesta
}
const getEnCurso = async()=>{
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");

    const result = apuestaCollection.find(
        { estado : 'en curso' },
        { projection : { monto_apostado : 1 , _id : 0} }
    ).toArray()

    return result;
}

export const deleteApuestaForUser = async(id)=>{
    const id_user = new ObjectId(id);
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");

    const res = apuestaCollection.deleteMany({
        usuario_id : id_user
    })
    return res
}
 export const porDeporte = async (nombre) => {
    //usuarios que apostaron en un deporte especifico
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");
    const data = await apuestaCollection.aggregate(
        [
            {
                $lookup :{
                    from : "evento", // De donde voy a sacar los datos
                    localField: "evento_id", // En mi coleccion cual campo relaciono
                    foreignField: "_id", //campo externo
                    as: "evento"
                }
            },
            {
                $unwind: "$evento"
            },
            {
                $match:  { "evento.deporte": nombre}
            },
            {
                $lookup :{
                    from : "usuario", // De donde voy a sacar los datos
                    localField: "usuario_id", // En mi coleccion cual campo relaciono
                    foreignField: "_id", //campo externo
                    as: "usuario"
                }
            },
            {
                $unwind: "$usuario"
            },
            {
                $project:{
                    _id: 0,
                    correo: "$usuario.correo",
                    nombre: "$usuario.nombre"
                }
            }
        ]
 
    ).toArray();
    return data;
 }
export default {
    getApuestaModel,
    getApuestaPorUsuarioModel,
    getApuestaPorEventoModel,
    postApuestaModel,
    actualizarEstadoApuestaModel,
    getEnCurso,
    deleteApuestaForUser,
    porDeporte
};