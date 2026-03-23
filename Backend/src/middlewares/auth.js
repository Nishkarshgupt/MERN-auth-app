const jwt = require("jsonwebtoken")

async function ensureAuthenticated(req, res, next){
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(401).json({
            message: "Unautorized, JWT token is require"
        })
    }

    try{
        const decoded = await jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({
            message: "Unautorized, JWT token is require"
        })
    }
}

module.exports = {ensureAuthenticated}