import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		savedMessage: '',
		notes: [],
		active: null,
	},
	reducers: {
		savingNewNote: (state) => {
			state.isSaving = true;
		},
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.savedMessage = '';
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state) => {
			state.isSaving = true;
			state.savedMessage = '';
		},
		updateNote: (state, { payload }) => {
			state.isSaving = false;
			state.notes = state.notes.map((note) =>
				note.id === payload.id ? payload : note
			);

			state.savedMessage = `${payload.title}, successfully updated`;
		},
		setPhotosToActiveNote: (state, action) => {
			state.active.imageUrls = [
				...state.active.imageUrls,
				...action.payload,
			];
			state.isSaving = false;
		},
		clearNotesLogout: (state) => {
			state.isSaving = false;
			state.savedMessage = '';
			state.notes = [];
			state.active = null;
		},
		deleteNoteById: (state, action) => {
			state.active = null;
			state.notes = state.notes.filter(
				(note) => note.id !== action.payload
			);

			// Normal Redux
			/* return {
				...state,
				active: null,
				notes: state.notes.filter((note) => note.id !== action.payload),
			}; */
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	setPhotosToActiveNote,
	clearNotesLogout,
	deleteNoteById,
} = journalSlice.actions;
