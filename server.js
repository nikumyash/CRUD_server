const express = require('express');
require('dotenv').config();
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

MongoClient.connect(process.env.CON_STR,{useUnifiedTopology:true})
.then((client)=>{
    const db = client.db('crud-db');
    const todoCollection = db.collection('to-do');
    app.get('/',async (req,res)=>{
        try{
            const data = await todoCollection.find().toArray();
            console.log(data);
            res.render('main.ejs',{info:data});
        }catch(err){console.log(err);res.status(404).send(err)}
    })
    
    app.post('/postdata',async (req,res)=>{
        req.body.likes = 0;
        todoCollection.insertOne(req.body).then((result)=>{
            console.log(result);
        }).catch((err)=>console.log(err));
        res.redirect('/');

    })
    app.delete('/deleteproject',async (req,res)=>{
        const name = req.body.name;
        try{
            await todoCollection.deleteOne({name:name});
            res.status(200).send('Success');
        }
        catch(err){console.log(err);res.status(404).send(err)}
        
    })
    app.put('/likeproject',async (req,res)=>{
        try{
            const name = req.body.name;
            await todoCollection.findOneAndUpdate({name:name},{$inc:{likes:1}});
            res.status(200);
            res.send('Success');
        }catch(err){console.log(err);res.status(404).send(err)}
    })
    console.log("connected to the db");
})
.catch((err)=>console.log(err));

app.listen(process.env.PORT || 6969,()=>{
    console.log("listening to port 6969");
})

