const UserEventModel = require("../models/UserEvents");

const createOrUpdateUserEvent = async (eventId, userId, role) => {
    const userEventFilter = { eventId, userId };
    const dbUserEvent = await UserEventModel.findOne(userEventFilter);
    if (!dbUserEvent) {
        await UserEventModel.create({
            ...userEventFilter,
            roles: [role]
        });
    } else if (!dbUserEvent.roles.includes(role)) {
        await UserEventModel.findOneAndUpdate(userEventFilter, {
            $push: {
                roles: role
            }
        });
    };
};

module.exports = {
    createOrUpdateUserEvent
};