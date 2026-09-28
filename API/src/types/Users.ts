import type { timestamps } from "./helpers";

export type Users = {
    user_id: number;
    userEmail: string;
    userPassword: string;
} & timestamps