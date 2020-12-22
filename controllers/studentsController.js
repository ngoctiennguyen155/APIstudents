
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const modelStudent = require('../models/Student');
const Student = require('../models/Student');
mongoose.connect(
    'mongodb+srv://ngoctien:12345@cluster0.xhlbk.mongodb.net/APIstudents?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false 
    }
);

const getAllStudents = async(req,res)=>{
    const data =await modelStudent.find();
    res.status(200).send({message:"Success",data:data});
}
const getOneStudent =async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    if(id){
        const data = modelStudent.findById(id)
        .then(data=>{
            const match = bcrypt.compare("123", data.password)
            .then(result=>{
                if(result){
                    res.status(200).send({message:"Success",data:data});
                }
            }) 
        })
        .catch(err=>{
            res.status(404).send({message:"Not found"});
        })
    }
}
const createNewStudent =(req,res)=>{
    console.log(req.body);
    let user = req.body;
    if(user.name != undefined){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt,async function(err, hash) {
                // Store hash in your password DB.
                user.password= hash;    
                const student = new Student(user);
                await student.save();
            });
        });
        
        res.status(201).send({message:"Add student success"});
    }else {
        res.status(204).send({message:"No content"});
    } 
}
const deleteStudent =(req,res)=>{
    const {id} = req.params;
    if(id){
        modelStudent.findByIdAndDelete(id)
        .then(result=>{
            res.status(200).send({message:"Delete success"});
        })
        .catch(err=>{
            res.status(200).send({message:"ID not found"});
        })
    }else{
        res.status(200).send({message:"ID not found"});
    }
}
const updateStudent=(req,res)=>{
    const {id} = req.params;
    const {name,email,age,password} = req.body;
    const updateInf={};
    if(name){
        updateInf.name = name;
    }
    if(email){
        updateInf.email = email;
    }
    if(age){
        updateInf.age = age;
    }
    if(password){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                updateInf.password=hash;
            });
        });
    }

    if(id){
        modelStudent.findByIdAndUpdate(id,updateInf)
        .then(result=>{
            res.status(200).send({message:"Update success"});
        })
        .catch(err=>{
            res.status(200).send({message:"ID not found"});
        })
    }else{
        res.status(200).send({message:"ID not found"});
    }
}
module.exports = {getAllStudents,getOneStudent,createNewStudent,deleteStudent,updateStudent};