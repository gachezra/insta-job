const express = require('express');
const connectDB = require('./config/db');
const rateLimiter = require('./middleware/rateLimiter');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
  res.send("Get me that job");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));