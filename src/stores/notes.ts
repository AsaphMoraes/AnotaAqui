import { writable, derived } from 'svelte/store';
import type { Note, FilterOptions } from '../types';
import { fetchNotes, createNote, updateNote, deleteNote } from '../lib/api';

function createNotesStore() {
  const { subscribe, set, update } = writable<Note[]>([]);

  return {
    subscribe,
    load: async (filters?: FilterOptions) => {
      const notes = await fetchNotes(filters);
      set(notes);
    },
    add: async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newNote = await createNote(note);
      update((items) => [newNote, ...items]);
      return newNote;
    },
    edit: async (id: string, data: Partial<Note>) => {
      const updated = await updateNote(id, data);
      update((items) => items.map((n) => (n.id === id ? updated : n)));
      return updated;
    },
    remove: async (id: string) => {
      await deleteNote(id);
      update((items) => items.filter((n) => n.id !== id));
    },
  };
}

export const notes = createNotesStore();

// Store para a nota atualmente selecionada (para visualização/edição)
export const currentNoteId = writable<string | null>(null);
export const currentNote = derived(
  [notes, currentNoteId],
  ([$notes, $currentNoteId]) => $notes.find((n) => n.id === $currentNoteId) || null
);