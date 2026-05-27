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
        default: "8:00 AM - 4:00 PM",
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
