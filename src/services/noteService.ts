import Note from '../models/Note';
export const addNoteService = async (note) => {
    let addedNote;
    try {
        addedNote = await Note.addNote(note);
    } catch (e) {
        throw new Error(e);
    }
    return addedNote;
}

export const getAllNotesService = async () => {
    let notes;
    try {
        notes = await Note.getAllNotes();
    } catch (e) {
        throw new Error(e);
    }
    return notes;
}

export const deleteNoteService = async (noteId: string) => {
    try {
        await Note.deleteNote(noteId);
    } catch (e) {
        throw new Error(e);
    }
}

export const getNoteService =async (noteId:string)=>{
    let note;
    try {
        note = await Note.getNote(noteId);
    } catch (e) {
        throw new Error(e);
    }
    return note;
}