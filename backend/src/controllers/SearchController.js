const Str_to_Array = require('./utils/Str_to_Array');
const Searchservice = require('../services/SearchService')

module.exports.index = async ( req, res ) => {
    const { latitude, longitude, technologies } = req.query;
    const technology = Str_to_Array(technologies)
    
    const searchDev = await Searchservice.findDev({
        technology: {
            $in: technology
        },
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude,latitude]
                },
                $maxDistance: 10000,
            },
        },
    })

    res.status(200).json({devs: searchDev})
}