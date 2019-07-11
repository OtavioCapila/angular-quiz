const User = require('./../models/userModel');
module.exports = {

    /**
     * Function to return all registered users
     * @param {*} req 
     * @param {*} res 
     */
    async getAllUsers(req, res) {
        try {
            User.find()
                .then((user) => {
                    res.status(200).json({
                        message: 'Requisição feita com sucesso',
                        data: user
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao buscar todos os usuários',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao buscar todos os usuários',
                data: err
            })
        }
    },

    /**
     * Function to return a single user by ID
     * @param {*} req 
     * @param {*} res 
     */
    async getUserById(req, res) {
        try {
            User.findById({
                _id: req.params.id
            }).populate(['questions_anwsered', 'last_anwsered_question'])
                .then((user) => {
                    if (!user) {
                        res.status(500).json({
                            message: 'Usuário não cadastrado',
                        })
                    } else {
                        res.status(200).json({
                            message: 'Requisição feita com sucesso',
                            data: user
                        })
                    }
                })
                .catch((err) => {              
                    res.status(500).json({
                        message: 'Falha ao buscar usuário',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao buscar usuário',
                data: err
            })
        }
    },

    /**
     * Function to return create a new user
     * @param {*} req 
     * @param {*} res 
     */
    async createUser(req, res) {
        console.log('req: ', req.body);
        try {
            User.findOne({ email: req.body.email })
                .then((user) => {
                    if (!user) {
                        User.create(req.body)
                            .then((user) => {
                                res.status(200).json({
                                    message: 'Usuário criado com sucesso',
                                    data: user
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    message: 'Falha ao registrar usuário',
                                    data: err
                                })
                            })
                    } else {
                        User.findOneAndUpdate({ email: req.body.email }, {
                            $set: {
                                ...req.body,
                                questions_anwsered: [],
                                total_correct_anwsered_questions: 0,
                                total_points: 0,
                                last_anwsered_question: undefined,
                                userPreferences: [],
                                new_access: true,
                                new_user:false
                            }
                        }, { new: true })
                            .then((user) => {
                                res.status(200).json({
                                    message: 'Dados atualizados com sucesso',
                                    data: user
                                })
                            }).catch((err) => {
                                res.status(500).json({
                                    message: 'Falha ao atualizar os dados',
                                    data: err
                                })
                            })                        
                    }
                })
            // 
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao registrar usuário',
                data: err
            })
        }
    },

    /**
     * Function to update a user
     * @param {*} req 
     * @param {*} res 
     */
    async updateUser(req, res) {
        const updateQuery = {};
        if (req.body.access_code) {
            updateQuery.access_code = req.body.access_code
        }
        if (req.body.name) {
            updateQuery.name = req.body.name
        }
        if (req.body.surname) {
            updateQuery.surname = req.body.surname
        }
        if (req.body.cellphone) {
            updateQuery.cellphone = req.body.cellphone
        }
        if (req.body.email) {
            updateQuery.email = req.body.email
        }
        if (req.body.role) {
            updateQuery.role = req.body.role
        }
        if (req.body.industry_state) {
            updateQuery.industry_state = req.body.industry_state
        }
        if (req.body.total_correct_anwsered_questions) {
            updateQuery.total_correct_anwsered_questions = req.body.total_correct_anwsered_questions
        }
        if (req.body.total_points) {
            updateQuery.total_points = req.body.total_points
        }
        try {
            User.findByIdAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        questions_anwsered: req.body.questions_anwsered
                    },
                    $set: {
                        last_anwsered_question: req.body.questions_anwsered
                    },
                    $set: updateQuery
                }, {
                    new: true
                })
                .then((user) => {
                    if (!user) {
                        res.status(200).json({
                            message: 'Usuário não existe',
                        })
                    } else {
                        res.status(200).json({
                            message: 'Usuário Atualizado com sucesso',
                            data: user
                        })
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao atualizar usuário',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao encontrar usuário',
                data: err
            })
        }
    },

    /**
     * Function to return update a user score
     * @param {*} req 
     * @param {*} res 
     */
    async updateUserScore(req, res) {
        try {
            User.findByIdAndUpdate({
                _id: req.params.id
            }, {
                    $inc: {
                        total_points: req.body.points
                    }
                })
                .then((user) => {
                    res.status(200).json({
                        message: 'Pontuação atualizada com sucesso',
                        data: user
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao atualizar pontuação',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao atualizar pontuação'
            })
        }
    },

    async updateUserAnwseredQuestions(req, res) {
        try {
            User.findByIdAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        questions_anwsered: req.body.question
                    },
                    $set: {
                        last_anwsered_question: req.body.question
                    }
                }, {
                    new: true
                })
                .then((user) => {
                    res.status(200).json({
                        message: 'Dados atualizados com sucesso',
                        data: user
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao atualizar perguntas já respondidas'
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Erro ao atualizar dados'
            })
        }
    },

    /**
     * Function to return update user correct anwser
     * @param {*} req 
     * @param {*} res 
     */
    async updateUserCorrectAnwserTotal(req, res) {
        try {
            User.findByIdAndUpdate({
                _id: req.params.id
            }, {
                    $inc: {
                        total_correct_anwsered_questions: 1
                    }
                })
                .then((user) => {
                    res.status(200).json({
                        message: 'Total de questões respondidas corretamente atualizado',
                        data: user
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao questões respondidas',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao questões respondidas'
            })
        }
    },

    /**
     * Function to return all delete a user
     * @param {*} req 
     * @param {*} res 
     */
    async deleteUser(req, res) {
        try {
            User.findByIdAndDelete({
                _id: req.params.id
            })
                .then((user) => {
                    if (!user) {
                        res.status(200).json({
                            message: 'Usuário não existe',
                        })
                    } else {
                        res.status(200).json({
                            message: 'Usuário Removido com sucesso',
                            data: user
                        })
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao remover usuário',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao remover usuário',
                data: err
            })
        }
    },

    async updateUserPreferences(req, res) {
        try {
            User.findByIdAndUpdate({
                _id: req.params.id
            }, {
                    $set: {
                        userPreferences: req.body.userPreferences
                    }
                }, {
                    new: true
                })
                .then((user) => {
                    res.status(200).json({
                        message: 'Preferências atualizadas com sucesso',
                        data: user
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Falha ao atualizar as preferências',
                        data: err
                    })
                })
        } catch (err) {
            res.status(500).json({
                message: 'Falha ao encontrar usuário',
                data: user
            })
        }
    }/* ,

    async changeNewUserValue(req,res){
        try{
            User.updateMany({},{new_user: false},{multi:true},(err,succ)=>{
                if(err){
                    res.status(500).json({
                        message: 'Falha ao atualizar informação',
                        err
                    })
                }else{
                    res.status(200).json({
                        message: 'Atualizado com sucesso',
                        data: succ
                    })
                }
            })
        }catch(err){
            res.status(500).json({
                message: 'Falha ao atualizar informação',
                err
            })
        }
    } */

}