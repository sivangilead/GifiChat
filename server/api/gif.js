const router = require('express').Router();
const { User, Message, Author } = require('../db/models');
module.exports = router;

const GphApiClient = require('giphy-js-sdk-core');
const client = GphApiClient('3BzzThls0KE0wgqE4MfZAhjefuwdvv5N');

router.get('/', async (req, res, next) => {
    const messages = await Message.findAll({ include: [{ model: Author }] }).catch(next);
    res.json(messages);
});

router.post('/', async (req, res, next) => {
    try {
        const gifname = req.body.gifname;
        const name = req.body.name;
        const response = await client.search('gifs', { q: gifname, limit: 1 });
        const author = await Author.findOrCreate({
            where: {
                name: name
            }
        });

        const imageUrl = response.data[0].images.original.webp_url;

        const message = await Message.create({ content: imageUrl, authorId: author[0].id });
        const message1 = await Message.findOne({ where: { id: message.id }, include: [{ model: Author }] });

        res.json(message1);
    } catch (err) {
        next(err);
    }
});

