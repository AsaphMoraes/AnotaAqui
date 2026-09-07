import { type Express } from "express";
import { usersRoutes } from './usersRoutes'

export const routes = (app: Express) => {
    usersRoutes(app)
}