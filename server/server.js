import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'blogging website - frontend', 'dist')));

// If you're using React Router, you might need this route to handle all requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'blogging website - frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});