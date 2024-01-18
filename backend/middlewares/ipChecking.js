const IPAddress = require('../models/ipAddress'); // Assuming you have an IPAddress model
const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');
const ipAddressPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
const ipChecking = async (req, res, next) => {
    const { address } = req.body;
    if (!address)
        return res.status(400).json({ error: "IP address cannot be empty" });
    // Check if the input address is a valid IPv4 address
    if (!address.match(ipAddressPattern)) {
        return res.status(400).json({ error: "Invalid IP address format" });
    }

    // Remove dots (.) from the IP address and limit it to a maximum of 8 characters
    const firstEightDigits = address.replace(/\./g, '').slice(0, 8);


    // Create a custom SQL query to match IPs
    const query = `SELECT COUNT(*) AS ipCount FROM IPAddress WHERE REPLACE(address, '.', '') LIKE '${firstEightDigits}%'`;

    try {
        const result = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT,
        });

        // Access the ipCount value from the result
        const ipCount = result[0].ipCount;
        // Now you can access the ipCount value in the ipCount variable
        res.ipCount = ipCount;
        next(); // Continue processing the request
    } catch (error) {
        // Handle any errors that occur during the query
        console.error(error);
        return res.status(500).json({ error: "An error occurred while checking the IP" });
    }
}
module.exports = ipChecking;