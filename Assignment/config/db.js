const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection successful");
    } catch (error) {
        console.log(`error is ${error}`);
    }

}

module.exports=connectDb;