import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors(
    {origin: ['http://localhost:5173', 'https://to-go-list-fe.onrender.com']}
));
app.use(express.json());

// In-memory array to hold "to-go" items for demonstration purposes
let togos = [
    { id: 1, text: 'Victoria Falls-Zimbabwe', completed: false },
    { id: 2, text: 'Great Wall-China', completed: true },
    { id: 3, text: 'Disney Land-Paris', completed: false }
];

// Route to get all togos
app.get('/togos', (req, res) => {
    res.json(togos); // Send the in-memory togo list as JSON response
});

// Route to create a new togo
app.post('/togos', (req, res) => {
    const { text } = req.body;  // Extract text from request body
    const newTogo = {
        id: togos.length + 1,  // Generate a new id
        text,
        completed: false
    };
    togos.push(newTogo);  // Add new togo to the array
    res.json(newTogo);  // Send back the newly created togo
});

// Route to update a togo (text or completed status)
app.put('/togos/:id', (req, res) => {
    const { id } = req.params;  // Extract togo ID from URL
    const { text, completed } = req.body;  // Extract text and completed status from request body

    const togo = togos.find(t => t.id === parseInt(id));  // Find the togo by id
    if (!togo) {
        return res.status(404).send('Togo not found');
    }

    // Update the togo's text and completed status
    togo.text = text !== undefined ? text : togo.text;
    togo.completed = completed !== undefined ? completed : togo.completed;

    res.json(togo);  // Send back the updated togo
});

// Route to delete a togo
app.delete('/togos/:id', (req, res) => {
    const { id } = req.params;
    const togoIndex = togos.findIndex(t => t.id === parseInt(id));

    if (togoIndex === -1) {
        return res.status(404).send('Togo not found');
    }

    togos.splice(togoIndex, 1);  // Remove the togo from the array
    res.json({ message: `Togo ${id} deleted` });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
