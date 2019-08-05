const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
mongoose.set("debug", true);
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String,
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
},{ 
    timestamps: true
}
);

// Email validation 
userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); 
 }, 'The e-mail field cannot be empty.')

// Password validation
userSchema.path('password').validate(function (password) {
    var psswdRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return psswdRegex.test(password);
}, 'The password field cannot be empty.')

// Hashing a password before saving it to database.
userSchema.pre('save', async function(next){
    try {
        if (!this.isModified('password')) return next();
        var hashPassword = await bcrypt.hash(this.password, 10);   
        this.password = hashPassword;
        return next();     
    } catch (error) {
        return next(error);
    }
})

// Method to compare the user entered password
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(error){
        return next(error);
    }
} 


userSchema.plugin(uniqueValidator) // For validating the userShema
// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);