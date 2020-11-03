const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const studentModel = require('./models/Student');
const { json } = require('body-parser');
const { response } = require('express');
mongoose.connect(
    'mongodb+srv://ngoctien:12345@cluster0.xhlbk.mongodb.net/APIstudents?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
);
const app = express();
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())

//  router('/') and router('/id')
app.get("/:id?",async (req,res)=>{
    const id = req.params.id;
    const request = await studentModel.find({});
    const data = await JSON.stringify(request);
    if(id){
        const id_int = parseInt(id) || 0;
        if(id_int<1 || id_int>JSON.parse(data).length){
            res.send({error:"Cant find student/id !!!"});
        }
        res.send(JSON.parse(data)[id-1]);
    }
    else
    res.send(JSON.parse(data));
})
//create a new student 
app.post("/",async(req,res)=>{
        const newStudent = new studentModel({
        name :req.body.name,
        age :req.body.age,
        email:req.body.email,
        address:"",
        height:"",
        weight:"",
        graduating:"",
        informations:{
          mother:"",
          father:"",
          girlpriend:"",
          ex:[]    
        },
        marks:[
              {maths:0,
              physical:0,
              chemical:0,
              english:0,
              Literature:0,
              geography:0}
          ],
        avg:0
      });
    newStudent.save();
    //console.log(newStudent);
    res.send({message:"Add success"});
})
// update a student by id 
app.put("/",(req,res)=>{

})
// delete student by id
app.delete("/:id?",async(req,res)=>{
    const id = req.params.id;
    if(id){
        const parseId  = parseInt(id)||0;
        const getStudents = await studentModel.find({});
        if(parseId<1 || parseId>getStudents.length)
        {
            res.send({error:"Cant delete"});
        }else 
        {
            const stuDelete = getStudents[id-1];
            await studentModel.findByIdAndDelete(stuDelete._id);
            res.send({message:"Delete success"});
        }
    }else 
    {
        res.send({error:"Cant delete"});
    }
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});