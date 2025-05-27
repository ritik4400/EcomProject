const mongoose= require('mongoose');
const express = require('express');
const router= express.Router();
const path = require('path');
const {addCategory , fetchCategories}= require('../controller.js/category.controller');
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");


router.get('/',(req,res)=>{
    res.send('category is working');
})
//get all categories
router.get('/list',authMiddleware , authorizeRoles('admin','seller', 'user') ,fetchCategories)
//create category
router.post('/create', authMiddleware, authorizeRoles('admin','seller'),addCategory)


module.exports=router;