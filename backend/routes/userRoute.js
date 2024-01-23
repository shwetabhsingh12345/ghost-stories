const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')


//create a user
router.post('/', async (req,res)=>{

    const {name, email, age} = req.body
try{
    const userData = await userModel.create({
        name:name,
        email:email,
        age: age
    })
    res.status(201).json(userData)
}
catch(error){
    res.status(400).json({error:error.message})
}
})

//get all users
router.get('/', async (req,res)=>{
    try{
        const getUserData = await userModel.find()
        res.status(200).json(getUserData)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    
})

//get single user
router.get('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        const getSingleUserData = await userModel.findById({_id:id})
        res.status(200).json(getSingleUserData)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    
})

//delete single user
router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        const getSingleUserData = await userModel.findByIdAndDelete({_id:id})
        res.status(200).json(getSingleUserData)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    
})

//update single user
router.patch('/:id', async (req,res)=>{
    const {id} = req.params
    const {name, email, age} = req.body
    try{
        const updateSingleUserData = await userModel.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json(updateSingleUserData)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    
})

module.exports = router