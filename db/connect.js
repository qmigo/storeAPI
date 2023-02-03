const mongoose = require('mongoose')

const connectDB = (uri)=>{
    mongoose.set('strictQuery', false);
    return mongoose.connect(uri).then(console.log('Connected to db')).catch((err)=>console.log(err))
}

module.exports = connectDB;