const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    guard: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    leaveDays: {
        type: Number,
        required: true,
        min: 1,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    reason: {
        type: String,
        required: true,
        trim: true,
    },
    medicalFile: {
        type: String,
        trim: true,
    },
    freeDays: {
        type: Number,
        default: 0,
    },
    paidDays: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    }
}, {
    timestamps: true,
});

const LeaveModel = mongoose.model("leaves", leaveSchema);

module.exports = LeaveModel;
