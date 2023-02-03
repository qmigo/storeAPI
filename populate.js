require('dotenv').config()
const Product = require('./model/products')
const connectDB = require('./db/connect')
const jsonProucts = require('./products.json')

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProucts)
        console.log('Success')
        process.exit(0)
    } catch (error) {
        console.log(error);
    }
}

start()