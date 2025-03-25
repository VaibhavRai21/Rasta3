import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const PORT = 5000;
const db = new sqlite3.Database("./bus_schedule.db");

app.use(cors());
app.use(express.json());

// Fetch bus routes along with departure timings
app.get("/routes", (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: "Both from and to locations are required." });
    }

    const query = `
        SELECT br.route_no, br.bus_type, br.route_length, 
               GROUP_CONCAT(bt.bus_stop, ', ') AS stops,
               GROUP_CONCAT(bt.departure_time, ', ') AS departure_times
        FROM bus_routes br
        LEFT JOIN bus_timings bt ON br.route_no = bt.route_no
        WHERE br.from_location = ? AND br.to_location = ?
        GROUP BY br.route_no
    `;

    db.all(query, [from, to], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Fetch stops for a specific route
app.get("/stops", (req, res) => {
    const { route_no } = req.query;
    if (!route_no) {
        return res.status(400).json({ error: "Route number is required." });
    }

    const query = `SELECT bus_stop FROM bus_timings WHERE route_no = ?`;
    db.all(query, [route_no], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows.map(row => row.bus_stop));
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
