const Product = require('../model/products')

const getAllProductsStatic = async(req, res)=>{
    const products = await Product.find({ 
        price: { $gt: 100 }
    })
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async(req, res)=>{
    const { featured, company, name, sort, fields, numericFilters } = req.query
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
    if(numericFilters)
    {
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }

        const regEx = /\b(<|>|=|<=|>=)\b/g
        let filters= numericFilters.replace(regEx, ((match)=>`-${operatorMap[match]}-`))
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field))
            {
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }
    let result = Product.find(queryObject) 

    if(sort)
    {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else
    {   
        result = result.sort('createdAt')
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