const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app =express()
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/employee',{
    useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log('MongoDB connected succesfully');
    })
    .catch((error)=>{
        console.error('Mongodb Error: ',error);
    });
    const db = mongoose.connection;
    app.use(bodyParser.json());
    const Employee = mongoose.model('Employee',{
        ename: String,
        empid : Number,
        addr :String
    });

    app.post('/employee',async(req,res)=>{
        try{
            const employee = new Employee(req.body);
            await employee.save();
            res.send(employee);
        }catch(err){
            res.status(400).send(err);
        }
    });
 
    app.get('/employee',async(req,res)=>{
        try{
            const employees = await Employee.find();
            res.send(employees);
        }catch(err){
            res.status(400).send(err);
        }
    });

    app.get('/employee/:id',async(req,res)=>{
        try{
            const employee = await Employee.findById(req.params.id);
            res.send(employee);
        }catch(err){
            res.status(400).send(err);
        }
    });

    app.put('/employee/:id',async(req,res)=>{
        try{
            const employee = await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.send(employee);
            res.send("Employee updated successfully")
        }catch(err){
            res.status(400).send(err);
        }
    });

    app.delete('/employee/:id', async(req,res)=>{
        try{
            await Employee.findByIdAndDelete(req.params.id);
            res.send('Employee deleted successfully');
        }catch(err){
            res.status(400).send(err);
        }
    });

    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    });