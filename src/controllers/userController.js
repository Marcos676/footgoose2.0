const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


module.exports = {
    loginRegister: (req, res) => {
        res.render('./users/loginRegister')
    },
    registerProcess: (req, res) => {
        let users = require('../data/users.json')

        let { fullName, email, password, rePassword } = req.body

        if (password != rePassword) {
            res.render('./users/loginRegister')
        }

        let names = fullName.trim().split(" ");

        let newUser = {
            id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
            firstName: names[0],
            lastName: names[1],
            email: email,
            password: bcrypt.hashSync(password, 10),
            address: null,
            image: "undefined.PNG",
            tel: null,
            admin: 0
        }

        users.push(newUser)

        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2), 'utf-8')

        return res.redirect('/usuario/perfil')
    },
    loginProcess: (req, res) => {
        let users = require('../data/users.json')
        let { email, password, rememberme } = req.body

        let user = users.find(user => user.email === email.trim())

        if (!user) {
            return res.render('./users/loginRegister')
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.render('./users/loginRegister')
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            admin: user.admin
        }

        res.locals.localsUser = req.session.user

        if (rememberme) {
            res.cookie('FootGoose', req.session.user, { maxAge: 1000 * 60 * 60 * 24 });
        }

        return res.redirect('/usuario/perfil')
    },
    profile: (req, res) => {
        if (!req.session.user) {
            return res.render('./users/loginRegister')
        }
        return res.render('./users/profile')
    },
    editProfile: (req, res) => {
        let users = require('../data/users.json')
        let user = users.find(user => user.id == req.session.user.id)
        return res.render('./users/profileEdit', {
            user
        })
    },
    editProfileProcess: (req, res) => {
        let users = require('../data/users.json')
        let { fullName, email, address, tel, pass1 } = req.body

        let user = users.find(user => user.id == req.session.user.id)

        let [firstName, lastName] = fullName.split(' ')

        let userEdited = {
            id: user.id,
            firstName,
            lastName,
            email,
            password: pass1 ? bcrypt.hashSync(pass1, 10) : user.password,
            address,
            image: req.file ? req.file.filename : user.image,
            tel,
            admin: user.admin
        }

        let usersModified = users.map(user => user.id == userEdited.id ? userEdited : user)

        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(usersModified, null, 2), 'utf-8')

        req.session.user = {
            id: userEdited.id,
            email: userEdited.email,
            firstName: userEdited.firstName,
            lastName: userEdited.lastName,
            image: userEdited.image,
            admin: userEdited.admin
        }

        res.locals.localsUser = req.session.user

        return res.render('./users/profile')
    },
    logout: (req, res) => {
        delete req.session.user;

        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 });
        }

        return res.redirect('/')

    }
}