const meetingController = require("../controllers/MeetingController");
const router = require("express").Router();
const passport = require("passport");
module.exports = () => {
  router.get(
    "/meetings/:meetingId",
    passport.authenticate("jwt", { session: false }),
    meetingController().getMeeting
  );

  router.put(
    "/meetings/:meetingId",
    passport.authenticate("jwt", { session: false }),
    meetingController().updateMeeting
  );

  router.delete(
    "/meetings/:meetingId",
    passport.authenticate("jwt", { session: false }),
    meetingController().deleteMeeting
  );

  router.get(
    "/meetings/:meetingId/registrants",
    passport.authenticate("jwt", { session: false }),
    meetingController().getRegistrants
  );

  router.post(
    "/meetings/:meetingId/registrants",
    passport.authenticate("jwt", { session: false }),
    meetingController().addRegistrants
  );

  //   router.route("/users/").put(userController().UpdateUser);

  return router;
};
