const dotenv = require('dotenv');
require('colors');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down...'.red.bold);
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const connectDB = require('./db/connectDb');
const app = require('./app');

// db local
const db = process.env.DATABASE_LOCAL;

// atlas mongo uri
const mongoURI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

app.set('port', process.env.PORT || 8080);

const start = async () => {
  try {
    await connectDB(db);
    const server = app.listen(app.get('port'), () =>
      console.log(`Server running on port ${server.address().port}`.blue.bold)
    );
  } catch (err) {
    console.log(err);
  }
};

start();

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...'.red.bold);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
