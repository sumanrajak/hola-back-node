import express from "express";
import mongoose from "mongoose";
import Masages from './dbmasg.js';
import Pusher from "pusher";
import cors from "cors";
const app=express();

const pusher = new Pusher({
    appId: '1086951',
    key: '75d142c9ace3712f94e3',
    secret: 'f880b5522ae398766e6f',
    cluster: 'eu',
    encrypted: true
  });

app.use(express.json());
app.use(cors());

 const con_url='mongodb+srv://suman2:suman@cluster0.dd81x.mongodb.net/holadb?retryWrites=true&w=majority'
 mongoose.connect(con_url,{
    
     useNewUrlParser:true,
     useUnifiedTopology:true
 })
 
 
 
 const db= mongoose.connection;
  db.once("open",()=>{
    console.log("db conected");
    const msgcollection = db.collection("messages");
    const changestream =msgcollection.watch();
    changestream.on("change",(change)=>{
     //console.log(change)
     if(change.operationType=="insert"){
         const msgdetails = change.fullDocument;
         pusher.trigger("messages","inserted",{
             name:msgdetails.name,
             message: msgdetails.message,
             timestamp:msgdetails.timestamp,
             received:msgdetails.received,
         })
     }
    })
    
 })

 app.get("/",(req,res)=>{
    res.send("hiiii");

})
app.get("/message/sync",(req,res)=>{
    Masages.find( (err,data)=>{
       if (err){
           res.status(500).send(err);
      }
        else{
            res.status(201).send(data);
            // console.log(data)
       }   
      })
     })


app.post("/message/new",(req,res)=>{
    const dbmessage =req.body;
    Masages.create( dbmessage,(err,data)=>{
       if (err){
           res.status(500).send(err);
      }
        else{
            res.status(201).send(data);
            //console.log(data)
       }   
      })
     })



app.listen(3001,()=>{
    console.log(" server started at 3001" );
})