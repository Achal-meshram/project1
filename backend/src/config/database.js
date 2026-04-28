const  mongoose  = require("mongoose")

function connectToDB(){
        mongoose.connect( process.env.MONGO_URL)
        .then(()=>{
            console.log("connet Database")
        })
    
}

module.exports = connectToDB