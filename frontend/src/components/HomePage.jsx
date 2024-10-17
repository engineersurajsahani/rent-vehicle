import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/booking');
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings.');
                }
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Error fetching bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen text-red-600">
            {error}
        </div>
    );

    return (
        <div className="text-center container flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h1 className="text-4xl text-center font-bold mb-6 shadow-lg p-4 rounded-lg bg-opacity-75 bg-white">
                Vehicle Rental App
            </h1>
            <Link to="/" className="mb-4 text-center">
                <Button variant="contained" color="primary" size="large" className="text-center shadow-lg rounded-full">
                    Book Now
                </Button>
            </Link>
            <TableContainer component={Paper} className="w-full max-w-4xl shadow-md rounded-lg">
                <Table>
                    <TableHead>
                        <TableRow className="bg-blue-600">
                            <TableCell className="text-white">First Name</TableCell>
                            <TableCell className="text-white">Last Name</TableCell>
                            <TableCell className="text-white">Vehicle ID</TableCell>
                            <TableCell className="text-white">Start Date</TableCell>
                            <TableCell className="text-white">End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id} className="hover:bg-blue-100 transition duration-300">
                                <TableCell>{booking.firstName}</TableCell>
                                <TableCell>{booking.lastName}</TableCell>
                                <TableCell>{booking.vehicleId}</TableCell>
                                <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default HomePage;
