import express from "express";

const router = express.Router();

router
.get("/", (_req, res) => {
    res.send("HOla")
})
.post("/", (_req, res) => {
    res.send("HOla")
})


export default router