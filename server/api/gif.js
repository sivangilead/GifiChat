const router = require('express').Router();
const { User, Message, Author } = require('../db/models');
module.exports = router;

const GphApiClient = require('giphy-js-sdk-core');
const client = GphApiClient('3BzzThls0KE0wgqE4MfZAhjefuwdvv5N');

router.get('/', async (req, res, next) => {
    const messages = await Message.findAll({ include: [{ model: Author }] }).catch(next);
    res.json(messages);
});

router.delete('/', async (req, res, next) => {
    const messages = await Message.findAll()
    messages.forEach(async message => {
        await message.destroy()
    })

    res.send([]);
});

router.post('/', async (req, res, next) => {
    try {
        const gifname = req.body.gifname;
        const name = req.body.name;
        const response = await client.search('gifs', { q: gifname, limit: 20 });
        const author = await Author.findOrCreate({
            where: {
                name: name
            }
        });
        let gifresult = []
        for (let i = 0; i < response.data.length; i++) {
            gifresult.push(response.data[i].images.original.webp_url)
        }
        // const imageUrl = response.data[0].images.original.webp_url;

        const imageUrl = gifresult[Math.floor(Math.random() * gifresult.length)];

        const message = await Message.create({ content: imageUrl, authorId: author[0].id });
        const message1 = await Message.findOne({ where: { id: message.id }, include: [{ model: Author }] });

        res.json(message1);
    } catch (err) {
        next(err);
    }
});

