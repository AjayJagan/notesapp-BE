import { addNoteService, deleteNoteService, getAllNotesService, getNoteService } from "../services/noteService";

export const addNote = async (note) => {
    let addedNote;
    try {
        addedNote = await addNoteService(note);
    } catch (e) {
        throw new Error(e);
    }
    return addedNote;
}


export const getAllNotes = async () => {
    let notes;
    try {
        notes = await getAllNotesService();
    } catch (e) {
        throw new Error(e);
    }
    return notes;
}

export const deleteNote = async (noteId: string) => {
    try {
        await deleteNoteService(noteId);
    } catch (e) {
        throw new Error(e);
    }
}

export const getNote =async (noteId:string)=>{
    let note;
    try {
        note = await getNoteService(noteId);
    } catch (e) {
        throw new Error(e);
    }
    return note;
}