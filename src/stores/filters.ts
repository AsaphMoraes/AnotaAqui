import { writable } from 'svelte/store';
import type { FilterOptions } from '../types';

const defaultFilters: FilterOptions = {
  sortBy: 'recent',
  categories: [],
};

export const filters = writable<FilterOptions>(defaultFilters);