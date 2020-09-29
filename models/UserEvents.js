var mongoose = require("mongoose");

var UserEventsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roles: [{ type: String }],
  },
  { timestamps: true }
);

const UserEvents = mongoose.model("UserEvents", UserEventsSchema);

module.exports.getAll = (option = {}) => {
  return UserEvents.find(option);
};

module.exports.getOne = (option = {}) => {
  return UserEvents.findOne(option);
};
module.exports.set = (data) => {
  let userEvent = new UserEvents(data);
  return userEvent.save();
};
module.exports.del = (op) => {
  return UserEvents.deleteOne(op);
};
