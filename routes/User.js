const userController = require("../controllers/UserController");
const passport = require("passport");
const router = require("express").Router();
module.exports = () => {
  router.post("/user", userController().signup);
  router.get("/user", userController().getUsers);
  router.get(
    "/user/:userId",
    passport.authenticate("jwt", { session: false }),
    userController().getUser
  );
  router.put(
    "/user/:userId",
    passport.authenticate("jwt", { session: false }),
    userController().updateUser
  );
  router.delete(
    "/user/:userId",
    passport.authenticate("jwt", { session: false }),
    userController().deleteUser
  );

  // router.put(
  //   "/users/signup",
  //   passport.authenticate("jwt", { session: false }),
  //   userController().update
  // );

  router.post("/user/login", userController().login);

  router.get(
    "/users/meetings",
    passport.authenticate("jwt", { session: false }),
    userController().getMeetings
  );

  router.post(
    "/users/meetings",
    passport.authenticate("jwt", { session: false }),
    userController().createMeeting
  );

  //   router.route("/users/").put(userController().UpdateUser);

  return router;
};
