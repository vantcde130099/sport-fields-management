const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/owners', require('./routes/api/owners'));
app.use('/api/fields', require('./routes/api/fields'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (reg, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
