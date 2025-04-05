import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// To get the current directory (replaces __dirname in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use path.normalize to ensure correct path handling
app.use(express.static(path.normalize(path.join(__dirname, '../blogging website - frontend/dist'))));

// Handle all requests by sending index.html
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, '../blogging website - frontend/dist', 'index.html')));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


