import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url); // Convert URL to filename
const __dirname = path.dirname(__filename); // Get the directory name


app.use(express.static(path.join(__dirname, 'blogging website - frontend', 'dist')));

// If you're using React Router, you might need this route to handle all requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'blogging website - frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});