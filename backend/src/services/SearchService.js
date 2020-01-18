const devPerson = require('../models/Dev');

const findDev = (params) => {
    return new Promise (async ( resolve, reject ) => {
        await devPerson.find(params)
        .then(devs => resolve(devs))
        .catch(err => reject(err));
    })
}

module.exports = {
    findDev
}

