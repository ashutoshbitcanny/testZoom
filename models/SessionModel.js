var mongoose = require("mongoose");

var SessionModel = new mongoose.Schema(
  {
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
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = Session = mongoose.model("sessions", SessionModel);
