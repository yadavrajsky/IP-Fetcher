const User = require('../models/user');
const IPAddress = require('../models/ipAddress'); // Assuming you have an IPAddress model
const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');
const ipAddressPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
exports.insertIPAddress = async (req, res) => {
    try {
        const { address } = req.body;
        // Check if the input address is a valid IPv4 address
        if (!address.match(ipAddressPattern)) {
            return res.status(400).json({ error: "Invalid IP address format" });
        }

        if (!address)
            return res.status(400).json({ error: "IP address cannot be empty" });

        // Remove dots (.) from the IP address and limit it to a maximum of 8 characters
        const firstEightDigits = address.replace(/\./g, '').slice(0, 8);

        // Create a custom SQL query to match IPs
        const query = `SELECT * FROM IPAddresses WHERE REPLACE(address, '.', '') LIKE '${firstEightDigits}%'`;
        const existingIP = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT,
            model: IPAddress,
        });

        if (existingIP.length > 0) {
            return res.status(400).json({ error: "The first eight IP digits already exist in the database" });
        }

        // Create and insert the IP address with the user
        await IPAddress.create({
            address: address, // Store without dots
            userId: res.locals.userId
        });

        return res.status(201).json({ message: 'IP address inserted successfully' });
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            // Handle validation error here
            // console.error('Validation error:', error.errors);
            return res.status(400).json({ ...error });
        } else {
            // Handle other types of errors
            console.error('Other error:', error);
            return res.status(500).json({ ...error });
        }
    }
};
exports.fetchIPAddress = async (req, res) => {
    try {
        const { address } = req.query.address;
        // Check if the input address is a valid IPv4 address
        if (!address.match(ipAddressPattern)) {
            return res.status(400).json({ error: "Invalid IP address format" });
        }

        if (!address)
            return res.status(400).json({ error: "IP address cannot be empty" });

        // Remove dots (.) from the IP address and limit it to a maximum of 8 characters
        const firstEightDigits = address.replace(/\./g, '').slice(0, 8);

        // Create a custom SQL query to match IPs
        const query = `SELECT * FROM IPAddresses WHERE REPLACE(address, '.', '') LIKE '${firstEightDigits}%'`;
        const existingIP = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT,
            model: IPAddress,
        });

        if (existingIP.length > 0) {
            return res.status(400).json({ error: "The first eight IP digits already exist in the database" });
        }
        else return res.status(200).json({ message: "IP doesn't exist" })
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            // Handle validation error here
            // console.error('Validation error:', error.errors);
            res.status(400).json({ ...error });
        } else {
            // Handle other types of errors
            console.error('Other error:', error);
            res.status(500).json({ ...error });
        }
    }
};
