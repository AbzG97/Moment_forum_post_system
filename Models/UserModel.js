const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
        trim: true
    },
    email: {
        type: "string",
        required: true,
        unique: true,
        trim: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("please enter a valid email");
            }
        }
    },
    password: {
        type: "string",
        required: true,
        validate(val) {
            if (val.length < 6) {
                throw new Error("Password must have atleast 6 characters")
            }
        }
    },
    tokens: [{
        token:{
            type: 'string',
            required: true
        }
    }]
    
});


// this method for the schema is used for finding users using email and passwords for logging in
userSchema.statics.findByCreds = async (email, password) => {
    const user = await user_model.findOne({ email: email }); // finds the email in database
    if (!user) {
        throw new Error("can't find email");
    } else {
        const isMatch = await bcrypt.compare(password, user.password); // compares password inputed by the hashed password of the user assuming that the email is found
        if (isMatch == false) {
            throw new Error("incorrect password");
        } else {
            return user; // returns the user
        }
    }
}

// generate JWT tokens for user objects
userSchema.methods.GenerateAuthTokens = async function(){
    const user = this;
    const generated_token = JWT.sign({id: user._id.toString()}, process.env.SECRET); // make a token 
    user.tokens = user.tokens.concat({token: generated_token}); // concat to the tokens array
    await user.save(); // save the user
    //console.log(generated_token);
    return generated_token; // return generated token

}


// this middleware will hash the passwords of users before creating and putting them in the database / any user object that will use save() 
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});


const user_model = mongoose.model("user", userSchema, "users");



module.exports = user_model;