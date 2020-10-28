const mongoose = require("mongoose");

const MongoConnect = async () => {
    try{
         mongoose.connect( `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true,useUnifiedTopology:true});
         console.log("DB connected!")
    }catch (e) {
         console.error("DB connection failed!",e)
    }
}

module.exports = MongoConnect;
