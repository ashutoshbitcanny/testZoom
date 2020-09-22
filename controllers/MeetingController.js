const axios = require("axios");
const platformApi = require("../helpers/zoom-api");
const SessionModel = require("../models/SessionModel");
const UserSessionsModel = require("../models/UserSessions");
const ObjectId = require('mongoose').Types.ObjectId;

const MeetingController = () => {
  const getMeeting = async (req, res, next) => {
    try {
      const meetingId = req.params.meetingId;
      if(!ObjectId.isValid(meetingId)) {
        res.status(404).send();
      }
      const sessionRes = await SessionModel.findOne({ _id: ObjectId(meetingId), createdBy: req.user._id });
      if(!sessionRes) {
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
      if(!sessionRes) {
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
      if(!sessionRes) {
        res.status(404).send();
      }
      const platformMeetingId = sessionRes.id;
      const platformData = req.body.platform;
      const generalData = req.body.generalData;
      const platRes = await platformApi.addMeetingRegistrant(platformMeetingId, platformData);
      const userSession = { 
        type: sessionRes.type,
        role: generalData.role
      };
      if(generalData.role === "attendee") {
        userSession.userData = {
          email: platformData.email, 
          first_name: platformData.first_name, 
          last_name: platformData.last_name
        }
      } else {
        userSession.userId = generalData.userId
      }
      await UserSessionsModel.create(userSession);
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
