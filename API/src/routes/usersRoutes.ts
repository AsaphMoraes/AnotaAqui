import { type Express, type Request, type Response } from "express";
//import { AllUsers } from "../controllers/allUsersController";
import { loginUser } from "@controllers/loginUserController";

export const usersRoutes = (app: Express) => {
    app.post("/login-user", (req: Request, res: Response) => {
        loginUser(req, res)
    })
}