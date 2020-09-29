var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", EventSchema);

module.exports.getAll = (option = {}) => {
  return Event.find(option);
};

module.exports.getOne = (option = {}) => {
  return Event.findOne(option);
};
module.exports.set = (data) => {
  let event = new Event(data);
  return event.save();
};
module.exports.del = (op) => {
  return Event.deleteOne(op);
};
