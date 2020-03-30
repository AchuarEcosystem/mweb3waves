const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const projects = require('../dataProjects.json');

router.get('/', (req, res) => {
    res.json(projects);
});

router.post('/', (req, res) => {
    const id = projects.length + 1;
    const { title, name, country, preIcoQty, nomTokenPrice, supplierDiscount, supplierData } = req.body;
    const newProject = { ...req.body, id };
    if (id && title && name && country && preIcoQty && nomTokenPrice && supplierDiscount, supplierData) {
        projects.push(newProject);
        res.json(projects);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, name, country, preIcoQty, nomTokenPrice, supplierDiscount, supplierData } = req.body;
    if (id && title && name && country && preIcoQty && nomTokenPrice && supplierDiscount, supplierData) {
        _.each(projects, (project, i) => {
            if (project.id === id) {
                project.title = title;
                project.name = name;
                project.country = country;
                project.preIcoQty = preIcoQty;
                project.nomTokenPrice = nomTokenPrice;
                project.supplierDiscount = supplierDiscount;
                project.supplierData = ssupplierData;
            }
        });
        res.json(projects);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(projects, (project, i) => {
            if (project.id == id) {
                projects.splice(i, 1);
            }
        });
        res.json(projects);
    }
});

module.exports = router;