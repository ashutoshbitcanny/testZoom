const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const UserEventModel = require("../models/UserEvents");
const _ = require("lodash");
const imageS3Upload = require("../utils/imageS3Upload");
const platformApi = require("../helpers/zoom-api");
const ObjectId = require("mongoose").Types.ObjectId;
const { createOrUpdateUserEvent } = require("../helpers/userEvent");

const SessionModel = require("../models/SessionModel");

const UserController = () => {
  const signup = async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ email: "email already exists" });
      }

      const { platformUser: isPlatformUser, eventId, role } = req.body;

      if (isPlatformUser) {
        const platResponse = await platformApi.createUser({
          action: "create",
          user_info: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            type: 1,
            email: req.body.email,
            password: req.body.password,
          },
        });
      }
      const userData = _.pick(req.body, [
        "first_name",
        "last_name",
        "email",
        "phone",
        "country",
        "city",
        "state",
        "address",
        "pin",
        "status",
        "about",
        "designation",
        "company",
        "qualification",
        "interests",
        "links",
        "password",
      ]);
      userData.type = 1;
      if (isPlatformUser) {
        userData.id = "WRMgooivSyekqqM-st_Uog"; //platResponse.data.id
        userData.platformUser = true;
      }
      // const newUser = userData;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newUser.password, salt);
      userData.password = hash;
      // await newUser.save();
      // await UserModel
      const newUser = await UserModel.set(newUser);
      await createOrUpdateUserEvent(ObjectId(eventId), newUser._id, role);
      res.send({ _id: newUser._id });
    } catch (error) {
      console.log(error);
      if (error.response) {
        res.status(error.response.status).send(error.response.data);
      } else
        res.status(406).send({
          message: error.message,
        });
    }
  };

  const login = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      UserModel.getOne({ email: email }).then((user) => {
        if (!user) return res.status(404).json({ email: "User not found" });
        bcrypt.compare(password, user.password).then((response) => {
          if (!response)
            return res.status(404).json({ password: "password incorrect" });
          //user matched

          const payload = {
            id: user.id,
            name: user.name,
            _id: user._id,
          }; //create jwt payload

          //sign tocken
          jwt.sign(
            payload,
            process.env.secretKey,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        });
      });
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const getMeetings = async (req, res, next) => {
    const platformId = req.user.id;
    if (!platformId) {
      return res.status(404).send("User doesn't exist in platform!");
    }
    try {
      const platRes = await platformApi.listMeetings(platformId);
      const meetings = await SessionModel.getAll({
        createdBy: req.user._id,
        type: "breakout",
      });
      for (let elem of platRes.data.meetings) {
        const meetingIndex = meetings.findIndex(
          (meeting) => meeting.id == elem.id
        );
        if (meetingIndex > -1) {
          elem.id = meetings[meetingIndex]._id;
        }
      }

      res.send(platRes.data);
    } catch (error) {
      console.log(error);
      if (error.response) res.status(404).send(error.response.data);
      else res.status(500).send();
    }
  };

  const createMeeting = async (req, res, next) => {
    try {
      const platformId = req.user.id;
      if (!platformId) {
        return res.status(404).send("User doesn't exist in platform!");
      }

      const platformData = _.pick(req.body, [
        "topic",
        "type",
        "start_time",
        "duration",
        "agenda",
        "settings",
      ]);
      const generalData = _.pick(req.body, [
        "maxCapacity",
        "platform",
        "eventId",
      ]);

      if (!ObjectId.isValid(generalData.eventId)) {
        return res.status(400).send({ message: "Invalid eventId" });
      }

      const platRes = await platformApi.createMeeting(platformId, platformData);
      const session = {
        id: platRes.data.id,
        type: "breakout",
        topic: platformData.topic,
        description: platformData.agenda,
        startAt: platformData.start_time,
        duration: platformData.duration,
        registrationOpen: !platformData.close_registration,
        platform: generalData.platform,
        inviteType:
          platformData.settings.approval_type == 0
            ? "invite"
            : platformData.settings.approval_type == 1
            ? "register"
            : "open",
        approvalNeeded: platformData.settings.approval_type == 1,
        maxCapacity: generalData.maxCapacity,
        status: "active",
        createdBy: req.user._id,
        eventId: Object(generalData.eventId),
      };

      const sessionRes = await SessionModel.set(session);
      await createOrUpdateUserEvent(
        ObjectId(generalData.eventId),
        req.user._id,
        "organiser"
      );

      platRes.data.id = sessionRes._id;
      res.status(platRes.status).send(platRes.data);
    } catch (error) {
      console.log(error);
      if (error.response)
        res.status(error.response.status).send(error.response.data);
      else res.status(500).send();
    }
  };

  // const updateUser = async (req, res) => {
  //   try {
  //     //   const resData = req.body.type;
  //     const id = req.user.id;
  //     const user = await UserModel.findOneAndUpdate(
  //       { id },
  //       { $set: { type: req.body.type } },
  //       { new: true }
  //     );
  //     const resData = await axios.patch(`${baseUrl}users/${id}`, {
  //       type: req.body.type,
  //     });

  //     res.status(resData.status).send(resData.data);
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       res.status(error.response.status).send(error.response.data);
  //     } else {
  //       res.status(403).send(error.message);
  //     }
  //   }
  // };

  const getUsers = async (req, res) => {
    try {
      let users = await UserModel.getAll({});
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const getUser = async (req, res) => {
    const userId = req.params.userId;

    try {
      let users = await UserModel.getOne({ _id: userId });
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const updateUser = async (req, res) => {
    let user = await UserModel.getOne({ _id: req.params.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    try {
      let data = _.pick(req.body, [
        "firstName",
        "lastName",
        "email",
        "phone",
        "country",
        "city",
        "state",
        "address",
        "pin",
        "status",
        "about",
        "designation",
        "company",
        "qualification",
        "interests",
        "links",
      ]);

      if (req.files) {
        let img;
        img = await imageS3Upload(file, fileName, store_id);
        data.dpurl = img.Location;
      }

      user = await UserModel.UpdateOne({ _id: req.params.userId, data });
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
      let users = await UserModel.del({ _id: userId });
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  return {
    signup,
    login,
    getMeetings,
    createMeeting,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
  };
};
module.exports = UserController;
