const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    const token = authHeader.split(' ')[1]
    if(authHeader){
        jwt.verify(token, process.env.JWT, (err, user) => {
            if(err)
                res.status(403).json('Token is invalid!')
            else{
                req.user = user 
                next()
            }
        })
    }
    else 
        res.status(401).json('You are not authenticated!')
}

const verifyTokenAndAuthorisation = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id == req.params.id || req.user.isAdmin)
            next()
        else 
            res.status(403).json('You are not allowed to access this page!')
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin)
            next()
        else 
            res.status(403).json('You are not allowed to access this page!')
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin }