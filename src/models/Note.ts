import e from 'express';
import { Schema, model, Model, ObjectId } from 'mongoose';

interface INote {
    title: string;
    note: string;
}

interface NoteModel extends Model<INote> {
    addNote(note: INote): Promise<INote>;
    getAllNotes(): Promise<INote[]>;
    deleteNote(noteId: string): Promise<void>;
    getNote(noteId:string):Promise<INote>
}

const noteSchema = new Schema<INote, NoteModel>({
    title: String,
    note: String
});




noteSchema.statics.addNote = async function (noteToAdd) {
    return new Promise((resolve, reject) => {
        const newNote = new this({ title: noteToAdd.title, note: noteToAdd.note });
        newNote.save((err, returnedNote) => {
            if (err) {
                reject(err)
            } else {
                resolve(returnedNote)
            }
        })
    })
}

noteSchema.statics.getAllNotes = async function () {
    return new Promise((resolve, reject) => {
        this.find({}, (err, notes) => {
            if (err) {
                reject(err);
            } else {
                resolve(notes);
            }
        })
    })
}

noteSchema.statics.deleteNote = async function (noteId) {
    return new Promise<void>((resolve, reject) => {
        this.deleteOne({ _id: noteId }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

noteSchema.statics.getNote = async function (noteId) {
    return new Promise<void>((resolve, reject) => {
        this.findOne({ _id: noteId }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}



const Note = model<INote, NoteModel>('note', noteSchema, 'notes');
export default Note;



