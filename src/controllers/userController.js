const bcrypt = require('bcryptjs');

module.exports = {
    loginRegister: (req,res) => {
        res.render('./users/loginRegister')
    },
    registerProcess:(req,res) => {
        let users = require('../data/users.json')

        let {fullName, email, password, rePassword} = req.body

        if (password != rePassword) {
            res.render('./users/loginRegister')
        }

        let names = fullName.trim().split(" ");

        let newUser = {
            id: users[users.length - 1].id + 1,
            firstName: names[0],
            lastName: names[1],
            email: email,
            password: bcript.hashSync(password, 10),
            address: null,
            image: "undefined.PNG",
            tel: null,
            admin: 0
        }

        users = users.push(newUser)

        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2), 'utf-8')

        return res.redirect('/usuario/perfil')
    },
    loginProcess:(req,res) => {
        let users = require('../data/users.json')
        let {email, password, rememberme} = req.body

        let user = users.find(user => user.email === email.trim())

        if (!user) {
            return res.render('./users/loginRegister')
        }

        if (bcrypt.compareSync(password, user.password)){
            return res.render('./users/loginRegister')
        }

        req.session.user = {
            id : user.id,
            email: user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            image : user.image,
            admin : user.admin
        }

        if (rememberme) {
            res.cookie('FootGoose', req.session.user, { maxAge: 1000 * 60 * 60 * 24 });
        }

        return res.redirect('/usuario/perfil')
    },
    profile: (req,res) => {
        if (!req.session.user) {
            return res.render('./users/ingresar')
        }
        return res.render('./users/loginRegister')
    },
    logout: (req,res) => {
        delete req.session.user;
        
        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 });
        }

        return res.redirect('/')

    }
}