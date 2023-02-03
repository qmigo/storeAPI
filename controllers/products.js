const Product = require('../model/products')

const getAllProductsStatic = async(req, res)=>{
    const products = await Product.find({ })
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async(req, res)=>{
    const { featured, company, name, sort, fields } = req.query
    queryObject = {}
    if(featured)
    {
        queryObject.featured = featured==='true'?true:false
    }
    if(company)
    {
        queryObject.company = company
    }
    if(name)
    {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    const result = Product.find(queryObject) 
    if(sort)
    {
        const sortList = sort.split(',').join(' ')
        result.sort(sortList)
    }
    else
    {
        result.sort(createdAt)
    }

    if(fields)
    {
        const fieldsList = fields.split(',').join(' ')
        result.select(fieldsList)
    }

    const limit = Number(req.query.limit)||10
    const page = Number(req.query.page)||1 
    const skip = (page-1)*limit

    result.limit(limit).skip(skip)

    const products = await result
    res.status(200).json({ nbHits: products.length, products})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}