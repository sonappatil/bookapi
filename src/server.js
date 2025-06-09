const express = require('express');
const {PORT, MONGO_URI} = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
// Import routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize express app

const app = express();
app.use(express.json());

app.use(cors());


app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', reviewRoutes);



mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected'); 
  })
  .catch(err => console.error(err));

  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
