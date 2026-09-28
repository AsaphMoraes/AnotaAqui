import type { timestamps } from "./helpers";

export type Anotacoes = {
    anota_id: number;
    user_id: number;
    anotaTitle: string;
    categ_id: number;
} & timestamps
