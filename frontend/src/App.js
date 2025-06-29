import React, { useEffect, useState } from "react";
import "./App.css";

const LIFESTYLE_OPTIONS = [
  "Urban",
  "Walkable",
  "Nightlife",
  "Family-friendly",
  "Quiet",
  "Parks",
  "Nature",
  "Trails",
  "Relaxed",
  "Modern",
  "Young Professionals",
  "Cafes",
  "Historic",
  "Arts"
];

function App() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([]);

  useEffect(() => {
    fetchNeighborhoods();
    // eslint-disable-next-line
  }, []);

  const fetchNeighborhoods = (prefs = []) => {
    let url = "http://localhost:5000/api/neighborhoods";
    if (prefs.length > 0) {
      url += `?preferences=${prefs.join(",")}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setNeighborhoods(data));
  };

  const handlePrefChange = (e) => {
    const value = e.target.value;
    setSelectedPrefs(prev =>
      prev.includes(value)
        ? prev.filter(p => p !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNeighborhoods(selectedPrefs);
  };

  return (
    <div className="App">
      <h1>NeighborFit</h1>
      <p>Find a neighborhood that fits your lifestyle!</p>
      <form onSubmit={handleSubmit} className="prefs-form">
        <div className="prefs-options">
          {LIFESTYLE_OPTIONS.map(opt => (
            <label key={opt} className="prefs-label">
              <input
                type="checkbox"
                value={opt}
                checked={selectedPrefs.includes(opt)}
                onChange={handlePrefChange}
              />
              {opt}
            </label>
          ))}
        </div>
        <button type="submit">Find Matches</button>
      </form>
      <h2>Neighborhoods</h2>
      <ul>
        {neighborhoods.length === 0 ? (
          <li>No matches found.</li>
        ) : (
          neighborhoods.map(n => (
            <li key={n.id}>
              <strong>{n.name}</strong> ({n.lifestyle})<br/>
              Avg Rent: ₹{n.avgRent} | Schools: {n.schools} | Walk Score: {n.walkScore}<br/>
              <span className="score">Match Score: {n.score}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App; 