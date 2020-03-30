const { Router } = require('express');
const router = Router();

const fetch = require('node-fetch');

//api para mostrar los proyectos
router.get('/', async (req, res) => {
    const response = await fetch('https://nodes-testnet.wavesnodes.com/addresses/data/3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4');
    const datosbch = await response.json();
    //console.log(projects);
    //res.send('Green Projects');
	res.json(datosbch);
});

module.exports = router; 