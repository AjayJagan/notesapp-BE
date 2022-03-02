import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { addNote, deleteNote, getAllNotes, getNote } from './controllers/AddNoteController';
import mongoose from 'mongoose';
const app = express();

//MiddleWares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addNote', async (req, res) => {
    try {
        const addedNote = await addNote({
            title: req.body.title,
            note: req.body.note
        });
        res.json(addedNote)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.get('/getNotes', async (req, res) => {
    try {
        const notes = await getAllNotes();
        res.json(notes)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.delete('/deleteNote/:noteId', async (req, res) => {
    try {
        await deleteNote(req.params.noteId);
        res.send();
    } catch (e) {
        res.status(400).send(e.message)
    }
});

app.get('/getNote/:noteId',async (req,res)=>{
    try {
       const note= await getNote(req.params.noteId);
        res.send(note);
    } catch (e) {
        res.status(400).send(e.message)
    }
})

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`); // can use mongo-server name for docker-compose(internal network)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`The application is listening on port ${process.env.SERVER_PORT}!`);
})

