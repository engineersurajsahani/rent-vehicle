const express = require('express');
const Vehicle = require('../models/Vehicle'); 
const router = express.Router();

router.get('/', async (req, res) => {
    const type_id = req.query; 
    
    if (!type_id.id) {
        return res.status(400).json({ error: 'typeId is required' });
    }

    try {
        const vehicles = await Vehicle.findAll({
            where: {
                typeId: type_id.id 
            }
        });

        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'No vehicles found for typeId' });
        }

        res.status(200).json({ message: 'Success', data: vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Error fetching vehicles' });
    }
});

module.exports = router;

