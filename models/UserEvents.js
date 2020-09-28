var mongoose = require("mongoose");

var UserEventsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
        roles: [{ type: String }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserEvents", UserEventsSchema);
