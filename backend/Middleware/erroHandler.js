const { models } = require("mongoose")

const errorHandler = (err, req, res, nexr) => {
    const statusCode = res.statusCode ? res.status : 500
    res.status(statusCode)

    res.json({
        message: err.message,
        stack:process.env.NODE_ENV  === "production" ? null :err.stack
    })

   
}

 module.exports ={errorHandler}