const express = require("express");
const router = new express.Router();
const items = require('./fakeDB')

router.get("/", (req, res) => {
    res.send(items)
})

router.post("/", (req, res) => {
    let addeditem = req.body
    items.push(addeditem)
    res.status(201).json({ "added": addeditem })
})

router.get('/:name', (req, res) => {
    items.forEach((i) => {
        if (i.name == req.params.name) {
            res.send(i)
        }
    })
})

router.patch('/:name', (req, res) => {
    items.forEach((i) => {
        if (i.name == req.body.name) {
            i.name = req.body.name;
            i.price = req.body.price;
            res.status(200).json({ "updated": i })
        }
    })
})

router.delete('/:name', (req, res) => {
    items.forEach((i) => {
        if (i.name == req.params.name) {
            items.splice(items.indexOf(items[i]), 1)
            res.status(200).json({ 'message': 'Deleted' })
        }
    })
})

module.exports = router