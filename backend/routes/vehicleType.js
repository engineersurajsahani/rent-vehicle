const express = require('express');
const VehicleType = require('../models/VehicleType');
const router = express.Router();

router.get('/', async function(req, res) {
    const data = req.query;
    
    try {
        const whereClause = {
            ...(data.wheels && { wheel: parseInt(data.wheels) }) 
        };
    
        const vehicleTypes = await VehicleType.findAll({
            where: whereClause
        });
    
        res.status(200).json({ message: 'Success', data: vehicleTypes });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Error fetching vehicles' });
    }
});

module.exports = router;
