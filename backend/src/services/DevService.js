const devPerson = require('../models/Dev');

const findOneDev = ( git_user ) => devPerson.findOne({ git_user })

const findDev = () => {
    return new Promise (async ( resolve, reject ) => {
        await devPerson.find()
        .then(devs => resolve(devs))
        .catch(err => reject(err));
    })
}

const postDev = (name = git_user, git_user, bio, avatar_url, technology, location) => {
    return new Promise( async(resolve, reject) =>{
        await devPerson.create({
            name,
            git_user,
            bio,
            avatar_url,
            technology,
            location
        })
        .then(dev => resolve(dev))
        .catch(err => reject(err));
    })
}

module.exports = {
    findOneDev,
    findDev,
    postDev
}