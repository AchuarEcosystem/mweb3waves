const { Router } = require('express');
const router = Router();

//api para mostrar este proyecto
router.get('/projects', (req, res) => {
	const data = {
		"Title": "Proyecto de Conservacion Amazonica",
		"name": "Reserva Achuar - PreICO",
		"Country": "Ecuador",
		"Offered Tokens, units": "300000 Bit-CO2",
		"Nominal Price, 1 token": "10 waves",
		"Discount, max": "12%"
	};
	res.json(data);
});

module.exports = router; 