const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["guard", "admin"],
        default: "guard",
    },
    gender: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, {
    timestamps: true,
});
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
