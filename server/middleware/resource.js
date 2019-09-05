module.exports=options=>{

    return async (req, res, next) => {
        const mondelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${mondelName}`)
        next()
    }
}
