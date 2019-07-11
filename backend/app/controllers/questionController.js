const Question = require('../models/questionModel');


module.exports = {


    /**
     * Function to return all registered questions
     * @param {*} req 
     * @param {*} res 
     */
    async getAllQuestions(req,res){
        try{
            Question.find()
            .then((qst)=>{
                res.status(200).json({
                    message: 'Requisição feita com sucesso',
                    data: qst
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message: 'Falha ao buscar todas as perguntas',
                    data: err
                })
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Falha ao buscar todas as perguntas',
                data: err
            })
        }
    },

    /**
     * Function to create a new question
     * @param {*} req 
     * @param {*} res 
     */
    async createQuestion(req,res){
        console.log('req: ', req);
        try{
            Question.create(req.body)
            .then((qst)=>{
                res.status(200).json({
                    message: 'Pergunta Criada',
                    data: qst
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message: 'Falha ao criar pergunta',
                    data: err
                })
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Falha ao criar pergunta',
                data: err
            })
        }
    },

    /**
     * Function to update a question
     * @param {*} req 
     * @param {*} res 
     */
    async updateQuestion(req,res){
        const updateQuery = {};
        if (req.body.question) {
            updateQuery.question = req.body.question
        }
        if (req.body.anwser_options) {
            updateQuery.anwser_options = req.body.anwser_options
        }
        if (req.body.correct_anwser) {
            updateQuery.correct_anwser = req.body.correct_anwser
        }
        if (req.body.points) {
            updateQuery.points = req.body.points
        }
        if(req.body.article){
            updateQuery.article = req.body.article
        }
        if(req.body.descriptive_text){
            updateQuery.descriptive_text = req.body.descriptive_text
        }
        try{
            Question.findByIdAndUpdate({_id:req.params.id},{
                $set:updateQuery
            },{
                new:true
            })
            .then((qst)=>{
                res.status(200).json({
                    message: 'Pergunta atualizada com sucesso',
                    data: qst
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message: 'Falha ao atualizar pergunta',
                    data: err
                })
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Falha ao atualizar pergunta',
                data: err
            })
        }
    },

    /**
     * Function to delete a question
     * @param {*} req 
     * @param {*} res 
     */
    async deleteQuestion(req,res){
        try{
            Question.findByIdAndDelete({_id:req.params.id})
            .then((qst)=>{
                res.status(200).json({
                    message: 'Pergunta Removida com Sucesso',
                    data: qst
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message: 'Falha ao remover pergunta',
                    data: err
                })
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Falha ao remover pergunta',
                data: err
            })
        }
    },

    async deleteAllQuestions(req,res){
        try{
            Question.deleteMany({},(err)=>{
                console.log('err: ', err);
            })
        }
        catch(err){
            console.log('err: ', err);

        }
    }



}