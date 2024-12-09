const mongoose= require('mongoose');
const express = require('express');
const router= express.Router();
const path = require('path');
const {categorySchema}= require('../validator/categoryValidator');

const Category = require('../models/category');

router.get('/',(req,res)=>{
    res.send('category is working');
})
//get all categories
router.get('/list',async(req,res)=>{
    try{
        const category = await Category.find({});
        res.send(200).json(category);
    }catch (error) {
        console.error('API Error:', error.message); // Log the error message
        res.status(500).json({ message: error.message });
    }
})
//create category
router.post('/create',async(req,res)=>{
    try{
        const {error}= categorySchema.validate(req.body);
        if(error){
            return res.status(400).json({messege: error.details[0].messege});
        }
        const {name,description}= req.body;
        const category = await Category.create({
            name,description});
        res.send(200).json(category);
    }catch (error) {
        console.error('API Error:', error.message); // Log the error message
        res.send(500).json({ message: error.message });
    }
})


module.exports=router;