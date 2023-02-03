const notFoundMiddleware = (req, res)=>{
    res.status(404).send('path not exist')
}

module.exports = notFoundMiddleware