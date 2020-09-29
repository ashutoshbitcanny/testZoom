var mongoose = require("mongoose");

var SessionModel = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId },
    id: { type: String, required: true },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    platform: {
      type: String,
      enum: ["zoom", "meet", "youtube", "facebook"],
    },
    type: {
      type: String,
      enum: ["breakout", "webinar", "panel discussion"],
    },
    imageURL: {
      type: String,
    },
    inviteType: {
      type: String,
      enum: ["invite", "register", "open"],
    },
    approvalNeeded: {
      type: Boolean,
    },
    maxCapacity: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    registrationOpen: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ["active", "cancelled"],
    },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

const Session = mongoose.model("sessions", SessionModel);

module.exports.getAll = (option = {}) => {
  return Session.aggregate([
    {
      $match: option,
    },
    {
      $lookup: {
        from: "usersessions",
        localField: "_id",
        foreignField: "sessionId",
        as: "userSessions",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userSessions.userId",
        foreignField: "_id",
        as: "users",
      },
    },
  ]);
};

module.exports.getOne = (option = {}) => {
  return Session.aggregate([
    {
      $match: option,
    },
    {
      $lookup: {
        from: "usersessions",
        localField: "_id",
        foreignField: "sessionId",
        as: "userSessions",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userSessions.userId",
        foreignField: "_id",
        as: "users",
      },
    },
  ]);
};
module.exports.set = (data) => {
  let session = new Session(data);
  return session.save();
};
module.exports.del = (op) => {
  return Session.deleteOne(op);
};

module.exports.UpdateOne = (query, updateData) => {
  return Session.findOneAndUpdate(query, { $set: updateData }, { new: true });
};
