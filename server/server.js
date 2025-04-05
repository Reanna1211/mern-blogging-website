const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000; // Default to 5000 locally, use Heroku's dynamic port in production

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

