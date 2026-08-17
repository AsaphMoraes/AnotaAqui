export interface Note {
  id: number;
  title: string;
  category: string;
  content: string;
  updated_at: Date;
  created_at: Date;
  is_active: boolean;
}

export interface FilterOptions {
  sortBy: 'recent' | 'oldest' | 'title';
  categories: string[];
}

export interface Settings {
  backupPeriod: 'daily' | 'weekly';
  googleAccount: string | null;
  theme: 'light' | 'dark' | 'system';
}