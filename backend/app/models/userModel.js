const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    access_code: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,        
    },
    surname: {
        type: String,         
    },
    userPreferences: {
        type: Array,
        select: true
    },
    email: {
        type: String,
        require: true,        
        lowercase: true,
    },
    new_user:{
      type: Boolean,
      default:true
    },
    new_access:{
        type:Boolean,
        default: false
    },
    industry_state: {
        type: String   
    },
    cellphone:{
        type: String,
    },
    role: {
        type: String,
        require: true,       
    },          
    questions_anwsered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel',
        select: true,
    }],    
    last_anwsered_question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel',
        select: true,
    },
    total_correct_anwsered_questions:{
        type: Number,
        select: true
    },
    total_points: {
        type:Number,
        select: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('UserModel', userSchema);