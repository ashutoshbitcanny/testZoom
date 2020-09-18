const SessionController = require("../controllers/SessionController");
const router = require("express").Router();
module.exports = () => {
  router.post("/session", SessionController().createSession);
  router.get("/session", SessionController().getSessions);
  router.get("/session/:id", SessionController().getSession);
  router.put("/session/:id", SessionController().updateSession);
  router.delete("/session/:id", SessionController().deleteSession);

  return router;
};
