const axios = require('axios');

async function listUsers() {
    return axios.get("https://api.zoom.us/v2/users", {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function createUser(user) {
    return axios.post("https://api.zoom.us/v2/users", user, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function updateUser(user) {
    return axios.patch("https://api.zoom.us/v2/users", user, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function deleteUser(userId) {
    return axios.delete(`https://api.zoom.us/v2/users/${userId}`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function listMeetings(userId) {
    return axios.get(`https://api.zoom.us/v2/users/${userId}/meetings`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function getMeeting(meetingId) {
    return axios.get(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function createMeeting(userId, data) {
    return axios.post(`https://api.zoom.us/v2/users/${userId}/meetings`, data, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function updateMeeting(userId, data) {
    return axios.patch(`https://api.zoom.us/v2/users/${userId}/meetings`, data, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function deleteMeeting(meetingId) {
    return axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function listMeetingRegistrants(meetingId) {
    return axios.get(`https://api.zoom.us/v2/meetings/${meetingId}/registrants`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function addMeetingRegistrant(meetingId, data) {
    return axios.post(`https://api.zoom.us/v2/meetings/${meetingId}/registrants`, data, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function updateMeetingRegistrantStatus(meetingId, data) {
    return axios.put(`https://api.zoom.us/v2/meetings/${meetingId}/registrants/status`, data, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
};

async function listWebinars(userId) {
    return axios.get(`https://api.zoom.us/v2/users/${userId}/webinars`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function createWebinar(userId, data) {
    return axios.post(`https://api.zoom.us/v2/users/${userId}/webinars`, data, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

async function deleteWebinar(webinarId) {
    return axios.delete(`https://api.zoom.us/v2/webinars${webinarId}`, {
        headers: {
            authorization: `Bearer ${process.env.jwtToken}`,
        },
    });
}

module.exports = {
    listUsers,
    createUser,
    listMeetings,
    createMeeting,
    getMeeting,
    addMeetingRegistrant,
    listMeetingRegistrants
}




