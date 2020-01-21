const { Router } = require('express');
const devController = require('../controllers/DevController');
const searchController = require('../controllers/SearchController');

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({message:"Taokey"})
})

routes.route('/devs')
    .get(devController.index)
    .post(devController.store)
    .put(devController.update)
    .delete(devController.destroy)

routes.get('/search', searchController.index)

module.exports = routes;