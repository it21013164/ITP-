const mongoose = require('mongoose');
require('dotenv').config();


const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log('MongoDB connected');
    }catch(error){
        console.error('Mongodb connection failed',error.message);
    }
};

module.exports = connectDatabase;