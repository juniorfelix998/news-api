const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const User = require('../models/user')

const register = async (data,role,res) =>{
    try{
        const userTaken = await validateEmail(data.email);
        if(userTaken) {
            return res.status(400).json({
                email: "Email is already taken",
                message: "Registration failure",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 16);
        const code = crypto.randomInt(100000, 1000000);

        const newUser = new User({
            ...data,
            password: hashedPassword,
            verificationCode:code,
            role
        });

        await newUser.save();
        return res.status(201).json({
            message: "Account successfully created",
            success: true,
        });

    }catch (err) {
        
    }
};

const validateEmail = async (email) =>{
    let user = await User.findOne({email: email});
    if (user){
        return true
    }else{
        return false;
    }

};