const mongoose = require('mongoose');
const PointSchema = require('./utils/pointSchema')

const devSchema = new mongoose.Schema({
    name: { type: String},
    git_user: { type: String, required: true },
    bio: { type: String },
    avatar_url: { type: String },
    technology: [ { type: String, required: true } ],
    location: { type: PointSchema, index: '2dsphere' }
})

module.exports = mongoose.model('Dev', devSchema)