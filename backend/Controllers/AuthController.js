const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

const UserModel = require("../Models/User");


// GUARD SIGNUP
const signup = async (req, res) => {

    try {

        const { name, password } = req.body;

        const user = await UserModel.findOne({
            name
        });

        if (user) {

            return res.status(409).json({
                message: "Guard already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const userModel = new UserModel({
            name,
            password: hashedPassword,
            role: "guard",
        });

        await userModel.save();
        
        res.status(201).json({
            message: "Guard created successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GUARD LOGIN
const login = async (req, res) => {

    try {

        const { name, password } = req.body;

        const user = await UserModel.findOne({
            name
        });

        if (!user) {

            return res.status(403).json({
                message: "Guard not found"
            });
        }

        const isPassEqual = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPassEqual) {

            return res.status(403).json({
                message: "Wrong password"
            });
        }

        const jwtToken = JWT.sign(
            {
                name: user.name,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "24h"
            }
        );

        res.status(200).json({
            message: "Guard login successful",
            jwtToken
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ADMIN LOGIN
const adminLogin = async (req, res) => {

    try {

        const { name, password } = req.body;

        // DEFAULT ADMIN NAME
        if (name !== "admin") {

            return res.status(403).json({
                message: "Invalid admin"
            });
        }

        // DEFAULT ADMIN PASSWORD
        if (password !== "admin123") {

            return res.status(403).json({
                message: "Wrong admin password"
            });
        }

        const jwtToken = JWT.sign(
            {
                name: "admin",
                role: "admin",
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "24h"
            }
        );

        res.status(200).json({
            message: "Admin login successful",
            jwtToken
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    signup,
    login,
    adminLogin
};