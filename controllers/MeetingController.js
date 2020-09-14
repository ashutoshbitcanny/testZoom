const axios = require("axios");

const MeetingController = () => {
  const getMeeting = async (req, res, next) => {
    try {
      const resData = await axios.get(`${baseUrl}${req.url}`, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
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
      const resData = await axios.get(`${baseUrl}${req.url}`, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  };

  const addRegistrants = async (req, res, next) => {
    try {
      const resData = await axios.post(`${baseUrl}${req.url}`, req.body, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
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
