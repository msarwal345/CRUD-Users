const mongoose =require("mongoose")

const uri="mongodb+srv://mani:gearfive@cluster0.kxdqrri.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri)
.then(()=>console.log('Database Connected'))
.catch(()=>console.log('Error'));

const newSchema= new mongoose.Schema({
    name: {type: String,required:true},
    email: {type:String},
    mobile: {type:String}
},
{
    TimeStamp: true
})

const collection=mongoose.model("gear",newSchema);

module.exports=collection