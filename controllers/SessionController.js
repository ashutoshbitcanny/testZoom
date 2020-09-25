const SessionModel = require("../models/SessionModel");
const UserSessionsModel = require("../models/UserSessions");
const ObjectId = require('mongoose').Types.ObjectId;

const SessionController = () => {
  const createSession = async (req, res, next) => {
    try {
      let data = _.pick(req.body, [
        "topic",
        "description",
        "startAt",
        "duration",
        "platform",
        "type",
        "speakerList",
        "approvalNeeded",
        "attendees",
        "maxCapacity",
        "createdBy",
        "registrationOpen",
        "status",
      ]);

      if (req.files) {
        let img;
        img = await imageS3Upload(file, fileName, store_id);
        data.imageURL = img.Location;
      }

      let session = await SessionModel.create(data);
      res.status(200).send(session);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const getSessions = async (req, res) => {
    try {
      const { type } = req.body;
      const predicate = {
        createdBy: req.user._id
      };
      if(type) {
        predicate.type = type;
      }
      const sessions = await SessionModel.aggregate([{
        $match: predicate
      }, {
        $lookup: {
          from: 'usersessions',
          localField: '_id',
          foreignField: 'sessionId',
          as: 'userSessions'
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userSessions.userId',
          foreignField: '_id',
          as: 'users'
        }
      }]);
      res.send({ sessions });
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const getSession = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send();
      }

      const session = await SessionModel.aggregate([
        {
          $match: { _id: ObjectId(id) }
        }, {
          $lookup: {
            from: 'usersessions',
            localField: '_id',
            foreignField: 'sessionId',
            as: 'userSessions'
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userSessions.userId',
            foreignField: '_id',
            as: 'users'
          }
        }])
      if(!session.length) {
        return res.status(404).send();
      }
      res.send({ session: session[0] });
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const updateSession = async (req, res) => {
    let session = await SessionModel.findOne({ _id: req.params.id });
    if (!session) {
      return res.status(400).json({ message: "Session not found!" });
    }
    try {
      let data = _.pick(req.body, [
        "topic",
        "description",
        "startAt",
        "duration",
        "platform",
        "type",
        "speakerList",
        "approvalNeeded",
        "attendees",
        "maxCapacity",
        "createdBy",
        "registrationOpen",
        "status",
      ]);

      if (req.files) {
        let img;
        img = await imageS3Upload(file, fileName, store_id);
        data.dpurl = img.Location;
      }

      sesison = await SessionModel.findOneAndUpdate(
        req.params.id,
        { $set: data },
        { new: true }
      );
      res.status(200).send(session);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const deleteSession = async (req, res) => {
    const id = req.params.id;

    try {
      let sessions = await SessionModel.findOneAndDelete({ _id: id });
      res.status(200).send(sessions);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  return {
    createSession,
    getSessions,
    getSession,
    updateSession,
    deleteSession,
  };
};
module.exports = SessionController;
