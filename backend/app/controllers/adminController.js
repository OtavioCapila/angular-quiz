const Admin = require('./../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {

    async createUser(req, res) {
        const userPass = req.body.password;
        const userHash = bcrypt.hash(userPass, 10, (err, hash) => {
            if (!req.body.name || !req.body.email || !req.body.password) {
                res.status(500).json({
                    message: 'Todos os campos são obrigatórios',
                })
            } else {
                const userData = {
                    name: req.body.name,
                    email: req.body.email,                    
                    password: hash,
                };
                Admin.create(userData)
                    .then((user) => {
                        const token = jwt.sign({
                            data: user
                        }, `${process.env.JWT_SECRET}`, {
                            expiresIn: '10h'
                        })
                        res.cookie('auth', token);
                        res.json({
                            message: 'Conta criada com Sucesso',
                            data: user,
                            token
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: 'Usuário já cadastrado',
                            status: 500
                        })
                    })
                return userHash;
            }
        })
    },
}