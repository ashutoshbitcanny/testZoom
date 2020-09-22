var mongoose = require("mongoose");

var UserSessionsModel = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["breakout", "webinar", "panel discussion"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        userData: { type: mongoose.Schema.Types.Mixed },
        role: {
            type: String,
            enum: ["speaker", "attendee"],
        },
    },
    { timestamps: true }
);

module.exports = UserSessions = mongoose.model("userSessions", UserSessionsModel);
