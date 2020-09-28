var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // required:true
    },
    // area: { type: String },
    pin: { type: Number },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    address: { type: String },
    status: {
      type: String,
      enum: ["approved", "blocked", "notapproved"],
    },
    dpurl: {
      type: String,
    },
    about: {
      type: String,
    },
    designation: {
      type: String,
    },
    company: {
      type: String,
    },
    qualification: {
      type: String,
    },

    interests: {
      type: [String],
      // required: true
    },
    link: {
      type: {
        youtube: {
          type: String,
        },
        twitter: {
          type: String,
        },
        facebook: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        instagram: {
          type: String,
        },
        website: {
          type: String,
        },
      },
      // required: true,
    },
    notifications: [
      {
        title: {
          type: String,
        },
        body: {
          type: String,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        dateRecieved: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    type: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    platformUser: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
