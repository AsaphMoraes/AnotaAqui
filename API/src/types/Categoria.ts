import type { timestamps } from "./helpers";

export type Categoria = {
    categ_id: number;
    user_id: number;
    categNome: string;
} & timestamps
