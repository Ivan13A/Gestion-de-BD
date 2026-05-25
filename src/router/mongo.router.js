import express from "express";
import {Router} from "express"
import { MongoClient, ObjectId } from "mongodb";
import { connectionTournament } from "../services/mongo.service.js";


const router = Router();

router.use(express.json())

// driver :// usuario:contraseña @ ip:port / nombre base de datos
const client = new MongoClient("mongodb://localhost:27017")


const connection = async() => {
    try{
        await client.connect();
        return client.db("test")
    }catch(e){
        console.log("===================ERROR================")
        console.log(e);
    }
}

router.get("/post", async(req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    const result = tournament.insertOne({
        "nombre" : "Keiner",
        "apellido" : "Ballesteros"
    })

    res.json(result)
} )

router.get("/getmongo/:id", async (req,res)=> {
    const { id } = req.params;
    const db = await connection();
    const tournament = db.collection("tournament")
    console.log(id);
    const objectId = new ObjectId(id)
    const result = await tournament.findOne({
        nombre : "Keiner"
    })
    res.json(result)
})


router.post("/savetournament", async (req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    console.log(req.body)
     const result = await tournament.insertOne(req.body)
    res.json(result)
}) 

router.post("/savetorneos", async (req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    const result = await tournament.insertMany(req.body)
    res.json(result)
}) 

// $ne -> diferente
// $gt ->mayor que 
// $gte ->mayor igual que
// $lt -> menor que
// $lte ->menor igual que
// $in -> dentro del arreglo
// $nin -> negacion del arreglo

router.get("/getTorneo", async (req,res) => {
    const db = await connection();
    const tournament = db.collection("tournament")
    const filtro = {
         location: "Cucuta",
         premio : { $lt : 1000}
    }
    const view = {
        nombre :0,
        premio :0
    }
    const data = await tournament.find(filtro, view).toArray();
    res.json(data)
})
router.get("/testing", async (req, res)=>{
    const connection = connectionTournament();

    try {
        const a = await connection.collection("persona").insertOne({
        'nombre': 'Ivan',
        "documento": "12345",
        "correo": 'asgfd@gmail.com'
    })
    } catch (error) {
        if(error.code === 121){
            return res.status(400).json({
                msn : 'Error de validacion',
                error: error.errInfo
            })
        }
        return res.status(500).json({
            msn: 'Error interno del servidor'
        })

    }
    
})
export default router;