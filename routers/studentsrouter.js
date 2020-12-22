const express = require('express');
const router = express.Router();

const {getAllStudents,getOneStudent,createNewStudent,deleteStudent,updateStudent} = require('../controllers/studentsController');
router.get("/",getAllStudents);
router.get('/:id',getOneStudent);
router.post('/',createNewStudent);
router.delete("/:id",deleteStudent);
router.patch("/:id",updateStudent);

// router.put("/:id",(req,res)=>{
//     const {id} = req.params;
//     if(id){
//         modelStudent.findByIdAndDelete(id)
//         .then(result=>{
//             res.status(200).send({message:"Delete success..."});
//         })
//         .catch(err=>{
//             res.status(200).send({message:"ID not found..."});
//         })
//     }else{
//         res.status(200).send({message:"ID not found..."});
//     }
// })
module.exports = router;