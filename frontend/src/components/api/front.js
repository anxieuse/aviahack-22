const axios = require('axios');
import baseUrl from './base';

const updateInfo = async (routeId, startTime, stopTime,startPoint,stopPoint,buses,passengers) => {
    const r = await axios.patch(`${baseUrl}/routes/`,
        {
        routeId: routeId,
        startTime: startTime,
        stopTime: stopTime,
        startPoint: startPoint,
        stopPoint: stopPoint,
        buses: buses,
        passengers: passengers,
        }
    );
    if (r.status === 200) {
        return r.data;
    } else {
        throw Error(' error');
    }
};

const schedule = async () => {
    const r = await axios.get(`${baseUrl}/schedule`);

    return r.data.exists;
};

const fromMinute = async (minute) => {
    const r = await axios.patch(`${baseUrl}/fromMinute?minute=`,
        {minute: minute}
    );

    return r.data.exists;
};

const updateRoads = async (routeId, startTime, stopTime, startPoint, stopPoint) => {
    const r = await axios.patch(`${baseUrl}/routes/routes?routeId=`, {
        routeId: routeId,
        startTime: startTime,
        stopTime: stopTime,
        startPoint: startPoint,
        stopPoint: stopPoint,
        }
    );
    if (r.status === 200) {
        return r.data;
    } else {
        throw Error(' error');
    }
};

const deleteInfo = async (routeId,busId) => {
    const r = await axios.delete(`${baseUrl}/routes/deleteBus?routeId=`,
        {
            routeId: routeId,
            busId: busId
        }
    );
    if (r.status === 200) {
        return r.data;
    } else {
        throw Error(' error');
    }
};

const add_bus = async (routeId,busId) => {
    const r = await axios.delete(`${baseUrl}/routes/addBus?routeId=`,
        {routeId: routeId,
        busId: busId,
        }
    );
    if (r.status === 200) {
        return r.data;
    } else {
        throw Error(' error');
    }
};



module.exports = {
    updateInfo,
    schedule,
    fromMinute,
    updateRoads,
    deleteInfo,
    add_bus


};
