const SessionController = require("../controllers/SessionController");
const router = require("express").Router();
const passport = require("passport");
module.exports = () => {
  router.post("/session", SessionController().createSession);
  router.get("/session", passport.authenticate("jwt", { session: false }), SessionController().getSessions);
  router.get("/session/:id", passport.authenticate("jwt", { session: false }), SessionController().getSession);
  router.put("/session/:id", SessionController().updateSession);
  router.delete("/session/:id", SessionController().deleteSession);

  return router;
};
