const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

// index, show, store, update, destroy

module.exports = {

    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, longitude, latitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if(!dev) {
            try {
              const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            } catch(e) {
              console.log('handle error here: ', e.message)
              throw new Error(e.message)
            }
        
            const { name = login, avatar_url, bio } = apiResponse.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            // console.log(name, bio, avatar_url, github_username, techs)
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
    
        return res.json(dev)
    },

    async update() {},

    async destroy() {}
}