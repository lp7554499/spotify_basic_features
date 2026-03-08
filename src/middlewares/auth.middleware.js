const jwt = require('jsonwebtoken')

function authArtist(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' })
    }
}


function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'user' && decoded.role !== 'artist'){
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' })
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' })
    }
}



module.exports = {authArtist, authUser}