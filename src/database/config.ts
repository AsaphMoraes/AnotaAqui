import { Dexie, type EntityTable } from 'dexie'
import type { Note } from '../types'

const db = new Dexie("anotaaqui") as Dexie & {
    anotations: EntityTable<Note, "id"> 
}

db.version(1).stores({
    anotations: "++id, title, category, content, created_at, updated_at, is_active"
})

export { db }