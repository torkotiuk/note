const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_HOST, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected to: ${connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
