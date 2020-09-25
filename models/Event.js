var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema(
    {
        name: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("event", EventSchema);
