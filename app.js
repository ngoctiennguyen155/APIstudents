const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const studentModel = require('./models/Student');
const randomstring = require("randomstring");
mongoose.connect(
    'mongodb+srv://ngoctien:12345@cluster0.xhlbk.mongodb.net/APIstudents?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
);

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//  router('/') and router('/id')
app.get("/:id?",async (req,res)=>{
    const id = req.params.id;
    if(id){
        try{
            const oneStudent = await studentModel.findById(id);
            res.send({message:"Successed",data:oneStudent});
        }catch(e)
        {
            res.send({message:"Faild",error:id+" not found!!!"});
        }
    }else{
        const request = await studentModel.find({});
        const data = await JSON.stringify(request);
        res.send({message:"Successed",data:JSON.parse(data)});
    }
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
    await newStudent.save();
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
            res.send({message:"Failed",error:"Cant delete"});
        }else 
        {
            const stuDelete = getStudents[id-1];
            await studentModel.findByIdAndDelete(stuDelete._id);
            res.send({message:"Delete success"});
        }
    }else 
    {
        res.send({message:"Failed",error:"Cant delete"});
    }
})

// app.get("/abc/generate",async(req,res)=>{
//     generate();
//     res.send({ok:"ok"});
// })
// const generate =async ()=>{

//     const ho = ["Nguyễn","Phan","Huỳnh","Bá","Trần","Văn","Lê","Hứa","Bùi","Cao","Bá","Hỏa","Bắc","Triệu","Kim","Phạm"];
//     const dem = ["Hồ","Thị","Quỳnh","Cao","Cát","Kim","Thanh","Minh","Ngọc","Mỹ","Phước","Sơn","Trang","Ánh","Trọng","Phạm","Nhật","Trung","Tiến","Đắc","Toàn","Tín","Hà","Trường","Bắc"];

//     const tuoi = [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
//     const diem = [0,1,2,3,4,5,6,7,8,9,10,8,6,9,4,7,8,9,7,10,9,8,6,5,6,7,2,3,4,6,7,8,9,10,2,5,5,7,2,7,8,4,6,8,9,7,4,6,10,10,3,5,6,7,4,7,8,9,6,3];
//     for(let i = 0;i<300;i++)
//     {
//         let d1=diem[Math.floor(Math.random() * diem.length)];
//         let d2=diem[Math.floor(Math.random() * diem.length)];
//         let d3=diem[Math.floor(Math.random() * diem.length)];
    
//         let d4=diem[Math.floor(Math.random() * diem.length)];
//         let d5=diem[Math.floor(Math.random() * diem.length)];
//         let d6=diem[Math.floor(Math.random() * diem.length)];

//         let tt= tuoi[Math.floor(Math.random() * tuoi.length)];
//         let gr = tt>24? true:false;
//         let newStudent = new studentModel({
//             name :ho[Math.floor(Math.random() * ho.length)]+" "+ dem[Math.floor(Math.random() * dem.length)]+" "+dem[Math.floor(Math.random() * dem.length)],
//             age :tt,
//             email:randomstring.generate()+"@gmail.com",
//             address:"",
//             height:"",
//             weight:"",
//             graduating:gr,
//             informations:{
//               mother:ho[Math.floor(Math.random() * ho.length)]+" "+ dem[Math.floor(Math.random() * dem.length)]+" "+dem[Math.floor(Math.random() * dem.length)],
//               father:ho[Math.floor(Math.random() * ho.length)]+" "+ dem[Math.floor(Math.random() * dem.length)]+" "+dem[Math.floor(Math.random() * dem.length)],
//               girlpriend:ho[Math.floor(Math.random() * ho.length)]+" "+ dem[Math.floor(Math.random() * dem.length)]+" "+dem[Math.floor(Math.random() * dem.length)],
//               ex:[{name:ho[Math.floor(Math.random() * ho.length)]+" "+ dem[Math.floor(Math.random() * dem.length)]+" "+dem[Math.floor(Math.random() * dem.length)]}]    
//             },
//             marks:[
//                   {maths:d1,
//                   physical:d2,
//                   chemical:d3,
//                   english:d4,
//                   Literature:d5,
//                   geography:d6}
//               ],
//             avg:(d1+d2+d3+d4+d5+d6)/6,
//           });
//         await newStudent.save();

//     }
    

// }

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
