const errorHandlerMiddleware = (err, req, res, next)=>{
    res.status(400).send({msg:err.message})
}

module.exports = errorHandlerMiddleware