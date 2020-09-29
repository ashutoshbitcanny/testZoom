const ObjectId = require("mongoose").Types.ObjectId;
const Event = require("../models/Event");
const UserEvent = require("../models/UserEvents");

module.exports = (req, res, next) => {
    try {
        const { eventId } = req.body;
        if (!eventId || !ObjectId.isValid(eventId)) {
            return res.status(400).send({ message: "Invalid event id" });
        };

        const event = await Event.findOne({ _id: ObjectId(eventId) });
        if (!event) {
            return res.status(404).send({ message: "Event doesn't exist" });
        };

        const userEvent = await UserEvent.findOne({ eventId: ObjectId(eventId), userId: req.user._id });
        if (!userEvent) {
            return res.status(401).send({ message: "Event access denied" });
        };

        next();
    } catch(e) {
        console.log(e);
        next(e);
    }
};