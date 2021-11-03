module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.admin == 1 ) {
        return next()
    }
    return res.redirect('/')
}