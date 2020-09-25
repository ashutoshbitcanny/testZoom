const EventController = require("../controllers/EventController");
const router = require("express").Router();
const passport = require("passport");
module.exports = () => {
  router.post("/event", EventController().createEvent);
  return router;
};
