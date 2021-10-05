const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./bin/db-connection');
const { userRoutes, noteRoutes } = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API notes backend is running......');
});

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
