var mongoose = require("mongoose");

var SessionModel = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    // },
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
    speakerList: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },

        meetingLink: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ["speaker", "moderator", "panelist"],
        },
      },
    ],
    approvalNeeded: {
      type: Boolean,
    },
    attendees: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        source: {
          type: String,
          enum: ["registered", "added"],
        },

        isApproved: {
          type: Boolean,
        },
      },
    ],
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
  },
  { timestamps: true }
);

module.exports = Session = mongoose.model("sessions", SessionModel);
