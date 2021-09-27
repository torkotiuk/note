const express = require('express');
const dotenv = require('dotenv');
// const notes = require('./data/notes');
const connectDB = require('./bin/db-connection');
const { userRoutes, noteRoutes } = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running......');
});

// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
