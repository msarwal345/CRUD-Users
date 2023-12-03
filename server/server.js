const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');

const collection=require('./model/model')

const app=express();
app.use(cors());
app.use(express.json())

app.get("/",async(req,res)=>{
    const users=await collection.find({})
    res.json({success:true,users:users})
})

//create data | save it in database
app.post('/create',async(req,res)=>{
    console.log(req.body)
    const data =new collection(req.body)
    await data.save()

    res.send({success: true,message : "data save sucessfully",data:data})
})

// update the data
app.put('/update',async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body
    console.log(rest)
    const data=await collection.updateOne({_id:_id},rest)
    res.send({success: true,message : "data updated sucessfully",data:data})

})

///delete the data
app.delete("/delete/:id",async(req,res)=>{
const id=req.params.id
console.log(id)
const data=await collection.deleteOne({_id:id})
res.send({success: true,message : "data deleted sucessfully",data:data})
})

app.listen(8080,()=>{
console.log("server is running");
})
