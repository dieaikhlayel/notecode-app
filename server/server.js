const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- FIXED DATABASE CONNECTION ---
// Removed useNewUrlParser and useUnifiedTopology as they are deprecated/not supported in Mongoose 6+
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notecode')
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Snippet Schema
const snippetSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Added unique: true for better indexing
  code: String,
  language: String,
  theme: String,
  createdAt: { type: Date, default: Date.now }
});

const Snippet = mongoose.model('Snippet', snippetSchema);

// Default HTML snippet
const defaultHtmlSnippet = `<html>
<head>
  <title>HTML Sample</title>
  <style>
    h1 { color: #cca3a3; }
  </style>
  <script>
    console.log("Sample loaded");
  </script>
</head>
<body>
  <h1>Heading No.1</h1>
  <input disabled type="button" value="Click me" />
</body>
</html>`;

// API Routes
app.get('/api/snippets/default', (req, res) => {
  res.json({ code: defaultHtmlSnippet });
});

app.post('/api/snippets', async (req, res) => {
  try {
    const { code, language, theme } = req.body;
    const id = uuidv4().slice(0, 8); // Generate short ID
    
    const snippet = new Snippet({
      id,
      code,
      language,
      theme
    });
    
    await snippet.save();
    res.json({ id, message: 'Code saved successfully!' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to save snippet' });
  }
});

app.get('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ id: req.params.id });
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch snippet' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});