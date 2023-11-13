const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'NEW'
    },
    progress: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = User = mongoose.model("jobs", JobSchema);