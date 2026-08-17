import type { Note, FilterOptions } from '../types';
import { db } from '../database/config';

export async function fetchNotes(filters?: FilterOptions): Promise<Note[]> {
  const notes = await db.anotations.where("is_active").equals("true").limit(10).toArray()
  return notes;
}

export async function createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
  await delay();
  console.log('createNote:', note);
  // Mock
  return {
    id: Date.now().toString(),
    ...note,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function updateNote(id: string, note: Partial<Note>): Promise<Note> {
  await delay();
  console.log('updateNote', id, note);
  // Mock
  return {
    id,
    title: note.title || '',
    category: note.category || '',
    content: note.content || '',
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

export async function deleteNote(id: string): Promise<void> {
  await delay();
  console.log('deleteNote', id);
}

export async function backupNotes(): Promise<void> {
  await delay();
  console.log('backupNotes');
}

export async function restoreNotes(): Promise<void> {
  await delay();
  console.log('restoreNotes');
}

export async function shareNote(id: string, format: 'pdf' | 'docx'): Promise<Blob> {
  await delay();
  console.log('shareNote', id, format);
  // Retorna um blob fake
  return new Blob(['Conteúdo de exemplo'], { type: 'text/plain' });
}

export async function connectGoogleAccount(): Promise<string> {
  await delay();
  console.log('connectGoogleAccount');
  return 'usuario@example.com';
}

export async function disconnectGoogleAccount(): Promise<void> {
  await delay();
  console.log('disconnectGoogleAccount');
}