const userController = require("../controllers/UserController");
const passport = require("passport");
module.exports = (router) => {
  router.route("/users/signup").post(userController().signup);

  router
    .route("/users/signup", passport.authenticate("jwt", { session: false }))
    .put(userController().update);

  router.route("/users/login").post(userController().login);

  router
    .route(
      "/users/:userId/meetings",
      passport.authenticate("jwt", { session: false })
    )
    .get(userController().getMeetings);

  router
    .route(
      "/users/:userId/meetings",
      passport.authenticate("jwt", { session: false })
    )
    .get(userController().createMeeting);

  //   router.route("/users/").put(userController().UpdateUser);

  return router;
};
