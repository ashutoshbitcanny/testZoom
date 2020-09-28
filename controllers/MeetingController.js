const axios = require("axios");
const platformApi = require("../helpers/zoom-api");
const SessionModel = require("../models/SessionModel");
const UserSessionsModel = require("../models/UserSessions");
const UserModel = require("../models/UserModel");
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require("lodash");
const { createOrUpdateUserEvent } = require("../helpers/userEvent");

const MeetingController = () => {
  const getMeeting = async (req, res, next) => {
    try {
      const meetingId = req.params.meetingId;
      if (!ObjectId.isValid(meetingId)) {
        res.status(404).send();
      }
      const sessionRes = await SessionModel.findOne({ _id: ObjectId(meetingId), createdBy: req.user._id });
      if (!sessionRes) {
        res.status(404).send();
      }
      const platformMeetingId = sessionRes.id;
      const platRes = await platformApi.getMeeting(platformMeetingId);
      res.status(platRes.status).send(platRes.data);
    } catch (error) {
      console.log(error);
      if (error.response)
        res.status(error.response.status).send(error.response.data);
      else
        res.status(500).send();
    }
  };

  const updateMeeting = async (req, res, next) => {
    try {
      const resData = await axios.patch(`${baseUrl}${req.url}`, req.body, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  };

  const deleteMeeting = async (req, res, next) => {
    try {
      const resData = await axios.delete(`${baseUrl}${req.url}`, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  };

  const getRegistrants = async (req, res, next) => {
    try {
      const meetingId = req.params.meetingId;
      const sessionRes = await SessionModel.findOne({ _id: ObjectId(meetingId), createdBy: req.user._id });
      if (!sessionRes) {
        res.status(404).send();
      }
      const platformMeetingId = sessionRes.id;
      const platRes = await platformApi.listMeetingRegistrants(platformMeetingId);
      res.status(platRes.status).send(platRes.data);
    } catch (error) {
      console.log(error);
      if (error.response)
        res.status(error.response.status).send(error.response.data);
      else
        res.status(500).send();
    }
  };

  const addRegistrants = async (req, res, next) => {
    try {
      const meetingId = req.params.meetingId;
      const sessionRes = await SessionModel.findOne({ _id: ObjectId(meetingId), createdBy: req.user._id });
      if (!sessionRes) {
        res.status(404).send();
      }
      const platformMeetingId = sessionRes.id;

      let platformData = _.pick(req.body, ["email", "first_name", "last_name"]);
      let generalData = _.pick(req.body, ["role", "userId", "eventId"]);

      const role = _.toLower(generalData.role);
      if (!role || !["speaker", "attendee"].includes(role)) {
        return res.status(400).send({ message: "Invalid role!" });
      }
      let registrantId = generalData.userId;
      if (registrantId && !ObjectId.isValid(registrantId)) {
        return res.status(400).send({ message: "User Id is not valid" });
      } else if (registrantId) {
        const registrantData = await UserModel.findOne({ _id: ObjectId(registrantId) });
        platformData = _.pick(registrantData, ["first_name", "last_name", "email"]);
      }
      const platRes = await platformApi.addMeetingRegistrant(platformMeetingId, platformData);
      const userSession = {
        sessionId: sessionRes._id,
        type: sessionRes.type,
        role
      };
      if (registrantId) {
        userSession.userId = ObjectId(registrantId);
      } else {
        userSession.userData = {
          email: platformData.email,
          first_name: platformData.first_name,
          last_name: platformData.last_name
        }
      };
      await UserSessionsModel.create(userSession);
      if (registrantId)
        await createOrUpdateUserEvent(ObjectId(generalData.eventId), ObjectId(registrantId), role);
      res.status(platRes.status).send(platRes.data);
    } catch (error) {
      console.log(error);
      if (error.response)
        res.status(error.response.status).send(error.response.data);
      else
        res.status(500).send();
    }
  };

  return {
    getMeeting,
    updateMeeting,
    deleteMeeting,
    getRegistrants,
    addRegistrants,
  };
};
module.exports = MeetingController;
