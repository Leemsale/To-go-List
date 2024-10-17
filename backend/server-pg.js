import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors(
    {origin: ['http://localhost:5173', 'https://to-go-list-fe.onrender.com']}
));
app.use(express.json());

const db = new pg.Client({
    connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

db.connect();

// Redirect root URL to "/togos"
app.get('/', (req, res) => {
    res.redirect('/togos');
});

// Route to get all togos
app.get('/togos', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM togos'); // Query the database
        res.json(result.rows); // Send the retrieved togos as JSON response
    } catch (err) {
        console.error(err.message);
    }
});

// Route to create a new togo
app.post('/togos', async (req, res) => {
    try {
        const { text } = req.body; // Extract text from request body
        const newTogo = await db.query('INSERT INTO togos (text) VALUES ($1) RETURNING *', [text]
        ); // Insert a new togo 
        res.json(newTogo.rows[0]); // Send back the newly created togo
    } catch (err) {
        console.error(err.message);
    }
});

// Route to update a togo (text or completed status)
app.put('/togos/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract togo ID from URL
        const { text, completed } = req.body; // Extract text and completed from request body

        const existingTogo = await db.query('SELECT * FROM togos WHERE id = $1', [id]);

        if (existingTogo.rows.length === 0) {
            return res.status(404).send('Togo not found');
        }

        const updatedText = text !== undefined ? text : existingTogo.rows[0].text;
        const updatedCompleted = completed !== undefined ? completed : existingTogo.rows[0].completed;

        // Send back the updated togo
        const updatedTogo = await db.query(
            'UPDATE togos SET text = $1, completed = $2 WHERE id = $3 RETURNING *',
            [updatedText, updatedCompleted, id]
        );

        res.json(updatedTogo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Route to delete a togo
app.delete('/togos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM togos WHERE id = $1', [id]);
        res.json({ message: `Togo ${id} deleted` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});