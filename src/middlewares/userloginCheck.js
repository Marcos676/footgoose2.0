module.exports = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    return res.redirect('/usuario/ingresar')
}