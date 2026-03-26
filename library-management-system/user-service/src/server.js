const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'User Service' });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});