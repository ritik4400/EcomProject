const mongoose= require('mongoose');
const express = require('express');
const router= express.Router();
const path = require('path');
const {addCategory , fetchCategories}= require('../controller.js/category.controller');



router.get('/',(req,res)=>{
    res.send('category is working');
})
//get all categories
router.get('/list',fetchCategories)
//create category
router.post('/create',addCategory)


module.exports=router;