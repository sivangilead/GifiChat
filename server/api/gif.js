const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

const GphApiClient = require('giphy-js-sdk-core')
const client = GphApiClient("3BzzThls0KE0wgqE4MfZAhjefuwdvv5N")

router.get('/:name/:gifname', async (req, res, next) => {
    try {
        const gifname = req.params.gifname
        const name = req.params.name
        console.log(name)
        const response = await client.search('gifs', { "q": gifname })

        res.json({ url: response.data[0].images["original"]["webp_url"], name: name })
    } catch (err) {
        next(err)
    }
})

