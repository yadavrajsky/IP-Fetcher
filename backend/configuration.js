const { sequelize } = require('./config/db'); // Adjust the path
// Import your models and associations
require('./models/associations');

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});