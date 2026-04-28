const express = require("express")
const nodeModel = require("./model/nodemodel")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))



app.post("/api/notes" , async (req,res)=>{

    const {title, description} = req.body

   const notes = await nodeModel.create({
        title,
        description
    })
    res.status(202).json({
        message : "note created succsessfully",
        notes
    })
})


app.get("/api/notes", async(req,res)=>{

    const notes = await nodeModel.find()

    res.status(200).json({
        message: "note feched succssefully",
        notes
    })
})
app.delete("/api/notes/:id" , async(req,res)=>{
    const id = req.params.id

  

   const note = await nodeModel.findByIdAndDelete(id)

   res.status(200).json({
    message : "note delete successfully"
   })
})

app.patch("/api/notes/:id",  async(req,res)=>{

    const id = req.params.id
    const {description} = req.body
    
    const note = await nodeModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message : " note update successfully"

    })
})
module.exports = app

