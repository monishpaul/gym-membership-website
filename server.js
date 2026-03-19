const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // ✅ Load .env

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// ✅ Database connection using ENV
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true }
});

// ✅ Connect DB
db.connect(err => {
    if (err) {
        console.log("DB Connection Error:", err);
    } else {
        console.log("Connected to TiDB");
    }
});

// ✅ API route
app.post("/register", (req, res) => {
    const { name, email, plan } = req.body;

    if (!name || !email || !plan) {
        return res.status(400).send("All fields required");
    }

    db.query(
        "INSERT INTO members (name, email, plan) VALUES (?, ?, ?)",
        [name, email, plan],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Database error");
            }
            res.send("Success");
        }
    );
});

// ✅ Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ PORT (important for Render)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));