const express = require("express");
const user_model = require("../Models/UserModel");
require("../dbConnection");
const User_Router = express.Router();
const authenticate = require("../backendAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// create user / sign up 
User_Router.post('/users/create', async (req, res) => {
  
    const new_user = new user_model(req.body);

    // console.log(new_user);

    try {
        const new_token = jwt.sign({id: new_user._id.toString()}, process.env.SECRET);
		new_user.tokens = new_user.tokens.concat({token: new_token});

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(new_user.password, salt);
		new_user.password = hashed;
       
        // console.log(new_user);


        res.cookie('auth_token',new_token, { httpOnly: true, secure: false, maxAge: 3600000 });
        await new_user.save();
        res.status(201).send({ user: new_user, token: new_token });

    } catch (e) {
        res.status(500).send(e);
    }
});

// login user using findByCred statics which will return a user object
// it uses the email and password of a user to find them in the database
// it also generates jwt tokens for the user object to be used in other routes that require authentication. 
User_Router.post("/users/login", async (req, res) => {
    try {
       // find user
		const user_in_db = await user_model.findOne({username: req.body.username});
		if(!user_in_db){
			res.status(404).send({message: "username not found in database"});
		}

		// verify password
		const check = await bcrypt.compare(req.body.password, user_in_db.password);
		
		if(!check){
			res.status(404).send({message: "username or password are wrong"});
		}
		// generate token
		const new_token = jwt.sign({id: user_in_db._id}, process.env.SECRET);
		user_in_db.tokens = user_in_db.tokens.concat({token: new_token});

		// set auth token in cookie
		res.cookie('auth_token',new_token, { httpOnly: true, secure: false, maxAge: 3600000 });
		await user_in_db.save();
		res.status(200).send({message: "user login successful", user: user_in_db});
    } catch (e) {
        res.status(404).send({ "error": "can't find user" });
    }

});

// read the profile of an authenticated user
User_Router.get('/users/me', authenticate, async (req, res) => {
    try {
        res.status(200).send(req.user);

    } catch (e){
        res.status(401).send({message: "can't get data for unauthorized user"});
    }   
});


// logout route also the user needs to authenticated in order to logout
User_Router.post('/users/logout', authenticate, async (req, res) => {
    try {
        // basically just emptying the tokens array so the user won't have any tokens anymore to be validated
        const user = await user_model.findById(req.user._id);
        user.tokens = [];
        await user.save();
        res.status(200).send({message: "logged out of every device and deleted all tokens completed",user: user});

    } catch (e) {
        res.status(500).send(e);

    }

});
// update user data 
User_Router.put("/users/profile/update", authenticate, async (req, res) => {
    // validating the updates so only valid updates are name, email and password
    const incomingUpdates = Object.keys(req.body);
    const validUpdates = ['name', 'email', 'password'];
    const isValidUpdate = incomingUpdates.every((update) => validUpdates.includes(update));

    if (isValidUpdate == false) { // if any of the updates sent are not valid then an error will return
        return res.status(500).send({ "error": "Invalid updates" });
    } else {
        try {
            const user = await user_model.findById(req.user._id); // find a user
            if (!user) { // if no user exist then return an 404 error
                return res.status(404).send({ "error": "user not found in database" });
            } else {
                // if the user is found update the data 
                incomingUpdates.forEach((update) => user[update] = req.body[update]);
                await user.save(); // save updates user data
                res.status(200).send({message: "update successful", user: user});
            }

        } catch (e) {
            res.status(500).send(e);
        }
    }

});

// get users data
User_Router.get("/users", async (req, res) => {
    const users = await user_model.find({});
    if (!users) {
        res.status(404).send({ "error": "no users in database" });
    } else {
        res.status(200).send(users);
    }
});

User_Router.get("/users/me/delete", authenticate, async (req,res) => {
    try {
        await user_model.findByIdAndDelete(req.user._id);
        res.status(200).send({message: "delete successful"});

    } catch (e) {
        res.status(401).send({message: "can't delete a nonexistent user"});
    }
});

module.exports = User_Router;