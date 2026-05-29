const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dutySchema = new Schema({
    guard: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    locationType: {
        type: String,
        enum: ["hostel", "other"],
        required: true,
    },
    locationName: {
        type: String,
        required: true,
        trim: true,
    },
    guardsCount: {
        type: Number,
        min: 1,
    },
    shift: {
        type: String,
        enum: ["shift1", "shift2", "shift3"],
        default: "shift1",
        trim: true,
    },
    dutyDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["assigned", "completed"],
        default: "assigned",
    }
}, {
    timestamps: true,
});

const DutyModel = mongoose.model("duties", dutySchema);

module.exports = DutyModel;
