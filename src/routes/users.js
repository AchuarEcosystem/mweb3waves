const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const users = require('../dataUsers.json');

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const id = users.length + 1;
    const { item, userName, userCountry, userDiscount, orderQty, buyerTokenPrice } = req.body;
    const newUser = { ...req.body, id };
    if (id && item && userName && userCountry && userDiscount && orderQty && buyerTokenPrice) {
        users.push(newUser);
        res.json(users);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { item, userName, userCountry, userDiscount, orderQty, buyerTokenPrice } = req.body;
    if (id && item && userName && userCountry && userDiscount && orderQty && buyerTokenPrice) {
        _.each(users, (user, i) => {
            if (user.id === id) {
                user.item = item;
                user.userName = userName;
                user.userCountry = userCountry;
                user.userDiscount = userDiscount;
                user.orderQty = orderQty;
                user.buyerTokenPrice = buyerTokenPrice;

            }
        });
        res.json(users);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(users, (user, i) => {
            if (user.id == id) {
                users.splice(i, 1);
            }
        });
        res.json(users);
    }
});

module.exports = router;