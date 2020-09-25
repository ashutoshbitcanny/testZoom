const Event = require("../models/Event");
const _  = require("lodash");

const EventController = () => {
  const createEvent = async (req, res) => {
      try {
        const data = _.pick(req.body, ["name"]);
        const event = await new Event(data).save();
        res.send({ event });
      } catch(e) {
          console.log(e);
          res.status(500).send();
      }
  }

  return {
    createEvent
  };
};
module.exports = EventController;
