module.exports = (req,res, next) => {
    if (req.session.user) {
        res.locals.localsUser = req.session.user
    }
    next()

}