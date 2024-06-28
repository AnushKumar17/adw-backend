const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const Add = require('../models/Add')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create", verifyToken, async (req, res) => {
    try {
        const newAdd = new Add(req.body)
        const savedAdd = await newAdd.save()

        res.status(200).json(savedAdd)
    }
    catch (err) {

        res.status(500).json(err)
    }

})

//UPDATE
router.put("/:id",verifyToken, async (req, res) => {
    try {
        const updatedAdd = await Add.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedAdd)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken, async (req, res) => {
    try {
        await Add.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({ postId: req.params.id })
        res.status(200).json("Advertisement has been deleted!")
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id", async (req, res) => {
    try {
        const post = await Add.findById(req.params.id)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET POSTS & SEARCH POSTS
router.get("/", async (req, res) => {
    const query = req.query
    try {
        const searchFilter = {
            title: { $regex: query.search, $options: "i" }
        }
        const adds = await Add.find(query.search ? searchFilter : null)
        res.status(200).json(adds)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET USER POSTS
router.get("/user/:userId", async (req, res) => {
    try {
        const adds = await Add.find({ userId: req.params.userId })
        res.status(200).json(adds)
    }
    catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router