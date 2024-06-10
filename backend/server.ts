// @ts-nocheck

import express from 'express';
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config/config');
const authRoutes = require('./routes/auth');
const resultsRoutes = require('./routes/results');
const queryRoutes = require('./routes/query');
const cors = require('cors');
const { protect } = require('./middlewares/authMiddleware');
const editRoutes = require('./routes/edit');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'EduChamp'
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth') || req.path.startsWith('/api/editDetails/enterDetails') ) {
    return next();
  }
  protect(req, res, next);
});

app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/editDetails',editRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
