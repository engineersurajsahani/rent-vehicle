const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicles');
const vehicleTypeRoutes = require('./routes/vehicleType');
const vehicleBookingRoutes = require('./routes/booking');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Rental API!');
});

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/vehicle-type', vehicleTypeRoutes);
app.use('/api/booking', vehicleBookingRoutes);

app.listen(PORT, () => {
    console.log(`Server started...`);
});
