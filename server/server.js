import express from 'express';

const app = express();

const PORT = process.env.PORT || 5001;; // Default to 5001 locally, use Heroku's dynamic port in production

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

