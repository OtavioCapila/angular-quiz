const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        require: true
    },
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('AdminModel', adminSchema);