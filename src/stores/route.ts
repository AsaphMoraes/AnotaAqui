import { writable } from 'svelte/store';

type Route = 'home' | 'settings' | 'note-view' | 'note-edit' | 'note-add';

export const currentRoute = writable<Route>('home');
export const routeParams = writable<Record<string, string>>({});