const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/owners', require('./routes/api/owners'));
app.use('/api/fields', require('./routes/api/fields'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
