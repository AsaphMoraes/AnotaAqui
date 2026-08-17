import { writable } from 'svelte/store';
import type { Settings } from '../types';
import { connectGoogleAccount, disconnectGoogleAccount, backupNotes, restoreNotes } from '../lib/api';

const defaultSettings: Settings = {
  backupPeriod: 'daily',
  googleAccount: null,
  theme: 'system',
};

export const settings = writable<Settings>(defaultSettings);

// Ações
export async function connectAccount() {
  const account = await connectGoogleAccount();
  settings.update((s) => ({ ...s, googleAccount: account }));
}

export async function disconnectAccount() {
  await disconnectGoogleAccount();
  settings.update((s) => ({ ...s, googleAccount: null }));
}

export async function doBackup() {
  await backupNotes();
}

export async function doRestore() {
  await restoreNotes();
}