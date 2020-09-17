const userController = require("../controllers/UserController");
const passport = require("passport");
const router = require("express").Router();
module.exports = () => {
  router.post("/users/signup", userController().signup);

  router.put(
    "/users/signup",
    passport.authenticate("jwt", { session: false }),
    userController().update
  );

  router.post("/users/login", userController().login);

  router.get(
    "/users/:userId/meetings",
    passport.authenticate("jwt", { session: false }),
    userController().getMeetings
  );

  router.post("/users/:userId/meetings", userController().createMeeting);

  //   router.route("/users/").put(userController().UpdateUser);

  return router;
};
