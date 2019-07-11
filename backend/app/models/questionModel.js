const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question:{
        type:String,
        require: true
    },
    anwser_options:{
        type: Array,
        require: true
    },
    correct_anwser:{
        type:Array,
    },
    points:{
        type:Number
    },
    article:{
        type:String,
    },
    descriptive_text:{
        type:String
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('QuestionModel', questionSchema);