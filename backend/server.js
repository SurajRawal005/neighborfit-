const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 5000;

app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         
  password: 'surajrawal', 
  database: 'neighborfit'
});

// Matching algorithm endpoint
app.get('/api/neighborhoods', (req, res) => {
  const { preferences } = req.query;
  let prefs = [];
  if (preferences) {
    prefs = preferences.split(',').map(p => p.trim().toLowerCase());
  }

  connection.query('SELECT * FROM neighborhoods', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    // Score neighborhoods
    let scored = results.map(n => {
      let score = 0;
      prefs.forEach(pref => {
        if (n.lifestyle.toLowerCase().includes(pref)) score++;
      });
      return { ...n, score };
    });
    // Sort by score descending
    scored = scored.sort((a, b) => b.score - a.score);
    res.json(scored);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));