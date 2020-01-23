const axios = require('axios'),
    DevServices = require('../services/DevService'),
    Str_to_Array = require('./utils/Str_to_Array'),
    { findConnections, sendMessage } = require('../webSocket');

/*Recursos de um controller
index - mostra uma listagem
show - mostra um único "dev"
store - criar um dev
update - alterar dados
destroy - deletar
*/

const doubleCheckDev = ( git_user ) => {
    return new Promise( async( resolve, reject) => {
        DevServices.findOneDev( git_user )
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
}

module.exports.store = async (req, res) => {
    try {
        const { git_user, technologies, latitude, longitude } = req.body;

        if (await doubleCheckDev(git_user)) return res.status(400).json({message:`Usuário ${git_user} já cadastrado!`})

        const location = { type: 'Point', coordinates: [longitude, latitude] }

        techsArray = Str_to_Array(technologies)

        const apiGitResponse = await axios.get(`https://api.github.com/users/${git_user}`).catch(err => res.status(404).json({message: `Gitub temporarily unavailable`}))
        let { name , avatar_url, bio } = apiGitResponse.data;
        
        const dev =  await DevServices.postDev( name, git_user, bio, avatar_url, techsArray, location)
        
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        )    

        sendMessage( sendSocketMessageTo, 'new-dev', dev)

        return res.json(dev)
    } 
    catch {

        return res.status(500).json({message:`Erro inesperado no servidor!`})
    }
    
}

module.exports.index = async (req, res) => {
    const devs = await DevServices.findDev()
    return res.status(200).json(devs)
}

module.exports.update = async (req, res) => {
    const { id, name, bio, technology } = req.body;

    let dev = { id }

    if (name) dev.name = name;

    if (bio) dev.bio = bio;
    
    if (technology) dev.technology = technology

    const devUpdated =  await DevServices.updateDev(dev)

    return res.json(devUpdated).status(200)
}

module.exports.destroy = async (req, res) => {
    const { id } = req.query;
    
    const devDeleted = await DevServices.deleteDev(id)
    
    return res.json(devDeleted).status(200)
}

 