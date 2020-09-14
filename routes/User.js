const userController = require("../controllers/UserController");

module.exports = (router) => {
  router.route("/users/signup").post(userController().signup);

  router.route("/users/login").post(userController().login);

  router.route("/users/:userId/meetings").get(userController().getMeetings);

  router.route("/users/:userId/meetings").get(userController().createMeeting);

  //   router.route("/users/").put(userController().UpdateUser);

  return router;
};
