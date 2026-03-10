import express from "express"   
import { createClient, REDIS_FLUSH_MODES } from "redis";
import { MongoClient, ObjectId } from "mongodb";
const app = express();

// const redis = createClient({ url : 'redis://localhost:6379' });
// redis.connect();

//Driver :// usuario : contraseña @ ip : port / nombre_basedatos
const client = new MongoClient("mongodb://localhost:27017")

app.use(express.json())

const connection = async()=> { 
    try{
        await client.connect();
        return client.db("test")
    }catch(e){
        console.log("======== ERROR ========");
        console.log(e);
    }
}


app.get("/post", async (req,res)=> {
    const db = await connection();
    const tournaments = db.collection("tournaments")
    const result = tournaments.insertOne({
        "nombre": 'Juan',
        "apellido": 'Moreno'
    })
    res.json(result)
})

app. post("/saveTournament", async(req, res)=>{
    const db = await connection();
    const tournaments = db.collection("tournaments");
    console.log(req.body);
    const result = await tournaments.insertOne(req.body);
    res.json(result);

})

app. post("/saveTorneos", async(req, res)=>{
    const db = await connection();
    const tournaments = db.collection("tournaments");
    console.log(req.body);
    const result= await tournaments.insertMany(req.body);
    res.json(result);

})

app.get("/getMongo/:id", async(req,res)=> {
    const { id } = req.params;
    const db = await connection();
    const tournaments = db.collection("tournaments")
    const objectId = new ObjectId(id)
    const result = await tournaments.findOne( { nombre: 'Juan' } )
    console.log(id, objectId);
    res.json(result)

})



app.get("/save", async(req, res)=> {
    const json = {
        "nombre": "Juan",
        "apellido": "Moreno"
    }
    await redis.set(
        'info:03578',
        JSON.stringify(json),
        {
            EX: 300
        }

    )

    res.send("Hola");
})

app.get("/get", async (req, res)=> {
    const data = await redis.get('info:03578');
    console.log(data);
    const json = JSON.parse(data);
    console.log(json)
    res.send(data)

})


app.get("/update", async(req, res) => {
    const edad = 32;
    const data = await redis.get('info:03578');
    if(!data){
        return res.json({'success': false, 'data':[], 'msg': 'Not found'}, 404)
    }
    let json = JSON.parse(data);
    json.edad = edad;
    const response = await redis.set('info:03578',JSON.stringify(json) , {
        EX : 300
    });
    const r = await redis.get('info:03578');
    res.json({'success': response === 'OK', data:r, msg:response },200)
});


app.get('/hset', async(req,res)=>{
    const response = await redis.hSet('info:192230', {
        'name': 'Juan',
        'apellido': 'Moreno',
        'age': 22
    });
    await redis.expire('info:192230', 300)
    res.send(response)
})

app.get('/getHash' , async(req, res) => {
    const response = await redis.hGetAll('info:192230');
    const ttl = await redis.ttl('info:192230')
    res.json({success: true , data : response, ttl})
})

app.get("/delete", async (req,res) => {
//const data = await redis.hDel('info:192230')
const data = await redis.hDel('info:192230', 'age') 
const data2 = await redis.hGetAll('info:192230')
    const response = await redis.hGetAll('info:192230')
res.send(response)

})

//$ne es diferente
//$gt = > mayor que //greater than
//$gte => mayor igual que
//%lt => menor que
app.get("/getTorneo", async(req, res)=>{
    const db = await connection();
    const tournaments = db.collection("tournaments");
    const filtro ={
        //location: 'ocaña',
        //premio: {$gt : 1500},
        //premio : {$in : [1200,5000]}
        premio : {$lt : 1000},
        location : 'Cucuta'
    };
    const view ={
        nombre : 1,
        premio : 1
    }
    const data = await tournaments.find(filtro,view).toArray();
    res.json(data);
})

app.listen(8000, ()=> {
    console.log("HOLA MUNDO CRUEL!!!!");
})

