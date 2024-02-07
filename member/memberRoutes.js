import express from "express";
import Member from '../models/Member.js'

const router = express.Router()

router.get("/", async (req, res) => {
    const members = await Member.findAll()
    res.json(members)
})

export default router
