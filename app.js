require('dotenv').config();
require('express-async-errors');
const cors = require('cors')
const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const connectDB = require('./db/connect')
const router = require('./routes/products')

const PORT = process.env.PORT || 3000
const URI = process.env.MONGO_URI

app.use(cors())
app.use(express.static('./public'))
app.use(express.json())
app.get('/',(req, res)=>{

})
app.use('/api/v1/products', router)

  
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async()=>{
    try {
        await connectDB(URI)
        app.listen(PORT, ()=>{
            console.log(`Server running at http://localhost:${PORT}`);
        })   
    } catch (error) {
        console.log(error);
    }
}
start()