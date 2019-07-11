const User = require('./../models/userModel');
const Admin = require('./../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

  /**
   * Function to login user by his access_code
   * @param {*} req 
   * @param {*} res 
   */
  async loginUser(req, res) {
    try {
      User.findOne({
          $or: [{
            email: req.params.useraccess
          }, {
            access_code: req.params.useraccess.toUpperCase()
          }]
        })
        .then((user) => {
          if (!user) {
            res.status(500).json({
              message: 'Usuário não encontrado'
            })
          } else {
            res.status(200).json({
              message: 'Logado com sucesso',
              data: user
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: 'Falha ao logar'
          })
        })
    } catch (err) {
      res.status(500).json({
        message: 'Falha ao logar'
      })
    }
  },

  /**
   * Function to login admin
   * @param {*} req 
   * @param {*} res 
   */
  adminLogin(req, res) {
    try {
      Admin.findOne({
          email: req.body.email
        })
        .then((user) => {
          return bcrypt.compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                const token = jwt.sign({
                  data: user
                }, `${process.env.JWT_SECRET}`, {
                  expiresIn: '10h'
                })
                res.cookie('auth', token);
                res.status(200).json({
                  message: 'Logado com sucesso',
                  data: user,
                  token
                })
              } else {
                res.status(500).json({
                  error: result,
                  message: 'Falha ao logar'
                })
              }
            })
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            message: 'Usuário não cadastrado'
          })
        })
    } catch (err) {
      res.status(500).json({
        message: 'Usuário não cadastrado'
      })
    }
  },
}