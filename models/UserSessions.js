var mongoose = require("mongoose");

var UserSessionsModel = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, required: true },
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

const UserSessions = mongoose.model("usersessions", UserSessionsModel);
module.exports.getAll = (option = {}) => {
  return UserSessions.find(option);
};

module.exports.getOne = (option = {}) => {
  return UserSessions.findOne(option);
};
module.exports.set = (data) => {
  let userSession = new UserSessions(data);
  return userSession.save();
};
module.exports.del = (op) => {
  return UserSessions.deleteOne(op);
};
