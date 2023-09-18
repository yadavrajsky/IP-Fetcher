const User = require('./user');
const Registration = require('./registration');
const IPAddress = require('./ipAddress');

User.hasOne(Registration);
Registration.belongsTo(User);

// Define associations
IPAddress.belongsTo(User); // Each IPAddress belongs to a User
User.hasMany(IPAddress); // Each User can have multiple IPAddresses