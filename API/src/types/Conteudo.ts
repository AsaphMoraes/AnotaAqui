import type { timestamps } from "./helpers";

export type Conteudo = {
    cont_id: number;
    anota_id: number;
    contTexto: string;
} & timestamps
