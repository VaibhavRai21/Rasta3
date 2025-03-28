import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const PORT = 5000;
const db = new sqlite3.Database("./bus_schedule.db");

app.use(cors());
app.use(express.json());

// Fetch unique locations for dropdowns
app.get("/locations", (req, res) => {
    const query = `SELECT DISTINCT "From" AS location FROM bus_timings UNION SELECT DISTINCT "To" AS location FROM bus_timings`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows.map(row => row.location));
    });
});

// Fetch bus routes with timings
app.get("/routes", (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: "Both 'from' and 'to' locations are required." });
    }

    const query = `
        SELECT "Bus Number", "Route No.", "From", "To", "Route Length", "Type", "No.of Service", "Departure Timings"
        FROM bus_timings
        WHERE "From" = ? AND "To" = ?
    `;

    db.all(query, [from, to], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
