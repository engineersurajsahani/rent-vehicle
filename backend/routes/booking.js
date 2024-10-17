const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

router.post('/', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dates = req.body.dates;
    const vehicleId = req.body.model; 
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);

    startDate.setHours(0, 0, 0, 0); 
    endDate.setHours(0, 0, 0, 0); 

    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log("Received booking details:", { firstName, lastName, vehicleId, startDate, endDate });

    const existingBooking = await Booking.findOne({
        where: {
            vehicleId,
            [Op.and]: [
                { startDate: { [Op.lte]: endDate } }, 
                { endDate: { [Op.gte]: startDate } }  
            ]
        }
    });

    console.log(existingBooking, "--existingBooking--");

    if (existingBooking) {
        return res.status(200).json({ message: 'Vehicle is already booked for the selected dates.' });
    }

    try {
        const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
        return res.status(201).json({ message: 'Booking created successfully!', booking });
    } catch (err) {
        console.error('Error creating booking:', err);
        return res.status(500).json({ message: 'Error creating booking. Please try again later.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Vehicle }] 
        });
        return res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ message: 'Error fetching bookings. Please try again later.' });
    }
});

module.exports = router;
