const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

const UserModel = require("../Models/User");

const JWT_SECRET = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET || process.env.jWT_SECRET;


// GUARD SIGNUP
const signup = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            username,
            contact,
            password,
            gender,
            dob,
        } = req.body;

        if (!firstName || !lastName || !username || !contact || !password) {

            return res.status(400).json({
                message: "firstName, lastName, username, contact and password are required"
            });
        }

        const user = await UserModel.findOne({
            $or: [
                { contact },
                { username },
            ]
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
            password: hashedPassword,
            role: "guard",
            firstName,
            lastName,
            username,
            gender,
            dob,
            contact,
        });

        await userModel.save();
        
        res.status(201).json({
            message: "Guard created successfully"
        });

    } catch (err) {

        if (err?.code === 11000) {
            return res.status(409).json({
                message: "Guard already exists with this contact"
            });
        }

        console.log("Signup error:", err);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GUARD LOGIN
const login = async (req, res) => {

    try {

        const username = req.body?.username?.trim();
        const contact = req.body?.contact?.trim();
        const password = req.body?.password;
        const loginId = username || contact;

        if (!loginId || !password) {

            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await UserModel.findOne({
            $or: [
                { username: loginId },
                { contact: loginId },
            ]
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
                id: user._id,
                role: user.role,
                contact: user.contact,
                username: user.username,
            },
            JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        res.status(200).json({
            message: "Guard login successful",
            jwtToken,
            user: {
                id: user._id,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                contact: user.contact,
                username: user.username,
            }
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

        if (!name || !password) {

            return res.status(400).json({
                message: "Name and password are required"
            });
        }

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
            JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        res.status(200).json({
            message: "Admin login successful",
            jwtToken,
            user: {
                name: "admin",
                role: "admin",
            }
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
