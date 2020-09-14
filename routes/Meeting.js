const meetingController = require("../controllers/MeetingController");

module.exports = (router) => {
  router.route("/meetings/:meetingId").get(meetingController().getMeeting);

  router.route("/meetings/:meetingId").put(meetingController().updateMeeting);

  router
    .route("/meetings/:meetingId")
    .delete(meetingController().deleteMeeting);

  router
    .route("/meetings/:meetingId/registrants")
    .get(meetingController().getRegistrants);

  router
    .route("/meetings/:meetingId/registrants")
    .post(meetingController().addRegistrants);

  //   router.route("/users/").put(userController().UpdateUser);

  return router;
};
