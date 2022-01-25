const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const imageRouter = require('./src/routes/image.route');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use('/images', imageRouter);

const PORT = process.env.PORT || 7000;

app.use((err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'MulterError') err.message = err.field;
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
