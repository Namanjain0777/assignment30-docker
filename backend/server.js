const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB (demoDB)'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/users', userRoutes);
app.use('/students', studentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
